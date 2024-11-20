"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/Buttons/CTAButton";
import TwoSellHeader from "@/components/Header/2SellHeader";
import { getCookie } from "typescript-cookie";
import { useParams, useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import Logo from "@/components/Logo/Logo";
import FileDragAndDropArea from "@/components/FileDragAndDropArea/FileDragAndDropArea";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { supabase } from '../../../../utils/supabaseClient';
import { formatPrice } from "@/utils/minor-functions";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
}

export default function AddProduct() {

  const [productData, setProductData] = useState<Product>({
    name: "Exemplo",
    description: "...",
    price: 0,
    imageUrl: ["/images/dunk.png"]
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{
    id: string;
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
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
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
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      return updatedFiles.slice(0, 4); 
    });
  };

  const uploadImagesAndGetUrls = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
        const { data, error } = await supabase.storage
            .from("product-images")
            .upload(`${siteName}/${Date.now()}_${file.name}`, file);

        if (error) throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);

        try {
          const getUrl = await supabase
            .storage
            .from("product-images")
            .getPublicUrl(data.path);

          console.log(getUrl)
          urls.push(getUrl.data.publicUrl);
        } catch (err) {
          console.error(err)
        }
        
    }
    console.log(urls)
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const imageUrls = await uploadImagesAndGetUrls(files);
        console.log(imageUrls)
        const productToSubmit = {
            ...productData,
            siteId: siteResponse?.id,
            imageUrl: imageUrls, 
        };

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToSubmit),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        router.push(`/${siteName}/admin`);
    } catch (err) {
        console.error(err)
        console.error('Erro ao criar produto:', 
            err instanceof Error ? err.message : err
        );
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      inputRef.current?.focus();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag();
    }
  };

  if (siteResponse && ownerId === siteResponse.ownerId) {
    return (
      <>
        <div className="flex-col w-full hidden justify-center items-center gap-2 py-4 lg:flex">
            <Logo pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} lg={true} path={`/${siteName}/admin`} />   
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-2 py-4 lg:hidden">
            <Logo pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} path={`/${siteName}/admin`} />   
        </div>

        <main className="w-[80vw] h-full m-auto flex items-center justify-center gap-2 max-w-[1000px]">

          <form className="flex flex-col gap-3 w-full mt-[20px] justify-center items-center lg:mt-0 px-4 pb-6 lg:flex-row lg:items-start" onSubmit={handleSubmit}>

            <section className="flex flex-col gap-3 w-full max-w-[400px] lg:ml-[100px] lg:mt-0 px-4 pb-6">
              <div className="flex justify-center text-xl gap-2 tracking-tight lg:justify-start lg:text-2xl">
                <i className={`bi bi-bag-plus text-${siteResponse.color}-500`}></i>
                <span className="font-medium">Adicionar produto</span>
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

              { siteResponse.useTags === true && (
                  <div className="flex flex-col items-start gap-2 w-full">

                    <div className="flex flex-col gap-2">
                      <label htmlFor="tags" className="w-[80px]">Tags:</label>
                      <div className="flex">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Digite aqui a tag"
                          className={`px-2 py-1 rounded rounded-r-none dark:bg-zinc-900 transition focus:ring-${siteResponse.color}-500 focus:ring-2 focus:outline-none`}
                          onKeyDown={handleKeyDown}
                        />
                        <button onClick={addTag} className={`bg-${siteResponse.color}-500 rounded-l-none text-white px-4 py-2 rounded-lg transition hover:bg-${siteResponse.color}-400`} type="button">Adicionar</button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 w-full mt-[8px]">
                      {tags.map((tag, index) => (
                        <div key={index} className="flex gap-2 justify-center items-center rounded-full border border-zinc-600 px-2 py-1 transition focus:bg-${mainColor}-500">
                          <span className="text-sm">{tag}</span>
                          <button onClick={() => removeTag(tag)} className={`text-${siteResponse.color}-500`} type="button"><i className="bi bi-x-circle"></i></button>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                )}

              <div className="mt-[10px]">
                <FileDragAndDropArea onFilesAdded={handleFilesAdded} />
              </div>

            </section>
            
            <section className="max-w-[400px] border-2 border-zinc-200 rounded-lg overflow-hidden pb-2 mb-[10vh] lg:max-w-[500px] dark:border-zinc-600">
              <div className="w-full bg-zinc-200 text-center text-sm py-1 dark:bg-zinc-600">
                Exemplo
              </div>

                <article className="w-full max-w-[400px] h-[450px] bg-zinc-100 rounded flex justify-center items-center lg:max-w-[500px] dark:bg-zinc-800 dark:border dark:border-zinc-700">
                  <button className="py-[30%] max-h-[450px] w-[10%]" onClick={prevImage} type="button">
                    <i className="bi bi-chevron-left text-xl"></i>
                  </button>

                  <img
                    src={files[currentImageIndex] ? URL.createObjectURL(files[currentImageIndex]) : "/images/dunk.png"}
                    className="w-[350p] h-[350px] m-auto object-cover lg:w-[400px] lg:h-[400px]" 
                    alt="Product Image"
                    onError={() => setProductData({ ...productData, imageUrl: ["/images/fallback-img.png"] })}
                  />
                  
                  <button className="py-[30%] max-h-[450px] w-[10%]" onClick={nextImage} type="button">
                    <i className="bi bi-chevron-right text-xl"></i>
                  </button>
                </article>
                
                <div className="flex justify-center mt-2">
                  {files.slice(0, 4).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

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

                <p className="text-zinc-600 font-antom mt-2 px-2 break-words w-full h-full dark:text-zinc-300">
                  {productData.description}
                </p>

                <div className="mt-1 flex items-center text-zinc-400 font-antom tracking-tight gap-1 px-2">
                  <span className="font-montserrat">
                    <i className="bi bi-geo-alt"></i>
                     Brasil
                  </span>
                  <span className="font-montserrat">•</span>
                  <span className="font-montserrat">XX/XX/2024</span>
                </div>
                  
                <div className="m-2">
                  <button className={`py-3 font-bold text-white text-xl mt-[10px] w-full rounded bg-${siteResponse.color}-500 transition hover:bg-${siteResponse.color}-400`} type="submit">Finalizar <i className="bi bi-check-circle"></i></button>
                </div>
                
            </section>
            
          </form>


        </main>
      </>
    );
  } else {
    return <LoadingScreen />
  }
  
}