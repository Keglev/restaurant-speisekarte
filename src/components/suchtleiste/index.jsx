import Image from 'next/image'

import styles from "./suchtleiste.module.css";
import Lupe from '../../../public/assets/lupa.png';
import PropTypes from 'prop-types'

/**
 * SuchtLeiste - search input component
 *
 * @param {{ textSuchtGetippt: string, griffSucht: (text:string)=>void }} props
 */
const SuchtLeiste = ({ textSuchtGetippt, griffSucht }) => {
  return (
    <div className={styles.container}>
      <Image className={styles.icon} src={Lupe} alt="icon"/>
      <input
        type="text"
        value={textSuchtGetippt}
        onChange={(event) => griffSucht(event.target.value)}
        placeholder="Suchen Sie hier nach einem der Gerichte auf unserer Speisekarte"
      />
    </div>
  );
};

SuchtLeiste.propTypes = {
  textSuchtGetippt: PropTypes.string,
  griffSucht: PropTypes.func.isRequired,
}

export default SuchtLeiste;
 
/**
 * Enterprise maintenance notes:
 * - This component is intentionally minimal: it exposes the current search text and a
 *   change handler. Keep debounce/throttling in the parent container or use a
 *   shared hook for consistency across the app.
 * - Accessibility: the input uses placeholder text. Consider adding a visually-hidden
 *   label if screen-reader clarity is needed for enterprise audits.
 * - Styling decisions are kept in the module CSS to ensure no global leakage.
 */

// Decorative icon - small and non-interactive

// Controlled input - value comes from parent to keep this component stateless