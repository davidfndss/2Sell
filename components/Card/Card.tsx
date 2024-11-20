'use client'

import { useRouter } from "next/navigation";

export default function Card(props: {
    itemId: string; 
    name: string;
    price: number;
    imageUrl: string[];
    createdAt: Date;
    mainColor: string | null; 
    pageName: string | null; 
    icon: string | null; 
  }) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/${props.pageName}/item/${props.itemId}?color=${props.mainColor}&name=${props.pageName}&icon=${props.icon}`)} className="w-full item max-w-[200px]">
        <div className="relative border rounded-md bg-zinc-100 h-[39vw] w-[39vw] flex flex-col justify-between cursor-pointer md:h-[26vw] md:w-[26vw] lg:h-[19vw] lg:w-[19vw] max-w-[245px] max-h-[245px] transition dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-700">
          <img src={ props.imageUrl.length > 0 ? props.imageUrl[0] : `/images/dunk.png`} className={`w-[90%] h-[90%] object-cover rounded-md m-auto ${props.imageUrl.length === 0 && "hidden"}`} />

          <div className="absolute top-0 w-full flex justify-end p-2">
            <i className="bi bi-heart-fill text-black dark:text-white"></i>
          </div>

          <div className="absolute bottom-0 w-full flex justify-start">
            <span className={`text-${props.mainColor}-500 mb-1 bg-opacity-75 px-2 rounded`}>{props.price.toString()} R$</span>
          </div>
        </div>

        <span className="font-montserrat font-medium mt-1 block ml-[2px]">{
          props.name.length < 15 
            ? props.name 
            : props.name.slice(0, 15) + "..."
          }</span>

        <div className="mt-1 flex items-center gap-1 ml-[2px]">
          <span className="font-montserrat text-sm">
            <i className={`bi bi-geo-alt-fill text-${props.mainColor}-500 mr-[2px]`}></i> 
            {props.pageName?.toUpperCase()}
          </span>
          <span className="font-montserrat text-sm">•</span>
          <span className="font-montserrat text-sm">
          {new Date(props.createdAt).toDateString() === new Date().toDateString()
          ? "Hoje"
          : new Date(props.createdAt).toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
          ? "Ontem"
          : new Date(props.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
          </span>
        </div>
    </div>
  );
}
