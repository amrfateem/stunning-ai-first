import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Mode = 'light' | 'dark';
interface ModeContextValue { mode: Mode; toggleMode: () => void; }

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

function getPreferred(): Mode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem('site-mode');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia) {
    try { if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'; } catch {}
  }
  return 'dark';
}

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(getPreferred);

  useEffect(() => {
    try { window.localStorage.setItem('site-mode', mode); } catch {}
    const root = document.documentElement;
    if (mode === 'light') root.classList.remove('dark'); else root.classList.add('dark');
    root.dataset.mode = mode;
  }, [mode]);

  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>;
};

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}
