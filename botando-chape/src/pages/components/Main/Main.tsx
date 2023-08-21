import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';


export default function Main() {
  const { data: sessionData } = useSession();

  return (
    <>
      <div>
        <button
          className="mt-3 flex w-full items-center justify-center rounded-xl border bg-white py-2 text-sm text-red-600 duration-300 hover:scale-105"
          onClick={() => signOut()}
        >
          Fazer Logout
        </button>
      </div>
    </>
  );
}