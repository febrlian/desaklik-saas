# DesaKlik Infrastructure Setup

This guide provides instructions on how to set up the infrastructure for the DesaKlik SaaS platform using Terraform and deploy the applications using Kubernetes manifests.

## Prerequisites

1.  **AWS Account**: You need an active AWS account.
2.  **AWS CLI**: Installed and configured with appropriate permissions.
    ```bash
    aws configure
    ```
3.  **Terraform**: Installed on your local machine (v1.0+).
4.  **kubectl**: Installed to interact with the Kubernetes cluster.
5.  **kustomize**: Installed to build Kubernetes manifests.
6.  **Docker**: Installed to build and push container images.

---

## 1. Provision Infrastructure with Terraform

The Terraform configuration provisions the VPC, EKS Cluster, RDS PostgreSQL instance, ElastiCache Redis, and ECR repositories.

1.  Navigate to the `terraform` directory:
    ```bash
    cd terraform
    ```
2.  Initialize Terraform to download provider plugins and modules:
    ```bash
    terraform init
    ```
3.  Review the planned infrastructure changes:
    ```bash
    terraform plan
    ```
4.  Apply the configuration to provision the resources. You will be prompted to confirm the action:
    ```bash
    terraform apply
    ```
    *Note: This process may take 15-20 minutes to complete, primarily due to the EKS and RDS provisioning.*

5.  After the apply finishes, configure `kubectl` to communicate with the new EKS cluster:
    ```bash
    aws eks update-kubeconfig --region ap-southeast-1 --name desaklik-cluster
    ```

---

## 2. Deploy Prerequisites to Kubernetes

Before deploying the applications, we need to set up some cluster prerequisites like ingress controllers and cert-manager.

*(Note: These are high-level steps; you would typically use Helm for these).*

1.  **Install NGINX Ingress Controller:**
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/aws/deploy.yaml
    ```
2.  **Install cert-manager (for automatic TLS):**
    ```bash
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.2/cert-manager.yaml
    ```
3.  **Create a ClusterIssuer for Let's Encrypt:**
    Create a file `cluster-issuer.yaml`:
    ```yaml
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
      name: letsencrypt-prod
    spec:
      acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: admin@desaklik.id # Replace with your email
        privateKeySecretRef:
          name: letsencrypt-prod
        solvers:
        - http01:
            ingress:
              class: nginx
    ```
    Apply it: `kubectl apply -f cluster-issuer.yaml`

---

## 3. Database Migration and Initialization

1.  Connect to the newly provisioned RDS PostgreSQL database using a tool like `psql` or pgAdmin. You can find the endpoint in the AWS RDS console.
2.  Run the initial Prisma schema migration to create the tables. From the `apps/api` directory:
    ```bash
    DATABASE_URL="postgresql://desaklik_admin:<PASSWORD>@<RDS_ENDPOINT>:5432/desaklik" npx prisma db push
    ```
3.  Apply the manual RLS and Audit Trigger migrations found in `apps/api/prisma/migrations/00000000000000_enable_rls/migration.sql` directly against the database.

---

## 4. Build and Push Application Images

1.  Log in to your newly created Amazon ECR:
    ```bash
    aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
    ```
2.  Build the Web and API images (you will need to create `Dockerfile`s for them in their respective directories):
    ```bash
    docker build -t <AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/desaklik-web:latest -f apps/web/Dockerfile .
    docker build -t <AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/desaklik-api:latest -f apps/api/Dockerfile .
    ```
3.  Push the images:
    ```bash
    docker push <AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/desaklik-web:latest
    docker push <AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/desaklik-api:latest
    ```

---

## 5. Deploy Applications

1.  Navigate to the `k8s/base` directory.
2.  Update `deployment.yaml` to replace `<ECR_URL>` with your actual ECR registry URL (e.g., `<AWS_ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com`).
3.  Create a Kubernetes Secret for the database credentials:
    ```bash
    kubectl create secret generic db-credentials \
      --namespace=desaklik \
      --from-literal=url='postgresql://desaklik_admin:<PASSWORD>@<RDS_ENDPOINT>:5432/desaklik'
    ```
4.  Apply the Kubernetes manifests using Kustomize:
    ```bash
    kubectl apply -k .
    ```
5.  Verify the pods are running:
    ```bash
    kubectl get pods -n desaklik
    ```

## 6. Access the Application

Once the Ingress controller provisions an AWS Load Balancer, find its address:
```bash
kubectl get ingress -n desaklik
```
Point your domain's DNS (`*.desaklik.id` and `desaklik.id`) to this Load Balancer's DNS name via CNAME records.
