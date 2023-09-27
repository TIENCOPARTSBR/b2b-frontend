// pages/_app.tsx
import React from "react";
import { Providers } from '@/providers/Provider';
import GlobalStyle from '../app/globalStyle';
import { AppProps } from 'next/app';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  // Qualquer lógica global que você queira aplicar à sua aplicação pode ser feita aqui.

  return (
    <Providers>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <GlobalStyle/>
        <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp;