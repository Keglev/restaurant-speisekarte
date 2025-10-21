# Component Architecture

## Overview

The Restaurant Speisekarte application is built using a component-based architecture with three main interactive components, each responsible for specific functionality within the menu system.

## Component Hierarchy

```
App (index.js)
├── Header (Banner)
├── Kategorien (Category Filter)
├── SuchtLeiste (Search Bar)
└── Section (Menu Display)
    └── Karten[] (Menu Cards)
```

## Core Components

### 1. Kategorien Component
**Location**: `/src/components/kategorien/`
**Purpose**: Category filtering interface

```javascript
<Kategorien 
  griffFilter={griffFilter} 
  knopftGetippt={knopftGetippt} 
/>
```

**Responsibilities**:
- Display category filter buttons
- Handle category selection events
- Provide visual feedback for active category
- Pass filter selections to parent component

**Categories Supported**:
- Vorspeise (Appetizers)
- Pasta
- Fleisch (Meat)
- Getränken (Drinks)
- Salat (Salads)
- Naschspeisen (Desserts)

### 2. SuchtLeiste Component
**Location**: `/src/components/suchtleiste/`
**Purpose**: Real-time search functionality

```javascript
<SuchtLeiste 
  textSuchtGetippt={textSuchtGetippt}
  griffSucht={griffSucht} 
/>
```

**Responsibilities**:
- Provide search input interface
- Handle real-time text input
- Trigger search functionality
- Clear search when needed

### 3. Karten Component
**Location**: `/src/components/karten/`
**Purpose**: Individual menu item display

```javascript
<Karten 
  produkt={produkt} 
/>
```

**Responsibilities**:
- Display menu item information
- Render optimized product images
- Format pricing in EUR currency
- Show item descriptions

## Component Communication Patterns

### Parent-Child Communication
```
Index.js (Parent)
    ↓ (props)
Components (Children)
    ↑ (callbacks)
Index.js (Parent)
```

### Data Flow Example
1. **User Action**: Clicks "Getränken" category button
2. **Event Handling**: `griffFilter("Getränken")` called
3. **State Update**: `setgefiltertDaten(filterProdukte("Getränken"))`
4. **Re-render**: Components update with filtered data

### State Management Pattern
```javascript
// Parent component state
const [gefiltertDaten, setgefiltertDaten] = useState(produkteVorspeise);
const [textSuchtGetippt, setTextSuchtGetippt] = useState("");
const [knopftGetippt, setKnopfGetippt] = useState("Vorspeise");

// Event handlers
const griffSucht = (textGetippt) => {
  setTextSuchtGetippt(textGetippt);
  textGetippt.length >= 3 && setgefiltertDaten(suchtProdukt(textGetippt));
  setKnopfGetippt("");
};

const griffFilter = (kategorie) => {
  setTextSuchtGetippt("");
  setgefiltertDaten(filterProdukte(kategorie));
  setKnopfGetippt(kategorie);
};
```

## Component Styling Architecture

### CSS Modules Pattern
Each component has its own CSS module file:
- `karten.module.css`
- `kategorien.module.css`
- `suchtleiste.module.css`

### Style Isolation
```javascript
import styles from "./karten.module.css";

<div className={styles.container}>
  <figure>
    <Image src={produkt.bild} alt={produkt.name} />
  </figure>
  <div className={styles.container_info}>
    // Component content
  </div>
</div>
```

## Component Props Interface

### Kategorien Props
```typescript
interface KategorienProps {
  griffFilter: (kategorie: string) => void;
  knopftGetippt: string;
}
```

### SuchtLeiste Props
```typescript
interface SuchtLeisteProps {
  textSuchtGetippt: string;
  griffSucht: (text: string) => void;
}
```

### Karten Props
```typescript
interface KartenProps {
  produkt: {
    id: number;
    name: string;
    kategorie: string;
    preis: number;
    beschreibung: string;
    bild: StaticImageData;
  };
}
```

## Performance Considerations

### Image Optimization
- **Next.js Image Component**: Automatic optimization and lazy loading
- **Static Imports**: Images imported as modules for optimization
- **Responsive Images**: Automatic sizing based on device

### Component Rendering
- **Conditional Rendering**: Only render filtered items
- **Key Props**: Proper key props for list rendering
- **Memo Optimization**: Potential for React.memo on stable components

## Component Testing Strategy

### Unit Testing Approach
- **Component Isolation**: Test each component independently
- **Props Testing**: Verify component behavior with different props
- **Event Testing**: Test user interactions and callbacks
- **Snapshot Testing**: Ensure UI consistency

### Integration Testing
- **Component Interaction**: Test component communication
- **Data Flow**: Verify data flows correctly through props
- **State Updates**: Test state changes and re-renders

---

**Related Documentation**:
- [Individual Component Docs](./components/)
- [Design Patterns](../patterns/)
- [System Overview](../system-overview.md)