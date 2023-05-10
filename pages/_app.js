import "@/styles/globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zalien</title>
        <meta name="description" content="Zalien homepage" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
