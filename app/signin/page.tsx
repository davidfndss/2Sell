"use client"

import TwoSellLogo from '@/components/Logo/2SellLogo';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'typescript-cookie';

const signup = () => {
  const searchParams = useSearchParams();

  const [ownerData, setOwnerData] = useState({ email: '', password: '' });
  
  const router = useRouter();

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const handleSubmitOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ownerData),
      });
      const result = await response.json();
      setCookie("atk", result.atk);
      router.push("/dashboard")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error creating owner: ${error.message}`);
      } else {
        console.error('Error creating owner');
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center p-5 min-h-screen mt-[80px] w-[80vw] max-w-[500px] m-auto md:max-w-[550px]">

        <article className="mt-[20px] mb-[10px] flex flex-col gap-2">
              <div
                className="m-auto h-[100px] w-[200px] rounded-lg flex justify-center items-center cursor-pointer transition text-green-500"
              >
                <i className="bi bi-cash-coin text-5xl relative top-[5px]"></i>
                <span className="text-4xl font-bold text-zinc-800 dark:text-zinc-50 ml-1">
                2Sell.
                </span>
              </div>

            <div className="flex items-center ml-[-10px]">
              <h1 className="text-3xl font-medium tracking-tight md:text-4xl">Entre na sua conta</h1>
            </div>
        </article>

        <div className="w-[80vw] max-w-[500px] p-6 rounded-lg">
          <form onSubmit={handleSubmitOwner} className="space-y-6">
            <div className="flex justify-center items-center">
              <label htmlFor="email" className="w-[80px]">E-mail:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={handleOwnerChange} 
                required 
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-green-500 focus:outline-none focus:ring-2 transition ml-[10px]`} 
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
                className={`w-full p-2 rounded bg-zinc-100 border dark:bg-zinc-900 dark:border-zinc-800 focus:ring-green-500 focus:outline-none focus:ring-2 transition ml-[10px]`} 
              />
            </div>

            <button 
              type="submit" 
              className={`w-full bg-green-500 text-white p-2 rounded font-semibold transition hover:bg-black text-xl`}
            >
              Entrar
            </button>
            
          </form>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mt-[10px]">Não possui uma conta? 
            <span className={`text-green-500 cursor-pointer transition hover:text-black dark:hover:text-white ml-1`} onClick={() => router.push("/signup")}>Criar</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default signup;