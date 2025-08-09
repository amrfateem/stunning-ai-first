import React from 'react';

interface Section { title: string; content: string; order: number; image?: string; }
interface Props { idea: string; sections: Section[]; theme: string; }

const gradientMap: Record<string, string> = {
  'sleek-dark': 'from-slate-950 via-slate-900 to-slate-950',
  'clean-light': 'from-white via-slate-50 to-white',
  'gradient-pop': 'from-indigo-500 via-fuchsia-500 to-rose-500',
  'muted-elegant': 'from-stone-900 via-stone-800 to-stone-900',
  'neon-mesh': 'from-slate-900 via-slate-900 to-slate-900',
  'ocean-glass': 'from-cyan-900 via-sky-900 to-indigo-950',
  'sunset-glow': 'from-rose-700 via-orange-500 to-amber-500',
  'forest-aura': 'from-emerald-900 via-teal-800 to-green-900',
};

const accentPillMap: Record<string, string> = {
  'sleek-dark': 'text-indigo-300/80 bg-indigo-500/10 border-indigo-400/30',
  'clean-light': 'text-sky-600/80 bg-sky-500/10 border-sky-400/30',
  'gradient-pop': 'text-yellow-300/80 bg-yellow-400/10 border-yellow-300/30',
  'muted-elegant': 'text-amber-300/80 bg-amber-500/10 border-amber-400/30',
  'neon-mesh': 'text-fuchsia-300/80 bg-fuchsia-500/10 border-fuchsia-400/30',
  'ocean-glass': 'text-cyan-300/80 bg-cyan-500/10 border-cyan-400/30',
  'sunset-glow': 'text-amber-200/80 bg-amber-400/10 border-amber-300/30',
  'forest-aura': 'text-emerald-300/80 bg-emerald-500/10 border-emerald-400/30',
};

const accentGradientTextMap: Record<string, string> = {
  'sleek-dark': 'from-indigo-300 via-indigo-200 to-indigo-400',
  'clean-light': 'from-sky-500 via-sky-400 to-sky-600',
  'gradient-pop': 'from-yellow-200 via-yellow-300 to-yellow-400',
  'muted-elegant': 'from-amber-300 via-amber-200 to-amber-400',
  'neon-mesh': 'from-fuchsia-300 via-purple-300 to-cyan-300',
  'ocean-glass': 'from-cyan-200 via-sky-300 to-indigo-300',
  'sunset-glow': 'from-amber-200 via-orange-200 to-rose-200',
  'forest-aura': 'from-emerald-200 via-teal-200 to-lime-200',
};

const primaryBtnMap: Record<string, string> = {
  'sleek-dark': 'bg-indigo-600 hover:bg-indigo-500',
  'clean-light': 'bg-sky-600 hover:bg-sky-500',
  'gradient-pop': 'bg-yellow-400 text-slate-900 hover:bg-yellow-300',
  'muted-elegant': 'bg-amber-500 hover:bg-amber-400',
  'neon-mesh': 'bg-fuchsia-500 hover:bg-fuchsia-400',
  'ocean-glass': 'bg-cyan-500 hover:bg-cyan-400',
  'sunset-glow': 'bg-rose-500 hover:bg-rose-400',
  'forest-aura': 'bg-emerald-500 hover:bg-emerald-400',
};

const secondaryBtnMap: Record<string, string> = {
  'sleek-dark': 'text-indigo-100 hover:text-white',
  'clean-light': 'text-sky-700 hover:text-sky-900',
  'gradient-pop': 'text-yellow-100 hover:text-white',
  'muted-elegant': 'text-amber-100 hover:text-amber-50',
  'neon-mesh': 'text-fuchsia-200 hover:text-fuchsia-100',
  'ocean-glass': 'text-cyan-200 hover:text-cyan-100',
  'sunset-glow': 'text-rose-100 hover:text-white',
  'forest-aura': 'text-emerald-100 hover:text-emerald-50',
};

function isLightTheme(t: string) {
  return t === 'clean-light' || t === 'sunset-glow';
}

