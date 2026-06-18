import { createContext, useContext,useEffect, type ReactNode } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)


export function ThemeProvider({ children }: { children: ReactNode }) {

  const [theme,setTheme]=useLocalStorage<Theme>("task-app-theme","light");

  
  useEffect(()=>{
    document.body.setAttribute("data-theme",theme);
  },[theme]);

  const toggleTheme=()=>{
    setTheme((prev)=>prev==="light"?"dark":"light");
  };

  const value:ThemeContextValue={
    theme,
    setTheme,
    toggleTheme
  };

  return(<ThemeContext.Provider value={value}>
            <div data-theme={theme}>
              {children}
            </div>
          </ThemeContext.Provider>
  );
}            

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
