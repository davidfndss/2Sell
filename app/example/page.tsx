'use client';

import Card from "@/components/Card/ExampleCard";
import Footer from "@/components/Footer/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GradientBox from "@/components/GradientBox/GradientBox";
import ExampleHeader from "@/components/Header/ExampleHeader";
import ScrollButton from "@/components/Buttons/ScrollButton";
import ExampleCard from "@/components/Card/ExampleCard";
import { getCookie } from "typescript-cookie";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string }> = {
  green: {
    bg: 'bg-green-800',
    text: 'text-green-600',
    hover: 'hover:bg-green-500 hover:text-white'
  },
  blue: {
    bg: 'bg-blue-800',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-500 hover:text-white'
  },
  purple: {
    bg: 'bg-purple-800',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-500 hover:text-white'
  },
  red: {
    bg: 'bg-red-800',
    text: 'text-red-600',
    hover: 'hover:bg-red-500 hover:text-white'
  },
  orange: {
    bg: 'bg-orange-800',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-500 hover:text-white'
  },
  yellow: {
    bg: 'bg-yellow-800',
    text: 'text-yellow-600',
    hover: 'hover:bg-yellow-500 hover:text-white'
  },
};

export default function Example() {
  const searchParams = useSearchParams();
  
  const name = searchParams.get("name");
  const color = (searchParams.get("color") as Color) || 'green'; 
  const icon = searchParams.get("icon");

  const [mainColor, setMainColor] = useState<Color>(color);
  const [atk, setAtk] = useState<string | undefined>()

  const router = useRouter()

  useEffect(() => {
    setAtk(getCookie("atk"))
  }, [])


  return (
    <>
      <ExampleHeader pageName={name} mainColor={mainColor} icon={icon} />

      <main className="mt-[115px] w-[80vw] m-auto flex flex-col max-w-[1000px]">
        <GradientBox color={mainColor} />

        <div className="w-full max-w-[80vw] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
          <div className="flex gap-2">
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[mainColor].hover}`}>
              Roupas
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[mainColor].hover}`}>
              Hobbies
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[mainColor].hover}`}>
              Tecnologia
            </button>
            <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full hidden transition ${colorClasses[mainColor].hover} sm:block`}>
              Carros
            </button>
          </div>

          <button className="py-1 px-3 rounded-full border-2 border-zinc-300 text-zinc-400 flex transition hover:bg-black hover:text-white hover:border-black">
            ordenar <i className="bi bi-chevron-down ml-1"></i>
          </button>
        </div>

        <h1 className="w-full m-auto mt-[20px] font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>

        <section className="w-full m-auto mt-[20px] grid grid-cols-2 gap-[1vw] justify-center items-center md:grid-cols-3 lg:grid-cols-4">
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} />
        </section>

        <button className={`h-[7vh] w-full flex justify-center items-center gap-1 text-sm ${colorClasses[mainColor].text} transition hover:text-${mainColor}-400 mt-[1vh] lg:text-[16px]`}>
          <i className="bi bi-chevron-down"></i>
          <span>Mais produtos</span>
        </button>
      </main>

      <ScrollButton mainColor={mainColor} />


      <Footer pageName={name} color={mainColor} icon={icon} />


      <div className="m-auto w-[80vw] max-w-[1000px] mt-[20px] mb-[10px]">
        <button className={`${colorClasses[mainColor].bg} py-3 w-full rounded-xl transition hover:bg-black text-xl text-white`} onClick={() => router.push( atk ? `/final-steps?name=${name}&color=${mainColor}&icon=${icon}` : `/signup?name=${name}&color=${mainColor}&icon=${icon}`)}>
          Prosseguir
        </button>
      </div>
    </>
  );
}