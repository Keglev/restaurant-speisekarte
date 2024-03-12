import { produkte } from "../data/daten.produkte.js";

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


export const produkteVorspeise = filterProdukte("Vorspeise");