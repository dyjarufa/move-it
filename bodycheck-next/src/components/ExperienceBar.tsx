import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';
import { ChallengerContext } from '../contexts/ChallengerContext';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengerContext);

  const percentToNextlevel = Math.floor(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextlevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextlevel}%` }}>
          {currentExperience}
          {' '}
          xp
        </span>
      </div>
      <span>
        {experienceToNextLevel}
        {' '}
        xp
      </span>
    </header>
  );
}
