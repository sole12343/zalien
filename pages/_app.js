import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Layout from "@/components/layout/Layout";

const { chains, publicClient } = configureChains(
  [goerli], // mainnet
  [alchemyProvider({ apiKey: process.env.alchemyId }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Zalien",
  projectId: process.env.walletConnectProjectId,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "rgb(168 85 247)",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Head>
            <title>Zalien</title>
            <meta name="description" content="Zalien homepage" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
