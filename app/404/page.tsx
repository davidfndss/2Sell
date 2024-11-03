"use client"
import TwoSellHeader from "@/components/Header/2SellHeader"
import { useRouter } from "next/navigation"

export default function NotFoundResource() {
    const router = useRouter()

    return (
        <>
            <TwoSellHeader />
            <section className="w-screen h-screen flex flex-col justify-center items-center">
                <h1 className="text-6xl leading-tight">404</h1>
                <h2 className="text-xl font-bold leading-tight">Recurso não encontrado :(</h2>
                <button onClick={() => router.push("/dashboard")} className="text-green-500 mt-[20px] py-2 px-4 rounded font-medium border bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 transition hover:text-green-400">
                    <i className="bi bi-grid"></i> Dashboard
                </button>
                <button onClick={() => router.back()} className="dark:text-white mt-[10px] transiion hover:text-green-400">
                    <i className="bi bi-arrow-left-circle"></i> Voltar
                </button>
            </section>
        </>
    )
}