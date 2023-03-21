import '../styles/globals.scss';
import Layout from '../components/Layout';
import { ThemeContext } from '../context/ThemeContext';
import { LoadingContext } from '../context/LoadingContext';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContext>
            <LoadingContext>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LoadingContext>
        </ThemeContext>
    );
}

export default MyApp;
