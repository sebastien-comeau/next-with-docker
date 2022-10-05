import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

const DogsIndex = ({ breeds }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dog Breeds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dog Breeds</h1>
        <p className={styles.description}>
          Dog API:{' '}
          <a href="https://dog.ceo/dog-api/">https://dog.ceo/dog-api/</a>
        </p>
        <ul>
          {Object.keys(breeds).map((mainBreed) => (
            <React.Fragment key={mainBreed}>
              {breeds[mainBreed].length > 0 ? (
                <>
                  {breeds[mainBreed].map((subBreed) => (
                    <DogBreedListItemContent
                      key={subBreed}
                      mainBreed={mainBreed}
                      subBreed={subBreed}
                    />
                  ))}
                </>
              ) : (
                <DogBreedListItemContent mainBreed={mainBreed} />
              )}
            </React.Fragment>
          ))}
        </ul>
      </main>
    </div>
  );
};

const DogBreedListItemContent = ({ mainBreed, subBreed }) => {
  const breed = `${mainBreed} ${subBreed ?? ''}`.trim();
  return (
    <li>
      {breed} (
      <Link href={`/dogs/ssr/${breed}`}>
        <a>SSR</a>
      </Link>
      ,{' '}
      <Link href={`/dogs/isr/${breed}`}>
        <a>IRS</a>
      </Link>
      )
    </li>
  );
};

export const getStaticProps = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  if (!response.ok) return { notFound: true };
  return {
    props: {
      breeds: (await response.json()).message,
    },
  };
};

export default DogsIndex;
