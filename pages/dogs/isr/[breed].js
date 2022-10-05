import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.css';

const DogsIndex = ({ breed, imageSrc }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ISR Dog Breed Image: {breed}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>ISR Dog Breed Image: {breed}</h1>
        <Image src={imageSrc} width={600} height={300} />
      </main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { breed } = params;
  const [mainBreed, subBreed] = breed.split(' ');
  const fetchUrl = `https://dog.ceo/api/breed/${mainBreed}${
    typeof subBreed !== 'undefined' ? '/' + subBreed : ''
  }/images/random`;
  console.log(`Fetching dog breed ${breed} from Dog API: ${fetchUrl}`);
  const response = await fetch(fetchUrl);
  if (!response.ok) return { notFound: true };
  return {
    props: {
      breed,
      imageSrc: (await response.json()).message,
    },
    revalidate: 10, // In seconds
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default DogsIndex;
