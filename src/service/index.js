import { produkte } from "../data/daten.produkte.js";

/**
 * Search the product catalog for a given text.
 *
 * @param {string} textGetippt - Text entered by the user to search for.
 * @returns {Array<Object>} Array of matching product objects (may be empty).
 *
 * @example
 * const results = suchtProdukt('Pasta');
 */
export const suchtProdukt = (textGetippt) => {
  return produkte.filter(
    (produkte) =>
      produkte.name.toLowerCase().includes(textGetippt.toLowerCase()) ||
      produkte.beschreibung.toLowerCase().includes(textGetippt.toLowerCase())
  );
};

/**
 * Filter the product list by a category name.
 *
 * @param {string} kategorie - Category name (e.g. "Vorspeise", "Pasta").
 * @returns {Array<Object>} Array of products that belong to the given category.
 *
 * @example
 * const pastaItems = filterProdukte('Pasta');
 */
export const filterProdukte = (kategorie) => {
  return produkte.filter((produkte) => produkte.kategorie === kategorie);
};


/**
 * Pre-filtered products for the default category 'Vorspeise'.
 * @type {Array<Object>}
 */
export const produkteVorspeise = filterProdukte("Vorspeise");