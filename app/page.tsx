"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/2SellHeader";
import Footer from "@/components/Footer/Footer";
import TwoSellFooter from "@/components/Footer/2SellFooter";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />

      <img className="absolute min-w-[700px] top-[80vh] right-[15vw] md:max-w-[80vw] md:right-[10vw]" src="/images/responsive-mock.png"></img>

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

        <section className="mt-[90vh] flex flex-col gap-10 md:mt-[140vh] md:flex-row md:justify-between">
          <article className="flex flex-col gap-10">
            <div className="font-monserrat max-w-[490px]"> 
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">Crie sua loja com facilidade.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">Nosso Site permite que você crie sua loja de e-commerce minimalista, de maneira rápida e intuitiva, sem necessidade de programação.</p>
            </div>

            <div className="font-monserrat max-w-[490px]">
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">Personalize do seu jeito.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">Com uma variedade de personalizações, você pode moldar sua loja para se adequar ao seu estilo e às necessidades do seu negócio.</p>
            </div>

            <div className="font-monserrat max-w-[490px]">
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">Flexibilidade e segurança garantidas.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">Armazene seus dados de forma segura e conte com a flexibilidade de integrar ferramentas e serviços adicionais para expandir seu e-commerce.</p>
            </div>
          </article>
         
          <article className="flex flex-col justify-center items-center gap-4 md:mr-[10vw]">
            <div className="bg-green-100 h-[180px] w-[180px] rounded-lg flex justify-center items-center border border-green-300 mt-[30vh] cursor-pointer transition text-green-500 hover:bg-green-50 hover:text-green-400 hover:border-2 md:mt-0 dark:bg-zinc-800 dark:border-zinc-700" onClick={() => router.push("/create")}>
              <i className="bi bi-cash-coin text-[100px] relative top-[10px]"></i>
            </div>

            <span className="text-[40px] font-bold text-zinc-800 dark:text-zinc-50">2Sell</span>
  
            <div className="flex flex-col gap1">
              <span className="text-[18px] text-zinc-500 font-medium text-center dark:text-zinc-400">70% de desconto</span>

              <button className="text-xl text-green-500 font-medium transition hover:text-green-400" onClick={() => router.push("/create")}>Criar meu site agora</button>
            </div>
          </article>
        </section>

        

        <TwoSellFooter />
      </main>
    </>
  );
}
