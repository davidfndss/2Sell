"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface ThemeSwitchBtnProps {
  color: "green" | "blue" | "purple" | "red" | "orange" | "yellow";
}

export function ThemeSwitchBtn({ color }: ThemeSwitchBtnProps) {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <h1>confs</h1>
    // <div className="text-[22px]">
    //   {theme === "light" ? (
    //     <button onClick={() => setTheme("dark")}>
    //       <i className={`bi bi-moon-fill transition text-black hover:text-${color}-500 dark:hover:text-${color}-400`}></i>
    //     </button>
    //   ) : (
    //     <button onClick={() => setTheme("light")}>
    //       <i className={`bi bi-sun-fill transition text-white hover:text-${color}-500 dark:hover:text-${color}-400`}></i>
    //     </button>
    //   )}
    // </div>
  );
}
