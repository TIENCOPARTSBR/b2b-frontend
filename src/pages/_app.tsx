// pages/_app.tsx
import React, { useEffect, useState } from "react";
import { Providers } from '@/providers/Provider';
import GlobalStyle from '../app/globalStyle';
import { AppProps } from 'next/app';

import { Router, useRouter } from "next/router";
import Loader from "@/components/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  // Qualquer lógica global que você queira aplicar à sua aplicação pode ser feita aqui.
  const router = useRouter()
  const [loader, setLoader] = useState(false);
  
  // Use o hook `useEffect()` para ativar o loader quando a página for carregada
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoader(true)
    });

    router.events.on("routeChangeComplete", () => {
      setLoader(false)
    });
  }, []);

  return (
    <Providers>
        {loader && (
          <Loader></Loader>
        )}
        <GlobalStyle/>
        <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp;