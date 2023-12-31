import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "next/utils/api";
import "next/styles/globals.css";
import Main from "next/components/layout/main/Main";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
