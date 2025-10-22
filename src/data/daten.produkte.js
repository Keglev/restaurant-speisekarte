import spaghetti from "../../public/assets/img/espaguete.jpg";
import lasagne from "../../public/assets/img/lasanha.jpg";
import ravioli from "../../public/assets/img/ravioli.jpg";
import capeletti from "../../public/assets/img/capeletti.jpg";
import gnocchi from "../../public/assets/img/nhoque.jpg";
import bruschetta from "../../public/assets/img/bruschetta.jpg";
import carpaccio from "../../public/assets/img/carpaccio.jpg";
import paella from "../../public/assets/img/paella.jpg";
import ebiScharf from "../../public/assets/img/ebi-spicy.jpg";
import aligot from "../../public/assets/img/aligot.jpg";
import fileMignon from "../../public/assets/img/file-mignon.jpg";
import tafelSpitz from "../../public/assets/img/picanha.png";
import bifeAncho from "../../public/assets/img/bife-ancho.jpg";
import tomahwankSteak from "../../public/assets/img/tomahawk-steak.jpg";
import primeRib from "../../public/assets/img/prime-rib.jpg";
import tiramisu from "../../public/assets/img/tiramisu.jpg";
import cheesecake from "../../public/assets/img/cheesecake.jpg";
import banoffee from "../../public/assets/img/banoffee.png";
import milFolhas from "../../public/assets/img/mil-folhas.jpg";
import pudding from "../../public/assets/img/pudim.jpg";
import bier from "../../public/assets/img/cerveja.jpg";
import kuhlschrank from "../../public/assets/img/refrigerante.jpg";
import saft from "../../public/assets/img/suco.jpg";
import whiskey from "../../public/assets/img/whiskey.jpg";
import wasser from "../../public/assets/img/agua.jpg";
import kaiserSalat from "../../public/assets/img/salada-ceasar.jpg";
import CapreseSalat from "../../public/assets/img/salada-caprese.jpg";
import WaldorfSalat from "../../public/assets/img/salada-waldorf.jpg";
import grieschischerSalat from "../../public/assets/img/salada-grega.jpg";
import NicoiseSalat from "../../public/assets/img/salada-nicoise.jpg";

/**
 * @typedef {Object} Produkt
 * @property {number} id
 * @property {string} name
 * @property {string} kategorie
 * @property {number} preis
 * @property {string} beschreibung
 * @property {any} bild - imported image module (Next.js Image compatible)
 */

/**
 * Product catalog for the menu application.
 * @type {Produkt[]}
 */
