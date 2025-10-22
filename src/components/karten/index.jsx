import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from "./karten.module.css";

/**
 * Karten - menu card component
 *
 * Enterprise maintenance note:
 * - Keep this component purely presentational. Business logic (filtering, currency rules)
 *   should live in service modules or parent containers to ease unit testing.
 * - When changing the image source, ensure the value in `produkt.bild` is compatible
 *   with Next.js Image component (remotePatterns or static import). Document any
 *   external image domains in next.config.mjs.
 *
 * @param {{ produkt: { id:number, name:string, kategorie:string, preis:number, beschreibung:string, bild:any } }} props
 */
const Karten = ({ produkt }) => {
  // NOTE: Currency formatting is explicit for the german locale. If multi-locale support
  // is required, extract formatting to a shared util and inject via props/context.
  const formattedPrice = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(produkt.preis)

  return (
    <div className={styles.container}>
      {/* Visual: product image. Keep layout simple so SSR/prerender works consistently. */}
      <figure>
        <Image src={produkt.bild} alt={produkt.name} />
      </figure>

      {/* Content area: name, category and description (left) + price (right) */}
      <div className={styles.container_info}>
        <div>
          <h3>{produkt.name}</h3>
          <small>{produkt.kategorie}</small>
          <p>{produkt.beschreibung}</p>
        </div>

        {/* Price block: kept simple for accessibility (screen readers will read the numeric value). */}
        <div>
          <span>{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
};
Karten.propTypes = {
  produkt: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    kategorie: PropTypes.string,
    preis: PropTypes.number,
    beschreibung: PropTypes.string,
    bild: PropTypes.any,
  }).isRequired,
}

export default Karten;
