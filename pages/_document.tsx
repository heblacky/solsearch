import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/solantics-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/solantics-favicon.svg" />
        <link rel="shortcut icon" href="/solantics-favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366F1" />
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
