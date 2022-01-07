import '../styles/globals.css'
import AppHeader from '../components/partials/AppHeader'
import AppFooter from '../components/partials/AppFooter'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800">
      <AppHeader />
      <main className="flex items-center flex-grow px-10">
        <Component {...pageProps} />
      </main>
      <AppFooter />

      <Script
        id="google-analytics"
        src="https://www.googletagmanager.com/gtag/js?id=G-XLJEKNT1PN"
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XLJEKNT1PN');
        }}
      />
    </div>
  )
}

export default MyApp
