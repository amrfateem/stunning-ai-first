import type { AppProps } from 'next/app';
import '../styles.css';
import { ModeProvider } from '../components/ModeContext';
import { AppHeader } from '../components/AppHeader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModeProvider>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/40 antialiased">
        <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />
        <AppHeader />
        <main className="pt-20 relative z-10">
          <Component {...pageProps} />
        </main>
      </div>
    </ModeProvider>
  );
}
