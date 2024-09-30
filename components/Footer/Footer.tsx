"use client"

import Logo from "../Logo/Logo";

export default function Footer(props: {pageName: string | null, color: string | null, icon: string | null}) {

  return (
    <footer className="w-[80vw] h-[20vh] max-h-[160px] mr-[10vw] ml-[10vw] text-xl flex flex-col justify-evenly mt-[1vh]">
        <div>
          <Logo pageName={props.pageName} color={props.color} icon={props.icon} />
        </div>

        <div>
          <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">Entre em contato</span>
          <div className={`flex gap-2 text-${props.color}-500 text-[14px] font-medium`}>
            <a href="https://api.whatsapp.com/send/?phone=61985391185&text&type=phone_number&app_absent=0&text=Olá" target="_blank" className={`cursor-pointer transition hover:text-${props.color}-400`}>Whatsapp</a>
            <a href="https://github.com/davidfndss" target="_blank" className={`cursor-pointer transition hover:text-${props.color}-400`}>Github</a>
            <a href="https://linkedin.com/in/davidfndss" target="_blank" className={`cursor-pointer transition hover:text-${props.color}-400`}>Linkedin</a>
          </div>
        </div>

        <span className="text-sm text-slate-600 font-montserrat tracking-tighter font-medium">© Techmafia 2024</span>
      </footer>
  );
}
