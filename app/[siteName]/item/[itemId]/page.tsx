"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import ShareBtn from "@/components/Buttons/ShareBtn/ShareBtn";
import Header from "@/components/Header/Header";
import { Product, Site } from "@/app/types";
import { formatPrice } from "@/utils/minor-functions";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";

export default function ItemPage() {
  const { itemId, siteName } = useParams();

  const [ product, setProduct ] = useState<Product>()
  const [ site, setSite] = useState<Site>()
  const router = useRouter()

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/products/${itemId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const productResponse = await response.json();
      setProduct(productResponse);
    } catch (err: unknown) {
      router.push("/404")
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Error is not 'Error' type");
      }
    }
  };

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
      setSite(siteResponse)
    } catch (err: unknown) {
      router.push("/404")
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Error is not 'Error' type");
      }
    }
  };

  useEffect(() => {
    getProduct()
    getSite()
  }, [])

  if (site && product) {
    return (
      <>
        <Header pageName={site.name} icon={site.icon} mainColor={site.color} useTopHeader={true} topHeaderText="30% de desconto para novos usuários" />
        <main className="mt-[115px] w-[80vw] m-auto mb-[10vh] max-w-[1000px]">
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
                {product.name}
              </h1>
              <h1
                className={`text-2xl tracking-tight text-${site.color}-500 mt-1`}
              >
                R$ {formatPrice(product.price.toString())}
              </h1>
            </div>
  
            <div className="w-[20%] text-xl flex gap-4 justify-end mt-2 pr-1">
              <i
                className={`bi bi-heart cursor-pointer hover:text-${site.color}-500 transition`}
              ></i>
              <ShareBtn url={`/${siteName}/item/${itemId}`} mainColor={site.color}/>
            </div>
          </article>
  
          <p className="text-zinc-600 font-antom mt-2">
            {product.description}
          </p>
  
          <div className="mt-3 flex items-center text-zinc-500 font-antom tracking-tight gap-1">
            <span className="font-montserrat text-sm">
              <i className={`bi bi-geo-alt-fill text-${site.color}-500 mr-[2px]`}></i> 
              {site.name.toUpperCase()}
            </span>
            <span className="font-montserrat text-sm">•</span>
            <span className="font-montserrat text-sm">
            {new Date(product.createdAt).toDateString() === new Date().toDateString()
            ? "Hoje"
            : new Date(product.createdAt).toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
            ? "Ontem"
            : new Date(product.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
            </span>
          </div>
  
          <a
            className={`w-[80vw] bg-${site.color}-500 bottom-0 h-[7vh] text-white text-2xl font-montserrat font-medium tracking-tight rounded-lg flex justify-center items-center m-auto mt-14 mb-2 transition hover:bg-black hover:text-white max-w-[1000px]`} href={`https://api.whatsapp.com/send/?phone=${site.owner.contactNumber}&text&type=phone_number&app_absent=0&text=Olá%2C%20tenho%20interesseno%20item%20${site.name}`} target="_blank"
          >
            <i className="bi bi-whatsapp mr-2"></i>
            Enviar mensagem
          </a>
        </main>
  
        <div>
          <Footer color={site.color} pageName={site.name} icon={site.icon} contactNumber={site.owner.contactNumber} />
        </div>
      </>
    );
  } else {
    return <LoadingScreen />
  }
}