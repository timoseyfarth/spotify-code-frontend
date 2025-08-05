// src/plugins/vuetify.ts
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, md } from "vuetify/iconsets/md"; // or mdi, fa, etc.

export const vuetify = createVuetify({
  icons: {
    defaultSet: "md",
    aliases,
    sets: { md },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          error: '#d050df',
        }
      }
    }
  },
});
