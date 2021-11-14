import '../styles/globals.css'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-true-gray-900 flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <AppFooter />
    </div>
  )
}

export default MyApp
