"use client";

import TwoSellHeader from '@/components/Header/2SellHeader';
import { Loading } from '@/components/Loading/Loading';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';
import { useRouter } from 'next/navigation';

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

      if ( foundUser.ecommerces && foundUser.ecommerces.length > 0) {
        setEcommerces(foundUser.ecommerces)
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
                <p>E-commerces de {user.name}:</p>
                {ecommerces.map((ecommerce, index) => (
                  <h1 key={index}>{ecommerce.name}</h1>
                ))}
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