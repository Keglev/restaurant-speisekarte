# Restaurant Speisekarte - Architecture Documentation

## Overview

This directory contains the complete architecture documentation for the Restaurant Speisekarte application, a Next.js-based restaurant menu system with interactive filtering and search capabilities.

## Documentation Structure

### 📁 Architecture Documentation
- [System Architecture Overview](./architecture/system-overview.md) - High-level system design and component interaction
- [Component Architecture](./architecture/components/) - Detailed component documentation
- [Design Patterns](./architecture/patterns/) - Implementation patterns and best practices

### 📁 Component Documentation
- [Karten Component](./architecture/components/karten-component.md) - Menu card display component
- [Kategorien Component](./architecture/components/kategorien-component.md) - Category filter component
- [Suchtleiste Component](./architecture/components/suchtleiste-component.md) - Search bar component

### 📁 Design Patterns
- [State Management Patterns](./architecture/patterns/state-management.md) - How application state is managed
- [Component Communication](./architecture/patterns/component-communication.md) - Inter-component communication patterns
- [Data Flow Architecture](./architecture/patterns/data-flow.md) - Data flow from source to UI

### 📁 Deployment
- [Deployment Overview](./deployment/README.md) - Complete deployment documentation
- [Vercel CI/CD Setup](./deployment/vercel-setup.md) - Step-by-step setup guide

## Application Architecture Summary

**Technology Stack:**
- **Frontend Framework:** Next.js 14 with React 18
- **Styling:** CSS Modules for component-scoped styling
- **Image Optimization:** Next.js Image component
- **Deployment:** Vercel platform with automatic deployments

**Key Features:**
- Responsive restaurant menu display
- Category-based filtering (Vorspeise, Pasta, Fleisch, Getränke, Salat, Nachtisch)
- Real-time search functionality
- Optimized image loading
- German localization with EUR currency formatting

**Architecture Highlights:**
- Component-based architecture with clear separation of concerns
- Centralized data management in `/src/data/`
- Service layer for business logic in `/src/service/`
- Modular CSS with CSS Modules
- Static site generation capabilities with Next.js

## Quick Navigation

- [🏠 Back to Main README](../README.md)
- [🏗️ System Architecture](./architecture/system-overview.md)
- [📦 Component Docs](./architecture/components/)
- [🚀 Deployment Guide](./deployment/)

---

**Last Updated:** October 21, 2025  
**Documentation Version:** 1.0.0