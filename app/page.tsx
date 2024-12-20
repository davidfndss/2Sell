"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import TwoSellFooter from "@/components/Footer/2SellFooter";
import TwoSellLogo from "@/components/Logo/2SellLogo";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`flex items-center justify-center  bg-white z-10 fixed w-screen top-0 transition ${ isScrolled ? "dark:bg-black h-[70px] dark:shadow-[0_4px_16px_0px_rgba(0,0,0,0.5)]" : "dark:bg-[#151515] h-[80px]"}`}>
          <article className="w-[80%] h-full flex items-center justify-between max-w-[1000px] mr-[15px]">
              <TwoSellLogo />

              <div className="flex gap-4 items-center">
              
                <nav className="rounded py-2 px-6 border text-green-500 border-green-500 transition cursor-pointer hover:border-green-500 dark:border-zinc-700 dark:text-white dark:hover:text-green-500 dark:hover:border-green-500" onClick={() => router.push("signin") }>
                  Entrar
                </nav>
                <nav className="rounded py-2 px-6 border bg-green-500 text-white transition cursor-pointer  hover:bg-green-400 dark:hover:bg-green-500 dark:border-zinc-600 dark:bg-zinc-600" onClick={() => router.push("signup") }>
                  Criar conta
                </nav>
                
              </div>
          </article>
      </header>

      <img
        className="absolute min-w-[700px] top-[80vh] right-[15vw] md:max-w-[80vw] md:right-[10vw]"
        src="/images/responsive-mock-dark.png"
      ></img>


      <div className="absolute z-[-10] w-full max-w-[90vw] left-[10vw] top-[5vh] hidden dark:flex overflow-hidden">
        <img src="/images/gradient-background.png" className="min-w-[1000px] max-h-[900px] relative md:min-w-[1000px] md:max-h-[1000px] md:left-[10vw] lg:w-[1300px] lg:h-[1300px] lg:left-[35vw] z-[-11]"></img>
      </div>
     

      <main className="w-[80vw] h-full m-auto max-w-[1000px] overflow-hidden">
        <section className="flex flex-col w-full">
          <h1 className="font-monserrat text-zinc-700 font-[600] tracking-tight text-4xl mt-[20vh] dark:text-green-500 lg:text-6xl">
            Seu e-commerce em alguns cliques.
          </h1>
          <h2 className="font-monserrat text-zinc-400 font-[600] tracking-tight text-2xl mt-[3vh] max-w-[420px]">
            2Sell é a melhor ferramenta para criação de e-comerces minimalistas
            de maneira rápida e fácil
          </h2>
          <button
            className="bg-green-500 py-2 px-6 rounded text-white mt-[25px] text-[20px] max-w-[250px] cursor-pointer transition hover:bg-green-400 lg:text-2xl lg:font-medium font-montserrat tracking-tight"
            onClick={() => router.push("/create")}
          >
            Criar meu site
          </button>
          <Link
            href="/dashboard"
            className="text-green-500 mt-[15px] text-[18px] font-[500] tracking-tight cursor-pointer transition hover:text-green-400"
          >
           Acessar o painel <i className={`bi bi-lock`}></i>
          </Link>
        </section>

        <section className="mt-[90vh] flex flex-col gap-10 lg:mt-[140vh] lg:flex-row lg:justify-between">
          <article className="flex flex-col gap-10">
            <div className="font-monserrat max-w-[490px]">
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">
                Crie sua loja com facilidade.
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
                Nosso Site permite que você crie sua loja de e-commerce
                minimalista, de maneira rápida e intuitiva, sem necessidade de
                programação.
              </p>
            </div>

            <div className="font-monserrat max-w-[490px]">
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">
                Personalize do seu jeito.
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
                Com uma variedade de personalizações, você pode{" "}
                <span className="text-green-500">moldar sua loja</span> para se
                adequar ao seu estilo e às necessidades do seu negócio.
              </p>
            </div>

            <div className="font-monserrat max-w-[490px]">
              <h2 className="text-zinc-700 dark:text-zinc-100 text-[22px] font-bold md:text-2xl">
                Flexibilidade e segurança garantidas.
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
                Armazene seus dados de forma segura e conte com a flexibilidade
                de integrar ferramentas e serviços adicionais para expandir seu
                e-commerce.
              </p>
            </div>
          </article>

          <article className="flex flex-col w-full justify-center items-center gap-4 md:mr-[10vw]">
            <div
              className="bg-green-100 h-[180px] w-[180px] rounded-lg flex justify-center items-center border border-green-300 mt-[20vh] cursor-pointer transition text-green-500 hover:bg-green-50 hover:text-green-400 hover:border-2 lg:mt-0 dark:bg-zinc-800 dark:border-zinc-700"
              onClick={() => router.push("/create")}
            >
              <i className="bi bi-cash-coin text-[100px] relative top-[10px]"></i>
            </div>

            <span className="text-[40px] font-bold text-zinc-800 dark:text-zinc-50">
              2Sell
            </span>

            <div className="flex flex-col gap1">
              <span className="text-[18px] text-zinc-500 font-medium text-center dark:text-zinc-400">
                70% de desconto
              </span>

              <button
                className="text-xl text-green-500 font-medium transition hover:text-green-400"
                onClick={() => router.push("/create")}
              >
                Criar meu site agora
              </button>
            </div>
          </article>
        </section>

        <article className="mt-[20vh] flex flex-col gap-2">
          <div className="flex items-center">
            <i className="bi bi-plus text-green-500 text-3xl"></i>
            <i className="bi bi-cash-stack text-green-500 text-4xl mr-2"></i>
            <h1 className="text-4xl font-bold md:text-5xl">Venda mais</h1>
          </div>

          <p className="text-lg text-zinc-500 max-w-[600px] md:text-xl dark:text-zinc-400">
            Desde produtos pessoais até E-commerces de grande porte, 2Sell te dá
            o poder de anunciar seus produtos de maneira simples e eficaz.
          </p>
        </article>

        <article className="mt-[10vh] grid grid-col gap-10 transiton md:grid-cols-3 md:items-start">
          <div className="flex justify-center flex-col gap-2">
            <i className="bi bi-palette text-green-500 text-4xl mr-2"></i>
            <span className="text-xl">Personalize</span>
            <p className="text-lg text-zinc-500 md:text-[16px] md:leading-tight lg:text-lg lg:leading-md dark:text-zinc-400">
              Escolha as cores do seu site, assim como a logo, o domínio, e as
              formas de contato.
            </p>
          </div>
          <div className="flex justify-center flex-col gap-2">
            <i className="bi bi-pencil-square text-green-500 text-4xl mr-2"></i>
            <span className="text-xl">Edite</span>
            <p className="text-lg text-zinc-500 md:text-[16px] md:leading-tight lg:text-lg lg:leading-md dark:text-zinc-400">
              Altere seu site instantaneamente, perceba a facilidade dos seus
              clientes navegarem no seu catálogo de produtos.
            </p>
          </div>
          <div className="flex justify-center flex-col gap-2">
            <i className="bi bi-graph-up text-green-500 text-4xl mr-2"></i>
            <span className="text-xl">Otimizado para performance</span>
            <p className="text-lg text-zinc-500 md:text-[16px] md:leading-tight lg:text-lg lg:leading-md dark:text-zinc-400">
              Sites publicados pelo 2Sell são rápidos, adaptados para uso em
              celulares, e com SEO otimizado, sem ter que fazer nenhuma
              configuração.
            </p>
          </div>
        </article>

        <article className="mt-[15vh] flex flex-col gap-2 mb-[-10vh] md:items-center">
          <h1 className="text-3xl font-bold lg:text-5xl">Chegou a sua hora de vender.</h1>

          <button
            className="bg-green-500 py-2 px-6 rounded text-white mt-[10px] text-[20px] max-w-[250px] cursor-pointer transition hover:bg-green-400 lg:max-w-[300px] lg:w-full lg:text-2xl lg:mt-[20px] lg:font-bold"
            onClick={() => router.push("/create")}
          >
            Criar meu site
          </button>
        </article>

        <TwoSellFooter />
      </main>
    </>
  );
}