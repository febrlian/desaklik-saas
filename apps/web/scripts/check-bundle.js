const fs = require('fs');
const path = require('path');

// Adjusted based on actual uncompressed Next.js output
const BUDGET_SHARED_JS_KB = 300;
const BUDGET_LARGEST_ROUTE_KB = 450;

function checkBundle() {
  const manifestPath = path.join(__dirname, '../.next/build-manifest.json');

  if (!fs.existsSync(manifestPath)) {
    console.error('❌ build-manifest.json not found. Run next build first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const sharedFiles = new Set([
    ...(manifest.pages['/_app'] || []),
    ...(manifest.pages['/_error'] || [])
  ]);

  let sharedSize = 0;
  sharedFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(__dirname, '../.next', file);
      if (fs.existsSync(filePath)) {
        sharedSize += fs.statSync(filePath).size;
      }
    }
  });

  const sharedSizeKb = sharedSize / 1024;
  console.log(`Shared JS Size: ${sharedSizeKb.toFixed(2)} kB`);

  let failed = false;
  if (sharedSizeKb > BUDGET_SHARED_JS_KB) {
    console.error(`❌ FAILED: Shared JS size (${sharedSizeKb.toFixed(2)} kB) exceeds budget (${BUDGET_SHARED_JS_KB} kB)`);
    failed = true;
  } else {
    console.log(`✅ PASSED: Shared JS size within budget (${BUDGET_SHARED_JS_KB} kB)`);
  }

  let largestRouteSize = 0;
  let largestRouteName = '';

  for (const [route, files] of Object.entries(manifest.pages)) {
    if (route.startsWith('/_')) continue;

    let routeSize = sharedSize;
    files.forEach(file => {
       if (file.endsWith('.js') && !sharedFiles.has(file)) {
          const filePath = path.join(__dirname, '../.next', file);
          if (fs.existsSync(filePath)) {
            routeSize += fs.statSync(filePath).size;
          }
       }
    });

    if (routeSize > largestRouteSize) {
      largestRouteSize = routeSize;
      largestRouteName = route;
    }
  }

  const largestRouteSizeKb = largestRouteSize / 1024;
  console.log(`Largest Route Size (${largestRouteName}): ${largestRouteSizeKb.toFixed(2)} kB`);

  if (largestRouteSizeKb > BUDGET_LARGEST_ROUTE_KB) {
     console.error(`❌ FAILED: Largest route size (${largestRouteSizeKb.toFixed(2)} kB) exceeds budget (${BUDGET_LARGEST_ROUTE_KB} kB)`);
     failed = true;
  } else {
     console.log(`✅ PASSED: Largest route size within budget (${BUDGET_LARGEST_ROUTE_KB} kB)`);
  }

  process.exit(failed ? 1 : 0);
}

checkBundle();
