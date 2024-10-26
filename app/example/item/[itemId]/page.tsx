"use client";

import Header from "@/components/Header/Header";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ScrollButton from "@/components/Buttons/ScrollButton";
import Footer from "@/components/Footer/Footer";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const isValidColor = (color: string | null): color is Color => {
  return ["green", "blue", "purple", "red", "orange", "yellow"].includes(
    color || ""
  );
};

export default function ItemPage() {
  const { itemId } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const color = searchParams.get("color");
  const icon = searchParams.get("icon");

  const [mainColor, setMainColor] = useState<Color>(
    isValidColor(color) ? color : "green"
  );

  const router = useRouter()

  return (
    <>
      <Header pageName={name} icon={icon} mainColor={mainColor} />
      <main className="mt-[115px] w-[80vw] m-auto mb-[20vh] max-w-[1000px]">
        <section className="w-full h-[60vw] bg-zinc-100 rounded flex justify-between items-end lg:h-[30vw] dark:bg-zinc-800 dark:border dark:border-zinc-700">
          <img
            src="/images/dunk.png"
            className="object-cover w-[90%] h-[90%] m-auto max-w-[600px]"
          ></img>

          <button className="h-[60vw] w-[10%] absolute left-[10vw] lg:h-[30vw]">
            <i className="bi bi-chevron-left text-xl"></i>
          </button>

          <button className="w-[10%] mb-1 absolute right-[45%] left-[45%]">
            <i className="bi bi-three-dots text-xl"></i>
          </button>

          <button className="h-[60vw] w-[10%] absolute right-[10vw] lg:h-[30vw]">
            <i className="bi bi-chevron-right text-xl"></i>
          </button>
        </section>
        <article className="flex items-start justify-between">
          <div className="w-[80%]">
            <h1 className="text-2xl font-medium tracking-tight mt-1">
              Item 1 {itemId}
            </h1>
            <h1
              className={`text-2xl tracking-tight text-${mainColor}-500 mt-1`}
            >
              R$ 2.000
            </h1>
          </div>

          <div className="w-[20%] text-xl flex gap-2 justify-end mt-2 pr-1">
            <i
              className={`bi bi-heart cursor-pointer hover:text-${mainColor}-500 transition`}
            ></i>
            <i
              className={`bi bi-share cursor-pointer hover:text-${mainColor}-500 transition`}
            ></i>
          </div>
        </article>

        <p className="text-zinc-600 font-antom mt-2">
          Originalmente criado para as quadras, o Dunk mais tarde foi para as
          ruas - e como se costuma dizer, o resto é história. Mais de 35 anos
          após sua estreia, a silhueta ainda oferece um estilo ousado e
          desafiador Agora, o tênis OG do basquete universitário retorna com
          camadas sobrepostas em couro premium e mainmainColor blocking
          tradicional. O conforto fica por conta da tecnologia mais atual em
          calçados, enquanto uma combinação clássica de preto e branco remete ao
          legado das quadras.
        </p>

        <div className="mt-1 flex items-center text-zinc-400 font-antom tracking-tight gap-1">
          <span className="font-montserrat">
            <i className="bi bi-geo-alt"></i>
            Brazil
          </span>
          <span className="font-montserrat">•</span>
          <span className="font-montserrat">05/09/2024</span>
        </div>

        {/* <button
          className={`w-[70vw] bg-${mainColor}-500 fixed bottom-0 h-[7vh] text-white text-2xl font-montserrat font-medium tracking-tight rounded-full flex justify-center items-center m-auto right-[15vw] left-[15vw] mb-2 transition hover:bg-black hover:text-white`}
        >
          <i className="bi bi-whatsapp mr-2"></i>
          Enviar mensagem
        </button> */}
        <ScrollButton mainColor={mainColor}  />

        <Footer pageName={name} color={mainColor} icon={icon} />

        <div className="m-auto w-[80vw] max-w-[1000px] mt-[20px] mb-[10px]">
          <button className={`bg-${mainColor}-800 text-white py-3 w-full rounded-xl transition hover:bg-black text-xl`} onClick={() => router.push("/signup") }>
            Prosseguir
          </button>
        </div>
      </main>
    </>
  );
}