import { useContext } from 'react';
import styles from '../styles/components/LevelUpModal.module.css';

import { ChallengerContext } from '../contexts/ChallengerContext';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengerContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou o próximo nível</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
