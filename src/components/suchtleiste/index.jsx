import Image from 'next/image'

import styles from "./suchtleiste.module.css";
import Lupe from '../../../public/assets/lupa.png';

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

export default SuchtLeiste;