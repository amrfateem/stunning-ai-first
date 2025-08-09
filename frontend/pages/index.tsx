import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WebsiteSections } from '../components/WebsiteSections';
import { useMode } from '../components/ModeContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Section { title: string; content: string; order: number; }
interface PreviewData { id: string; idea: string; sections: Section[]; createdAt?: string; }

const THEMES = ['sleek-dark','clean-light','gradient-pop','muted-elegant','neon-mesh','ocean-glass','sunset-glow','forest-aura'];
function themeFor(id?: string) {
  if (!id) return THEMES[0]; let hash=0; for (let i=0;i<id.length;i++) hash=(hash*31+id.charCodeAt(i))>>>0; return THEMES[hash%THEMES.length];
}

export default function HomePage() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const baseTheme = useMemo(() => themeFor(preview?.id), [preview?.id]);
  const { mode } = useMode();
  const theme = useMemo(() => {
    if (mode === 'light') return 'clean-light';
    // Rotate dark selections to show variety
    if (['gradient-pop','muted-elegant'].includes(baseTheme)) return baseTheme;
    // Map hashed base to one of extended dark sets
    const darkSet = ['sleek-dark','muted-elegant','neon-mesh','ocean-glass','sunset-glow','forest-aura'];
    let hash=0; const key = preview?.id || 'seed'; for (let i=0;i<key.length;i++) hash = (hash*33 + key.charCodeAt(i))>>>0;
    return darkSet[hash % darkSet.length];
  }, [baseTheme, mode, preview?.id]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault(); setError(null); setPreview(null);
    if (!idea.trim()) { setError('Idea is required'); return; }
    setLoading(true);
    try {
      const createRes = await fetch(`${API_BASE}/websites`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idea: idea.trim() }) });
      if (!createRes.ok) throw new Error(await createRes.text());
      const created = await createRes.json();
      const id = created.id;
      const getRes = await fetch(`${API_BASE}/websites/${id}`);
      if (!getRes.ok) throw new Error(await getRes.text());
      const full = await getRes.json();
      setPreview(full);
    } catch (err:any) { setError(err.message || 'Unexpected error'); } finally { setLoading(false); }
  }

  return (
    <div className="relative">
      <div className="relative z-10">
        <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-12 pb-10 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight leading-[1.05] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-rise">Stunning Website Generator</h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 animate-fade-in">Generate a concept landing outline with dynamic themed full-screen sections.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/websites" className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white text-sm font-semibold shadow-glow transition">Browse Websites</Link>
            <a href="#idea" className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-sm font-medium border border-white/15 backdrop-blur transition">Learn More</a>
          </div>
          <form onSubmit={handleGenerate} className="w-full max-w-2xl mt-10 flex flex-col gap-4 animate-rise">
            <label className="text-left text-sm font-medium tracking-wide uppercase text-slate-400">Idea</label>
            <textarea className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30 transition p-4 min-h-[130px] resize-y text-sm leading-relaxed" placeholder="Describe your idea (e.g., AI-powered travel planner)" value={idea} onChange={e=>setIdea(e.target.value)} />
            <button disabled={loading} className="btn-primary bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed self-start shadow-glow">
              {loading ? 'Generating...' : 'Generate Website Outline'}
            </button>
          </form>
          {error && <div className="mt-6 px-4 py-3 rounded-lg bg-rose-500/15 border border-rose-400/30 text-rose-200 text-sm w-full max-w-2xl animate-fade-in">{error}</div>}
        </header>
        {preview && (
          <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">Preview Theme: <span className="text-indigo-300">{theme}</span></h2>
              <Link className="text-sm px-4 py-2 rounded-md bg-indigo-600/80 hover:bg-indigo-500 text-white font-medium transition" href={`/websites/${preview.id}`}>Open Page</Link>
            </div>
            <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-xl">
              <WebsiteSections idea={preview.idea} sections={preview.sections} theme={theme} />
            </div>
          </section>
        )}
        {!loading && !preview && !error && (
          <p className="text-center text-slate-500 pb-20 animate-fade-in">Enter an idea to begin.</p>
        )}
        <footer className="border-t border-white/10 py-10 text-center text-xs text-slate-500">Demo project – random section pool + themed showcase.</footer>
      </div>
    </div>
  );
}
