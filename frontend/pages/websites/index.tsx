import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMode } from '../../components/ModeContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface WebsiteListItem {
  id: string;
  idea: string;
  createdAt?: string;
}

export default function WebsitesListPage() {
  const [items, setItems] = useState<WebsiteListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mode } = useMode();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [bulkDialog, setBulkDialog] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/websites`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this website? This cannot be undone.')) return;
    setDeletingIds(prev => new Set(prev).add(id));
    try {
      const res = await fetch(`${API_BASE}/websites/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      setItems(items => items.filter(i => i.id !== id));
    } catch (e:any) {
      alert('Delete failed');
    } finally {
      setDeletingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
  }

  async function handleDeleteAll() {
    if (!bulkDialog) return;
    try {
      const res = await fetch(`${API_BASE}/websites`, { method: 'DELETE', headers: { 'x-confirm-delete-all': 'YES' } });
      if (!res.ok) throw new Error(await res.text());
      setItems([]);
      setBulkDialog(false);
    } catch (e:any) {
      alert('Bulk delete failed');
    }
  }

  return (
    <div className="min-h-screen relative">
      <main className="pt-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <header className="mb-12 text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.05] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Generated Websites</h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">Browse recently generated concepts. Click to view their themed sections.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={()=> setBulkDialog(true)} className="text-xs uppercase tracking-wide px-4 py-2 rounded-lg border border-rose-400/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 font-semibold transition shadow-inner">Delete ALL</button>
              <Link href="/" className="text-xs uppercase tracking-wide px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-semibold shadow-glow transition">Home</Link>
            </div>
          </header>
          {loading && <p className="text-center animate-pulse py-10">Loading...</p>}
          {error && <p className="text-center text-rose-400 py-6">{error}</p>}
          <ul className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map(item => (
              <li key={item.id} className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 flex flex-col gap-4 hover:shadow-glow transition">
                <Link href={`/websites/${item.id}`} className="font-semibold font-display text-lg leading-snug group-hover:text-indigo-300 transition break-words">
                  {item.idea}
                </Link>
                <div className="text-[11px] uppercase tracking-wide text-white/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
                  {item.createdAt && <time>{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</time>}
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <Link href={`/websites/${item.id}`} className="text-xs px-3 py-1.5 rounded-md bg-indigo-600/80 hover:bg-indigo-500 text-white font-medium transition">Open</Link>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200">ID {item.id.slice(-5)}</span>
                    <button disabled={deletingIds.has(item.id)} onClick={()=> handleDelete(item.id)} className="text-[10px] px-2 py-1 rounded bg-rose-500/15 border border-rose-400/30 text-rose-300 hover:bg-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      {deletingIds.has(item.id)?'...':'Del'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {!loading && !error && items.length === 0 && (
              <li className="col-span-full text-center text-slate-500 py-12">No websites yet.</li>
            )}
          </ul>
          {bulkDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur" onClick={()=> setBulkDialog(false)} />
              <div className="relative z-10 w-full max-w-md rounded-2xl border border-rose-400/30 bg-slate-900/90 p-8 flex flex-col gap-6 shadow-xl">
                <h2 className="text-xl font-display font-semibold text-rose-300 tracking-tight">Confirm Full Deletion</h2>
                <p className="text-sm text-slate-300 leading-relaxed">This will permanently delete <span className="font-semibold">all generated websites</span>. This action cannot be undone. Type <span className="text-rose-300">DELETE</span> below to enable the button.</p>
                <BulkDeleteConfirm onConfirm={handleDeleteAll} onCancel={()=> setBulkDialog(false)} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Inline component for confirmation input
const BulkDeleteConfirm: React.FC<{ onConfirm:()=>void; onCancel:()=>void; }> = ({ onConfirm, onCancel }) => {
  const [text, setText] = useState('');
  return (
    <form onSubmit={(e)=> { e.preventDefault(); if(text==='DELETE') onConfirm(); }} className="flex flex-col gap-4">
      <input autoFocus value={text} onChange={e=> setText(e.target.value)} placeholder="Type DELETE" className="w-full rounded-md bg-slate-800/80 border border-slate-600/60 focus:border-rose-400/60 focus:ring-2 focus:ring-rose-500/30 transition px-3 py-2 text-sm" />
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs rounded-md border border-slate-500/40 bg-slate-700/40 hover:bg-slate-700/60 text-slate-200">Cancel</button>
        <button disabled={text!=='DELETE'} className="px-4 py-2 text-xs rounded-md font-semibold tracking-wide bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow">
          Delete All
        </button>
      </div>
    </form>
  );
};