export const WebsiteSections: React.FC<Props> = ({ idea, sections, theme }) => {
  const grad = gradientMap[theme] || gradientMap['sleek-dark'];
  const pill = accentPillMap[theme] || accentPillMap['sleek-dark'];
  const gradText = accentGradientTextMap[theme] || accentGradientTextMap['sleek-dark'];
  const primaryBtn = primaryBtnMap[theme] || primaryBtnMap['sleek-dark'];
  const secondaryBtn = secondaryBtnMap[theme] || secondaryBtnMap['sleek-dark'];
  const light = isLightTheme(theme);
  const baseText = light ? 'text-slate-800' : 'text-slate-50';
  const subtleText = light ? 'text-slate-600' : 'text-white/80';
  const overlayTop = light ? 'from-white/60' : 'from-black/40';
  const overlayBottom = light ? 'from-white/60' : 'from-black/40';

  // Decorative layers diversity
  const deco = theme === 'neon-mesh'
    ? 'before:absolute before:inset-0 before:bg-mesh-neon before:opacity-60'
    : theme === 'ocean-glass'
    ? 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-cyan-500/20 before:to-indigo-900/40'
    : theme === 'sunset-glow'
    ? 'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]'
    : theme === 'forest-aura'
    ? 'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.25),transparent_60%)]'
    : '';
  const pattern = theme === 'clean-light'
    ? 'after:absolute after:inset-0 after:bg-grid-light after:bg-grid-sm after:opacity-[0.15]'
    : theme === 'sleek-dark' || theme === 'muted-elegant'
    ? 'after:absolute after:inset-0 after:bg-grid-dark after:bg-grid-sm after:opacity-[0.08]'
    : '';

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${grad} ${baseText} font-sans ${deco} ${pattern}`}>
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial mix-blend-plus-lighter" />
  {/* Toggle removed; now handled by external header */}
      <div className="relative z-10 flex flex-col">
        {sections
          .slice()
            .sort((a, b) => a.order - b.order)
            .map((s, idx) => (
              <section key={s.order} className={`section-wrapper py-16 sm:py-20 xl:py-24 animate-fade-in ${idx%2===1?'relative':''}`} data-delay={idx*120}>
                {idx%2===1 && (
                  <div className="pointer-events-none absolute -inset-x-10 -top-10 -bottom-10 opacity-40 blur-3xl select-none hidden md:block">
                    <div className={`w-full h-full ${theme==='neon-mesh'?'bg-[conic-gradient(at_50%_50%,#6366f1,#ec4899,#06b6d4,#6366f1)] animate-drift':'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]'} rounded-full`} />
                  </div>
                )}
                {(() => {
                  // Variant selection by index & title
                  const title = s.title.toLowerCase();
                  if (idx === 0) {
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-7xl flex flex-col items-center text-center gap-10">
                        <span className={`inline-block text-[11px] tracking-widest uppercase font-semibold px-4 py-1.5 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                        <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
                          <span className={`bg-gradient-to-r ${gradText} bg-clip-text text-transparent`}>{idea}</span> — {s.title}
                        </h1>
                        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${subtleText}`}>{s.content}</p>
                        <div className="flex flex-wrap gap-5 justify-center">
                          <a className={`btn-primary ${primaryBtn} shadow-glow`} href="#get-started">Start Now</a>
                          <a className={`btn-secondary ${secondaryBtn}`} href="#learn">Explore</a>
                        </div>
                        {s.image && (
                          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-lg aspect-[16/7]">
                            <img src={s.image} alt={`${idea} hero visual`} className={`absolute inset-0 w-full h-full object-cover ${light?'':'brightness-90'} scale-[1.03] transition hover:scale-100`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          </div>
                        )}
                      </div>
                    );
                  }
                  if (title.includes('feature')) {
                    const bullets = s.content.split(':').slice(1).join(':').split(',').map(b=>b.trim()).filter(Boolean).slice(0,6);
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-7xl">
                        <header className="mb-12 space-y-4 max-w-2xl">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight max-w-[18ch]">Key Capabilities</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content.split(':')[0]}</p>
                        </header>
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {bullets.map((b,i)=>(
                            <div key={i} className={`rounded-2xl p-6 border backdrop-blur flex flex-col gap-3 ${light?'border-slate-200/60 bg-white/60':'border-white/10 bg-white/5'} hover:shadow-glow transition`}> 
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${light?'bg-indigo-600 text-white':'bg-indigo-500/20 text-indigo-300'}`}>{i+1}</div>
                              <p className="text-sm leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('testimonial')) {
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl flex flex-col gap-10 items-center text-center">
                        <header className="space-y-4">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">What People Say</h2>
                        </header>
                        <blockquote className={`relative text-xl sm:text-2xl leading-relaxed font-medium max-w-3xl ${subtleText}`}>
                          <span className="absolute -left-4 -top-6 text-6xl opacity-30 select-none">“</span>
                          {s.content}
                          <span className="absolute -right-4 -bottom-8 text-6xl opacity-30 select-none">”</span>
                        </blockquote>
                      </div>
                    );
                  }
                  if (title.includes('pricing')) {
                    const tiers = [
                      { name:'Starter', price:'Free', desc:'Try the core idea', cta:'Get Started'},
                      { name:'Pro', price:'$29', desc:'Scale collaboration', cta:'Upgrade'},
                      { name:'Enterprise', price:'Custom', desc:'Advanced controls', cta:'Contact'},
                    ];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-6xl">
                        <header className="mb-12 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Simple Pricing</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
                          {tiers.map((t,i)=>(
                            <div key={t.name} className={`relative rounded-2xl p-6 flex flex-col gap-4 border backdrop-blur ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} hover:shadow-glow transition`}>
                              {i===1 && <span className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow">Popular</span>}
                              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                              <div className="text-3xl font-bold">{t.price}<span className="text-sm font-medium opacity-70">{t.price==='Free'?'':' /mo'}</span></div>
                              <p className={`text-sm ${subtleText}`}>{t.desc}</p>
                              <a href="#pricing" className={`mt-auto btn-primary ${primaryBtn}`}>{t.cta}</a>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('faq')) {
                    const faqs = s.content.split(':').slice(1).join(':').split(',').map(q=>q.trim()).filter(Boolean).slice(0,4);
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl">
                        <header className="mb-10 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Questions</h2>
                        </header>
                        <div className="space-y-4">
                          {faqs.length? faqs.map((q,i)=>(
                            <div key={i} className={`rounded-xl p-5 border ${light?'border-slate-200/60 bg-white/60':'border-white/10 bg-white/5'} backdrop-blur`}> 
                              <p className="font-medium mb-2">{q}</p>
                              <p className={`text-sm ${subtleText}`}>Answer about {idea} — placeholder copy expanding on “{q}”.</p>
                            </div>
                          )): <p className={`text-sm ${subtleText}`}>{s.content}</p>}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('metrics')) {
                    const nums = [
                      { label: 'Cycle Time ↓', value: '32%'},
                      { label: 'Activation ↑', value: '21%'},
                      { label: 'Retention Lift', value: '14%'}
                    ];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-6xl">
                        <header className="mb-14 text-center space-y-4">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Impact Metrics</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
                          {nums.map(n => (
                            <div key={n.label} className={`rounded-2xl p-8 flex flex-col items-center text-center gap-3 border backdrop-blur ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} hover:shadow-glow transition`}>
                              <div className="text-5xl font-bold font-display tracking-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">{n.value}</div>
                              <p className={`text-xs uppercase tracking-wide ${subtleText}`}>{n.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('integration')) {
                    const stack = ['Slack','Notion','GitHub','Jira','HubSpot','Webhooks'];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl">
                        <header className="mb-12 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Ecosystem</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="flex flex-wrap justify-center gap-4">
                          {stack.map(name => (
                            <div key={name} className={`px-5 py-3 rounded-xl text-sm font-medium border ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur hover:shadow-glow transition`}>{name}</div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('security')) {
                    const items = ['Least-privilege access','Encryption at rest & transit','Regional data residency','SAML / SSO roadmap','Audit trails'];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-4xl">
                        <header className="mb-10 space-y-4">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Trust & Security</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <ul className="grid gap-4 sm:grid-cols-2">
                          {items.map(it => (
                            <li key={it} className={`flex items-start gap-3 p-4 rounded-xl border ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}> 
                              <span className="mt-1 w-2 h-2 rounded-full bg-indigo-400" />
                              <p className="text-sm leading-relaxed">{it}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (title.includes('roadmap')) {
                    const phases = [
                      { q: 'Now', d: 'Deeper analytics, adaptive suggestions' },
                      { q: 'Next', d: 'Extension marketplace, richer roles' },
                      { q: 'Later', d: 'Autonomous orchestration & predictive ops' },
                    ];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl">
                        <header className="mb-12 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Product Roadmap</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="grid gap-6 sm:grid-cols-3">
                          {phases.map(p => (
                            <div key={p.q} className={`rounded-2xl p-6 border flex flex-col gap-3 ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}> 
                              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300">{p.q}</span>
                              <p className="text-sm leading-relaxed">{p.d}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('case studies')) {
                    const cases = [
                      { name: 'Product Org', result: 'Specs 2x faster', note: 'Aligned rituals & shared clarity' },
                      { name: 'Agency', result: 'Launch ops streamlined', note: 'Template reuse & automation' },
                      { name: 'Startup', result: 'Pilots closed sooner', note: 'Responsive insight loops' },
                    ];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-6xl">
                        <header className="mb-12 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Case Studies</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="grid gap-6 sm:grid-cols-3">
                          {cases.map(c => (
                            <div key={c.name} className={`rounded-2xl p-6 border flex flex-col gap-4 ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}> 
                              <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                              <p className="text-sm font-medium text-indigo-300">{c.result}</p>
                              <p className={`text-sm ${subtleText}`}>{c.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('onboarding')) {
                    const steps = ['Choose template','Import data','Configure automations','Share & collaborate'];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl">
                        <header className="mb-10 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Fast Onboarding</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <ol className="grid gap-6 sm:grid-cols-4">
                          {steps.map((st,i)=>(
                            <li key={st} className={`relative rounded-xl p-5 border flex flex-col gap-3 ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}> 
                              <span className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold bg-indigo-600 text-white text-sm">{i+1}</span>
                              <p className="text-sm leading-relaxed">{st}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  }
                  if (title.includes('customization')) {
                    const facets = ['Schema Extensions','Conditional Blocks','Theme Tokens','API Hooks'];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-4xl">
                        <header className="mb-10 space-y-4">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Customization</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <div className="flex flex-wrap gap-4">
                          {facets.map(f => (
                            <div key={f} className={`px-4 py-2 rounded-lg border text-sm font-medium ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}>{f}</div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (title.includes('sustainability')) {
                    const points = ['Compute optimized workflows','Reduced redundancy','Lower operational overhead','Environmental footprint focus'];
                    return (
                      <div className="mx-auto px-6 sm:px-10 max-w-5xl">
                        <header className="mb-12 space-y-4 text-center">
                          <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                          <h2 className="font-display text-3xl sm:text-5xl font-semibold">Sustainability</h2>
                          <p className={`text-base sm:text-lg ${subtleText}`}>{s.content}</p>
                        </header>
                        <ul className="grid gap-4 sm:grid-cols-2">
                          {points.map(pt => (
                            <li key={pt} className={`p-5 rounded-xl border flex gap-4 items-start ${light?'bg-white/60 border-slate-200/60':'bg-white/5 border-white/10'} backdrop-blur`}> 
                              <span className="w-2 h-2 rounded-full mt-2 bg-emerald-400" />
                              <p className="text-sm leading-relaxed">{pt}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  // Generic alternating layout
                  const reverse = idx % 2 === 1;
                  return (
                    <div className="mx-auto px-6 sm:px-10 max-w-7xl">
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${reverse && s.image ? 'lg:[&>*:first-child]:order-last' : ''}`}> 
                        <div className={`${s.image ? 'lg:col-span-6' : 'lg:col-span-10'} flex flex-col gap-8`}> 
                          <header className="space-y-4">
                            <span className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full border backdrop-blur ${pill}`}>{s.title}</span>
                            <h2 className="font-display text-3xl sm:text-5xl leading-tight font-semibold max-w-[20ch]">
                              {s.title}
                            </h2>
                          </header>
                          <p className={`text-base sm:text-lg leading-relaxed max-w-prose ${subtleText}`}>{s.content}</p>
                          <div className="flex flex-wrap gap-4">
                            <a className={`btn-primary ${primaryBtn} shadow-glow`} href="#cta">Get Started</a>
                            <a className={`btn-secondary ${secondaryBtn}`} href="#learn">Learn More</a>
                          </div>
                        </div>
                        {s.image && (
                          <div className="lg:col-span-6">
                            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg aspect-[4/3]">
                              <img src={s.image} alt={`${idea} ${s.title} visual`} className={`absolute inset-0 w-full h-full object-cover transition duration-700 ease-out scale-[1.03] hover:scale-100 ${light?'':'brightness-90'}`} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </section>
            ))}
      </div>
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${overlayTop} to-transparent pointer-events-none`} />
      <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${overlayBottom} to-transparent pointer-events-none`} />
    </div>
  );
};
