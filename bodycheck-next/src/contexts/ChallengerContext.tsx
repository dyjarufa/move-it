import {
  createContext, useState, ReactNode, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

interface ChallengesProviderProps{
  /* ReactNode aceita qualquer elemento filho como children (componente, texto, html) */
  children: ReactNode;
  level: number;
  challengesComplete: number;
  currentExperience: number;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface challengesContextData {
  level: number;
  currentExperience:number
  challengesComplete: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;

}
export const ChallengerContext = createContext({} as challengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesComplete, setChallengesComplete] = useState(rest.challengesComplete ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesComplete', String(challengesComplete));
  }, [level, currentExperience, challengesComplete]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallenger = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallenger];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesComplete(challengesComplete + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengerContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesComplete,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,

      }}
    >
      {children}
    </ChallengerContext.Provider>
  );
}
