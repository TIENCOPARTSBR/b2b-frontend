import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                  rel="stylesheet"/>
            <link rel="icon" href="./favicon.png" sizes="any"/>
            <title>B2B - Encoparts</title>
        </Head>
        <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}