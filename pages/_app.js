import '../styles/globals.scss'
import Layout from '../components/Layout'
import { ThemeContext} from '../context/ThemeContext'

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContext>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeContext>
    )
}

export default MyApp
