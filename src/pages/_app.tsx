import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import {Providers} from "@/src/providers/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
  )
}
