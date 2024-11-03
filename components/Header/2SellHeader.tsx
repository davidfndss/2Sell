"use client"

import TwoSellLogo from "../Logo/2SellLogo";
import { ThemeSwitchBtn } from "../Buttons/ThemeToggleBtn/ThemeSwitchBtn";
import { useRouter } from "next/navigation";
import { getCookie } from "typescript-cookie";
import { useEffect, useState } from "react";

export default function TwoSellHeader() {
  const router = useRouter()
  const [ atk, setAtk ] = useState<string>()

  

  useEffect(() => {
    
    const token = getCookie("atk")
    if (token) setAtk(token)

  }, [])

  return (
    <>
      <header className="flex items-center justify-center h-[80px] bg-white z-10 dark:bg-black fixed w-screen top-0 ">
          <article className="w-[80%] h-full flex flex items-center justify-between max-w-[1000px] mr-[15px]">
              <TwoSellLogo />

              <div className="flex gap-4 items-center">
                { 
                  atk 
                    ? (
                      <nav className="transition cursor-pointer text-white bg-green-500 rounded py-2 px-2 hover:bg-green-400" onClick={() => router.push("dashboard") }>
                        <i className="bi bi-grid-fill"></i> Dashboard
                      </nav>
                    )
                    : (
                      <nav className="transition cursor-pointer text-white bg-green-500 rounded py-2 px-2 hover:bg-green-400" onClick={() => router.push("signup") }>
                        Criar conta <i className="bi bi-arrow-right-circle"></i>
                      </nav>
                    )
                }
                <nav className="transition cursor-pointer border border-green-500 text-green-500 rounded py-2 px-3 hover:border-green-400 hover:text-green-400 dark:border-zinc-500 dark:text-zinc-400 dark:hover:text-green-500 dark:border-zinc-600 dark:hover:border-green-500" onClick={() => router.push("signin") }>
                  <i className="bi bi-box-arrow-in-right"></i>
                </nav>
                <ThemeSwitchBtn color="green" />
              </div>
          </article>
      </header>
    </>
  );
}
