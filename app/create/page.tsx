'use client';

import { useState } from "react"; 
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

  // Função para gerar os ícones dinamicamente
  const renderIcon = (iconName: string, iconClass: string) => {
    return (
      <i 
        className={`bi ${iconClass} text-[22px] rounded border cursor-pointer px-2 py-1 transition hover:bg-green-500 hover:text-white ${
          icon === iconName ? 'border-green-500 bg-green-100 dark:bg-green-600' : 'border-zinc-700'
        }`} 
        onClick={() => setIcon(iconName)}
      ></i>
    );
  };

  // Função para gerar os botões de cor dinamicamente
  const renderColorButton = (colorName: string, colorClass: string) => {
    return (
      <button
        className={`h-[30px] w-[30px] ${colorClass} p-1 rounded transition ${
          color === colorName ? 'border-2 border-green-600' : ''
        }`}
        onClick={() => setColor(colorName)}
        type="button"
      ></button>
    );
  };

  return (
    <>
      <Header />

      <main className="w-[80vw] h-full m-auto flex flex-col gap-2">
        <form className="flex flex-col gap-3 mt-[20vh]">
          <div>
            <label className="text-green-500 text-[20px] font-monserrat tracking-tight text-[600]" htmlFor="name">Name: </label>
            <input 
              className="text-[20px] px-2 rounded dark:bg-zinc-900" 
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
              {renderIcon('coin', 'bi-coin')}
              {renderIcon('rocket', 'bi-rocket-fill')}
              {renderIcon('cash', 'bi-cash')}
              {renderIcon('wallet', 'bi-wallet')}
              {renderIcon('code-slash', 'bi-code-slash')}
              {renderIcon('lightning-charge-fill', 'bi-lightning-charge-fill')}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-green-500 text-[20px] font-monserrat tracking-tight text-[600]" htmlFor="color">Cor: </label>
            <div className="inline-flex items-center gap-3">
              {renderColorButton('green', 'bg-green-500 hover:bg-green-400')}
              {renderColorButton('blue', 'bg-blue-500 hover:bg-blue-400')}
              {renderColorButton('yellow', 'bg-yellow-500 hover:bg-yellow-400')}
              {renderColorButton('purple', 'bg-purple-500 hover:bg-purple-400')}
              {renderColorButton('red', 'bg-red-500 hover:bg-red-400')}
            </div>
          </div>

          {/* Passe a URL gerada para o CTAButton */}
          <CTAButton content="Criar meu site agora" route={generateUrl()} />
        </form>
      </main>
    </>
  );
}
