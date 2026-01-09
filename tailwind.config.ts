import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0b1220"
        }
      },
      boxShadow: {
        card: "0 20px 45px -30px rgba(15, 23, 42, 0.45)",
        glow: "0 10px 30px -15px rgba(37, 99, 235, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
