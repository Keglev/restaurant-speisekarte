# SuchtLeiste Component

Location: `src/components/suchtleiste`

Renders the search input and calls `griffSucht` on input changes. Triggers search when input length >= 3.

Props:
- `textSuchtGetippt` — current search text
- `griffSucht` — callback to trigger search in parent

Notes:
- Debounce can be added for better performance on large datasets.
