"use client"

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeSwitchBtn() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (!theme) {
      setTheme('light');
    }
  }, [theme, setTheme]);

  return (
    <div className="text-[22px]">
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <i className="bi bi-moon-fill text-zinc-600 transition hover:text-green-500"></i>
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <i className="bi bi-sun-fill transition hover:text-green-500"></i>
        </button>
      )}
    </div>
  );
}