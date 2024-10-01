import Logo from "../Logo/Logo";
import { ThemeSwitchBtn } from "../ThemeToggleBtn/ThemeSwitchBtn";

export default function Header(props: {mainColor: string | null, icon: string | null, pageName: string | null}) {

    return (
        <header className="min-w-screen flex flex-col justify-between items-center fixed top-0 bg-white z-10 dark:bg-black">
            <article className={`bg-${props.mainColor}-800 w-screen h-[5vh] max-h-[35px] flex justify-center items-center text-white tracking-tight text-sm`}>
                <div className="flex justify-center items-center w-[80vw] sm:justify-between max-w-[1000px]">
                    <nav className={`hidden cursor-pointer transition hover:text-${props.mainColor}-500 sm:block`}>
                    Suporte
                    </nav>
                    <nav className="text-center">
                    30% de desconto para novos usuários{" "}
                    </nav>
                    <nav className={`hidden cursor-pointer transition hover:text-${props.mainColor}-500 sm:block`}>
                    Brasil <i className="bi bi-chevron-down"></i>
                    </nav>
                </div>
            </article>

            <article className="w-screen h-[10vh] max-h-[80px] flex justify-between items-center bg-white dark:bg-zinc-900">
                <div className="w-[80vw] h-[10vh] max-h-[80px] m-auto flex justify-between items-center max-w-[1000px]">
                    <Logo pageName={props.pageName} color={props.mainColor} icon={props.icon} />

                    <div className="flex w-[35vw]">
                        <input
                            type="text"
                            className="w-full rounded-full rounded-tr-none rounded-br-none p-1 pl-5 bg-zinc-100"
                        ></input>
                        <button className="rounded-full rounded-tl-none rounded-bl-none pointer p-1 px-2 bg-zinc-100">
                            <i className="bi bi-search mr-[4px]"></i>
                        </button>
                    </div>

                    <div className="flex gap-3 text-lg gap-[3vw] items-center">
                        <nav className="font-antom flex items-center cursor-pointer">
                            <i className={`bi bi-cart-fill text-2xl transition hover:text-${props.mainColor}-500`}></i>
                            <i className={`bi bi-circle-fill text-[9px] text-${props.mainColor}-400 relative right-[7px] bottom-[9px]`}></i>
                        </nav>
                        <nav className="font-antom flex items-center cursor-pointer">
                            <i className="bi bi-person-fill text-2xl transition hover:text-${mainColor}-500"></i>
                        </nav>
                        <ThemeSwitchBtn />
                    </div>
                </div>
            </article>
        </header>
    )
}