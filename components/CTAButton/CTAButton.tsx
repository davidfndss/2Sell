'use client'

import { useRouter } from "next/navigation";
import Link from "next/link"

export default function CTAButton( props: { content: string, route: string } ) {
  const router = useRouter()

  console.log(props.route)

  return (
    <Link href={props.route}>
            <button className="bg-green-500 py-2 px-6 rounded text-white mt-[20px] text-[20px] max-w-[250px] cursor-pointer transition hover:bg-green-400">{props.content}</button>
    </Link>

  );
}
