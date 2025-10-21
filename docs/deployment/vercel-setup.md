# Vercel CI/CD Pipeline Setup

This repository includes a GitHub Actions workflow that automatically builds and deploys the application to Vercel when changes are pushed to the main branch.

## Setup Instructions

1. **Get Vercel Credentials:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in your project directory and follow the setup
   - Run `vercel --token` to get your token
   - Get your organization and project IDs from Vercel dashboard

2. **Add GitHub Secrets:**
   Go to your GitHub repository → Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID  
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

3. **Pipeline Workflow:**
   - **Test Stage**: Runs on all pushes and PRs
     - Installs dependencies
     - Runs linting
     - Builds the application
     - Runs tests (if available)
   
   - **Deploy Stage**: Only runs on pushes to main branch
     - Builds the application
     - Deploys to Vercel production

## Alternative Setup (Simpler)

If you prefer to keep Vercel's automatic deployment (which you currently have), you can use this simplified workflow that just runs tests:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
```

This way you get the benefits of CI (automated testing) while keeping Vercel's simple auto-deployment.