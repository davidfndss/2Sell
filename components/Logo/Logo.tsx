'use client';

import { useRouter } from "next/navigation";

type Color = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'yellow';

const colorClasses: Record<Color, { text: string; hover: string }> = {
  green: {
    text: 'text-green-400',
    hover: 'hover:text-green-500'
  },
  blue: {
    text: 'text-blue-400',
    hover: 'hover:text-blue-500'
  },
  purple: {
    text: 'text-purple-400',
    hover: 'hover:text-purple-500'
  },
  red: {
    text: 'text-red-400',
    hover: 'hover:text-red-500'
  },
  orange: {
    text: 'text-orange-400',
    hover: 'hover:text-orange-500'
  },
  yellow: {
    text: 'text-yellow-400',
    hover: 'hover:text-yellow-500'
  },
};

export default function Logo(props: { icon: string | null, pageName: string | null, color: Color | null }) {
    const router = useRouter();

    const colorKey = props.color as Color;
    const textColorClass = props.color && colorClasses[props.color] ? colorClasses[colorKey].text : 'text-slate-700';
    const hoverColorClass = props.color && colorClasses[props.color] ? colorClasses[colorKey].hover : 'hover:text-slate-500'; 

    return (
      <button
        id="logo"
        className={`font-black font-montserrat cursor-pointer transition ${hoverColorClass} dark:text-white`}
        onClick={() => router.push("/")}
      >
        <i className={`bi bi-${props.icon} ${textColorClass} pr-[2px]`}></i>
        {props.pageName}
      </button>
    );
}
