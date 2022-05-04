// @ts-nocheck
import { Provider } from "next-auth/client";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import "./styles.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";
import { Session } from "next-auth";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../tools/theme";
import Layout, { IRenderOptions } from "../components/layout";
import SwiperCore, { Virtual } from "swiper";

interface IPageProps {
  session: Session;
  renderLayout?: IRenderOptions;
}
interface IProps {
  Component: React.FC<any>;
  pageProps: IPageProps;
}
// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: IProps) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  SwiperCore.use([Virtual]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;
  const { renderLayout } = pageProps;

  function getLibrary(provider) {
    return new Web3(provider)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <Provider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          options={{
            // Client Max Age controls how often the useSession in the client should
            // contact the server to sync the session state. Value in seconds.
            // e.g.
            // * 0  - Disabled (always use cache value)
            // * 60 - Sync session state with server if it's older than 60 seconds
            clientMaxAge: 0,
            // Keep Alive tells windows / tabs that are signed in to keep sending
            // a keep alive request (which extends the current session expiry) to
            // prevent sessions in open windows from expiring. Value in seconds.
            //
            // Note: If a session has expired when keep alive is triggered, all open
            // windows / tabs will be updated to reflect the user is signed out.
            keepAlive: 0,
          }}
          session={session}
        >
          <Layout renderOptions={renderLayout}>
            {(!session && <AccessDenied />) || <Component {...pageProps} />}
          </Layout>
        </Provider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}
