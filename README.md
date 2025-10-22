# Restaurant Speisekarte

**Interactive German Restaurant Menu System - Next.js & React**

## About

Complete restaurant menu application featuring German cuisine categories with interactive filtering, search functionality, and responsive design. Built with modern Next.js architecture and deployed with automated CI/CD integration.

## Description
This project showcases a modern restaurant menu system designed for German dining establishments. It features category-based navigation, real-time search capabilities, and optimized image delivery. The application demonstrates clean component architecture, responsive design principles, and professional deployment practices with automated pipelines.

![CI Main](https://github.com/Keglev/restaurant-speisekarte/actions/workflows/ci.yml/badge.svg)  
![Deploy](https://github.com/Keglev/restaurant-speisekarte/actions/workflows/deploy.yml/badge.svg)

**📅 Last Updated:** October 21, 2025 - CI/CD pipeline implementation complete  
**🏗️ Status:** Production-ready | Live deployment | Comprehensive documentation

---

## Table of contents

1. [Screenshots](#screenshots)
2. [Project status](#project-status)
3. [Features](#features)
4. [Documentation](#documentation)
   - [Architecture Overview](#architecture-overview)
   - [Index for Architecture docs](#index-for-architecture-docs)
5. [Tech stack](#tech-stack)
6. [Environment profiles (CI/CD)](#environment-profiles)
7. [Available Scripts](#available-scripts)
8. [Deployment](#deployment)

---

<a id="screenshots"></a>
## Screenshots

<img src="./src/assets/imgs/project-image.png" alt="Restaurant Menu Application" width="600" height="400"/>

# Search Example screen showing "Salat" and "Fleisch"

<img src="./src/assets/imgs/salatspeisekarte.png" alt="Restaurant Menu Application" width="600" height="400"/>

<img src="./src/assets/imgs/fleischspeiserkarte.png" alt="Restaurant Menu Application" width="600" height="400"/>

# Example with "Nudeln":

<img src="./src/assets/imgs/nudelnspeisekarte.png" alt="Restaurant Menu Application" width="600" height="400"/>

---

<a id="project-status"></a>
## Project status

### ✅ Frontend Development - Complete
- ✅ Next.js application with React 18
- ✅ Category-based filtering system
- ✅ Real-time search functionality
- ✅ Responsive design with CSS modules
- ✅ Image optimization with Next.js Image component
- ✅ German localization and EUR currency formatting

### ✅ CI/CD Pipeline - Complete
- ✅ Automated testing and linting
- ✅ Separate pipelines for code and documentation
- ✅ Automated deployment to Vercel
- ✅ Build optimization and verification

---

<a id="features"></a>
## 🚀 Features

### 🎯 Core Functionality
- 📋 **Interactive Menu Categories**: Vorspeise, Pasta, Fleisch, Getränke, Salat, Nachtisch
- 🔍 **Real-time Search**: Search by dish name or description
- 🖼️ **Optimized Images**: Next.js Image component for performance
- 💰 **Currency Formatting**: German locale with EUR formatting
- 📱 **Responsive Design**: Mobile-first approach with CSS modules

### 🎨 User Experience
- Clean, intuitive interface design
- Fast category switching with visual feedback
- Instant search results
- Professional food photography presentation
- Smooth navigation and interactions

---

<a id="documentation"></a>
## 📘 Documentation

<a id="architecture-overview"></a>
### 🏗️ Architecture Overview

This application follows modern Next.js architecture patterns with clear separation of concerns:

- **Component Architecture**: Reusable React components with CSS modules
- **Data Management**: Centralized product data with service layer
- **State Management**: React hooks for local state and props drilling
- **Styling Strategy**: CSS modules for component-scoped styling
- **Performance**: Next.js Image optimization and static generation

<a id="index-for-architecture-docs"></a>
### 📚 Index for Architecture docs

- [📁 Complete Architecture Documentation](./docs/README.md) — Comprehensive architecture documentation hub
- [🏗️ System Architecture Overview](./docs/architecture/system-overview.md) — High-level system design and component interaction
- [📦 Component Documentation](./docs/architecture/components/) — Detailed component specifications
- [🎯 Design Patterns](./docs/architecture/patterns/) — Implementation patterns and best practices
- [🚀 Deployment Strategy](./docs/deployment/) — CI/CD and deployment documentation

Key Architecture Documents:

- [Component Architecture](./docs/architecture/components/README.md) — Component design and interaction patterns
- [State Management Patterns](./docs/architecture/patterns/state-management.md) — Application state handling strategies
- [Data Flow Architecture](./docs/architecture/patterns/data-flow.md) — Data flow from source to UI components

The project documentation is published here: https://Keglev.github.io/restaurant-speisekarte/

The docs landing page: https://Keglev.github.io/restaurant-speisekarte/

---

<a id="tech-stack"></a>
## 🧰 Tech Stack 

### Frontend
- **Next.js 14** with **React 18** for modern web development
- **CSS Modules** for component-scoped styling
- **Next.js Image** for optimized image delivery
- **JavaScript (ES6+)** with modern syntax and features

### Development & Build Tools
- **Next.js built-in** bundling and optimization
- **ESLint** for code quality and consistency
- **npm** for package management

### DevOps & Infrastructure
- **GitHub Actions** for automated CI/CD pipelines
- **Vercel** for production deployment with edge optimization
- **Git** for version control with branch-based workflows

---

<a id="available-scripts"></a>
## Available Scripts

Development commands for local work:

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

---

## Deployment

### Live Application
🌍 **Production URL**: [https://restaurant-speisekarte.vercel.app/](https://restaurant-speisekarte.vercel.app/)

### CI/CD Pipeline Status
**✅ CI/CD pipelines are fully operational**

**Automated Deployment Process:**
1. **Code Changes**: Push to main → Triggers build, test, and deployment
2. **Documentation Changes**: Updates documentation without triggering deployment
3. **Quality Gates**: All changes must pass linting and build verification
4. **Production Deploy**: Automatic deployment to Vercel on successful builds

**Deployment Features:**
- ✅ **Zero-downtime deployments** with Vercel
- ✅ **Automatic rollback** on build failures
- ✅ **Preview deployments** for pull requests
- ✅ **Performance optimization** with Vercel Edge Network

### Production Environment
- **Platform**: Vercel with Next.js optimization
- **Performance**: Static generation with dynamic imports
- **Monitoring**: Built-in Vercel analytics and performance monitoring
- **Security**: HTTPS by default with security headers

---

📬 For questions or contributions, feel free to [open an issue](https://github.com/Keglev/restaurant-speisekarte/issues).

---



