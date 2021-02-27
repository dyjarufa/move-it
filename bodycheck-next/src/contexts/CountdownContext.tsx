import {
  useContext,
  useState, useEffect, createContext, ReactNode,
} from 'react';
import { ChallengerContext } from './ChallengerContext';

interface CountdownContextData{
  minutes: number;
  seconds:number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProps{
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout; // identificar o formato do timeout

export function CountdownProvider({ children } : CountdownProps) {
  const { startNewChallenge } = useContext(ChallengerContext); /* DEPENDENCIA DE OUTRO CONTEXT */

  const [time, setTime] = useState(0.1 * 60); /* 25 min * 60 sec */

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); /* pegar o minuto cheio */
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountDown,
    }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
