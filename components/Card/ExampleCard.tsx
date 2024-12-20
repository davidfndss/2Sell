'use client'

import Link from "next/link"

export default function ExampleCard(props: {mainColor: string | null, pageName: string | null, icon: string | null, exampleImgName: string}) {

  return (
    <Link href={`/example/item/1234?color=${props.mainColor}&name=${props.pageName}&icon=${props.icon}`} className="w-full item max-w-[200px]">
        <div className="relative border rounded-md bg-zinc-100 h-[39vw] w-[39vw] flex flex-col justify-between cursor-pointer md:h-[26vw] md:w-[26vw] lg:h-[19vw] lg:w-[19vw] max-w-[245px] max-h-[245px] transition dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-700">
          <img src={`/images/${props.exampleImgName}.png`} className="w-[90%] h-[90%] object-cover rounded-md m-auto" />

          <div className="absolute top-0 w-full flex justify-end p-2">
            <i className="bi bi-heart-fill text-black dark:text-white"></i>
          </div>

          <div className="absolute bottom-0 w-full flex justify-start">
            <span className={`text-${props.mainColor}-500 mb-1 bg-opacity-75 px-2 rounded`}>200 R$</span>
          </div>
        </div>

        <span className="font-montserrat font-medium mt-1 block">Exemplo</span>

        <div className="mt-1 flex items-center gap-1">
          <span className="font-montserrat text-sm">
            <i className="bi bi-geo-alt"></i>
            Brasil
          </span>
          <span className="font-montserrat text-sm">•</span>
          <span className="font-montserrat text-sm">Hoje</span>
        </div>
    </Link>
  );
}
