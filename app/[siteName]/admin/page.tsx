"use client"
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import GradientBox from "@/components/GradientBox/GradientBox";
import Header from "@/components/Header/Header";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "typescript-cookie";
import TwoSellHeader from "@/components/Header/2SellHeader";
import CTAButton from "@/components/Buttons/CTAButton";
import { useRouter } from "next/navigation";

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

const HomePageAdmin = () => {
  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{
    name: string, 
    color: Color, 
    icon: string,
    products: {
      id: string,
      name: string,
      price: number,
      imageUrl: string[],
      description: string,
      createdAt: Date
    }[], 
    useTopHeader: boolean, 
    ownerId: string,
    owner: {
      contactNumber: number
    },
    useGradientBox: boolean, 
    useTags: boolean, 
    tags: string[], 
    topHeaderText: string, 
    gradientBoxText: string[]
  }>();

  const router = useRouter()

  const atk = getCookie("atk");

  useEffect(() => {
    if (atk) getSite();
  }, []);

  if (!atk) return (
    <>
       <TwoSellHeader />
        <section className="mt-[20vh] w-[80vw] m-auto flex flex-col items-center">
          <h1 className="text-2xl text-zinc-300 tracking-tight font-medium">Você precisa ter permissão de um administrador para acessar esse site...</h1>
          <CTAButton content={"Fazer login"} route={"/signin"} />
        </section>
    </>
  )

  const decodedToken = jwt.decode(atk)

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
        router.push("/404")
      } else {
        console.error("Error is not 'Error' type");
      }
    }
  };

  if (siteResponse && decodedToken && typeof decodedToken === "object" && "id" in decodedToken) {
    return (
      siteResponse.ownerId === decodedToken.id ? (
        <>
          <Header pageName={siteResponse.name} mainColor={siteResponse.color} icon={siteResponse.icon} useTopHeader={siteResponse.useTopHeader} topHeaderText={siteResponse.topHeaderText} />
          <main className="mt-[115px] w-[80vw] m-auto flex flex-col max-w-[1000px]">
            {siteResponse.useGradientBox && (
              <GradientBox color={siteResponse.color} text1={siteResponse.gradientBoxText[0]} text2={siteResponse.gradientBoxText[1]} />
            )}
            {siteResponse.useTags && (
              <div className="w-full max-w-[80vw] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
                <div className="flex gap-2">
                  {siteResponse.tags.map((tag, index) => (
                    <button className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[siteResponse.color].hover}`} key={index}>
                      {tag}
                    </button>
                  ))}
                </div>
                <button className="py-1 px-3 rounded-full border-2 border-zinc-300 text-zinc-400 flex transition hover:bg-black hover:text-white hover:border-black">
                  ordenar <i className="bi bi-chevron-down ml-1"></i>
                </button>
              </div>
            )}
            <h1 className="w-full m-auto mt-[20px] font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>
            {siteResponse.products?.length ? (
              <>
                <section className="w-full m-auto mt-[20px] grid grid-cols-2 gap-[1vw] justify-center items-center md:grid-cols-3 lg:grid-cols-4">
                  {siteResponse.products.map((product) => (
                    <Card key={product.id} itemId={product.id} name={product.name} mainColor={siteResponse.color} pageName={siteResponse.name} price={product.price} icon={siteResponse.icon} createdAt={product.createdAt} imageUrl={product.imageUrl} />
                  ))}
                </section>
                <button className={`h-[7vh] w-full flex justify-center items-center gap-1 text-sm ${colorClasses[siteResponse.color].text} transition hover:text-${siteResponse.color}-400 mt-[1vh] lg:text-[16px]`}>
                  <i className="bi bi-chevron-down"></i>
                  <span>Mais produtos</span>
                </button>
              </>
            ) : (
              <article className="flex justify-center items-center gap-2 font-medium text-lg py-[20vh] tracking-tight">
                <i className={`bi bi-bag-plus text-6xl text-${siteResponse.color}-500`}></i>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-600 dark:text-zinc-300">Você ainda não adicionou nenhum produto...</h2>
                  <button className={`${colorClasses[siteResponse.color].text} cursor-pointer transition text-2xl`} onClick={() => router.push(`/${siteResponse.name}/admin/add-product`)}>Adicionar o primeiro</button>
                </div>
              </article>
            )}
          <button className={`${colorClasses[siteResponse.color].bg} w-[60px] h-[60px] rounded-full fixed bottom-[30px] right-[30px] text-3xl text-white transition cursor-pointer ${colorClasses[siteResponse.color].hover}`} onClick={() => router.push(`/${siteResponse.name}/admin/add-product`)}><i className="bi bi-bag-plus"></i></button>
          </main>
        
          <Footer pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} contactNumber={siteResponse.owner.contactNumber} />
        </>
      ) : (
        <>
          <TwoSellHeader />
          <section className="mt-[20vh] w-[80vw] m-auto flex flex-col items-center">
            <h1 className="text-2xl text-zinc-300 tracking-tight font-medium">Você precisa ter permissão de um administrador para acessar esse site...</h1>
            <CTAButton content={"Fazer login"} route={"/signin"} />
          </section>
        </>
      )
    );
  } else {
    return <LoadingScreen />;
  }
};

export default HomePageAdmin;