"use client";

import TwoSellHeader from '@/components/Header/2SellHeader';
import { Loading } from '@/components/Loading/Loading';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo/Logo';


type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string; border: string }> = {
  green: {
    bg: 'bg-green-700',
    text: 'text-green-600',
    border: 'border-green-600',
    hover: 'hover:bg-green-500 hover:text-white'
  },
  blue: {
    bg: 'bg-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-500 hover:text-white'
  },
  purple: {
    bg: 'bg-purple-700',
    text: 'text-purple-600',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-500 hover:text-white'
  },
  red: {
    bg: 'bg-red-700',
    text: 'text-red-600',
    border: 'border-red-600',
    hover: 'hover:bg-red-500 hover:text-white'
  },
  orange: {
    bg: 'bg-orange-700',
    text: 'text-orange-600',
    border: 'border-orange-600',
    hover: 'hover:bg-orange-500 hover:text-white'
  },
  yellow: {
    bg: 'bg-yellow-700',
    text: 'text-yellow-600',
    border: 'border-yellow-600',
    hover: 'hover:bg-yellow-500 hover:text-white'
  },
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [ecommerces, setEcommerces] = useState([])

  const router = useRouter()

  const findUserById = async () => {
    try {
      const atk = getCookie("atk");

      if (!atk) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }

      const decoded = jwt.decode(atk);
      if (!decoded || !decoded.id) {
        throw new Error("Token inválido ou corrompido.");
      }

      const ownerId = decoded.id;

      const response = await fetch(`/api/owners/${ownerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', atk }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const foundUser = await response.json();
      setUser(foundUser);

      if ( foundUser.sites && foundUser.sites.length > 0) {
        setEcommerces(foundUser.sites)
      }

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    findUserById();
  }, []);

  return (
    <>
      <TwoSellHeader />
      <section className="w-[80vw] m-auto mt-[30vh] max-w-[1000px]">
        {error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : !user ? (
          <div className="flex justify-center w-full">
            <Loading />
          </div>
        ) : (
          <>
            {ecommerces.length > 0 ? (
              <>

                  <h1 className="text-2xl font-monserrat tracking-tight font-medium"><span className="text-green-500 font-bold">{ecommerces.length}</span> { ecommerces.length > 1 ? "E-commerces adicionados:" : "E-commerce adicionado:" }</h1>
         
                
                <article className="mt-4 flex flex-col gap-3 md:grid md:grid-cols-3">
                  {ecommerces.map((ecommerce: {color: string, name: string, icon: string}, index) => (
                    <div key={index}>
                      <div className={`w-full max-w-[300px] rounded-lg border-2 rounded-b-none border-b-0 p-2 bg-zinc-50 ${colorClasses[ecommerce.color].border} dark:bg-black dark:border-zinc-800`}>
                        <Logo pageName={ecommerce.name} color={ecommerce.color} icon={ecommerce.icon} path={`/${ecommerce.name}/admin`} />
                      </div>
                      
                      <div className={`flex justify-between w-full max-w-[300px] ${colorClasses[ecommerce.color].bg} border-2 ${colorClasses[ecommerce.color].border} p-3 cursor-pointer rounded-lg border-t-0 rounded-t-none text-white`}>
                        <button className={`rounded-md bg-zinc-950 border w-[80px] h-10 border-zinc-400 py-1 font-medium  curso-pointer transition hover:bg-${ecommerce.color}-500 hover:border-zinc-100 dark:border-zinc-700`} onClick={() => router.push(`/${ecommerce.name}/admin`)}>Ver</button>
                
                        <button className={`rounded-md bg-zinc-950 border w-[80px] h-10 border-zinc-400 py-1 font-medium  curso-pointer transition hover:bg-${ecommerce.color}-500 hover:border-zinc-100 dark:border-zinc-700 hover:border-2`} onClick={() => router.push(`/${ecommerce.name}/admin/edit`)}><i className="bi bi-pencil"></i></button>
                
                        <button className={`rounded-md bg-zinc-950 border w-[80px] h-10 border-zinc-400 py-1 font-medium  curso-pointer transition hover:bg-${ecommerce.color}-500 hover:border-zinc-100 dark:border-zinc-700 hover:border-2`} onClick={() => handleShare ()}><i className="bi bi-share"></i></button>
                      </div>
                    </div>
                  ))}

                  <div>
                    <div className="w-full max-w-[300px] rounded-lg border-2 rounded-b-none border-b-0 p-2 bg-zinc-50 border-green-500 dark:bg-black dark:border-zinc-800">
                      <h2 className="font-bold"><i className="bi bi-arrow-right-circle text-green-500"></i> Outro E-commerce?</h2>
                    </div>
                    
                    <div className={`flex justify-between w-full max-w-[300px] bg-green-700 border-2 border-green-500 p-3 cursor-pointer rounded-lg border-t-0 rounded-t-none`}>
                      <button className={`w-full rounded-md bg-green-500 border px-6 h-10 border-green-400 py-1 font-medium  curso-pointer text-white transition hover:bg-green-400 hover:border-green-300`} onClick={() => router.push(`/create`)}><i className="bi bi-plus-circle"></i> Adicionar</button>
                    </div>
                  </div>
                </article>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <h1 className="text-xl">Olá <span className="text-green-500">{user.name}</span>!</h1>
                <p>Pelo visto você ainda não criou nenhum E-commerce.</p>
                <p><i className="bi bi-arrow-right text-green-500"></i> Clique aqui para <span className="text-green-500 cursor-pointer transition hover:text-green-400" onClick={() => router.push("/create")}>Criar o primeiro</span>.</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;