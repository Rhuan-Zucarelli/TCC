import React, { ReactNode } from "react";

import { HiOutlineHome } from "react-icons/Hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiDumbbell } from "react-icons/Ci";
import { PiGearSixBold } from "react-icons/Pi";
import { BiExit } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { api } from "next/utils/api"
import { signOut } from 'next-auth/react';
import Login from "../login/Login";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainLayoutProps {
  children: ReactNode;
}

export default function Main({ children }: MainLayoutProps) {
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user.id })
  const router = useRouter()
  const logOut = async () => {
    await router.push('/')
    signOut()
  }

  if (!sessionData) return <Login />
  return (
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <aside className="w-32 bg-green-600 flex flex-col justify-center items-center">
            <nav className="mb-12">
              <button className="cursor-pointer focus:outline-none hover:bg-green-700 hover:bg-opacity-50 rounded-2xl p-1 hover:scale-110 ">
                <Link href="/">
                  <HiOutlineHome size={54} color="#fff" />
                </Link>
              </button>
            </nav>
            <nav className="mb-12">
              <button className="cursor-pointer focus:outline-none hover:bg-green-700 hover:bg-opacity-50 rounded-2xl p-1 hover:scale-110 ">
                <Link href="/food">
                  <IoFastFoodOutline size={54} color="#fff" />
                </Link>
              </button>
            </nav>
            <nav className="mb-12">
              <button className="cursor-pointer focus:outline-none hover:bg-green-700 hover:bg-opacity-50 rounded-2xl p-1 hover:scale-110 ">
                <Link href="/training">
                  <CiDumbbell size={54} color="#fff" />
                </Link>
              </button>
            </nav>
          </aside>

          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>

          <aside className="w-32 bg-green-600 flex flex-col justify-center items-center">

            <nav className="mb-6">
              <div className="flex-grow"></div>
              <Link href="/" className="mb-4 mt-4">
                <img src="/imgs/LOGO.png" className="mb-4 mt-4 h-auto w-20" />
              </Link>
            </nav>

            <nav className="mb-12 flex-grow flex flex-col justify-end items-center">
              <div className="flex-grow"></div>
              <img src="" className="w-32 h-auto mb-4" />
              <button className="cursor-pointer focus:outline-none hover:bg-green-700 hover:bg-opacity-50 rounded-2xl p-1 hover:scale-110 ">
                <Link href="/configUser">
                  <PiGearSixBold size={54} color="#fff" />
                </Link>
              </button>
            </nav>

            <nav className="mb-12 ">
              <div className="flex-grow"></div>
              <button
                className="cursor-pointer focus:outline-none hover:bg-green-700 hover:bg-opacity-50 rounded-2xl p-1 hover:scale-110 "
                onClick={() => logOut()}>
                <BiExit size={54} color="#fff" />
              </button>
            </nav>
          </aside>
        </div>
      </div>
  );
}
