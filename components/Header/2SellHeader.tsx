"use client"

import TwoSellLogo from "../Logo/2SellLogo";
import { ThemeSwitchBtn } from "../Buttons/ThemeToggleBtn/ThemeSwitchBtn";
import { useRouter } from "next/navigation";

export default function TwoSellHeader() {
  const router = useRouter()

  return (
    <>
      <header className="flex items-center justify-center h-[80px] bg-white z-10 dark:bg-black fixed w-screen top-0 ">
          <article className="w-[80%] h-full flex flex items-center justify-between max-w-[1000px] mr-[15px]">
              <TwoSellLogo />

              <div className="flex gap-6 items-center">
                <nav className="transition cursor-pointer hover:text-green-500" onClick={() => router.push("signin") }>
                  Conta
                </nav>
                <ThemeSwitchBtn color="green" />
              </div>
          </article>
      </header>
    </>
  );
}
