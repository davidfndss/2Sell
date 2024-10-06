'use client';

import { useRouter } from "next/navigation";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { text: string; hover: string; darkHover: string }> = {
  green: {
    text: 'text-green-400',
    hover: 'hover:text-green-500',
    darkHover: 'dark:hover:text-green-500'
  },
  blue: {
    text: 'text-blue-400',
    hover: 'hover:text-blue-500',
    darkHover: 'dark:hover:text-blue-500'
  },
  purple: {
    text: 'text-purple-400',
    hover: 'hover:text-purple-400',
    darkHover: 'dark:hover:text-purple-400'
  },
  red: {
    text: 'text-red-400',
    hover: 'hover:text-red-400',
    darkHover: 'dark:hover:text-red-400'
  },
  orange: {
    text: 'text-orange-400',
    hover: 'hover:text-orange-400',
    darkHover: 'dark:hover:text-orange-400'
  },
  yellow: {
    text: 'text-yellow-400',
    hover: 'hover:text-yellow-400',
    darkHover: 'dark:hover:text-yellow-400'
  },
};

export default function Logo(props: { icon: string | null, pageName: string | null, color: Color | null, path?: string }) {
    const router = useRouter();

    const colorKey = props.color as Color;
    const textColorClass = props.color && colorClasses[props.color] ? colorClasses[colorKey].text : 'text-slate-700';
    const hoverColorClass = props.color && colorClasses[props.color] ? colorClasses[colorKey].hover : 'hover:text-slate-500'; 
    const darkHoverColorClass = props.color && colorClasses[props.color] ? colorClasses[colorKey].darkHover : 'dark:hover:text-slate-500'; 

    return (
      <button
        id="logo"
        className={`font-black font-montserrat cursor-pointer transition ${hoverColorClass} dark:text-white ${darkHoverColorClass} max-w-[140px]`}
        onClick={() => router.push( props.path ? props.path : "/")}
      >
        <i className={`bi bi-${props.icon} ${textColorClass} pr-[2px]`}></i>
        {props.pageName}
      </button>
    );
}
