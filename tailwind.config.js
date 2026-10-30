module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
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
        // 라이트/다크에 따라 바뀌는 표면·글자색 (tailwind.css의 CSS 변수)
        card: "rgb(var(--c-card) / <alpha-value>)",
        // 피그마 디자인에서 추출한 브랜드 토큰
        brand: {
          DEFAULT: "#00685f",
          dark: "#00564f",
          mint: "#89f5e7",
          "mint-ink": "#00201d",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          sub: "rgb(var(--c-ink-sub) / <alpha-value>)",
          body: "rgb(var(--c-ink-body) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          soft: "rgb(var(--c-surface-soft) / <alpha-value>)",
          line: "rgb(var(--c-surface-line) / <alpha-value>)",
        },
        sos: { DEFAULT: "#ba1a1a", dark: "#9c1414" },
        amber: { brand: "#825100" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,28,48,0.04), 0 4px 16px rgba(11,28,48,0.04)",
        lift: "0 6px 24px rgba(11,28,48,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translate(-50%, 12px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0) scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "page-in": { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
        "page-out": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(100%)" } },
        "tab-left": { "0%": { opacity: "0", transform: "translateX(24px)" }, "100%": { opacity: "1", transform: "none" } },
        "tab-right": { "0%": { opacity: "0", transform: "translateX(-24px)" }, "100%": { opacity: "1", transform: "none" } },
        "pop": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.2,0.8,0.2,1) both",
        "fade-in": "fade-in 0.2s ease-out both",
        "sheet-up": "sheet-up 0.32s cubic-bezier(0.2,0.8,0.2,1) both",
        "toast-in": "toast-in 0.25s ease-out both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        pop: "pop 0.4s ease-out both",
        "page-in": "page-in 0.3s cubic-bezier(0.2,0.8,0.2,1) both",
        "page-out": "page-out 0.24s ease-in both",
        "tab-left": "tab-left 0.3s cubic-bezier(0.2,0.8,0.2,1) both",
        "tab-right": "tab-right 0.3s cubic-bezier(0.2,0.8,0.2,1) both",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
