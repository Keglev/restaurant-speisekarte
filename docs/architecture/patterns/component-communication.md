# Component Communication

This document outlines how components communicate in the project.

- Parent-to-child via props (e.g., `Karten`, `Kategorien`, `SuchtLeiste`).
- Children notify parent via callback props (e.g., `griffFilter`, `griffSucht`).
- State is lifted to the parent container to coordinate filtering and search.

## Example

```javascript
<Kategorien griffFilter={griffFilter} knopftGetippt={knopftGetippt} />
<SuchtLeiste textSuchtGetippt={textSuchtGetippt} griffSucht={griffSucht} />
```
