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