"use client";

// import Header from "@/components/Header/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import ShareBtn from "@/components/Buttons/ShareBtn/ShareBtn";
import Header from "@/components/Header/Header";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const isValidColor = (color: string | null): color is Color => {
  return ["green", "blue", "purple", "red", "orange", "yellow"].includes(
    color || ""
  );
};

export default function ItemPage() {
  const { itemId } = useParams();

  const [ product, setProduct ] = useState<{
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string[]
  }>()
  // TO-DO: Resolve this page funcionality
  const [ site, setSite] = useState()

  const [mainColor] = useState<Color>(
    isValidColor(product.color) ? product.color : "green"
  );

  const [ contactNumber, setContactNumber ] = useState<number>()
  const router = useRouter()

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/product/${itemId}`, {
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

  const getContactNumber = async () => {
    try {
      const response = await fetch(`/api/sites/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const siteResponse = await response.json();
      setSiteResponse(site)
      setContactNumber(siteResponse.owner.contactNumber);
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
    getContactNumber()
  }, [])

  return (
    <>
      {/* <Header pageName={name} icon={icon} mainColor={mainColor} useTopHeader={true} topHeaderText="30% de desconto para novos usuários" /> */}
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
              Item 1 {itemId}
            </h1>
            <h1
              className={`text-2xl tracking-tight text-${mainColor}-500 mt-1`}
            >
              R$ 2.000
            </h1>
          </div>

          <div className="w-[20%] text-xl flex gap-4 justify-end mt-2 pr-1">
            <i
              className={`bi bi-heart cursor-pointer hover:text-${mainColor}-500 transition`}
            ></i>
            <ShareBtn url={`http://localhost:3000/${name}/item/${itemId}`} mainColor={color}/>
          </div>
        </article>

        <p className="text-zinc-600 font-antom mt-2">
          Originalmente criado para as quadras, o Dunk mais tarde foi para as
          ruas - e como se costuma dizer, o resto é história. Mais de 35 anos
          após sua estreia, a silhueta ainda oferece um estilo ousado e
          desafiador Agora, o tênis OG do basquete universitário retorna com
          camadas sobrepostas em couro premium e mainmainColor blocking
          tradicional. O conforto fica por conta da tecnologia mais atual em
          calçados, enquanto uma combinação clássica de preto e branco remete ao
          legado das quadras.
        </p>

        <div className="mt-1 flex items-center text-zinc-400 font-antom tracking-tight gap-1">
          <span className="font-montserrat">
            <i className="bi bi-geo-alt"></i>
            Brazil
          </span>
          <span className="font-montserrat">•</span>
          <span className="font-montserrat">05/09/2024</span>
        </div>

        <a
          className={`w-[80vw] bg-${mainColor}-500 bottom-0 h-[7vh] text-white text-2xl font-montserrat font-medium tracking-tight rounded-lg flex justify-center items-center m-auto mt-6 mb-2 transition hover:bg-black hover:text-white max-w-[1000px]`} href={`https://api.whatsapp.com/send/?phone=${productcontactNumber}&text&type=phone_number&app_absent=0&text=Olá%2C%20tenho%20interesseno%20item%20${name}`}
        >
          <i className="bi bi-whatsapp mr-2"></i>
          Enviar mensagem
        </a>

        {/* <button
          className={`w-[70vw] bg-${mainColor}-500 fixed bottom-0 h-[7vh] text-white text-2xl font-montserrat font-medium tracking-tight rounded-full flex justify-center items-center m-auto right-[15vw] left-[15vw] mb-2 transition hover:bg-black hover:text-white`}
        >
          <i className="bi bi-whatsapp mr-2"></i>
          Enviar mensagem
        </button> */}
      </main>

      <div className="mb-[10vh]">
        <Footer color={mainColor} pageName={name} icon={icon} />
      </div>
    </>
  );
}