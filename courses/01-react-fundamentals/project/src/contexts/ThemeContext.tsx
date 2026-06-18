import { createContext, useContext,useEffect,useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY="task-app-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {

  const [theme,setThemeState]=useState<Theme>(()=>{
    const saved=localStorage.getItem(STORAGE_KEY);

    return saved==="dark"?"dark":"light"
  });

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,theme);

    document.documentElement.setAttribute("data-theme",theme);
  },[theme]);

  const toggleTheme=()=>{
    setThemeState((prev)=>prev==="light"?"dark":"light");
  };


  const value: ThemeContextValue = {
    theme: 'light',
    setTheme: () => {},
    toggleTheme
  }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
