'use client'

import { useRouter } from "next/navigation";

export default function Logo(props: {icon: string | null, pageName: string | null, color: string | null}) {
    const router = useRouter()

    return (
      <button
        id="logo"
        className={`text-slate-700 font-black font-montserrat cursor-pointer transition hover:text-${props.color}-400 dark:text-white`}
        onClick={() => router.push("/")}
      >
        <i className={`bi bi-${props.icon} text-${props.color}-400`}></i>
        {props.pageName}
      </button>
    );
  }
  