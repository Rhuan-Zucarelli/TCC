import { signIn, signOut, useSession } from "next-auth/react";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";



export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>

      {sessionData ? <Main /> : <Login />}
    </>
  );
}

