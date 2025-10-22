import styles from "./kategorien.module.css";
import Image from 'next/image'
import icon1 from "../../../public/assets/entrada.png";
import icon2 from "../../../public/assets/massa.png";
import icon3 from "../../../public/assets/carne.png";
import icon4 from "../../../public/assets/bebidas.png";
import icon5 from "../../../public/assets/salada.png";
import icon6 from "../../../public/assets/sobremesa.png";
import PropTypes from 'prop-types'

/**
 * Kategorien - category selector component
 *
 * Enterprise maintenance notes:
 * - This component is a pure UI control. Keep the selected state and filter logic
 *   in the parent container so unit tests can focus on behavior without DOM.
 * - Category keys are used as canonical filter tokens. If display labels change,
 *   keep the tokens (e.g. "Getränken" vs "Getränke") consistent in data and tests.
 * - When adding categories, add icons to /public/assets and import them here to ensure
 *   Next.js bundles them correctly.
 *
 * @param {{ griffFilter: (kategorie:string)=>void, knopftGetippt: string }} props
 */
const Kategorien = ({ griffFilter, knopftGetippt }) => {
  return (
    <section className={styles.section_kategorien}>
      <div className={styles.container_knopf}>
        {/* Each button uses the canonical category token for filtering */}
        <button className={knopftGetippt === "Vorspeise" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Vorspeise")}>
          <Image className={styles.icon} src={icon1} alt="icon" />Vorspeise
        </button>

        <button className={knopftGetippt === "Pasta" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Pasta")}>
          <Image className={styles.icon} src={icon2} alt="icon" />Pasta
        </button>

        <button className={knopftGetippt === "Fleisch" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Fleisch")}>
          <Image className={styles.icon} src={icon3} alt="icon" />Fleisch
        </button>

        <button className={knopftGetippt === "Getränken" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Getränken")}>
          <Image className={styles.icon} src={icon4} alt="icon" />Getränke
        </button>

        <button className={knopftGetippt === "Salat" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Salat")}>
          <Image className={styles.icon} src={icon5} alt="icon" />Salat
        </button>

        <button className={knopftGetippt === "Naschspeisen" ? styles.anlichtKnpf : styles.auslichtKnpf}
          onClick={() => griffFilter("Naschspeisen")}>
          <Image className={styles.icon} src={icon6} alt="icon" />Nachtisch
        </button>
      </div>
    </section>
  );
};
Kategorien.propTypes = {
  griffFilter: PropTypes.func.isRequired,
  knopftGetippt: PropTypes.string,
}

export default Kategorien;