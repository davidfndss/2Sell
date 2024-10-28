"use client";

import { useEffect, useState } from "react";
import CTAButton from "@/components/Buttons/CTAButton";
import TwoSellHeader from "@/components/Header/2SellHeader";
import { getCookie } from "typescript-cookie";
import { useParams, useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import Header from "@/components/Header/Header";
import Logo from "@/components/Logo/Logo";
import FileDragAndDropArea from "@/components/FileDragAndDropArea/FileDragAndDropArea";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

interface Product {
  name: String;
  description: String;
  price: number;
  imageUrl: String[];
}

export default function AddProduct() {

  const [productData, setProductData] = useState<Product>({
    name: "Exemplo",
    description: "...",
    price: 0,
    imageUrl: ["/images/dunk.png"]
  })

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{
    name: string, 
    color: Color, 
    icon: string,
    products: {
      id: string,
      name: string,
      price: number,
      description: string 
    }[], 
    useTopHeader: boolean, 
    ownerId: string,
    useGradientBox: boolean, 
    useTags: boolean, 
    tags: string[], 
    topHeaderText: string, 
    gradientBoxText: string[]
  }>();
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter()

  useEffect(() => {
    if (atk) getSite();
  }, []);

  const atk = getCookie("atk");

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
  const ownerId = (decodedToken as JwtPayload)?.id ?? '';

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

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const formatPrice = (value: string) => {
    if (!value) return 'R$ 0,00';
    const numero = Number(value.replace(',', '.'));
    return `R$ ${numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  if (siteResponse && ownerId === siteResponse.ownerId) {
    return (
      <>
        <div className="flex flex-col w-full justify-center items-center gap-2 py-4">
            <Logo pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} lg={true} path={`${siteName}/admin`} />   
        </div>
        <main className="w-[80vw] h-full m-auto flex flex-col items-center justify-center gap-2 max-w-[1000px] lg:flex-row lg:items-start">

          <form className="flex flex-col gap-3 w-full max-w-[400px] lg:mt-0 px-4 pb-6">
            <div className="flex gap-2 tracking-tight">
              <i className={`bi bi-bag-plus text-${siteResponse.color}-500 text-2xl`}></i>
              <span className="text-2xl font-medium">Adicionar produto</span>
            </div>
            <div className="flex justify-center items-start flex-col mt-2">
                <label htmlFor="name" className="w-[80px]">Nome:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  onChange={handleProductChange} 
                  required 
                  className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-${siteResponse.color}-500 focus:outline-none focus:ring-2 transition mt-2`} 
                />
            </div>
            <div className="flex justify-center items-start mt-6 flex-col">
                <label htmlFor="description" className="w-[80px]">Descrição:</label>
                <textarea 
                  id="description" 
                  name="description" 
                  onChange={handleProductChange} 
                  required 
                  className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-${siteResponse.color}-500 focus:outline-none focus:ring-2 transition mt-2`} 
                />
            </div>

            <div className="flex justify-center items-start mt-6 flex-col">
                <label htmlFor="price" className="w-[80px]">Preço:</label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  onChange={handleProductChange} 
                  required 
                  className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-${siteResponse.color}-500 focus:outline-none focus:ring-2 transition mt-2`} 
                />
            </div>

            <div className="flex justify-center items-start mt-6 flex-col">
                <label htmlFor="imageUrl" className="w-[200px]">Link da imagem: </label>
                <textarea 
                  id="imageUrl" 
                  name="imageUrl" 
                  onChange={handleProductChange} 
                  required 
                  className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-${siteResponse.color}-500 focus:outline-none focus:ring-2 transition mt-2`} 
                />
            </div>
            <span className="m-auto mt-[-8px] mb-[-8px]"> ou </span>
            <FileDragAndDropArea onFilesAdded={handleFilesAdded} />
  
          </form>

          <section className="max-w-[500px] border-2 border-zinc-200 rounded-lg overflow-hidden pb-2">
            <div className="w-full bg-zinc-200 text-center text-sm py-1">
              Exemplo
            </div>

              <article className="w-full max-w-[500px] h-[450px] bg-zinc-100 rounded flex justify-center items-center dark:bg-zinc-800 dark:border dark:border-zinc-700 p-2">
                <button className="py-[30%] max-h-[450px] w-[10%]">
                  <i className="bi bi-chevron-left text-xl"></i>
                </button>

                <img
                  src={`${productData.imageUrl[0]}`}
                  className="w-[90%] h-[90%] m-auto object-cover " 
                  alt="Product Image"
                  onError={() => setProductData({ ...productData, imageUrl: ["/images/fallback-img.png"] })}
                />
                
                <button className="py-[30%] max-h-[450px] w-[10%]">
                  <i className="bi bi-chevron-right text-xl"></i>
                </button>
              </article>
              
              <article className="flex items-start justify-between px-2">
                <div className="w-[80%]">
                  <h1 className="text-2xl font-medium tracking-tight mt-1">
                    {productData.name}
                  </h1>
                  <h1
                    className={`text-2xl tracking-tight text-${siteResponse.color}-500 mt-1`}
                  >
                    R$ {formatPrice(productData.price.toString())}
                  </h1>
                </div>

                <div className="w-[20%] text-xl flex gap-2 justify-end mt-2 pr-1">
                  <i
                    className={`bi bi-heart cursor-pointer hover:text-${siteResponse.color}-500 transition`}
                  ></i>
                  <i
                    className={`bi bi-share cursor-pointer hover:text-${siteResponse.color}-500 transition`}
                  ></i>
                </div>
              </article>

              <p className="text-zinc-600 font-antom mt-2 px-2">
                {productData.description}
              </p>

              <div className="mt-1 flex items-center text-zinc-400 font-antom tracking-tight gap-1 px-2">
                <span className="font-montserrat">
                  <i className="bi bi-geo-alt"></i>
                  Brazil
                </span>
                <span className="font-montserrat">•</span>
                <span className="font-montserrat">05/09/2024</span>
              </div>
          </section>
        </main>
      </>
    );
  } else {
    return <LoadingScreen />
  }
  
}