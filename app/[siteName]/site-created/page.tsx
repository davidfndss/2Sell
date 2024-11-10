'use client';

import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import Logo from "@/components/Logo/Logo";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

export default function SiteCreated() {
  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{name: string, color: Color, icon: string}>();
  const router = useRouter();
  // const [isClipboardSupported, setIsClipboardSupported] = useState(false);
  // const [isShareSupported, setIsShareSupported] = useState(false);
  // const [copied, setCopied] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsClipboardSupported(!!navigator.clipboard);
  //     setIsShareSupported(!!navigator.share);
  //   }
  // }, []);

  const handleShare = async () => {
    // if (isShareSupported) {
    //   try {
    //     await navigator.share({ title: 'Compartilhe este link', url: `/${siteName}` });
    //   } catch (error) {
    //     console.error('Erro ao compartilhar:', error);
    //   }
    // } else {
    //   handleCopyToClipboard();
    // }
    console.log("to-Do: implement share feature")
  };

  // const handleCopyToClipboard = () => {
  //   if (isClipboardSupported) {
  //     navigator.clipboard.writeText(`/${siteName}`).then(() => {
  //       setCopied(true);
  //       setTimeout(() => setCopied(false), 2000);
  //     });
  //   } else {
  //     console.error('API Clipboard não suportada no navegador.');
  //   }
  // };

  useEffect(() => {
    getSite();
  }, []);

  const getSite = async () => {
    try {
      const response = await fetch(`/api/sites/${siteName}`, { method: "GET", headers: { "Content-Type": "application/json" } });

      console.log(response)

      if (response.status === 404) {
        router.push("/404");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const siteResponse = await response.json();
      setSiteResponse(siteResponse);
      console.log(siteResponse);
      console.log(JSON.stringify(response))
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Error is not 'Error' type");
      }
    }
  };

  if (siteResponse) {
    return (
      <main className="w-[80vw] max-w-[1000px] m-auto mt-[20vw] flex flex-col px-2 rounded-xl gap-4 justify-center items-center py-4">
        <Logo pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} lg={true} />
        <h1 className="text-xl"><span className={`text-${siteResponse.color}-500 font-medium`}>Parabéns!</span> seu site foi criado com sucesso.</h1>
        <button className={`rounded bg-${siteResponse.color}-500 h-10 py-1 font-medium text-white curso-pointer transition hover:bg-${siteResponse.color}-400 w-[250px]`} onClick={() => router.push(`/${siteName}`)}>Ver como ficou</button>
        <button className={`rounded bg-${siteResponse.color}-500 h-10 py-1 font-medium text-white transition hover:bg-${siteResponse.color}-400 w-[250px]`} onClick={() => router.push(`/${siteName}/admin/add-product`)}>Adicionar produto</button>

        <div className="flex justify-evenly w-[40vw] max-w-[250px] text-white lg:hidden">
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => router.push("/dashboard")}><i className="bi bi-house"></i></button>
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => router.push(`/${siteName}/admin`)}><i className="bi bi-pencil"></i></button>
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => handleShare()}><i className="bi bi-share"></i></button>
        </div>

        <div className="hidden flex-col justify-evenly gap-4 w-[40vw] max-w-[250px] text-white lg:flex">
          <button className={`rounded bg-zinc-800 border-2 h-10 border-zinc-700 py-1 font-medium transition hover:bg-zinc-700 hover:border-none`} onClick={() => router.push("/dashboard")}><i className="bi bi-grid"></i> Dashboard</button>

          <div className="flex w-full gap-4">
            <button className={`rounded bg-zinc-400 border-2 h-10 w-full border-zinc-400 py-1 font-medium transition hover:bg-zinc-500 hover:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-600 dark:hover:border-zinc-600`} onClick={() => router.push(`/${siteName}/admin`)}><i className="bi bi-pencil"></i></button>
            <button className={`rounded bg-zinc-400 border-2 h-10 w-full border-zinc-400 py-1 font-medium transition hover:bg-zinc-500 hover:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-600 dark:hover:border-zinc-600`} onClick={() => handleShare()}><i className="bi bi-share"></i></button>
          </div>
        </div>
      </main>
    );
  } else {
    return <LoadingScreen />;
  }
}