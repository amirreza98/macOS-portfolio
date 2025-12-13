import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolved: "light" | "dark";
  applyResolved: () => void;
}

const getSystemResolved = () => {
  const hour = new Date().getHours();
  return hour < 19 ? "light" : "dark";
};

const THEME_KEY = "am_theme";

const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: (localStorage.getItem(THEME_KEY) as ThemeMode) || "system",
  setMode: (mode: ThemeMode) => {
    localStorage.setItem(THEME_KEY, mode);
    set({ mode }, false);
    // after state update, apply
    get().applyResolved();
  },
  resolved: getSystemResolved(),
  applyResolved: () => {
    const { mode } = get();
    const resolved = mode === "system" ? getSystemResolved() : mode;
    set({ resolved }, false);
    const root = document.querySelector("main") || document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${resolved}`);
  },
}));

// Initialize class on load
if (typeof window !== "undefined") {
  const stored = (localStorage.getItem(THEME_KEY) as ThemeMode) || "system";
  const resolved = stored === "system" ? getSystemResolved() : stored;
  const root = document.querySelector("main") || document.documentElement;
  root.classList.add(`theme-${resolved}`);
}

export default useThemeStore;
