import { useState, useEffect } from "react";
import { useMediaPredicate } from "react-media-hook";
import { Theme } from "../enums/Theme";

export default function useDarkMode(): [string, () => void] {
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
    ? Theme.Dark
    : Theme.Light;

  const [theme, setTheme] = useState<string>(
    window.localStorage.getItem("theme") || preferredTheme,
  );

  const themeToggler = () => {
    theme === Theme.Light ? setTheme(Theme.Dark) : setTheme(Theme.Light);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, themeToggler];
}
