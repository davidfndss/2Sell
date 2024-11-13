'use client';

import Footer from "@/components/Footer/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GradientBox from "@/components/GradientBox/GradientBox";
import ScrollButton from "@/components/Buttons/ScrollButton";
import ExampleCard from "@/components/Card/ExampleCard";
import { getCookie } from "typescript-cookie";
import { ThemeSwitchBtn } from "@/components/Buttons/ThemeToggleBtn/ThemeSwitchBtn";
import Logo from "@/components/Logo/Logo";

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

  const [useTopHeader] = useState(true);
  const [topHeaderText] = useState("30% de desconto para novos usuários")
  const [useGradientBox] = useState(true);
  const [gradientBoxText] = useState(["Até 70% de desconto", "Promoção de verão"])
  const [tags] = useState<string[]>(["Populares","Exclusivos","Rentáveis","Imperdíveis"]);
  const [mainColor] = useState<Color>(color);
  const [atk, setAtk] = useState<string | undefined>()

  const router = useRouter()

  useEffect(() => {
    setAtk(getCookie("atk"))
  }, [])


  return (
    <>
      <header className="w-screen fixed flex flex-col justify-between items-center bg-white z-10 dark:bg-black">
            {
              useTopHeader == true
                ? (
                  <article className={`bg-${mainColor}-800 w-full h-[5vh] max-h-[35px] flex justify-center items-center text-white tracking-tight text-sm`}>
                      <div className="flex justify-center items-center w-[80vw] px-2 sm:justify-between max-w-[1000px]">
                          <nav className={`hidden cursor-pointer transition hover:text-${mainColor}-500 sm:block`}>
                          Suporte
                          </nav>
                          <nav className="text-center">
                          {topHeaderText}
                          </nav>
                          <nav className={`hidden cursor-pointer transition hover:text-${mainColor}-500 sm:block`}>
                          Avaliar <i className="bi bi-chevron-down"></i>
                          </nav>
                      </div>
                  </article>
                )
                : null
            }

            <article className="w-full max-h-[80px] flex justify-center items-center bg-white dark:bg-zinc-900">
                <div className="w-[80vw] h-[10vh] max-h-[80px] flex justify-between items-center max-w-[1000px] mr-[15px] px-2">

                    <div className="w-[20vw] max-w-[200px]">
                        <Logo pageName={name} color={mainColor} icon={icon} />
                    </div>

                    <div className="flex w-[35vw] max-w-[300px]">
                        <input
                            type="text"
                            className="w-full rounded-full rounded-tr-none rounded-br-none p-1 pl-5 bg-zinc-100 dark:bg-zinc-800"
                        ></input>
                        <button className="rounded-full rounded-tl-none rounded-bl-none pointer p-1 px-2 bg-zinc-100 dark:bg-zinc-800">
                            <i className="bi bi-search mr-[4px]"></i>
                        </button>
                    </div>

                    <div className="flex gap-3 text-lg gap-[3vw] items-center w-[20vw] max-w-[200px] justify-end">
                        <ThemeSwitchBtn color={mainColor} />
                    </div>
                </div>
            </article>
        </header>

      <main className="mt-[115px] w-[80vw] m-auto flex flex-col max-w-[1000px]">
        
        <article className="mt-[35px] w-full m-auto flex flex-col max-w-[1000px] px-1">
            
            {
              useGradientBox == true
                ? (
                  <GradientBox color={mainColor} text1={gradientBoxText[0]} text2={gradientBoxText[1]} />
                ) : null
            }
            

            <div className="w-full max-w-[1000px] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
              <div className="w-full max-w-[80vw] h-full m-auto flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
                    <div className="flex gap-2">
                        {tags.map((tag, index) => (
                          <button key={index} className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[mainColor].hover}`}>
                            {tag}
                          </button>
                        ))}
                    </div>
                </div>
                

              <button className="py-1 px-2 rounded-full border-2 border-zinc-300 text-zinc-400 flex hidden transition hover:bg-black hover:text-white hover:border-black md:block">
                <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </article>

        <h1 className="w-full m-auto mt-[20px] font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>

        <section className="w-full m-auto mt-[20px] grid grid-cols-2 gap-[1vw] justify-center items-center md:grid-cols-3 lg:grid-cols-4">
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"dunk"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"guitar"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"car"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"pc"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"dunk"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"guitar"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"car"} />
          <ExampleCard mainColor={mainColor} pageName={name} icon={icon} exampleImgName={"pc"} />
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