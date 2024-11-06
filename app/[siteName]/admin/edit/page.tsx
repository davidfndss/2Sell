'use client';

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo/Logo";
import { getCookie } from 'typescript-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import TwoSellHeader from "@/components/Header/2SellHeader";
import GradientBox from "@/components/GradientBox/GradientBox";
import ExampleHeader from "@/components/Header/ExampleHeader";
import { ThemeSwitchBtn } from "@/components/Buttons/ThemeToggleBtn/ThemeSwitchBtn";
import ScrollButton from "@/components/Buttons/ScrollButton";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string }> = {
  green: {
    bg: 'bg-green-500',
    text: 'text-green-500',
    hover: 'hover:bg-green-500 hover:text-white'
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    hover: 'hover:bg-blue-500 hover:text-white'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-500 hover:text-white'
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    hover: 'hover:bg-red-500 hover:text-white'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    hover: 'hover:bg-orange-500 hover:text-white'
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-500',
    hover: 'hover:bg-yellow-500 hover:text-white'
  },
};


export default function EcommerceFinalSteps() {
    const searchParams = useSearchParams();
    const { siteName } = useParams()

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
        useGradientBox: boolean, 
        useTags: boolean, 
        tags: string[], 
        topHeaderText: string, 
        gradientBoxText: string[]
    }>()
    const [name, setName] = useState("");
    const [color, setColor] = useState<Color>("green");
    const [icon, setIcon] = useState("");
    const [mainColor, setMainColor] = useState<Color>(color);
    const [useTopHeader, setUseTopHeader] = useState(true);
    const [topHeaderText, setTopHeaderText] = useState("30% de desconto para novos usuários")
    const [useGradientBox, setUseGradientBox] = useState(true);
    const [gradientBoxText, setGradientBoxText] = useState(["Até 70% de desconto", "Promoção de verão"])
    const [useTags, setUseTags] = useState(true);
    const [tags, setTags] = useState<string[]>(["Populares","Exclusivos","Rentáveis","Imperdíveis"]);
    const [newTag, setNewTag] = useState('');


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
          setSiteResponse(siteResponse)
          setName(siteResponse.name)
          setMainColor(siteResponse.color)
          setIcon(siteResponse.icon)
          setUseTopHeader(siteResponse.useTopHeader)
          setUseGradientBox(siteResponse.useGradientBox)
          setUseTags(siteResponse.useTags)

          if (siteResponse.useTopHeader == true) {
            setTopHeaderText(siteResponse.topHeaderText)
          }

          if (siteResponse.useGradientBox == true) {
            setGradientBoxText(siteResponse.gradientBoxText)
          }

          if (siteResponse.useTags == true) {
            setTags(siteResponse.tags)
          }
          
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
            router.push("/404")
          } else {
            console.error("Error is not 'Error' type");
          }
        }
      };
    
    useEffect(() => {
        getSite()
    }, [])
  
    const renderIcon = (iconName: string, iconClass: string) => {
      return (
        <i
          className={`bi ${iconClass} text-[22px] rounded border cursor-pointer px-2 py-1 transition hover:bg-green-500 hover:text-white ${
            icon === iconName
              ? "border-green-500 bg-green-100 dark:bg-green-600"
              : "border-zinc-700"
          }`}
          onClick={() => setIcon(iconName)}
        ></i>
      );
    };
  
    const renderColorButton = (colorName: Color, colorClass: string) => {
      return (
        <button
          className={`h-[37px] w-[37px] ${colorClass} p-1 rounded transition ${
            color === colorName ? "border-2 border-green-600" : ""
          }`}
          onClick={() => setMainColor(colorName)}
          type="button"
        ></button>
      );
    };
  

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const atk = getCookie("atk");

  if (!atk) {
    return (
      <div className="min-w-screen min-h-screen flex justify-center items-center text-center font-montserrat tracking-tight font-medium flex-col gap-3">
        <TwoSellHeader />
        <h1>Você precisa estar logado para terminar a criação deste E-commerce.</h1>
        <button className="text-green-500 cursor-pointer transition hover:text-green-400" onClick={() => router.push("/signin")}>Entrar</button>
      </div>
    );
  }

  const decodedToken = jwt.decode(atk)
  const ownerId = (decodedToken as JwtPayload)?.id ?? '';

  const [siteData, setSiteData] = useState({ name: name, color: color, icon: icon, tags: '', ownerId: ownerId });

  const submitSite = async (ownerId: string) => {
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...siteData,
          ownerId,
          tags: tags.map(tag => tag.trim()),
          useTopHeader: useTopHeader,
          useGradientBox: useGradientBox,
          useTags: useTags,
          topHeaderText: topHeaderText,
          gradientBoxText: gradientBoxText
        }),
      });
      const result = await response.json().then(() => router.push(`${name}/site-created`));
      
    } catch (error: unknown) {
      console.error(error)
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newGradientBoxText = [...gradientBoxText]; 
    newGradientBoxText[index] = value; 
    setGradientBoxText(newGradientBoxText); 
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


  if (siteResponse) {
    return (
        <main className="mt-[20vh] w-[80vw] max-w-[1000px] m-auto">

          <div className="flex flex-col justify-center items-start gap-4">
            <Logo pageName={name} color={mainColor} icon={icon} lg={true} path={`/final-steps?name=${name}&color=${color}&icon=${icon}`} />
            <h1>Faremos os <span className={`${colorClasses[mainColor].text}`}>ajustes finais</span> da personalização do seu site, ok?</h1>

            <div className="flex flex-col">
                    <label
                        className={`text-zinc-800 font-monserrat tracking-tight text-[600] dark:text-zinc-200`}
                        htmlFor="name"
                    >
                        Nome:{" "}
                    </label>
                    <input
                        className={`px-2 py-1 rounded transition bg-zinc-200 focus:ring-${mainColor}-500 focus:ring-2 focus:outline-none dark:bg-zinc-900`}
                        type="text"
                        id="name"
                        placeholder="Digite aqui o nome do site..."
                        maxLength={10}
                        value={siteResponse.name}
                        onChange={(e) => setName(e.target.value)}
                    />
            </div>

            <div className="flex flex-col items-center gap-2 w-full border border-zinc-300 rounded pb-4 max-w-[350px] dark:border-zinc-600">
                    <label
                        className="w-full text-sm text-center bg-zinc-300 font-monserrat tracking-tight text-[600] dark:text-white dark:bg-zinc-600"
                        htmlFor="icon"
                    >
                        Ícone:{" "}
                    </label>

                    <div className="inline-grid items-center grid-cols-6 gap-3">
                        {renderIcon("coin", "bi-coin")}
                        {renderIcon("rocket-fill", "bi-rocket-fill")}
                        {renderIcon("cash", "bi-cash")}
                        {renderIcon("wallet", "bi-wallet")}
                        {renderIcon("code-slash", "bi-code-slash")}
                        {renderIcon("lightning-charge-fill", "bi-lightning-charge-fill")}
                        {renderIcon("boxes", "bi-boxes")}
                        {renderIcon("shop", "bi-shop")}
                        {renderIcon("gift", "bi-gift")}
                        {renderIcon("cart-fill", "bi-cart-fill")}
                        {renderIcon("heart-fill", "bi-heart-fill")}
                        {renderIcon("umbrella-fill", "bi-umbrella-fill")}
                    </div>
                </div>
    
                <div className="max-w-[350px] w-full pb-4 flex flex-col items-center gap-2 border border-zinc-300 rounded dark:border-zinc-600">
                    <label
                        className="bg-zinc-300 w-full text-sm text-center tracking-tight text-[600] dark:bg-zinc-600"
                        htmlFor="color"
                    >
                        Cor:{" "}
                    </label>
                    <div className="inline-flex items-center gap-3">
                        {renderColorButton("green", "bg-green-500 hover:bg-green-400")}
                        {renderColorButton("blue", "bg-blue-500 hover:bg-blue-400")}
                        {renderColorButton("purple", "bg-purple-500 hover:bg-purple-400")}
                        {renderColorButton("red", "bg-red-500 hover:bg-red-400")}
                        {renderColorButton("orange", "bg-orange-500 hover:bg-orange-400")}
                        {renderColorButton("yellow", "bg-yellow-500 hover:bg-yellow-400")}
                    </div>
                </div>
    
    
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" onChange={() => setUseTopHeader(!useTopHeader)} checked={useTopHeader}></input>
                <span>Exibir a barra superior do cabeçalho</span>
              </label>
            </div>
    
            {
              useTopHeader == true 
                ? (
                  <div className="text-zinc-400">
                    <label className="flex flex-col justify-center gap-2">
                      <span>Texto:</span>
                      <input className={`px-2 py-1 rounded transition focus:ring-${mainColor}-500 focus:ring-2 focus:outline-none dark:bg-zinc-900`} value={topHeaderText} onChange={(e) => setTopHeaderText(e.target.value)}></input>
                    </label>
                  </div>
                )
                : null
            }
    
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" onChange={() => setUseGradientBox(!useGradientBox)} checked={useGradientBox}></input>
                <span>Exibir uma seção de banner</span>
              </label>
            </div>
    
            { 
              useGradientBox == true 
              ? (
                <div className="text-zinc-400">
                  <label className="flex flex-col justify-center gap-2">
                    <span>Texto:</span>
                    <div className="flex gap-2">
                      <input className={`px-2 py-1 rounded transition focus:ring-${mainColor}-500 focus:ring-2 focus:outline-none dark:bg-zinc-900`} value={gradientBoxText[0]} onChange={(e) => handleInputChange(0, e.target.value)}></input>/
                      <input className={`px-2 py-1 rounded transition focus:ring-${mainColor}-500 focus:ring-2 focus:outline-none dark:bg-zinc-900`} value={gradientBoxText[1]} onChange={(e) => handleInputChange(1, e.target.value)}></input>
                    </div>
                  </label>
                </div>
              )
              :null
            }
            
    
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" onChange={() => setUseTags(!useTags)} checked={useTags}></input>
                <span>Exibir a barra com tags para filtrar os produtos</span>
              </label>
            </div>
            
    
            {useTags && (
              <div className="flex flex-col items-start gap-2 w-full">
    
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Digite aqui a tag"
                    className={`px-2 py-1 rounded dark:bg-zinc-900 transition focus:ring-${mainColor}-500 focus:ring-2 focus:outline-none`}
                    onKeyDown={handleKeyDown}
                  />
                  <button onClick={addTag} className={`bg-${mainColor}-500 text-white px-4 py-2 rounded-lg transition hover:bg-${mainColor}-400`}>Adicionar</button>
                </div>
                
                <div className="flex flex-wrap gap-2 w-full mt-[8px]">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex gap-2 justify-center items-center rounded-full border border-zinc-600 px-2 py-1 transition focus:bg-${mainColor}-500">
                      <span className="text-sm">{tag}</span>
                      <button onClick={() => removeTag(tag)} className={`text-${mainColor}-500`}><i className="bi bi-x-circle"></i></button>
                    </div>
                  ))}
                </div>
                
              </div>
            )}
          </div>
    
    
          <section className="mt-8 border rounded-xl overflow-hidden border border-2 border-zinc-800 mt-4 pb-4">
            <div className="bg-zinc-800 w-full p-1 text-center text-sm text-zinc-400">Exemplo</div>
            <header className="w-[80vw] max-w-[1000px] flex flex-col justify-between items-center bg-white z-10 dark:bg-black">
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
    
            <article className="mt-[35px] max-w-[985px] w-[75vw] m-auto flex flex-col max-w-[1000px] px-1">
              
              {
                useGradientBox == true
                  ? (
                    <GradientBox color={mainColor} text1={gradientBoxText[0]} text2={gradientBoxText[1]} />
                  ) : null
              }
              
    
              <div className="w-[74vw] max-w-[985px] h-full m-auto mt-[25px] flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
                <div className="w-full max-w-[80vw] h-full m-auto flex justify-between cursor-pointer font-montserrat font-bold text-xs tracking-tight gap-2 overflow-hidden sm:text-[14px]">
                      <div className="flex gap-2">
                          {tags.map((tag, index) => (
                            <button key={index} className={`py-1 px-3 bg-zinc-100 text-zinc-600 rounded-full transition ${colorClasses[mainColor].hover}`}>
                              {tag}
                            </button>
                          ))}
                      </div>
    
                  </div>
    
                <button className="py-1 px-3 rounded-full border-2 border-zinc-300 text-zinc-400 flex transition hover:bg-black hover:text-white hover:border-black">
                  ordenar <i className="bi bi-chevron-down ml-1"></i>
                </button>
              </div>
            </article>
    
            <h1 className="w-[74vw] max-w-[985px] m-auto mt-[10px] ml-3 font-bold font-antom tracking-tighter text-2xl">Novos produtos</h1>
            <h1 className="w-full m-auto mt-[10px] font-bold font-antom tracking-tighter text-2xl text-zinc-500 text-center">...</h1>
          </section>
                
          <ScrollButton mainColor={color} />
    
          <div className="m-auto w-[80vw] max-w-[1000px] mt-[40px] mb-[10px]">
            <button className={`${colorClasses[mainColor].bg} py-3 w-full rounded-xl transition hover:bg-black text-xl text-white`} onClick={() => submitSite(ownerId)}>
              Salvar este site
            </button>
          </div>
        </main>
      );
    
  } else {
    return (<LoadingScreen />)
  }
}