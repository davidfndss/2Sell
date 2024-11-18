"use client";

import { ownerSchema } from '@/utils/validation-schemas';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'typescript-cookie';
import { ZodError } from 'zod';

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string; focus: string }> = {
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

interface Owner {
  name: string;
  email: string; 
  password: string;
  contactNumber: string
}

const Signup = () => {
  const searchParams = useSearchParams();
  
  const name = searchParams.get("name");
  const color = (searchParams.get("color") as Color) || 'green'; 
  const icon = searchParams.get("icon");
  const [mainColor] = useState<Color>(color);

  const [ownerData, setOwnerData] = useState<Owner>({ name: '', email: '', password: '', contactNumber: '' });
  
  const [ownerCreateError, setOwnerCreateError] = useState<string>('');

  const router = useRouter();

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const errorMessages = {
    "E-mail already registered": "E-mail já cadastrado",
    "Internal Server Error": "Erro interno do servidor",
  };
  
  const handleSubmitOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ownerSchema.parse(ownerData);

      const response = await fetch('/api/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ownerData),
      });
      const result = await response.json();
  
      const errorMessage = errorMessages[result.message as keyof typeof errorMessages] || result.message;
  
      if (response.ok && result.atk) {
        setCookie("atk", result.atk, { expires: 1 })
        router.push( name && color && icon ? `/final-steps?name=${name}&color=${color}&icon=${icon}` : `/dashboard`)
      } else {
        setOwnerCreateError(errorMessage || 'Erro ao criar usuário');
      }

    } catch (error) {

      if (error instanceof ZodError) {
        setOwnerCreateError(error.issues.map(err => err.message).join(", ")); 
        return
      } else {
        setOwnerCreateError('Erro ao criar usuário');
      }
      
      if (error instanceof Error) {
        setOwnerCreateError(`${error.message}`);
      } else {
        setOwnerCreateError('Erro ao criar usuário');
      }
    }
  };

  const signupAsTesterOwner = async () => {
    try {
      const response = await fetch('/api/owners/tester', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
  
      const errorMessage = errorMessages[result.message as keyof typeof errorMessages] || result.message;
  
      if (response.ok && result.atk) {
        setCookie("atk", result.atk, { expires: 1 })
        router.push( name && color && icon ? `/final-steps?name=${name}&color=${color}&icon=${icon}` : `/dashboard`)
      } else {
        setOwnerCreateError(errorMessage || 'Erro ao criar usuário');
      }

    } catch (error) {

      if (error instanceof ZodError) {
        setOwnerCreateError(error.issues.map(err => err.message).join(", ")); 
        return
      } else {
        setOwnerCreateError('Erro ao criar usuário');
      }
      
      if (error instanceof Error) {
        setOwnerCreateError(`${error.message}`);
      } else {
        setOwnerCreateError('Erro ao criar usuário');
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center p-5 min-h-screen mt-[40px] w-[80vw] max-w-[500px] m-auto">
        <article className="mt-[20px] mb-[10px] flex flex-col gap-2">
          <div className="flex items-center ml-[-10px]">
            <i className={`bi bi-plus text-${mainColor}-500 text-3xl`}></i>
            <i className={`bi bi-person-vcard text-${mainColor}-500 text-4xl mr-2`}></i>
            <h1 className="text-3xl font-bold md:text-5xl">Crie uma conta</h1>
          </div>
          { !color || !name || !icon ? (
            <p className="text-lg text-zinc-500 max-w-[600px] md:text-xl dark:text-zinc-400">
              Uma conta no 2Sell te permitirá criar e gerenciar seus sites livremente.
            </p>
          ) : (
            <p className="text-lg text-zinc-500 max-w-[600px] md:text-xl dark:text-zinc-400">
              Uma conta no 2Sell te permitirá criar e gerenciar seus sites livremente, inclusive o <i className={`bi bi-${icon} text-${mainColor}-500`}></i><span className="text-black tracking-tight dark:text-white">{name}</span>.
            </p>
          )}
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
              <label htmlFor="contactNumber">Número para contato:</label>
              <div className="flex gap-2 items-center w-full">
                <i className="bi bi-whatsapp text-green-500 text-3xl w-[80px] text-center"></i>
                <input 
                  type="text" 
                  id="contactNumber" 
                  name="contactNumber" 
                  onChange={handleOwnerChange} 
                  required 
                  className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 ${colorClasses[mainColor].focus}`} 
                />
              </div>
             
              <p className="text-zinc-700 dark:text-zinc-500 text-sm">Nós da 2sell não entraremos em contato com você pelo seu número, apenas seus clientes.</p>
              {ownerCreateError && <p className="text-red-500">{ownerCreateError}</p>}
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
      <div className="border rounded fixed right-[15px] bottom-[15px] bg-zinc-100 border-zinc-200 p-2 dark:border-zinc-800 flex flex-col gap-1 dark:gap-2 items-center dark:bg-[#151515]">
        <p className="text-zinc-600 text-sm dark:text-zinc-400 text-center">Não deseja criar uma conta?</p>
        <span className={`text-${mainColor}-500 cursor-pointer transition ml-1 bg-zinc-100 font-bold dark:bg-zinc-950 rounded hover:text-green-400 dark:text-zinc-200 dark:hover:text-green-500 dark:py-1 dark:px-2`} onClick={signupAsTesterOwner}>Entrar como tester</span>
      </div>
    </>
  );
};

export default Signup;