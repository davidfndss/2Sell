"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/2SellHeader";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />

      <main className="w-[80vw] h-full m-auto">
        <section className="flex flex-col w-full">
          <h1 className="font-monserrat text-zinc-700 font-[600] tracking-tight text-4xl mt-[20vh] dark:text-green-500">
            Seu e-comerce em alguns cliques.
          </h1>
          <h2 className="font-monserrat text-zinc-400 font-[600] tracking-tight text-2xl mt-[3vh] max-w-[420px]">
            2Sell é a melhor ferramenta para criação de e-comerces minimalistas
            de maneira rápida e fácil
          </h2>
          <button
            className="bg-green-500 py-2 px-6 rounded text-white mt-[20px] text-[20px] max-w-[250px] cursor-pointer transition hover:bg-green-400"
            onClick={() => router.push("/create")}
          >
            Criar meu site
          </button>
          <Link
            href="/example"
            className="text-green-500 mt-[15px] text-[18px] font-[500] tracking-tight cursor-pointer transition hover:text-green-400"
          >
            Como contribuir
          </Link>
        </section>
      </main>
    </>
  );
}
