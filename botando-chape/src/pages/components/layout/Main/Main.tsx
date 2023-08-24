import React, { ReactNode } from "react";

import { HiHome } from "react-icons/Hi";
import { PiForkKnifeDuotone } from "react-icons/Pi";
import { GiJumpingRope } from "react-icons/Gi";
import { IoMdSettings } from "react-icons/Io";
import { useSession } from "next-auth/react";
import { api } from "next/utils/api"
import { signOut } from 'next-auth/react';
import Login from "../login/Login";
import Link from "next/link";

interface MainLayoutProps {
  children: ReactNode;
}

<<<<<<< HEAD:botando-chape/src/components/layout/main/Main.tsx
export default function Main({ children }: MainLayoutProps) {
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user.id })
=======
export default function Main() {
  // const { data: sessionData } = useSession();
  // const user = api.user.getUser.useQuery({ id: sessionData?.user.id })
>>>>>>> main:botando-chape/src/pages/components/layout/Main/Main.tsx

  if (!sessionData) return <Login />
  return (
    <div>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <aside className="w-32 bg-green-600 flex flex-col justify-center items-center">
            <nav className="mb-12">
              <Link href="/">
                <HiHome size={54} color="#fff" />
              </Link>
            </nav>
            <nav className="mb-12">
              <a href="#">
                <PiForkKnifeDuotone size={54} color="#fff" />
              </a>
            </nav>
            <nav className="mb-12">
              <a href="#">
                <GiJumpingRope size={54} color="#fff" />
              </a>
            </nav>
          </aside>

          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>

          <aside className="w-32 bg-green-600 flex flex-col justify-center items-center">
            <nav className="mb-12 flex-grow flex flex-col justify-end items-center">
              <div className="flex-grow"></div>
              <img src="" className="w-32 h-auto mb-4" />
              <Link href="/configUser">
                <IoMdSettings size={67} color="#707070" />
              </Link>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
