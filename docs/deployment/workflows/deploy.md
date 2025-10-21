# Deploy to Vercel (GitHub Actions)

This document explains the `deploy.yml` workflow located at `.github/workflows/deploy.yml`.

## Purpose
- Perform CI validation and deploy the application to Vercel when code changes land on `main`/`master`.

## Triggers
- Pushes to `main` or `master` when core source files change (same path filters as CI).

## Jobs
- `test`: same as CI job (lint, build, tests)
- `deploy`: runs after `test` and performs:
  - Checkout
  - Setup Node.js
  - Install dependencies
  - Build application
  - Deploy using `vercel/action@v1` with secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Workflow (excerpt)

```yaml
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
    - run: npm test --if-present

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## Notes & Recommendations
- Store `VERCEL_*` values in GitHub Actions secrets as described in `docs/deployment/vercel-setup.md`.
- Consider adding a manual approval step for production deployments if you require gatekeeping.
