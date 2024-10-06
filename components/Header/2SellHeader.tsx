import TwoSellLogo from "../Logo/2SellLogo";
import { ThemeSwitchBtn } from "../Buttons/ThemeToggleBtn/ThemeSwitchBtn";

export default function TwoSellHeader() {
  return (
    <>
      <header className="flex items-center justify-center h-[80px] bg-white z-10 dark:bg-black fixed w-screen top-0">
          <article className="w-[80%] h-full flex flex items-center justify-between max-w-[1000px] mr-[15px]">
              <TwoSellLogo />
              <ThemeSwitchBtn color="green" />
          </article>
      </header>
    </>
  );
}
