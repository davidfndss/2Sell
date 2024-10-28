import Logo from "../Logo/Logo";
import { ThemeSwitchBtn } from "../Buttons/ThemeToggleBtn/ThemeSwitchBtn";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const colorClasses: Record<Color, { bg: string; text: string; hover: string }> = {
    green: {
      bg: 'bg-green-800',
      text: 'text-green-500',
      hover: 'hover:bg-green-500 hover:text-white'
    },
    blue: {
      bg: 'bg-blue-800',
      text: 'text-blue-500',
      hover: 'hover:bg-blue-500 hover:text-white'
    },
    purple: {
      bg: 'bg-purple-800',
      text: 'text-purple-500',
      hover: 'hover:bg-purple-500 hover:text-white'
    },
    red: {
      bg: 'bg-red-800',
      text: 'text-red-500',
      hover: 'hover:bg-red-500 hover:text-white'
    },
    orange: {
      bg: 'bg-orange-800',
      text: 'text-orange-500',
      hover: 'hover:bg-orange-500 hover:text-white'
    },
    yellow: {
      bg: 'bg-yellow-800',
      text: 'text-yellow-500',
      hover: 'hover:bg-yellow-500 hover:text-white'
    },
  };

export default function Header(props: {mainColor: Color, icon: string | null, pageName: string | null, useTopHeader: boolean, topHeaderText?: string}) {

    return (
        <header className="min-w-screen flex flex-col justify-between items-center fixed top-0 bg-white z-10 dark:bg-black">
            {
                props.useTopHeader 
                    ? (
                        <article className={`bg-${props.mainColor}-800 w-screen h-[5vh] max-h-[35px] flex justify-center items-center text-white tracking-tight text-sm`}>
                            <div className="flex justify-center items-center w-[80vw] sm:justify-between max-w-[1000px]">
                                <nav className={`hidden cursor-pointer transition hover:text-${props.mainColor}-400 sm:block`}>
                                Suporte
                                </nav>
                                <nav className="text-center">
                                    {props.topHeaderText}
                                </nav>
                                <nav className={`hidden cursor-pointer transition hover:text-${props.mainColor}-400 sm:block`}>
                                Avaliar <i className="bi bi-chevron-down"></i>
                                </nav>
                            </div>
                        </article>
                    )
                    : null
            }

           

            <article className="w-screen max-h-[80px] flex justify-center items-center bg-white dark:bg-zinc-900">
                <div className="w-[80vw] h-[10vh] max-h-[80px] flex justify-between items-center max-w-[1000px] mr-[15px]">

                    <div className="w-[20vw] max-w-[200px]">
                         <Logo pageName={props.pageName} color={props.mainColor} icon={props.icon} />
                    </div>
                    

                    <div className="flex w-[35vw] max-w-[300px]">
                        <input
                            type="text"
                            className="w-full rounded-full rounded-tr-none rounded-br-none p-1 pl-5 bg-zinc-100 dark:bg-zinc-800"
                        ></input>
                        <button className="rounded-full rounded-tl-none rounded-bl-none pointer p-1 px-2 bg-zinc-100 dark:bg-zinc-800">
                            <i className="bi bi-search mr-[4px]"></i>
                        </button>
                    </div>

                    <div className="flex gap-3 text-lg gap-[3vw] items-center w-[20vw] max-w-[200px] justify-end">

                        <nav className="font-antom flex items-center cursor-pointer w-[25px]">
                            <i className={`bi bi-cart-fill text-2xl transition hover:text-${props.mainColor}-500 dark:hover:text-${props.mainColor}-400`}></i>
                            <i className={`bi bi-circle-fill text-[9px] ${colorClasses[props.mainColor].text} relative right-[7px] bottom-[9px]`}></i>
                        </nav>
                        <nav className="font-antom flex items-center cursor-pointer">
                            <i className={`bi bi-person-fill text-2xl transition hover:text-${props.mainColor}-400 dark:hover:text-${props.mainColor}-400`}></i>
                        </nav>

                        

                        <ThemeSwitchBtn color={props.mainColor} />
                    </div>
                </div>
            </article>
        </header>
    )
}