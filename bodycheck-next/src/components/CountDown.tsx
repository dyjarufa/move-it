import { useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
  const [time, setTime] = useState(25 * 60); /* 25 min * 60 sec */

  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60); /* pegar o minuto cheio */
  const seconds = time % 60;

  // padStart(2, 0) se o minutes não tiver dois caracteres (ex: 5) eu insiro o valor 0 à esquerda
  const [minuteLef, minuteRight] = String(minutes).padStart(2, '0').split('');// splite retorna array
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActive(true);
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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

      <button
        className={styles.countDownButton}
        type="button"
        onClick={startCountDown}
      >
        Iniciar um ciclo
      </button>
    </>
  );
}
