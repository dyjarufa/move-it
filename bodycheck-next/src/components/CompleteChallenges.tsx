import { useContext } from 'react';
import styles from '../styles/components/CompleteChallenges.module.css';

import { ChallengerContext } from '../contexts/ChallengerContext';

export function CompleteChallenge() {
  const { challengesComplete } = useContext(ChallengerContext);
  return (
    <div className={styles.completeChallengeContainer}>
      <span> Desafios completos</span>
      <span>{challengesComplete}</span>
    </div>
  );
}
