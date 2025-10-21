# CI - Code Quality (GitHub Actions)

This document explains the `ci.yml` workflow located at `.github/workflows/ci.yml`.

## Purpose
- Run code quality checks, linting, and build verification for source changes.
- Triggered on pushes and pull requests affecting core source files.

## Triggers
- Pushes to `main` or `master` when paths under `src/`, `pages/`, `public/`, `styles/`, `package.json`, `package-lock.json`, or `next.config.mjs` change.
- Pull requests targeting `main` or `master` with the same path filters.

## Jobs
- `test`: Runs on `ubuntu-latest` and performs:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies (`npm ci`)
  - Run lint (`npm run lint`)
  - Build application (`npm run build`)
  - Run tests if present (`npm test --if-present`)

## Workflow (excerpt)

```yaml
name: CI - Code Quality

on:
  push:
    branches: [ main, master ]
    paths:
      - 'src/**'
      - 'pages/**'
      - 'public/**'
      - 'styles/**'
      - 'package.json'
      - 'package-lock.json'
      - 'next.config.mjs'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'src/**'
      - 'pages/**'
      - 'public/**'
      - 'styles/**'
      - 'package.json'
      - 'package-lock.json'
      - 'next.config.mjs'

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
```

## Notes
- Keep `node-version` aligned with local development and Vercel runtime (currently 18).
- Add additional test steps as unit/integration tests are added to the repo.
