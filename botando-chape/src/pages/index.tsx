import { signIn, signOut, useSession } from "next-auth/react";
<<<<<<< HEAD
import Login from "next/components/layout/login/Login";
=======
import Main from "./components/layout/Main/Main";
import Login from "./components/layout/Login/Login";
>>>>>>> main



export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>

    </>
  );
}
