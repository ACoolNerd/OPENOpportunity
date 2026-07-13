import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta name="theme-color" content="#11150e" />
        <meta name="description" content="OPENOpportunity — Mystery packs for TCG, sports cards, and collectibles. Every pack authenticated with a Digital Product Passport." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@450;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Poppins:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-[#11150e] text-[#f6f1e7]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
