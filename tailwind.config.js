// @ts-check
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', 'class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  presets: [
    createPreset({
      // Using custom colors instead of preset
      cssPrefix: 'fd',
    }),
  ],
  theme: {
    extend: {
      colors: {
        'fd-background': 'hsl(220 27% 9%)',  /* #0b0e14 */
        'fd-foreground': 'hsl(210 17% 98%)',  /* #f5f7fa */
        'fd-card': 'hsl(222 24% 11%)',  /* #141821 */
        'fd-card-foreground': 'hsl(34 5% 73%)',  /* #bfbdb6 */
        'fd-popover': 'hsl(222 24% 11%)',  /* #141821 */
        'fd-popover-foreground': 'hsl(34 5% 73%)',  /* #bfbdb6 */
        'fd-primary': 'hsl(84 54% 49%)',  /* #aad94c */
        'fd-primary-foreground': 'hsl(0 0% 100%)',  /* #ffffff */
        'fd-secondary': 'hsl(223 27% 10%)',  /* #131721 */
        'fd-secondary-foreground': 'hsl(0 0% 100%)',  /* #ffffff */
        'fd-muted': 'hsl(223 9% 25%)',  /* #acb6bf8c */
        'fd-muted-foreground': 'hsl(220 8% 71%)',  /* #acb6bf */
        'fd-accent': 'hsl(68 100% 40%)',  /* #e6b450 */
        'fd-accent-foreground': 'hsl(220 29% 6%)',  /* #ffffff */
        'fd-destructive': 'hsl(0 65% 65%)',  /* #f07178 */
        'fd-destructive-foreground': 'hsl(0 0% 100%)',  /* #ffffff */
        'fd-border': 'hsl(223 9% 25%)',  /* #363c49 */
        'fd-input': 'hsl(223 9% 25%)',  /* #363c49 */
        'fd-ring': 'hsl(39 100% 61%)',  /* #ffb454 */
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            // Add more typography customizations as needed
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};