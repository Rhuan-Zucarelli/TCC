import { signIn, signOut, useSession } from "next-auth/react";
import Login from "next/components/layout/login/Login";
import Head from "next/head";
import Link from "next/link";
import { api } from "next/utils/api";


export default function Home() {

  return (
    <>
      <Login />
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
        </p>
        <AuthShowcase />
      </div>


    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();



  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
