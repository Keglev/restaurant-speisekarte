# Karten Component

Location: `src/components/karten`

This component renders individual menu cards: image, name, category, description and price.

Key props:
- `produkt` — object with `id`, `name`, `kategorie`, `preis`, `beschreibung`, `bild`.

Notes:
- Uses `next/image` for optimized image rendering.
- Formats price using `Intl.NumberFormat("de-DE", { style: 'currency', currency: 'EUR' })`.
