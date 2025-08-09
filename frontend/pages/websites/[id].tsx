import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { WebsiteSections } from '../../components/WebsiteSections';
import { useMode } from '../../components/ModeContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Section { title: string; content: string; order: number; image?: string; }
interface WebsiteDoc { id: string; idea: string; sections: Section[]; createdAt?: string; }

const THEMES = ['sleek-dark','clean-light','gradient-pop','muted-elegant'];
function useTheme(key?: string) {
  return useMemo(() => {
    if (!key) return THEMES[0];
    let hash = 0; for (let i=0;i<key.length;i++) hash = (hash*31 + key.charCodeAt(i))>>>0;
    return THEMES[hash % THEMES.length];
  }, [key]);
}

export default function WebsiteDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState<WebsiteDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const base = useTheme(typeof id === 'string' ? id : undefined);
  const { mode } = useMode();
  const theme = React.useMemo(() => mode === 'light' ? 'clean-light' : (base === 'gradient-pop' ? 'muted-elegant' : 'sleek-dark'), [mode, base]);

  useEffect(() => {
    if (!id) return; let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/websites/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (!cancelled) setDoc(data);
      } catch (e:any) { if (!cancelled) setError(e.message || 'Failed to load'); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <div className="min-h-screen relative">
      <main className="pt-4">
        {loading && <p className="text-center py-20 animate-pulse">Loading...</p>}
        {error && <p className="text-center py-20 text-rose-400">{error}</p>}
        {doc && (
          <>
            <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-2 mb-10 animate-rise">
              <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.05] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent break-words">
                {doc.idea}
              </h2>
              <div className="text-xs uppercase tracking-wide mt-4 text-white/50 flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" /> Live</span>
                {doc.createdAt && <time>{new Date(doc.createdAt).toLocaleString()}</time>}
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px]">Theme: {theme}</span>
              </div>
            </div>
            <WebsiteSections idea={doc.idea} sections={doc.sections} theme={theme} />
          </>
        )}
      </main>
    </div>
  );
}
