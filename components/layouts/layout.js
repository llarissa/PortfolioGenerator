import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'Der Portfolio Generator' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel="stylesheet" href="../static/css/style.css" />
      <link href="https://fonts.googleapis.com/css?family=Raleway:300" rel="stylesheet"/>
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link>         
      </nav>
    </header>

    { children }

    <footer>
    </footer>
  </div>
)
