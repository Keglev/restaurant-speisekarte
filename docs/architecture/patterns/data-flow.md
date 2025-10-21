# Data Flow Architecture

This document describes the data flow from static data to UI components.

1. Static data is defined in `/src/data/daten.produkte.js`.
2. Service layer (`/src/service/index.js`) provides filter and search helpers.
3. Container (`pages/index.js`) holds state and calls service functions.
4. Components (`Kategorien`, `SuchtLeiste`, `Karten`) receive data via props and render UI.

## Diagram

```
produkte (static) -> service.filterProdukte/suchtProdukt -> pages/index.js (state)
 -> komponenten props -> render
```
