import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { HighlightInit } from "@highlight-run/next/client";

import "~/styles/globals.css";
import "~/styles/swiper-styles.css"
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <HighlightInit
        projectId={"4d7q7qeo"}
        serviceName="my-nextjs-frontend"
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />
      <SessionProvider session={session}>
        <Head>
          <title>Pageturner</title>
          <meta
            name="description"
            content="Transforme cada página em uma jornada com Pageturner"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
