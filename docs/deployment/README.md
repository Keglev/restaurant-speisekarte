# Deployment Documentation

## Overview

The Restaurant Speisekarte application uses a modern CI/CD pipeline with Vercel for hosting, providing automated builds, deployments, and optimizations.

## Deployment Architecture

```
GitHub Repository
       ↓
GitHub Actions (CI/CD)
       ↓
Vercel Platform
       ↓
Global CDN Distribution
       ↓
End Users
```

## CI/CD Pipeline Strategy

### Multi-Pipeline Architecture

The project implements separate pipelines for different types of changes:

#### 1. Code Pipeline (`ci.yml` + `deploy.yml`)
**Triggers**: Changes to source code files
- `src/**`
- `pages/**`
- `public/**`
- `styles/**`
- `package.json`
- `next.config.mjs`

**Process**:
1. **CI Stage** (`ci.yml`):
   - Install dependencies
   - Run ESLint
   - Build application
   - Run tests (if available)

2. **Deploy Stage** (`deploy.yml`):
   - Repeat CI validation
   - Deploy to Vercel production
   - Update live application

#### 2. Documentation Pipeline (`docs-ci.yml`)
**Triggers**: Changes to documentation files
- `docs/**`
- `README.md`
- `*.md` files

**Process**:
- Validate Markdown syntax
- Check link integrity
- Verify documentation structure
- **No deployment triggered**

### Pipeline Benefits

✅ **Efficient Resource Usage**: Documentation changes don't trigger unnecessary deployments  
✅ **Fast Feedback**: Code changes get immediate validation  
✅ **Quality Gates**: All changes must pass linting and build checks  
✅ **Separation of Concerns**: Code and documentation have separate validation rules

## Workflow documentation

Detailed, human-readable versions of the GitHub Actions workflows are available here:

- [CI - Code Quality](./workflows/ci.md) — documents `.github/workflows/ci.yml`
- [Deploy to Vercel](./workflows/deploy.md) — documents `.github/workflows/deploy.yml`
- [Documentation CI](./workflows/docs-ci.md) — documents `.github/workflows/docs-ci.yml`

## Vercel Integration

### Deployment Configuration

**Platform**: Vercel  
**Framework**: Next.js (auto-detected)  
**Build Command**: `npm run build`  
**Output Directory**: `.next/`  
**Node.js Version**: 18.x

### Environment Setup

#### Required Secrets (for manual deployment)
If using the full CD pipeline with Vercel API:

```bash
# GitHub Repository Secrets
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_organization_id
VERCEL_PROJECT_ID=your_project_id
```

#### Alternative: Vercel Git Integration
**Recommended approach**: Use Vercel's built-in Git integration
- Automatic deployments on push to main/master
- Preview deployments for pull requests
- No manual secret configuration required

## Build Process

### Build Optimization

1. **Next.js Static Generation**
   ```json
   {
     "scripts": {
       "build": "next build",
       "start": "next start"
     }
   }
   ```

2. **Asset Optimization**
   - Automatic image optimization with Next.js Image
   - CSS optimization and minification
   - JavaScript bundling and code splitting

3. **Performance Features**
   - Static page generation
   - Automatic code splitting
   - Image lazy loading
   - CDN distribution via Vercel Edge Network

### Build Verification

**Local Build Testing**:
```bash
npm run build    # Verify build succeeds
npm start        # Test production build locally
```

**CI Build Validation**:
- ESLint code quality checks
- Build success verification
- Test execution (if tests exist)

## Deployment Environments

### Production Environment
- **URL**: https://restaurant-speisekarte.vercel.app/
- **Branch**: `main`/`master`
- **Auto-deploy**: Yes (on successful CI)
- **Environment**: Production optimized

### Preview Environments
- **Trigger**: Pull requests
- **URL**: Dynamic preview URLs
- **Purpose**: Review changes before merge
- **Lifecycle**: Deleted after PR merge/close

## Performance Optimization

### Vercel Platform Features

1. **Global CDN**: Content delivered from edge locations worldwide
2. **Smart Compression**: Automatic gzip/brotli compression
3. **Cache Headers**: Optimized caching strategies
4. **SSL/TLS**: Automatic HTTPS with certificate management

### Next.js Optimizations

1. **Static Generation**: Pages pre-rendered at build time
2. **Image Optimization**: Automatic WebP conversion and resizing
3. **Code Splitting**: Automatic bundle optimization
4. **Font Optimization**: Google Fonts optimization

## Monitoring and Analytics

### Built-in Monitoring
- **Vercel Analytics**: Real-time performance monitoring
- **Build Logs**: Detailed deployment logs
- **Error Tracking**: Automatic error detection and alerts

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Page Load Speed**: Time to first byte (TTFB)
- **Bundle Size**: JavaScript bundle analysis

## Rollback Strategy

### Automatic Rollbacks
- **Build Failures**: Automatic prevention of broken deployments
- **Health Checks**: Vercel monitors deployment health

### Manual Rollbacks
```bash
# Via Vercel CLI
vercel rollback [deployment-url]

# Via Vercel Dashboard
# Navigate to deployments and select previous version
```

## Best Practices

### Deployment Best Practices

✅ **Always test builds locally** before pushing  
✅ **Use feature branches** for development  
✅ **Review preview deployments** before merging  
✅ **Monitor deployment status** in Vercel dashboard  
✅ **Keep dependencies updated** for security  

### Security Best Practices

✅ **HTTPS by default** (Vercel automatic)  
✅ **Security headers** configured  
✅ **No sensitive data** in client-side code  
✅ **Regular dependency updates** for vulnerability fixes  

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check build locally
   npm run build
   
   # Check for ESLint errors
   npm run lint
   ```

2. **Image Loading Issues**
   - Verify image paths are correct
   - Ensure images are in `public/` directory
   - Check Next.js Image component usage

3. **CSS Issues**
   - Verify CSS module imports
   - Check for naming conflicts
   - Validate CSS syntax

### Debug Commands

```bash
# Local development
npm run dev

# Production build testing
npm run build && npm start

# Dependency check
npm audit

# Clear cache
rm -rf .next node_modules
npm install
```

---

**Related Documentation**:
- [Vercel CI/CD Setup Guide](./vercel-setup.md)
- [System Architecture](../architecture/system-overview.md)
- [Vercel Documentation](https://vercel.com/docs)