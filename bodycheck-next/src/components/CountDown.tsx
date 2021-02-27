import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

import { ChallengerContext } from '../contexts/ChallengerContext';

let countDownTimeout: NodeJS.Timeout; // identificar o formato do timeout

export function CountDown() {
  const { startNewChallenge } = useContext(ChallengerContext);

  const [time, setTime] = useState(0.1 * 60); /* 25 min * 60 sec */

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); /* pegar o minuto cheio */
  const seconds = time % 60;

  // padStart(2, 0) se o minutes não tiver dois caracteres (ex: 5) eu insiro o valor 0 à esquerda
  const [minuteLef, minuteRight] = String(minutes).padStart(2, '0').split(''); // splite retorna array
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // regra quando o time chegar a zero
      // setIsActive(false);
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLef}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countDownButton}
          type="button"
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              type="button"
              onClick={resetCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              className={styles.countDownButton}
              type="button"
              onClick={startCountDown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
}
