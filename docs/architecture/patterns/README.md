# Design Patterns

## Overview

This document outlines the key design patterns implemented in the Restaurant Speisekarte application, focusing on maintainable, scalable, and performant code architecture.

## Architecture Patterns

### 1. Component-Based Architecture Pattern

**Implementation**: React functional components with hooks
**Benefits**: 
- Modularity and reusability
- Clear separation of concerns
- Easy testing and maintenance

```javascript
// Pattern Example: Functional Component with Hooks
const Kategorien = ({ griffFilter, knopftGetippt }) => {
  return (
    <section className={styles.section_kategorien}>
      {/* Component JSX */}
    </section>
  );
};
```

### 2. Container-Presentation Pattern

**Container Component** (`pages/index.js`):
- Manages application state
- Handles business logic
- Passes data to presentation components

**Presentation Components** (`components/*`):
- Focus on UI rendering
- Receive data via props
- Emit events via callbacks

```javascript
// Container Pattern
export default function Home() {
  const [gefiltertDaten, setgefiltertDaten] = useState(produkteVorspeise);
  
  const griffFilter = (kategorie) => {
    setgefiltertDaten(filterProdukte(kategorie));
  };

  return (
    <main>
      <Kategorien griffFilter={griffFilter} />
      <div>
        {gefiltertDaten.map((produkt) => (
          <Karten key={produkt.id} produkt={produkt} />
        ))}
      </div>
    </main>
  );
}
```

## Data Management Patterns

### 3. Service Layer Pattern

**Location**: `/src/service/index.js`
**Purpose**: Centralized business logic

```javascript
// Service Layer Implementation
export const suchtProdukt = (textGetippt) => {
  return produkte.filter(
    (produkte) =>
      produkte.name.toLowerCase().includes(textGetippt.toLowerCase()) ||
      produkte.beschreibung.toLowerCase().includes(textGetippt.toLowerCase())
  );
};

export const filterProdukte = (kategorie) => {
  return produkte.filter((produkte) => produkte.kategorie === kategorie);
};
```

**Benefits**:
- Business logic separation
- Reusable utility functions
- Easy testing and mocking

### 4. Static Data Pattern

**Implementation**: Centralized data management
**Location**: `/src/data/daten.produkte.js`

```javascript
// Static Data Pattern
export const produkte = [
  {
    id: 1,
    name: "Spaghetti",
    kategorie: "Pasta",
    preis: 12.0,
    beschreibung: "Delicious pasta...",
    bild: spaghetti,
  },
  // ... more products
];
```

## UI Patterns

### 5. CSS Modules Pattern

**Implementation**: Component-scoped styling
**Benefits**: Style encapsulation and conflict prevention

```javascript
// CSS Modules Pattern
import styles from "./karten.module.css";

const Karten = ({ produkt }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_info}>
        {/* Component content */}
      </div>
    </div>
  );
};
```

### 6. Conditional Styling Pattern

**Implementation**: Dynamic CSS class application based on state

```javascript
// Conditional Styling Pattern
<button className={knopftGetippt === "Pasta" ? styles.anlichtKnpf : styles.auslichtKnpf}
  onClick={() => griffFilter("Pasta")}>
  Pasta
</button>
```

## State Management Patterns

### 7. Lifting State Up Pattern

**Implementation**: State managed in parent component
**Data Flow**: Top-down via props, events bubble up

```javascript
// State Lifting Pattern
const Home = () => {
  // State managed at top level
  const [gefiltertDaten, setgefiltertDaten] = useState(produkteVorspeise);
  const [textSuchtGetippt, setTextSuchtGetippt] = useState("");
  const [knopftGetippt, setKnopfGetippt] = useState("Vorspeise");

  // Event handlers passed down
  const griffSucht = (textGetippt) => {
    setTextSuchtGetippt(textGetippt);
    // State updates trigger re-renders
  };

  return (
    <div>
      <SuchtLeiste textSuchtGetippt={textSuchtGetippt} griffSucht={griffSucht} />
      <Kategorien knopftGetippt={knopftGetippt} griffFilter={griffFilter} />
    </div>
  );
};
```

### 8. Event Handling Pattern

**Implementation**: Centralized event handling with callback props

```javascript
// Event Handling Pattern
const griffFilter = (kategorie) => {
  setTextSuchtGetippt("");           // Clear search
  setgefiltertDaten(filterProdukte(kategorie)); // Update data
  setKnopfGetippt(kategorie);        // Update active state
};

const griffSucht = (textGetippt) => {
  setTextSuchtGetippt(textGetippt);
  textGetippt.length >= 3 && setgefiltertDaten(suchtProdukt(textGetippt));
  setKnopfGetippt("");               // Clear category selection
};
```

## Performance Patterns

### 9. Image Optimization Pattern

**Implementation**: Next.js Image component with static imports

```javascript
// Image Optimization Pattern
import Image from 'next/image'
import spaghetti from "../../public/assets/img/espaguete.jpg";

const Karten = ({ produkt }) => {
  return (
    <figure>
      <Image src={produkt.bild} alt={produkt.name} />
    </figure>
  );
};
```

### 10. Memoization Pattern (Potential Enhancement)

**Future Implementation**: React.memo for stable components

```javascript
// Memoization Pattern (Recommended Enhancement)
import React from 'react';

const Karten = React.memo(({ produkt }) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
});
```

## Error Handling Patterns

### 11. Defensive Programming Pattern

**Implementation**: Safe property access and fallbacks

```javascript
// Defensive Programming Pattern
const formatPrice = (preis) => {
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency", 
      currency: "EUR"
    }).format(preis || 0);
  } catch (error) {
    return `€${preis || 0}`;
  }
};
```

## Development Patterns

### 12. File Organization Pattern

**Structure**: Feature-based organization
```
src/
├── components/          # UI Components
│   ├── karten/         # Menu Card Component
│   │   ├── index.jsx
│   │   └── karten.module.css
│   ├── kategorien/     # Category Filter Component
│   └── suchtleiste/    # Search Component
├── data/               # Static Data
├── pages/              # Next.js Pages
├── service/            # Business Logic
└── styles/             # Global Styles
```

## Testing Patterns (Recommended)

### 13. Component Testing Pattern

```javascript
// Component Testing Pattern (Future Implementation)
import { render, screen, fireEvent } from '@testing-library/react';
import Kategorien from './index';

test('should filter products when category is clicked', () => {
  const mockGriffFilter = jest.fn();
  
  render(<Kategorien griffFilter={mockGriffFilter} knopftGetippt="" />);
  
  fireEvent.click(screen.getByText('Pasta'));
  
  expect(mockGriffFilter).toHaveBeenCalledWith('Pasta');
});
```

## Anti-Patterns Avoided

### ❌ Props Drilling (Minimized)
- Current depth is manageable (max 2 levels)
- For larger applications, consider Context API

### ❌ Inline Styling
- All styling uses CSS modules
- No style objects in components

### ❌ Magic Numbers/Strings
- Constants defined for search minimum length
- Category names consistently used

---

-**Related Documentation**:
- [Component Architecture](../components/README.md)
- [System Overview](../system-overview.md)
- [State Management](./state-management.md)