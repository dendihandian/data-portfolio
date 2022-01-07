import Head from 'next/head'
import Link from 'next/link'

const portfolios = [
  {
    'name': 'Bank Marketing',
    'desc': 'Predicting the bank customer response whether they will buy the campaign product or not.',
    'page_path': '/bank-marketing',
    'notebook_url': 'https://github.com/dendihandian/data-portfolio/blob/master/bank-marketing/bank-marketing.ipynb'
  },
  {
    'name': 'Trending Youtube Video Statistics',
    'desc': 'Predicting the views count of a youtube video.',
    'page_path': '/youtube-views',
    'notebook_url': 'https://github.com/dendihandian/data-portfolio/blob/master/youtube-views/youtube-views.ipynb'
  },
]


export default function Home() {
  return (
    <div className="w-full text-center content">
      <Head>
        <title>DataPortfolio API</title>
        <meta name="description" content="A curated list of Dendi Handian's exploratory data analysis and machine learning modeling on various datasets. Machine learning model deployed using FastAPI and simple UI using NextJS." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="flex flex-col w-full h-32 border border-white rounded">
            <div className="px-4 py-3 leading-none text-left">
              <h3 className="font-medium text-teal-500">{portfolio.name}</h3>
            </div>
            <div className="flex-grow px-4">
              <p className="text-sm leading-none text-left text-white">{portfolio.desc}</p>
            </div>
            <div className="flex justify-center px-3 py-3 md:justify-end">
              <a className="px-2 py-1 mr-2 text-xs text-white bg-green-500 rounded" href={portfolio.notebook_url} target="_blank" rel="noreferrer">Open The Notebook</a>
              <Link href={portfolio.page_path}>
                <a className="px-2 py-1 text-xs text-white bg-teal-500 rounded">Go To The Page</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
