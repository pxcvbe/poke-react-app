import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("theme");
    const d = s
      ? s === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(d);
  }, []);

  useEffect(() => {
    const c = document.documentElement.classList;
    if (dark) {
      c.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      c.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  
  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-200"
      aria-label="Toggle dark mode"
    >
      <span>{dark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
