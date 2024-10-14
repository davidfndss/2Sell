"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'typescript-cookie';

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string, focus: string }> = {
  green: {
    bg: 'bg-green-800',
    text: 'text-green-600',
    hover: 'hover:text-green-500',
    focus: 'focus:ring-green-500 focus:outline-none focus:ring-2 transition'
  },
  blue: {
    bg: 'bg-blue-800',
    text: 'text-blue-600',
    hover: 'hover:text-blue-500',
    focus: 'focus:ring-blue-500 focus:outline-none focus:ring-2 transition'
  },
  purple: {
    bg: 'bg-purple-800',
    text: 'text-purple-600',
    hover: 'hover:text-purple-500',
    focus: 'focus:ring-purple-500 focus:outline-none focus:ring-2 transition'
  },
  red: {
    bg: 'bg-red-800',
    text: 'text-red-600',
    hover: 'hover:text-red-500',
    focus: 'focus:ring-red-500 focus:outline-none focus:ring-2 transition'
  },
  orange: {
    bg: 'bg-orange-800',
    text: 'text-orange-600',
    hover: 'hover:text-orange-500',
    focus: 'focus:ring-orange-500 focus:outline-none focus:ring-2 transition'
  },
  yellow: {
    bg: 'bg-yellow-800',
    text: 'text-yellow-600',
    hover: 'hover:text-yellow-500',
    focus: 'focus:ring-yellow-500 focus:outline-none focus:ring-2 transition'
  },
};

const signup = () => {
  const searchParams = useSearchParams();
  
  const name = searchParams.get("name");
  const color = (searchParams.get("color") as Color) || 'green'; 
  const icon = searchParams.get("icon");
  const [mainColor, setMainColor] = useState<Color>(color);
  const [ ownerId, setOwnerId ] = useState()

  const [ownerData, setOwnerData] = useState({ name: '', email: '', password: '', phone: '' });
  const [siteData, setSiteData] = useState({ name: name, color: color, icon: icon, tags: '', ownerId: ownerId });
  
  const [ownerCreateResponseMessage, setOwnerCreateResponseMessage] = useState('');
  const [siteCreateResponseMessage, setSiteCreateResponseMessage] = useState('');

  const router = useRouter();


  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const handleSiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSiteData({ ...siteData, [e.target.name]: e.target.value });
  };

  const handleSubmitOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ownerData),
      });
      const result = await response.json();
      setOwnerCreateResponseMessage(JSON.stringify(result));
      if (result.id) {
        setOwnerId(result.id);
        await submitSite(result.id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOwnerCreateResponseMessage(`Error creating owner: ${error.message}`);
      } else {
        setOwnerCreateResponseMessage('Error creating owner');
      }
    }
  };

  const submitSite = async (ownerId: string) => {
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...siteData,
          ownerId,
          tags: siteData.tags.split(',').map(tag => tag.trim()),
        }),
      });
      const result = await response.json();
      setCookie("atk", result.atk);
      router.push(`/dashboard`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSiteCreateResponseMessage(`Error creating site: ${error.message}`);
      } else {
        setSiteCreateResponseMessage('Error creating site');
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center p-5 min-h-screen mt-[80px] w-[80vw] max-w-[500px] m-auto">

        <article className="mt-[20px] mb-[10px] flex flex-col gap-2">
            <div className="flex items-center ml-[-10px]">
              <i className={`bi bi-plus text-${mainColor}-500 text-3xl`}></i>
              <i className={`bi bi-person-vcard text-${mainColor}-500 text-4xl mr-2`}></i>
              <h1 className="text-3xl font-bold md:text-5xl">Crie uma conta</h1>
            </div>

            { !color || !name || !icon ? (<p className="text-lg text-zinc-500 max-w-[600px] md:text-xl dark:text-zinc-400">
              Uma conta no 2Sell te permitirá criar e gerenciar seus sites livremente.
            </p>) : (<p className="text-lg text-zinc-500 max-w-[600px] md:text-xl dark:text-zinc-400">
              Uma conta no 2Sell te permitirá criar e gerenciar seus sites livremente, inclusive o <i className={`bi bi-${icon} text-${mainColor}-500`}></i><span className="text-black tracking-tight dark:text-white">{name}</span>.
            </p>) }
        </article>

        <div className="w-[80vw] max-w-[500px] p-6 rounded-lg">
          <form onSubmit={handleSubmitOwner} className="space-y-6">
            <div className="flex justify-center items-center">
              <label htmlFor="name" className="w-[80px]">Nome:</label>
              <input 
                type="text" 
                id="name" 
                name="name"  
                onChange={handleOwnerChange} 
                required 
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 ${colorClasses[mainColor].focus} ml-[10px]`}
              />
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="email" className="w-[80px]">E-mail:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={handleOwnerChange} 
                required 
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 ${colorClasses[mainColor].focus} ml-[10px]`} 
              />
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="password" className="w-[80px]">Senha:</label>
              <input 
                type="password" 
                id="password" 
                name="password"  
                onChange={handleOwnerChange} 
                required 
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 ${colorClasses[mainColor].focus} ml-[10px]`} 
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-2">
              <label htmlFor="phone">Número para contato:</label>
              <input 
                type="text" 
                id="phone" 
                name="phone"  
                onChange={handleOwnerChange} 
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 ${colorClasses[mainColor].focus} ml-[-2px]`} 
              />
              <p className="text-zinc-700 dark:text-zinc-500 text-sm">Nós do 2sell não entraremos em contato com você pelo seu número, apenas seus clientes.</p>
            </div>

            <button 
              type="submit" 
              className={`w-full bg-${mainColor}-500 text-white p-2 rounded font-semibold transition hover:bg-black text-xl`}
            >
              Criar conta
            </button>
            
          </form>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mt-[10px]">Já possui uma conta? 
            <span className={`text-${mainColor}-500 cursor-pointer transition hover:text-black dark:hover:text-white ml-1`} onClick={() => router.push("/signin")}>Entrar</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default signup;