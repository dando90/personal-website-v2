import type { Locale } from "@/lib/i18n";
import type { ContactContent } from "./types";

export const contactCopy = {
  "en": {
    "contact": {
      "eyebrow": "CONTACT",
      "title": "Let’s build useful software with a clear purpose.",
      "description": "I’m looking to grow as a software developer in an innovative, international technology environment, contributing to practical products and exploring applied AI.",
      "linkedin": "Connect on LinkedIn",
      "github": "GitHub profile"
    }
  },
  "it": {
    "contact": {
      "eyebrow": "CONTATTI",
      "title": "Costruiamo software utile, con uno scopo chiaro.",
      "description": "Voglio crescere come sviluppatore software in un contesto tecnologico innovativo e internazionale, contribuendo a prodotti concreti e approfondendo l’AI applicata.",
      "linkedin": "Connettiti su LinkedIn",
      "github": "Profilo GitHub"
    }
  },
  "es": {
    "contact": {
      "eyebrow": "CONTACTO",
      "title": "Construyamos software útil y con un propósito claro.",
      "description": "Busco crecer como desarrollador de software en un entorno tecnológico innovador e internacional, contribuyendo a productos prácticos y profundizando en la IA aplicada.",
      "linkedin": "Conecta en LinkedIn",
      "github": "Perfil de GitHub"
    }
  }
} as const satisfies Record<Locale, ContactContent>;
