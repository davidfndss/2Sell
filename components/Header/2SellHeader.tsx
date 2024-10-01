import TwoSellLogo from "../Logo/2SellLogo";
import { ThemeSwitchBtn } from "../ThemeToggleBtn/ThemeSwitchBtn";

export default function TwoSellHeader() {
  return (
    <>
      <header className="flex items-center justify-center h-[80px] bg-white z-10 dark:bg-black fixed w-screen top-0">
          <article className="w-[80%] h-full flex m-auto flex items-center justify-between">
              <TwoSellLogo />
              <ThemeSwitchBtn />

            {/*
              <svg width="35" height="35" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                              <rect width="72" height="72" fill="url(#pattern0_14_964)"/>
                              <defs>
                              <pattern id="pattern0_14_964" patternContentUnits="objectBoundingBox" width="1" height="1">
                              <use xlinkHref="#image0_14_964" transform="scale(0.0138889)"/>
                              </pattern>
                              <image id="image0_14_964" width="72" height="72" xlinkHref="data:image/png;base64,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"/>
                              </defs>
                          </svg>
            */}
          </article>
      </header>
    </>
  );
}
