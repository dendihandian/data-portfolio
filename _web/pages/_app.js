import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="wrapper">
      <header></header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </div>
  )
}

export default MyApp
