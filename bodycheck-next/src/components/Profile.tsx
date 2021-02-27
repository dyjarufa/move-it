import { useContext } from 'react';
import styles from '../styles/components/Profile.module.css';

import { ChallengerContext } from '../contexts/ChallengerContext';

export function Profile() {
  const { level } = useContext(ChallengerContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/dyjarufa.png" alt="Jady Rufino" />
      <div>
        <strong> Jady Rufino</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          {level}
        </p>
      </div>
    </div>
  );
}
