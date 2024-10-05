'use client';

import Logo from "../Logo/Logo";

type Color = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'yellow';

const colorClasses: Record<Color, { text: string; hover: string }> = {
  green: {
    text: 'text-green-500',
    hover: 'hover:text-green-400',
  },
  blue: {
    text: 'text-blue-500',
    hover: 'hover:text-blue-400',
  },
  purple: {
    text: 'text-purple-500',
    hover: 'hover:text-purple-400',
  },
  red: {
    text: 'text-red-500',
    hover: 'hover:text-red-400',
  },
  orange: {
    text: 'text-orange-500',
    hover: 'hover:text-orange-400',
  },
  yellow: {
    text: 'text-yellow-500',
    hover: 'hover:text-yellow-400',
  },
};

export default function Footer(props: { pageName: string | null; color: Color | null; icon: string | null; }) {
  const mainColor = props.color || 'green'; 

  return (
    <footer className="w-[80vw] h-[20vh] max-h-[160px] mr-[10vw] ml-[10vw] text-xl flex flex-col justify-evenly mt-[1vh]">
      <div>
        <Logo pageName={props.pageName} color={mainColor} icon={props.icon} />
      </div>

      <div>
        <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">Entre em contato</span>
        <div className={`flex gap-2 ${colorClasses[mainColor].text} text-[14px] font-medium`}>
          <a 
            href="https://api.whatsapp.com/send/?phone=61985391185&text&type=phone_number&app_absent=0&text=Olá" 
            target="_blank" 
            className={`cursor-pointer transition ${colorClasses[mainColor].hover}`}
          >
            Whatsapp
          </a>
          <a 
            href="https://github.com/davidfndss" 
            target="_blank" 
            className={`cursor-pointer transition ${colorClasses[mainColor].hover}`}
          >
            Github
          </a>
          <a 
            href="https://linkedin.com/in/davidfndss" 
            target="_blank" 
            className={`cursor-pointer transition ${colorClasses[mainColor].hover}`}
          >
            Linkedin
          </a>
        </div>
      </div>

      <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">© Techmafia 2024</span>
    </footer>
  );
}
