"use client";

import { useState } from "react";
import CTAButton from "@/components/Buttons/CTAButton";
import TwoSellHeader from "@/components/Header/2SellHeader";
import Logo from "@/components/Logo/Logo";
type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

export default function Create() {
  const [name, setName] = useState("");
  const [color, setColor] = useState<Color>("green");
  const [icon, setIcon] = useState("");

  const generateUrl = () => {
    return `/example?name=${encodeURIComponent(
      name
    )}&color=${encodeURIComponent(color)}&icon=${encodeURIComponent(icon)}`;
  };

  const renderIcon = (iconName: string, iconClass: string) => {
    return (
      <i
        className={`bi ${iconClass} text-[22px] rounded border cursor-pointer px-2 py-1 transition hover:bg-green-500 hover:text-white ${
          icon === iconName
            ? "border-green-500 bg-green-100 dark:bg-green-600"
            : "border-zinc-700"
        }`}
        onClick={() => setIcon(iconName)}
      ></i>
    );
  };

  const renderColorButton = (colorName: Color, colorClass: string) => {
    return (
      <button
        className={`h-[37px] w-[37px] ${colorClass} p-1 rounded transition ${
          color === colorName ? "border-2 border-green-600" : ""
        }`}
        onClick={() => setColor(colorName)}
        type="button"
      ></button>
    );
  };

  return (
    <>
      <TwoSellHeader />

      <main className="w-[80vw] h-full m-auto flex flex-col gap-2 max-w-[1000px]">
        <div className="flex justify-center items-center gap-2 text-zinc-400 mt-[20vh]">
          <i className="bi bi-list-check text-green-500 text-3xl"></i>
          <h1 className="text-green-500 text-2xl font-medium tracking-tight text-center dark:text-zinc-300">Preencha os campos abaixo:</h1>
        </div>
       
        <form className="flex flex-col items-center gap-4 mt-[2vh]">
          <div>
            <label
              className="text-[20px] text-green-500 font-monserrat tracking-tight text-[600] dark:text-zinc-200"
              htmlFor="name"
            >
              Nome:{" "}
            </label>
            <input
              className="text-[20px] px-2 rounded dark:bg-zinc-900 focus:ring-green-500 focus:ring-2 focus:outline-none"
              type="text"
              id="name"
              placeholder="Digite aqui o nome do site..."
              maxLength={10}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center gap-2 w-full border border-zinc-300 rounded pb-4 max-w-[350px] dark:border-zinc-600">
            <label
              className="w-full text-sm text-center bg-zinc-300 font-monserrat tracking-tight text-[600] dark:text-white dark:bg-zinc-600"
              htmlFor="icon"
            >
              Ícone:{" "}
            </label>
            <div className="inline-grid items-center grid-cols-6 gap-3">
              {renderIcon("coin", "bi-coin")}
              {renderIcon("rocket-fill", "bi-rocket-fill")}
              {renderIcon("cash", "bi-cash")}
              {renderIcon("wallet", "bi-wallet")}
              {renderIcon("code-slash", "bi-code-slash")}
              {renderIcon("lightning-charge-fill", "bi-lightning-charge-fill")}
              {renderIcon("boxes", "bi-boxes")}
              {renderIcon("shop", "bi-shop")}
              {renderIcon("gift", "bi-gift")}
              {renderIcon("cart-fill", "bi-cart-fill")}
              {renderIcon("heart-fill", "bi-heart-fill")}
              {renderIcon("umbrella-fill", "bi-umbrella-fill")}
            </div>
          </div>

          <div className="max-w-[350px] w-full pb-4 flex flex-col items-center gap-2 border border-zinc-300 rounded dark:border-zinc-600">
            <label
              className="bg-zinc-300 w-full text-sm text-center tracking-tight text-[600] dark:bg-zinc-600"
              htmlFor="color"
            >
              Cor:{" "}
            </label>
            <div className="inline-flex items-center gap-3">
              {renderColorButton("green", "bg-green-500 hover:bg-green-400")}
              {renderColorButton("blue", "bg-blue-500 hover:bg-blue-400")}
              {renderColorButton("purple", "bg-purple-500 hover:bg-purple-400")}
              {renderColorButton("red", "bg-red-500 hover:bg-red-400")}
              {renderColorButton("orange", "bg-orange-500 hover:bg-orange-400")}
              {renderColorButton("yellow", "bg-yellow-500 hover:bg-yellow-400")}
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center">
            <Logo pageName={name} color={color} icon={icon} />

            <CTAButton content="Prosseguir" route={generateUrl()} />
          </div>
          
        </form>
      </main>
    </>
  );
}
