import React from "react";

import { HiHome } from "react-icons/Hi";
import { PiForkKnifeDuotone } from "react-icons/Pi";
import { GiJumpingRope } from "react-icons/Gi";
import { IoMdSettings } from "react-icons/Io";

//import Logo from "../../../public/imgs/LOGO.png";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <aside className="w-1/6 bg-green-600 flex flex-col justify-center items-center">
          <nav className="mb-12">
            <a href="#">
              <HiHome size={54} color="#fff" />
            </a>
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
          Botando Chape - Rhuan e Murilo <br></br>
        </main>

        <aside className="w-1/6 bg-green-600 flex flex-col justify-center items-center">
          <nav className="mb-12 flex-grow flex flex-col justify-end items-center">
            <div className="flex-grow"></div>
            <img src="imgs/LOGO.png" className="w-32 h-auto mb-4" />
            <a href="#">
              <IoMdSettings size={67} color="#707070" />
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
}
