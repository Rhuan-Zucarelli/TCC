import React from 'react';

export default function Login() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-green-600 to-black">
      <div className="flex max-w-3xl items-center rounded-3xl bg-gray-100 p-5 shadow-lg">
        <div className="mb-12 px-8 md:w-1/2 md:px-16">
          <h2 className="text-5xl font-bold text-green-800">Login</h2>

          <div className="mt-10 grid grid-cols-3 items-center text-green-600">
            <hr className="border-green-600" />
            <p className="text-center">Logar:</p>
            <hr className="border-green-600" />
          </div>

          <button className="mt-5 flex w-full items-center justify-center rounded-xl border bg-white py-2 text-sm text-green-600 duration-300 hover:scale-105">
            <img
              src="imgs/google.png"
              alt="Logo do Google"
              className="mr-2 h-6 w-6"
            />
            Com o Google
          </button>

          <div className="mt-6 grid grid-cols-3 items-center text-green-600">
            <div className="col-span-1"></div>
            <p className="col-span-1 text-center text-sm">OU</p>
          </div>

          <button className="mt-5 flex w-full items-center justify-center rounded-xl border bg-white py-2 text-sm text-green-600 duration-300 hover:scale-105">
            <img
              src="imgs/discord.png"
              alt="Logo do Discord"
              className="mr-2 h-6 w-6"
            />
            Com o Discord
          </button>

          <hr className="my-4 border-green-600" />

          <p className="mt-4 text-base text-green-800">
            Controle seus Nutrientes, <br />
            Alcance sua Forma!
          </p>
        </div>

        <div className="hidden w-1/2 md:block">
          <img className="rounded-3xl" src="imgs/login.png" />
        </div>
      </div>
    </section>
  );
}
