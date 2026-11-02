import type { Locale } from "@/lib/i18n";
import type { CommonContent } from "./types";

export const commonCopy = {
  "en": {
    "nav": {
      "navigation": "Main navigation",
      "about": "About",
      "experience": "Experience",
      "projects": "Projects",
      "skills": "Skills",
      "contact": "Contact",
      "language": "Language"
    },
    "footer": {
      "note": "Designed and built with care.",
      "socialLinks": "Social links",
      "backToTop": "Back to top"
    }
  },
  "it": {
    "nav": {
      "navigation": "Navigazione principale",
      "about": "Chi sono",
      "experience": "Esperienza",
      "projects": "Progetti",
      "skills": "Competenze",
      "contact": "Contatti",
      "language": "Lingua"
    },
    "footer": {
      "note": "Progettato e realizzato con cura.",
      "socialLinks": "Profili social",
      "backToTop": "Torna all’inizio"
    }
  },
  "es": {
    "nav": {
      "navigation": "Navegación principal",
      "about": "Sobre mí",
      "experience": "Experiencia",
      "projects": "Proyectos",
      "skills": "Habilidades",
      "contact": "Contacto",
      "language": "Idioma"
    },
    "footer": {
      "note": "Diseñado y desarrollado con cuidado.",
      "socialLinks": "Redes sociales",
      "backToTop": "Volver arriba"
    }
  }
} as const satisfies Record<Locale, CommonContent>;