export const produkte = [
  {
    id: 1,
    name: "Spaghetti",
    kategorie: "Pasta",
    preis: 12.0,
    beschreibung:
      "Eine köstliche Spaghetti, die mit verschiedenen Saucen, wie Bolognese, Carbonara, Knoblauch, Öl und Pesto, da kombiniert werden kann",
    bild: spaghetti,
  },
  {
    id: 2,
    name: "Lasagne",
    kategorie: "Pasta",
    preis: 18.0,
    beschreibung:
      "Eine wunderbare Lasagne mit verschiedenen Füllungen wie Hackfleisch, Hühnchen, Schinken und Käse, Gemüse und weißer oder roter Soße",
    bild: lasagne,
  },
  {
    id: 3,
    name: "Ravioli",
    kategorie: "Pasta",
    preis: 22.25,
    beschreibung:
      "Ein Pasta gefüllt mit verschiedenen Zutaten wie Käse, Fleisch, Spinat oder Pilzen",
    bild: ravioli,
  },
  {
    id: 4,
    name: "Capeletti",
    kategorie: "Pasta",
    preis: 25.5,
    beschreibung:
      "Eine einfache Pasta, serviert mit verschiedenen Saucen wie Bolognese, Carbonara, Alfredo, Pesto oder Butter und Salbei",
    bild: capeletti,
  },
  {
    id: 5,
    name: "Gnocchi",
    kategorie: "Pasta",
    preis: 8.99,
    beschreibung:
      "Nudeln aus Weizenmehl und Eiern, serviert mit einfachen oder raffinierten Saucen wie Butter und Parmesan, Hähnchen- oder Garnelencreme, Knoblauch und Öl",
    bild: gnocchi,
  },
  {
    id: 6,
    name: "Bruschetta",
    kategorie: "Vorspeise",
    preis: 9.2,
    beschreibung:
      "Originalgericht aus Italien, zubereitet aus gerösteten italienischen Brotscheiben, gehackten Tomaten, Knoblauch, Basilikum und Olivenöl",
    bild: bruschetta,
  },
  {
    id: 7,
    name: "Carpaccio",
    kategorie: "Vorspeise",
    preis: 32.0,
    beschreibung:
      "Gericht französischen Ursprungs, das dünne Scheiben rohen Lachs, Kapern, geriebenen Parmesan und Senfsauce enthält",
    bild: carpaccio,
  },
  {
    id: 8,
    name: "Paella",
    kategorie: "Vorspeise",
    preis: 65.0,
    beschreibung:
      "Ein typisches Gericht aus Ostspanien, das Reis und Meeresfrüchte wie Schalentiere, Tintenfisch, Garnelen, Muscheln und Tintenfisch umfasst",
    bild: paella,
  },
  {
    id: 9,
    name: "Ebi Spicy",
    kategorie: "Vorspeise",
    preis: 62.0,
    beschreibung:
      "Typisches Gericht aus Japan mit in Tempurateig panierten Garnelen, Mayonnaise und scharfer Sauce",
    bild: ebiScharf,
  },
  {
    id: 10,
    name: "Aligot",
    kategorie: "Vorspeise",
    preis: 18.99,
    beschreibung:
      "Ein unwiderstehliches französisches Kartoffelpüree mit Gruyere-Käse und Halbpüree",
    bild: aligot,
  },
  {
    id: 11,
    name: "Filet Mignon",
    kategorie: "Fleisch",
    preis: 41.99,
    beschreibung:
      "Dieses Fleisch ist fett- und ballaststoffarm, sehr zart und passt gut zu verschiedenen Saucen.",
    bild: fileMignon,
  },
  {
    id: 12,
    name: "Brasilianisch Tafelpitz",
    kategorie: "Fleisch",
    preis: 35.99,
    beschreibung:
      "Ein ausgezeichnetes Fleisch mit einer Fettschicht und großzügigen Fasern, die den Geschmack und die Zartheit des Stücks verstärken",
    bild: tafelSpitz,
  },
  {
    id: 13,
    name: "Ancho Fleisch",
    kategorie: "Fleisch",
    preis: 39.99,
    beschreibung:
      "Ein Fleisch mit hervorragender Marmorierung und feinem Geschmack, das sowohl auf dem Grill als auch in der Pfanne gegart werden kann",
    bild: bifeAncho,
  },
  {
    id: 14,
    name: "Tomahawk Steak",
    kategorie: "Fleisch",
    preis: 159.99,
    beschreibung:
      "Dieses Fleisch kombiniert zwei verschiedene Texturen und Geschmacksrichtungen in einem Stück und kann auf dem Grill oder im Ofen zubereitet werden",
    bild: tomahwankSteak,
  },
  {
    id: 15,
    name: "Prime Rib",
    kategorie: "Fleisch",
    preis: 59.99,
    beschreibung:
      "Vorderteil der Rinderbrust, sehr saftig und geschmackvoll, kann auf dem Grill oder im Ofen zubereitet werden",
    bild: primeRib,
  },
  {
    id: 16,
    name: "Tiramisu",
    kategorie: "Naschspeisen",
    preis: 15.99,
    beschreibung:
      "Italienisches Dessert, das Biskuitkuchen, Kaffee, Mascarpone-Käse, Eier, Zucker und Kakaopulver enthält",
    bild: tiramisu,
  },
  {
    id: 17,
    name: "Cheesecake",
    kategorie: "Naschspeisen",
    preis: 8.99,
    beschreibung:
      "Typisches Dessert aus den Vereinigten Staaten, das Kuchen, Frischkäse und Fruchtsirup enthält",
    bild: cheesecake,
  },
  {
    id: 18,
    name: "Banoffee",
    kategorie: "Naschspeisen",
    preis: 9.99,
    beschreibung:
      "Ein englisches Dessert, hergestellt aus zerbröseltem Butterkeks, einer Schicht aus Dulce de Leche, geschnittenen Bananen und Schlagsahne",
    bild: banoffee,
  },
  {
    id: 19,
    name: "Mille-Feuille",
    kategorie: "Naschspeisen",
    preis: 9.99,
    beschreibung:
      "Französisches Dessert, hergestellt mit knusprigem Blätterteig und einer cremigen Füllung aus Vanille, Schokolade oder Früchten und Puderzucker",
    bild: milFolhas,
  },
  {
    id: 20,
    name: "Pudding",
    kategorie: "Naschspeisen",
    preis: 5.99,
    beschreibung:
      "Ein sehr beliebtes, cremiges und kaltes Dessert aus Brasilien, hergestellt aus Kondensmilch, Milch und Eiern",
    bild: pudding,
  },
  {
    id: 21,
    name: "Craft Bier",
    kategorie: "Getränken",
    preis: 12.99,
    beschreibung:
      "Handwerklich gebrautes Bier aus Deutschland, das edle Zutaten wie Malz, Hopfen, Wasser und Hefe enthält",
    bild: bier,
  },
  {
    id: 22,
    name: "Getränke",
    kategorie: "Getränken",
    preis: 7.99,
    beschreibung:
      "Ein erfrischendes Cola-Getränk mit kleinen Zitronenstücken und Minzraspeln",
    bild: kuhlschrank,
  },
  {
    id: 23,
    name: "Saft",
    kategorie: "Getränken",
    preis: 6.99,
    beschreibung:
      "Der reinste Saft aus frischen holländischen Orangen, leicht gesüßt",
    bild: saft,
  },
  {
    id: 24,
    name: "Whiskey",
    kategorie: "Getränken",
    preis: 17.99,
    beschreibung:
      "Ein kräftiger Bourbon-Whiskey, gereift in verkohlten Fässern aus weißer Eiche",
    bild: whiskey,
  },
  {
    id: 25,
    name: "Wasser",
    kategorie: "Getränken",
    preis: 4.99,
    beschreibung: "Mit sizilianischer Zitrone aromatisiertes Mineralwasser",
    bild: wasser,
  },
  {
    id: 26,
    name: "KaiserSalat",
    kategorie: "Salat",
    preis: 19.8,
    beschreibung:
      "Salat zubereitet mit Römersalat, Croutons, Parmesan und Ceasar-Dressing",
    bild: kaiserSalat,
  },
  {
    id: 27,
    name: "CapreseSalat",
    kategorie: "Salat",
    preis: 22.0,
    beschreibung:
      "Ein italienischer Salat, zubereitet mit frischem Mozzarella, Tomaten und Basilikum, gewürzt mit Salz und Olivenöl",
    bild: CapreseSalat,
  },
  {
    id: 28,
    name: "Waldorf Salat",
    kategorie: "Salat",
    preis: 40.0,
    beschreibung:
      "1893 im Waldorf Hotel kreiert, enthält dieser Salat Apfelscheiben und Sellerie, gehackte Walnüsse und Mayonnaise",
    bild: WaldorfSalat,
  },
  {
    id: 29,
    name: "Griechischer Salat",
    kategorie: "Salat",
    preis: 13.99,
    beschreibung:
      "Die Originalversion des Salats, bestehend aus Tomaten, Gurken, Paprika, roten Zwiebeln, Pfeffer, Oregano, Olivenöl und Feta-Käse",
    bild: grieschischerSalat,
  },
  {
    id: 30,
    name: "Niçoise Salat",
    kategorie: "Salat",
    preis: 22.99,
    beschreibung:
      "Traditioneller Salat aus der Stadt Nizza, zubereitet mit Tomaten, gekochten Eiern, Niçoise-Oliven, Olivenöl und Thunfisch",
    bild: NicoiseSalat,
  },
];
