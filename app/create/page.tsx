'use client';

import { useState } from "react"; // Importe o useState para gerenciar o estado
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import CTAButton from "@/components/CTAButton/CTAButton";

export default function Create() {
  const router = useRouter();
  const [name, setName] = useState(''); // Estado para o nome
  const [color, setColor] = useState(''); // Estado para a cor
  const [icon, setIcon] = useState(''); // Estado para o ícone

  // Função para gerar a URL com os parâmetros de consulta
  const generateUrl = () => {
    return `/example?name=${encodeURIComponent(name)}&color=${encodeURIComponent(color)}&icon=${encodeURIComponent(icon)}`;
  };

  return (
    <>
      <Header />

      <main className="w-[80vw] h-full m-auto flex flex-col gap-2">
        <form className="flex flex-col gap-2">
          <div>
            <label className="text-green-500 text-[20px] font-monserrat tracking-tight text-[600]" htmlFor="name">Name: </label>
            <input 
              className="text-[20px] px-2" 
              type="text" 
              id="name" 
              placeholder="Digite aqui o nome do site..." 
              value={name} 
              onChange={(e) => setName(e.target.value)} // Atualiza o estado ao digitar
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-green-500 text-[20px] font-monserrat tracking-tight text-[600]" htmlFor="icon">Ícone: </label>
            <div className="inline-flex items-center gap-3">
              {/* Adicione o onClick para definir o ícone selecionado */}
              <i className="bi bi-coin text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('coin')}></i>
              <i className="bi bi-rocket text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('rocket')}></i>
              <i className="bi bi-cash text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('cash')}></i>
              <i className="bi bi-wallet text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('wallet')}></i>
              <i className="bi bi-code-slash text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('code-slash')}></i>
              <i className="bi bi-lightning-charge text-[22px] rounded border cursor-pointer px-2 py-1 border-zinc-700 transition hover:bg-green-500 hover:text-white" onClick={() => setIcon('lightning-charge')}></i>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-green-500 text-[20px] font-monserrat tracking-tight text-[600]" htmlFor="color">Cor: </label>
            <div className="inline-flex items-center gap-3">
              <button className="h-[20px] w-[20px] bg-green-500 p-1 rounded transition hover:bg-green-400" onClick={() => setColor('green')} type="button"></button>
              <button className="h-[20px] w-[20px] bg-blue-500 p-1 rounded transition hover:bg-blue-400" onClick={() => setColor('blue')} type="button"></button>
              <button className="h-[20px] w-[20px] bg-yellow-500 p-1 rounded transition hover:bg-yellow-400" onClick={() => setColor('yellow')} type="button"></button>
              <button className="h-[20px] w-[20px] bg-purple-500 p-1 rounded transition hover:bg-purple-400" onClick={() => setColor('purple')} type="button"></button>
              <button className="h-[20px] w-[20px] bg-red-500 p-1 rounded transition hover:bg-red-400" onClick={() => setColor('red')} type="button"></button>
            </div>
          </div>

          {/* Passe a URL gerada para o CTAButton */}
          <CTAButton content="Criar meu site agora" route={generateUrl()} />
        </form>
      </main>
    </>
  );
}
