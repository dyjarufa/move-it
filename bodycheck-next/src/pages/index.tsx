import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompleteChallenge } from '../components/CompleteChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengerContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps{
  level: number;
  challengesComplete: number;
  currentExperience: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      challengesComplete={props.challengesComplete}
      currentExperience={props.currentExperience}
    >
      <div className={styles.container}>
        <Head>
          {' '}
          {/* consigo definir o head importando do next */}
          <title>Start | bodycheck</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenge />
              <CountDown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, challengesComplete, currentExperience } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      challengesComplete: Number(challengesComplete),
      currentExperience: Number(currentExperience),
    },
  };
};
