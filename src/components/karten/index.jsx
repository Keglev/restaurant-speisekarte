import Image from 'next/image'
import styles from "./karten.module.css";

/**
 * Karten - menu card component
 *
 * @param {{ produkt: { id:number, name:string, kategorie:string, preis:number, beschreibung:string, bild:any } }} props
 */
const Karten = ({ produkt }) => {
  return (
    <div className={styles.container}>
      <figure>
        <Image src={produkt.bild} alt={produkt.name} />
      </figure>
      <div className={styles.container_info}>
        <div>
          <h3>{produkt.name}</h3>
          <small>{produkt.kategorie}</small>
          <p>{produkt.beschreibung}</p>
        </div>
        <div>
          <span>{new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(produkt.preis)}</span>
        </div>
      </div>
    </div>
  );
};
export default Karten;