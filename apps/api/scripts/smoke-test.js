const autocannon = require('autocannon');
const { spawn } = require('child_process');

const PORT = 3001; // use a different port for testing
const TARGET_URL = `http://localhost:${PORT}/health`;
const P95_THRESHOLD_MS = 350;
const ERROR_RATE_THRESHOLD_PERCENT = 1;

let serverProcess;

async function runTest() {
  console.log('Starting API server for smoke tests...');
  serverProcess = spawn('node', ['dist/src/main.js'], {
    env: { ...process.env, PORT: PORT.toString(), NODE_ENV: 'production', DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/desaklik?schema=public' }
  });

  serverProcess.stdout.on('data', (data) => console.log(`[API]: ${data}`));
  serverProcess.stderr.on('data', (data) => console.error(`[API ERROR]: ${data}`));

  // Give the server a few seconds to boot
  await new Promise(resolve => setTimeout(resolve, 8000));

  console.log(`Running autocannon against ${TARGET_URL}...`);
  const instance = autocannon({
    url: TARGET_URL,
    connections: 50, // moderate concurrency
    pipelining: 1,
    duration: 10 // run for 10 seconds
  });

  autocannon.track(instance, { renderProgressBar: true });

  instance.on('done', (result) => {
    console.log('\n--- Test Results ---');
    console.log(`Total Requests: ${result.requests.total}`);
    console.log(`Total Errors: ${result.errors}`);
    console.log(`Total Non-2xx Responses: ${result.non2xx}`);
    console.log(`Latency p50: ${result.latency.p50} ms`);
    console.log(`Latency p90: ${result.latency.p90} ms`);
    console.log(`Latency p95: ${result.latency.p95} ms`);
    console.log(`Latency p99: ${result.latency.p99} ms`);

    const p95Latency = result.latency.p95;
    const totalRequests = result.requests.total;
    const errorRate = totalRequests === 0 ? 100 : (result.errors + result.non2xx) / totalRequests * 100;

    let failed = false;

    if (p95Latency > P95_THRESHOLD_MS) {
      console.error(`❌ FAILED: p95 latency (${p95Latency}ms) exceeded threshold (${P95_THRESHOLD_MS}ms)`);
      failed = true;
    } else {
      console.log(`✅ PASSED: p95 latency (${p95Latency}ms) is within threshold (${P95_THRESHOLD_MS}ms)`);
    }

    if (errorRate >= ERROR_RATE_THRESHOLD_PERCENT) {
      console.error(`❌ FAILED: Error rate (${errorRate.toFixed(2)}%) exceeded threshold (<${ERROR_RATE_THRESHOLD_PERCENT}%)`);
      failed = true;
    } else {
      console.log(`✅ PASSED: Error rate (${errorRate.toFixed(2)}%) is within threshold (<${ERROR_RATE_THRESHOLD_PERCENT}%)`);
    }

    cleanup();
    process.exit(failed ? 1 : 0);
  });
}

function cleanup() {
  if (serverProcess) {
    console.log('Shutting down server...');
    serverProcess.kill();
  }
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

runTest().catch(err => {
  console.error(err);
  cleanup();
  process.exit(1);
});
