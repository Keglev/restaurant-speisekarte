# State Management Patterns

This document explains how state is managed in the Restaurant Speisekarte app.

- Primary approach: React `useState` hooks in the top-level page container (`pages/index.js`).
- State is lifted up to the container where it manages filter and search state.
- For a larger app, consider React Context or Redux for global state.

## Key state variables

- `gefiltertDaten` — filtered product list
- `textSuchtGetippt` — search input text
- `knopftGetippt` — active category

## Example

```javascript
const [gefiltertDaten, setgefiltertDaten] = useState(produkteVorspeise);
const [textSuchtGetippt, setTextSuchtGetippt] = useState("");
const [knopftGetippt, setKnopfGetippt] = useState("Vorspeise");
```
