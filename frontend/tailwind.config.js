// Design-system theme — blue primary · navy text · light-gray bg · white cards.
// No pink or purple anywhere.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ── Typography ─────────────────────────────────── */
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      /* ── Color palette ──────────────────────────────── */
      colors: {
        // Primary — blue scale
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',   // ← main brand
          DEFAULT: '#2563EB',
          700: '#1D4ED8',
          hover: '#1D4ED8', // alias kept for existing components
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },

        // Backgrounds
        background: '#F1F5F9',   // slate-100 — light gray
        surface:    '#FFFFFF',   // white cards

        // Borders
        border: 'rgb(30 41 59 / 0.10)',

        // Text — navy family
        textPrimary:   '#0F172A', // slate-900 — near-navy
        textSecondary: 'rgb(30 41 59 / 0.60)',
        textMuted:     'rgb(30 41 59 / 0.40)',

        // Semantic states
        success: '#16A34A',   // green-600
        warning: '#D97706',   // amber-600
        danger:  '#DC2626',   // red-600
        info:    '#0284C7',   // sky-600
      },

      /* ── Border-radius — large / soft ───────────────── */
      borderRadius: {
        sm:   '0.5rem',    //  8px
        DEFAULT: '0.75rem', // 12px
        md:   '0.75rem',   // 12px
        lg:   '1rem',      // 16px
        xl:   '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
      },

      /* ── Box-shadow — soft, layered ─────────────────── */
      boxShadow: {
        sm:   '0 1px 2px 0 rgb(15 23 42 / 0.04)',
        DEFAULT: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
        md:   '0 4px 6px -1px rgb(15 23 42 / 0.06), 0 2px 4px -2px rgb(15 23 42 / 0.04)',
        lg:   '0 10px 15px -3px rgb(15 23 42 / 0.06), 0 4px 6px -4px rgb(15 23 42 / 0.04)',
        xl:   '0 20px 25px -5px rgb(15 23 42 / 0.06), 0 8px 10px -6px rgb(15 23 42 / 0.04)',
        card: '0 1px 3px 0 rgb(15 23 42 / 0.04), 0 1px 2px -1px rgb(15 23 42 / 0.03)',
        'card-hover': '0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.04)',
      },
    },
  },
  plugins: [],
}
