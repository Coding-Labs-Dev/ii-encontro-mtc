import React from 'react';
import { AppProps } from 'next/app';
import Theme from 'styles/Theme';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import 'typeface-roboto';
import 'typeface-poppins';

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" href="/favicon/logo192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/logo32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/logo16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <IntlProvider locale="en">
        <Theme>
          <SnackbarProvider maxSnack={5}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </Theme>
      </IntlProvider>
    </>
  );
}

export default App;
