
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, md } from "vuetify/iconsets/md";

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const colorMap = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  error: 'var(--color-error)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  onPrimary: 'var(--color-on-primary)',
  onSecondary: 'var(--color-on-secondary)',
  onBackground: 'var(--color-on-background)',
  onSurface: 'var(--color-on-surface)',
}

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: { md },
  },
  theme: {
    defaultTheme: prefersDark ? 'dark' : 'light',
    themes: {
      themes: {
        light: {
          colors: colorMap
        },
        dark: {
          colors: colorMap
        }
      }
    }
  },
});
