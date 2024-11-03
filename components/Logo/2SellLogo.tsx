'use client'

import { useRouter } from "next/navigation";

export default function TwoSellLogo() {
    const router = useRouter()

    return (
      <button
        id="logo"
        className={`text-slate-700 font-black font-montserrat cursor-pointer transition hover:text-green-400 dark:text-white dark:hover:text-green-400 text-lg`}
        onClick={() => router.push("/")}
      >
        <i className={`bi bi-cash-coin text-green-400 text-lg mr-[2px]`}></i>
        2Sell
      </button>
    );
  }
  