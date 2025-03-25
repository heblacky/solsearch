import type { AppProps } from "next/app";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import "../styles/globals.css";
import WalletContextProvider from "../components/wallet-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemeProvider attribute="class">
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </NextThemeProvider>
  );
}
