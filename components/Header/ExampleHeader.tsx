import CTAButton from "../Buttons/CTAButton";
import Logo from "../Logo/Logo";
import { ThemeSwitchBtn } from "../Buttons/ThemeToggleBtn/ThemeSwitchBtn";

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

export default function ExampleHeader(props: {mainColor: Color, icon: string | null, pageName: string | null}) {

    return (
        <header className="min-w-screen flex flex-col justify-between items-center fixed top-0 bg-white z-10 dark:bg-black">
            <article className={`bg-${props.mainColor}-800 w-screen h-[5vh] max-h-[35px] flex justify-center items-center text-white tracking-tight text-sm`}>
                <div className="flex justify-center items-center w-[80vw] sm:justify-between max-w-[1000px]">
                    <nav className={`hidden cursor-pointer transition hover:text-green-500 sm:block`}>
                    Suporte
                    </nav>
                    <nav className="text-center">
                    30% de desconto para novos usuários{" "}
                    </nav>
                    <nav className={`hidden cursor-pointer transition hover:text-green-500 sm:block`}>
                    Brasil <i className="bi bi-chevron-down"></i>
                    </nav>
                </div>
            </article>

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
                        {/* <button className={`bg-${props.mainColor}-800 py-2 w-[150px] rounded-full hidden md:block`}>
                            Salvar site
                        </button> */}

                        <ThemeSwitchBtn color={props.mainColor} />
                    </div>
                </div>
            </article>
        </header>
    )
}