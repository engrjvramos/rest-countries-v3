import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { Theme } from "../enums/Theme";

interface ThemeProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: ThemeProps) {
  return (
    <header className="shadow-md mb-8 dark:bg-darkBlue">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-5 py-7">
        <Link to="/" className="sm:text-2xl text-xl font-bold ">
          Where in the world?
        </Link>
        <button
          className="flex items-center justify-center rounded"
          onClick={toggleTheme}
        >
          {theme === Theme.Light ? (
            <div className="flex items-center gap-2">
              <FaMoon />
              <span className="hidden sm:block">Dark Mode</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaSun />
              <span className="hidden sm:block">Light Mode</span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
