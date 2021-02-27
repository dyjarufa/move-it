import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompleteChallenge } from '../components/CompleteChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        {' '}
        {/* consigo definir o head importando do next */}
        <title>Start | bodycheck</title>
      </Head>

      <ExperienceBar />

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
    </div>
  );
}
