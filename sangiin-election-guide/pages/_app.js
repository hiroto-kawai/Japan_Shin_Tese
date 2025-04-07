import { Global, css } from '@emotion/react';
import Head from 'next/head';

// グローバルスタイル
const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    line-height: 1.6;
  }

  a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s;
  }

  a:hover {
    color: #2980b9;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  button, .button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  button:hover, .button:hover {
    background-color: #2980b9;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>参議院選挙ガイド | 新社会人のための政治ガイド</title>
        <meta name="description" content="参議院選挙の争点と各政党の立場を分かりやすく解説。新社会人が政治参加するための情報サイト。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 