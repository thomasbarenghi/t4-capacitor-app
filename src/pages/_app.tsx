import "@/styles/globals.css";
import type { AppProps } from "next/app";
// @ts-ignore
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App, View } from "framework7-react";
import { useRouter } from "next/router";
//import "framework7/css/bundle/rtl";
import "framework7/css/bundle";
import "framework7-icons/css/framework7-icons.css";
import "material-icons/iconfont/material-icons.css";

Framework7.use(Framework7React);

const routes = [
  {
    path: "/",
    asyncComponent: () => import("./index"),
  },
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`;

  return (
    <App url={url} routes={routes}>
      {/*
        Create main View.
        Apparently we need to enable browserHistory to navigating by URL
      */}
      <View
        main
        browserHistory
        browserHistorySeparator=""
        browserHistoryInitialMatch={true}
        browserHistoryStoreHistory={false}
        url="/"
      >
        {/*
          Initial page components (returned by Next.js).
          Here it is mandatory to set `initialPage` prop on it.
        */}
        <Component initialPage {...pageProps} />
      </View>
    </App>
  );
}
