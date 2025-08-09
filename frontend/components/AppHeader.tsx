import React from 'react';
import Link from 'next/link';
import { useMode } from './ModeContext';

interface Props { onToggleMode?: () => void; mode?: 'light' | 'dark'; }

export const AppHeader: React.FC<Props> = (props) => {
  let ctxMode: 'light' | 'dark' | undefined; let ctxToggle: (()=>void) | undefined;
  try { const ctx = useMode(); ctxMode = ctx.mode; ctxToggle = ctx.toggleMode; } catch {}
  const mode = props.mode || ctxMode || 'dark';
  const toggle = props.onToggleMode || ctxToggle;
  // Only show toggle on /websites pages
  let showToggle = false;
  if (typeof window !== 'undefined') {
    showToggle = window.location.pathname.startsWith('/websites');
  }
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-slate-950/75 dark:bg-slate-950/60 border-b border-white/10 supports-[backdrop-filter]:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-6">
        <Link href="/" className="font-display text-lg sm:text-xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent select-none leading-none">
          Stunning Generator
        </Link>
        <nav className="hidden md:flex gap-4 text-[13px] tracking-wide">
          <Link className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition" href="/">Home</Link>
          <Link className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500/80 to-pink-500/80 hover:from-indigo-500 hover:to-pink-500 text-white shadow border border-white/10 transition" href="/websites">Websites</Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {toggle && showToggle && (
            <button
              onClick={toggle}
              className="group relative inline-flex items-center gap-2 rounded-full pl-3 pr-2 h-9 border border-white/15 bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
            >
              <span className="tracking-[0.08em] uppercase font-semibold">{mode === 'dark' ? 'Dark' : 'Light'}</span>
              <span className="relative w-9 h-5 rounded-full bg-slate-700/60 flex items-center px-[3px]">
                <span className={`h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-pink-400 shadow transition-transform duration-400 ease-out ${mode === 'light' ? 'translate-x-4' : ''}`}></span>
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
