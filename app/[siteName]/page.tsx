"use client"; 

import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import GradientBox from "@/components/GradientBox/GradientBox";
import Header from "@/components/Header/Header";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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

const HomePage = () => {
  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{name: string, color: Color, icon: string}>();

  useEffect(() => {
    getSite();
  }, []);

  const getSite = async () => {
    try {
      const response = await fetch(`/api/sites/${siteName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const siteResponse = await response.json();
      setSiteResponse(siteResponse);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Error is not 'Error' type");
      }
    }
  };

  if (siteResponse) {
    return (
      <>
        <Header pageName={siteResponse.name} mainColor={siteResponse.color} icon={siteResponse.icon} />
        
        <main className="mt-[115px] w-[80vw] m-auto flex flex-col max-w-[1000px]">
          <GradientBox color={siteResponse.color} />

          <div className="w-full max-w-[80vw] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
            <div className="flex gap-2">
              <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[siteResponse.color].hover}`}>
                Roupas
              </button>
              <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[siteResponse.color].hover}`}>
                Hobbies
              </button>
              <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[siteResponse.color].hover}`}>
                Tecnologia
              </button>
              <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full hidden transition ${colorClasses[siteResponse.color].hover} sm:block`}>
                Carros
              </button>
            </div>

            <button className="py-1 px-3 rounded-full border-2 border-zinc-300 text-zinc-400 flex transition hover:bg-black hover:text-white hover:border-black">
              ordenar <i className="bi bi-chevron-down ml-1"></i>
            </button>
          </div>

          <h1 className="w-full m-auto mt-[20px] font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>

          <section className="w-full m-auto mt-[20px] grid grid-cols-2 gap-[1vw] justify-center items-center md:grid-cols-3 lg:grid-cols-4">
            <Card itemId={"1"} mainColor={siteResponse.color} pageName={siteResponse.name} icon={siteResponse.icon} />
            <Card itemId={"2"} mainColor={siteResponse.color} pageName={siteResponse.name} icon={siteResponse.icon} />
            <Card itemId={"3"} mainColor={siteResponse.color} pageName={siteResponse.name} icon={siteResponse.icon} />
            <Card itemId={"4"} mainColor={siteResponse.color} pageName={siteResponse.name} icon={siteResponse.icon} />
          </section>

          <button className={`h-[7vh] w-full flex justify-center items-center gap-1 text-sm ${colorClasses[siteResponse.color].text} transition hover:text-${siteResponse.color}-400 mt-[1vh] lg:text-[16px]`}>
            <i className="bi bi-chevron-down"></i>
            <span>Mais produtos</span>
          </button>
        </main>

        <Footer pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} />
      </>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
};

export default HomePage;