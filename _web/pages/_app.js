import '../styles/globals.css'
import AppHeader from '../components/partials/AppHeader'
import AppFooter from '../components/partials/AppFooter'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-true-gray-800 flex flex-col">
      <AppHeader />
      <main className="flex-grow flex items-center px-10">
        <Component {...pageProps} />
      </main>
      <AppFooter />
    </div>
  )
}

export default MyApp
