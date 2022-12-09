import Head from "next/head";
import React from "react";

export default function PageHead() {
  return (
    <Head>
      <title>SmartDesk GUI</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />

      <link rel="manifest" href="/manifest.json" />
      <link
        href="/pwa-icons/favicon.png"
        rel="favicon"
        type="image/png"
        sizes="16x16"
      />
      <meta name="theme-color" content="#212433" />
    </Head>
  );
}
