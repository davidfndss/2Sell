'use client';

import ShareButton from "@/components/Buttons/ShareBtn/ShareBtn";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import Logo from "@/components/Logo/Logo";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string }> = {
  green: { bg: 'bg-green-800', text: 'text-green-600', hover: 'hover:bg-green-500 hover:text-white' },
  blue: { bg: 'bg-blue-800', text: 'text-blue-600', hover: 'hover:bg-blue-500 hover:text-white' },
  purple: { bg: 'bg-purple-800', text: 'text-purple-600', hover: 'hover:bg-purple-500 hover:text-white' },
  red: { bg: 'bg-red-800', text: 'text-red-600', hover: 'hover:bg-red-500 hover:text-white' },
  orange: { bg: 'bg-orange-800', text: 'text-orange-600', hover: 'hover:bg-orange-500 hover:text-white' },
  yellow: { bg: 'bg-yellow-800', text: 'text-yellow-600', hover: 'hover:bg-yellow-500 hover:text-white' },
};

export default function SiteCreated() {
  const { siteName } = useParams();
  const [siteResponse, setSiteResponse] = useState<{name: string, color: Color, icon: string}>();
  const router = useRouter();
  const [isClipboardSupported, setIsClipboardSupported] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClipboardSupported(!!navigator.clipboard);
      setIsShareSupported(!!navigator.share);
    }
  }, []);

  const handleShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share({ title: 'Compartilhe este link', url: `/${siteName}` });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    if (isClipboardSupported) {
      navigator.clipboard.writeText(`/${siteName}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      console.error('API Clipboard não suportada no navegador.');
    }
  };

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
      <main className="w-[80vw] max-w-[1000px] m-auto mt-[20vw] flex flex-col px-2 rounded-xl border-2 border-zinc-700 gap-4 justify-center items-center py-4">
        <Logo pageName={siteResponse.name} color={siteResponse.color} icon={siteResponse.icon} />
        <h1><span className={`text-${siteResponse.color}-500`}>Parabéns!</span> seu site foi criado com sucesso!</h1>
        <button className={`rounded bg-${siteResponse.color}-500 py-1 font-medium curso-pointer transition hover:bg-${siteResponse.color}-400 w-[250px]`} onClick={() => router.push(`/${siteName}`)}>Ver como ficou <i className="bi bi-eye"></i></button>
        <button className={`rounded bg-${siteResponse.color}-500 py-1 font-medium curso-pointer transition hover:bg-${siteResponse.color}-400 w-[250px]`} onClick={() => router.push(`/${siteName}/admin/add-product`)}>Adicionar produto <i className="bi bi-plus-circle"></i></button>
        <div className="flex justify-evenly w-[40vw] max-w-[250px]">
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium curso-pointer transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => router.push("/dashboard")}><i className="bi bi-house"></i></button>
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium curso-pointer transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => router.push(`/${siteName}/admin`)}><i className="bi bi-pencil"></i></button>
          <button className={`rounded bg-zinc-800 border-2 w-10 h-10 border-zinc-700 py-1 font-medium curso-pointer transition hover:bg-${siteResponse.color}-500 hover:border-none`} onClick={() => handleShare()}><i className="bi bi-share"></i></button>
        </div>
      </main>
    );
  } else {
    return <LoadingScreen />;
  }
}