/**
 * Component prop typedefs used only for documentation generation.
 * These avoid importing binary assets while still documenting component props.
 */

/**
 * @typedef {Object} KartenProps
 * @property {{ id:number, name:string, kategorie:string, preis:number, beschreibung:string, bild:string }} produkt
 */

/**
 * @typedef {Object} KategorienProps
 * @property {(kategorie:string)=>void} griffFilter
 * @property {string} knopftGetippt
 */

/**
 * @typedef {Object} SuchtLeisteProps
 * @property {string} textSuchtGetippt
 * @property {(text:string)=>void} griffSucht
 */

export default {};
