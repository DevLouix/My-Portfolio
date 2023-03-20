import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import HomePage from '../components/views/HomePage';
import Script from 'next/script';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dev Louix</title>
                <meta name="description" content="The Enthusiastic Developer DevLouix" />
                <link rel="icon" href="/favicon.svg" />
                <Script
                    type="text/javascript"
                    src="../../context/main.js"
                    strategy="beforeInteractive"
                />
            </Head>
            <HomePage />
        </div>
    );
}
