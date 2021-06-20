import "../css/index.css";
import "../node_modules/gestalt/dist/gestalt.css";
import Head from "next/head";
import Layout from "@components/layout";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title> Sharek </title>
          <meta
            name="Description"
            content="A Next.js starter styled using Tailwind CSS."
          />
        </Head>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
