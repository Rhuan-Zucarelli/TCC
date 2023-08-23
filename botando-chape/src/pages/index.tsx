import { signIn, signOut, useSession } from "next-auth/react";
import Main from "./components/layout/Main/Main";
import Login from "./components/layout/Login/Login";



export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>

      {sessionData ? <Main /> : <Login />}
    </>
  );
}
