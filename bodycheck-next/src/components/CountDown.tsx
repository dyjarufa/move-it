import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

import { CountdownContext } from '../contexts/CountdownContext';

export function CountDown() {
  const {
    minutes, seconds, isActive, hasFinished, startCountDown, resetCountDown,
  } = useContext(CountdownContext);

  // padStart(2, 0) se o minutes não tiver dois caracteres (ex: 5) eu insiro o valor 0 à esquerda
  const [minuteLef, minuteRight] = String(minutes).padStart(2, '0').split(''); // splite retorna array
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
