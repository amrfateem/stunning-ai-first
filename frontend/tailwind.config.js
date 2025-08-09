/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out',
        'rise': 'rise .8s cubic-bezier(.16,.8,.3,1)',
        'slide-up': 'slideUp .7s cubic-bezier(.16,.8,.3,1)',
  'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
  'orb-spin': 'orbSpin 6s linear infinite',
  'ring-pulse': 'ringPulse 2.4s ease-in-out infinite',
  'toggle-slide': 'toggleSlide .55s cubic-bezier(.65,.05,.36,1)',
  'float-slow': 'floatSlow 10s ease-in-out infinite',
  'drift': 'drift 18s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        rise: { '0%': { transform: 'translateY(24px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(40px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
  pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } },
  orbSpin: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
  ringPulse: { '0%,100%': { transform: 'scale(.95)', opacity: .6 }, '50%': { transform: 'scale(1.08)', opacity: .15 } },
  toggleSlide: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(100%)' } },
  floatSlow: { '0%,100%': { transform: 'translateY(-6px)' }, '50%': { transform: 'translateY(6px)' } },
  drift: { '0%': { transform: 'translate3d(0,0,0) rotate(0deg)' }, '100%': { transform: 'translate3d(0,0,0) rotate(360deg)' } },
      },
      boxShadow: {
        glow: '0 0 24px -6px rgba(99,102,241,.55)',
        card: '0 4px 28px -6px rgba(0,0,0,.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.25), transparent 60%)',
        'gradient-hero': 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 40%,#ec4899 90%)',
        'mesh-neon': 'radial-gradient(at 20% 30%, rgba(99,102,241,0.5), transparent 60%), radial-gradient(at 80% 60%, rgba(236,72,153,0.45), transparent 65%), radial-gradient(at 50% 80%, rgba(34,211,238,0.35), transparent 60%)',
        'grid-light': 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'dots-fade': 'radial-gradient(rgba(255,255,255,0.18) 2px, transparent 2px)',
      },
      backgroundSize: {
        'grid-sm': '36px 36px',
        'grid-xs': '20px 20px',
        'dots': '26px 26px',
      },
      blur: {
        30: '30px',
      },
    },
  },
  plugins: [],
};
