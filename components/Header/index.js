import Head from 'next/head'

function index({title}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  )
}

export default index