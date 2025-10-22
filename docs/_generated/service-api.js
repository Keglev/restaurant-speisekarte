/**
 * Documentation shim for service functions.
 *
 * This file is used only for documentation generation. It mirrors the public
 * signatures of the real service functions but avoids importing the real data
 * (which references binary image assets). Use this to generate docs safely.
 */

/**
 * Search products by text (docs-only shim).
 * @param {string} textGetippt
 * @returns {Array<Object>} matching products
 */
export function suchtProdukt(textGetippt) {
  // docs shim: implementation omitted
  return [];
}

/**
 * Filter products by category (docs-only shim).
 * @param {string} kategorie
 * @returns {Array<Object>} filtered products
 */
export function filterProdukte(kategorie) {
  // docs shim: implementation omitted
  return [];
}

/**
 * Pre-filtered products for the default category 'Vorspeise' (docs-only shim).
 * @type {Array<Object>}
 */
export const produkteVorspeise = [];

export default {};
