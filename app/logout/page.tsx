"use client"

import { getCookie, removeCookie } from "typescript-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation"

export default function Logout() {
    const router = useRouter()

  useEffect(() => {
    
    const token = getCookie("atk")
    if (token) {
        removeCookie("atk")
        router.push("/")
    }

  }, [])

  return (
    <section className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
        <h1>você está sendo redirecionado para a página principal</h1>
        <h2>caso não seja redirecionado automaticamente <button className="text-green-500" onClick={() => router.push("/")}>clique aqui</button></h2>
    </section>
  );
}
