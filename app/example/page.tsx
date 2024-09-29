"use client"

import Logo from "@/components/Logo/Logo";
import { ThemeSwitchBtn } from "@/components/ThemeToggleBtn/ThemeSwitchBtn";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"

export default function Example() {
  const searchParams = useSearchParams()

  const name = searchParams.get("name")
  const color = searchParams.get("color")
  const icon = searchParams.get("icon")

  const [mainColor, setMainColor] = useState(color)

  return (
    <>
      <header className="min-w-screen flex flex-col justify-between items-center fixed top-0 bg-white z-10 dark:bg-black">
        <article className={`bg-${mainColor}-800 w-screen h-[5vh] max-h-[35px] flex justify-center items-center text-white tracking-tight text-sm`}>
          <div className="flex justify-center items-center w-[80vw] sm:justify-between max-w-[1000px]">
            <nav className={`hidden cursor-pointer transition hover:text-${mainColor}-500 sm:block`}>
              Suporte
            </nav>
            <nav className="text-center">
              30% de desconto para novos usuários{" "}
            </nav>
            <nav className={`hidden cursor-pointer transition hover:text-${mainColor}-500 sm:block`}>
              Brasil <i className="bi bi-chevron-down"></i>
            </nav>
          </div>
        </article>

        <article className="w-screen h-[10vh] max-h-[80px] flex justify-between items-center bg-white dark:bg-zinc-900">
          <div className="w-[80vw] h-[10vh] max-h-[80px] m-auto flex justify-between items-center max-w-[1000px]">
            <Logo pageName={name} color={color} icon={icon} />

            <div className="flex w-[35vw]">
              <input
                type="text"
                className="w-full rounded-full rounded-tr-none rounded-br-none p-1 pl-5 bg-zinc-100"
              ></input>
              <button className="rounded-full rounded-tl-none rounded-bl-none pointer p-1 px-2 bg-zinc-100">
                <i className="bi bi-search mr-[4px]"></i>
              </button>
            </div>

            <div className="flex gap-3 text-lg gap-[3vw] items-center">
              <nav className="font-antom flex items-center cursor-pointer">
                <i className={`bi bi-cart-fill text-2xl transition hover:text-${mainColor}-500`}></i>
                <i className={`bi bi-circle-fill text-[9px] text-${mainColor}-400 relative right-[7px] bottom-[9px]`}></i>
              </nav>
              <nav className="font-antom flex items-center cursor-pointer">
                <i className="bi bi-person-fill text-2xl transition hover:text-${mainColor}-500"></i>
              </nav>
              <ThemeSwitchBtn />
            </div>
          </div>
        </article>
      </header>

      <main className="mt-[115px] w-[80vw] m-auto flex flex-col max-w-[1000px]">
        <article className={`bg-${mainColor}-500 w-full h-[200px] m-auto rounded-xl flex transition md:bg-diagonalSquare`}>
          <div className="w-[100%] h-full flex flex-col justify-center text-white p-4 text-2xl font-montserrat lg:w-[50%]">
            <h3>Até</h3>
            <h3 className="font-bold lg:text-3xl">70% de desconto</h3>
            <button className={`w-[200px] text-lg rounded-full bg-white text-${mainColor}-600 font-bold mt-2 py-1 transition hover:bg-zinc-900 hover:text-white`}>
              Comprar agora
            </button>
          </div>
          <div className="w-[0%] h-full flex justify-end items-end text-white p-4 px-6 text-2xl font-montserrat font-bold lg:w-[50%]">
            <div className="items-center justify-center gap-1 hidden lg:flex">
              <h3 className="lg:text-2xl">Promoção de verão</h3>
            </div>
          </div>
        </article>

        <div className="w-full max-w-[80vw] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
          <div className="flex gap-2">
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition hover:bg-${mainColor}-500 hover:text-white`}>
              Roupas
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition hover:bg-${mainColor}-500 hover:text-white`}>
              Hobbies
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition hover:bg-${mainColor}-500 hover:text-white`}>
              Tecnologia
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full hidden transition hover:bg-${mainColor}-500 hover:text-white sm:block`}>
              Carros
            </button>
          </div>

          <button className="py-1 px-3 rounded-full border-2 border-zinc-300 text-zinc-400 flex transition hover:bg-black hover:text-white hover:border-black">
            ordenar <i className="bi bi-chevron-down ml-1"></i>
          </button>
        </div>

        <h1 className="w-full m-auto mt-[20px] font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>

        <section className="w-full m-auto mt-[20px] grid grid-cols-2 gap-[1vw] justify-center items-center md:grid-cols-3 lg:grid-cols-4">
          <div className="w-full item max-w-[200px]">
            <div className="relative border rounded-md bg-zinc-100 h-[39vw] w-[39vw] flex flex-col justify-between cursor-pointer md:h-[26vw] md:w-[26vw] lg:h-[19vw] lg:w-[19vw] max-w-[190px]">
              <img src="assets/img/dunk.png" className="w-[90%] h-[90%] object-cover rounded-md m-auto" />

              <div className="absolute top-0 w-full flex justify-end p-2">
                <i className="bi bi-heart-fill text-black"></i>
              </div>

              <div className="absolute bottom-0 w-full flex justify-start">
                <span className={`text-${mainColor}-500 mb-1 bg-opacity-75 px-2 rounded`}>200 R$</span>
              </div>
            </div>

            <span className="font-montserrat font-medium mt-1 block">Item 1</span>

            <div className="mt-1 flex items-center gap-1">
              <span className="font-montserrat text-sm">
                <i className="bi bi-geo-alt"></i>
                Brazil
              </span>
              <span className="font-montserrat text-sm">•</span>
              <span className="font-montserrat text-sm">hoje, 14:04</span>
            </div>
          </div>
        </section>

        <button className={`h-[7vh] w-full flex justify-center items-center gap-1 text-sm text-${mainColor}-500 transition hover:text-${mainColor}-400 mt-[1vh] lg:text-[16px]`}>
          <i className="bi bi-chevron-down"></i>
          <span>Mais produtos</span>
        </button>
      </main>

      <footer className="w-[80vw] h-[20vh] max-h-[160px] mr-[10vw] ml-[10vw] text-xl flex flex-col justify-evenly mt-[1vh]">
        <div>
          <Logo pageName={name} color={color} icon={icon} />
        </div>

        <div>
          <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">Entre em contato</span>
          <div className={`flex gap-2 text-${mainColor}-500 text-[14px] font-medium`}>
            <a href="https://api.whatsapp.com/send/?phone=61985391185&text&type=phone_number&app_absent=0&text=Olá" target="_blank" className={`cursor-pointer transition hover:text-${mainColor}-400`}>Whatsapp</a>
            <a href="https://github.com/davidfndss" target="_blank" className={`cursor-pointer transition hover:text-${mainColor}-400`}>Github</a>
            <a href="https://linkedin.com/in/davidfndss" target="_blank" className={`cursor-pointer transition hover:text-${mainColor}-400`}>Linkedin</a>
          </div>
        </div>

        <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">© Techmafia 2024</span>
      </footer>
    </>
  );
}
