# Documentation CI (GitHub Actions)

This document explains the `docs-ci.yml` workflow located at `.github/workflows/docs-ci.yml`.

## Purpose
- Validate documentation changes (Markdown link-checking and structure validation)
- Prevent docs-only changes from triggering production deployments

## Triggers
- Pushes and pull requests to `main`/`master` that modify `docs/**`, `README.md`, or any `*.md` file

## Jobs
- `validate-docs`: runs on `ubuntu-latest` and performs:
  - Checkout code
  - Validate Markdown links using `gaurav-nelson/github-action-markdown-link-check@v1`
  - Run a shell script to ensure `docs/README.md` and `README.md` exist
  - Populate `$GITHUB_STEP_SUMMARY` with changed markdown files for quick review

## Workflow (excerpt)

```yaml
name: Documentation CI

on:
  push:
    branches: [ main, master ]
    paths:
      - 'docs/**'
      - 'README.md'
      - '*.md'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'docs/**'
      - 'README.md'
      - '*.md'

jobs:
  validate-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Validate Markdown files
      uses: gaurav-nelson/github-action-markdown-link-check@v1
      with:
        use-quiet-mode: 'yes'
        use-verbose-mode: 'yes'
        config-file: '.github/workflows/markdown-link-check-config.json'
    - name: Check documentation structure
      run: |
        # checks for files
    - name: Generate documentation summary
      run: |
        # add changed md files to $GITHUB_STEP_SUMMARY
```

## Notes
- The markdown link check action can be noisy for external links; adjust `markdown-link-check-config.json` as needed.
- This workflow intentionally does not perform any build or deployment steps.
