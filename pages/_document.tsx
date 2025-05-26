import {Html, Head, Main, NextScript} from 'next/document';
import {ColorSchemeScript, mantineHtmlProps} from '@mantine/core';

export default function Document() {
  return (
    <Html lang='ru' {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme='light' />
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
