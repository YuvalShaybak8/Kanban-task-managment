const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  theme: {
    container: {
      center: true,
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
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
        gray: {
          DEFAULT: "hsl(var(--gray))",
          foreground: "hsl(var(--gray-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          foreground: "hsl(var(--purple-foreground))",
        },
        delete_button: {
          DEFAULT: "hsl(var(--delete-button))",
          foreground: "hsl(var(--delete-button-foreground))",
        },
        sidebar_background: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-background-foreground))",
        },
        column_gray: {
          DEFAULT: "hsl(var(--column-gray))",
          foreground: "hsl(var(--column-gray-foreground))",
        },
        newcolumn: {
          DEFAULT: "hsl(var(--newcolumn))",
          foreground: "hsl(var(--newcolumn-foreground))",
        },
        arrow_color: {
          DEFAULT: "hsl(var(--arrow-color))",
          foreground: "hsl(var(--arrow-color-foreground))",
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
        text: {
          DEFAULT: "hsl(var(--text))",
          foreground: "hsl(var(--text-foreground))",
        },
        button_modal: {
          DEFAULT: "hsl(var(--button_modal))",
          foreground: "hsl(var(--button_modal-foreground))",
        },
        button_text: {
          DEFAULT: "hsl(var(--button_text))",
          foreground: "hsl(var(--button_text-foreground))",
        },
        text_purple: {
          DEFAULT: "hsl(var(--text_purple))",
          foreground: "hsl(var(--text_purple-foreground))",
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
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [animate],
};
