import {Html, Head, Main, NextScript} from 'next/document';
import {ColorSchemeScript, mantineHtmlProps} from '@mantine/core';

export default function Document() {
  return (
    <Html lang='ru' {...mantineHtmlProps}>
      <Head>
        <link
          rel='icon'
          type='image/png'
          href='/favicon/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon/favicon.svg' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <ColorSchemeScript defaultColorScheme='light' />
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
