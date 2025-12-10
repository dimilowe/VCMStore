import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'bg-gradient-to-br', 'bg-gradient-to-r', 'bg-gradient-to-b',
    'from-pink-500', 'to-pink-600', 'to-rose-500',
    'from-orange-500', 'to-amber-500',
    'from-blue-500', 'to-blue-600',
    'from-zinc-500', 'to-zinc-600',
    'from-amber-500', 'to-yellow-500',
    'from-purple-500', 'to-violet-600', 'to-purple-600',
    'from-green-500', 'to-emerald-500',
    'from-rose-500', 'to-pink-500',
    'from-sky-500', 'to-indigo-500',
    'from-cyan-400', 'to-blue-500',
    'from-cyan-500', 'to-blue-600',
    'from-orange-400', 'to-rose-500',
    'from-violet-400', 'to-purple-500',
    'from-green-400', 'to-teal-500',
    'from-amber-400', 'to-orange-500',
    'from-indigo-400',
    'bg-white/10', 'border-white/20',
    'from-red-400', 'to-red-500',
    'from-blue-400', 'to-blue-500',
    'from-purple-400', 'to-purple-500',
    'from-zinc-400', 'to-zinc-500',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
