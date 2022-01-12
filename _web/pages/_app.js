import '../styles/globals.css'
import AppHeader from '../components/partials/AppHeader'
import AppFooter from '../components/partials/AppFooter'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800">
      <AppHeader />

      <div className="flex justify-center w-full px-10 py-4 text-white">
        <p>Unfortunately, the API exceeds the Heroku free-tier plan and all the prediction pages cannot be used. But you can see the <a className="underline" href="https://github.com/dendihandian/data-portfolio" target="_blank" rel="noreferrer">github repository</a> instead about how I built the API and Web UI.</p>
      </div> 

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
