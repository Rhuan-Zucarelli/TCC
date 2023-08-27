import React, { ReactNode } from "react";

import { HiOutlineHome } from "react-icons/Hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiForkKnifeDuotone } from "react-icons/Pi";
import { CiDumbbell } from "react-icons/Ci";
import { PiGearSixBold } from "react-icons/Pi";
import { BiExit } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { signOut } from "next-auth/react";
import Login from "../login/Login";
import Link from "next/link";

interface MainLayoutProps {
  children: ReactNode;
}

export default function Main({ children }: MainLayoutProps) {
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user.id });

  if (!sessionData) return <Login />;
  return (
    <div>
      <div className="flex h-screen flex-col">
        <div className="flex flex-1">
          <aside className="flex w-32 flex-col items-center justify-center bg-green-600">
            <nav className="mb-12">
              <button className="cursor-pointer rounded-2xl p-1 hover:bg-gray-500 hover:bg-opacity-50 focus:outline-none">
                <Link href="/">
                  <HiOutlineHome size={54} color="#fff" />
                </Link>
              </button>
            </nav>
            <nav className="mb-12">
              <button className="cursor-pointer rounded-2xl p-1 hover:bg-gray-500 hover:bg-opacity-50 focus:outline-none">
                <a href="#">
                  <PiForkKnifeDuotone size={54} color="#fff" />
                </a>
              </button>
            </nav>
            <nav className="mb-12">
              <button className="cursor-pointer rounded-2xl p-1 hover:bg-gray-500 hover:bg-opacity-50 focus:outline-none">
                <a href="#">
                  <CiDumbbell size={54} color="#fff" />
                </a>
              </button>
            </nav>
          </aside>

          <main className="flex flex-1 items-center justify-center">
            {children}
          </main>

          <aside className="flex w-32 flex-col items-center justify-center bg-green-600">
            
            <nav className="mb-6">
              <div className="flex-grow"></div>
              <a href="/" className="mb-4 mt-4">
                <img src="/imgs/LOGO.png" className="mb-4 mt-4 h-auto w-20" />
              </a>
            </nav>

            <nav className="mb-6 flex flex-grow flex-col items-center justify-end">
              <div className="flex-grow"></div>
              <button className="cursor-pointer rounded-2xl p-1 hover:bg-gray-500 hover:bg-opacity-50 focus:outline-none">
                <Link href="/configUser">
                  <PiGearSixBold size={54} color="#fff" />
                </Link>
              </button>
            </nav>

            <nav className="mb-6 ">
              <div className="flex-grow"></div>
              <button
                className="cursor-pointer rounded-2xl p-1 hover:bg-gray-500 hover:bg-opacity-50 focus:outline-none"
                onClick={() => signOut()}
              >
                <BiExit size={54} color="#fff" />
              </button>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
