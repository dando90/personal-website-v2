import type { Locale } from "@/lib/i18n";
import type { AboutContent } from "./types";

export const aboutCopy = {
  "en": {
    "about": {
      "eyebrow": "ABOUT",
      "title": "From industrial systems to software and applied AI.",
      "description": "I’m a software developer with a degree in Electrical Engineering and hands-on experience building web applications. Earlier work in industrial commissioning and troubleshooting shaped my practical, systems-oriented approach. I’m now deepening my focus on AI-powered software, including LLM applications and retrieval-based systems.",
      "imageAlt": "Portrait of Stefano Chiabrando",
      "principlesTitle": "How I approach a problem",
      "principles": [
        "Understand the real need and the system constraints.",
        "Choose the simplest architecture that can grow with the product.",
        "Build, test and refine a concrete solution."
      ]
    }
  },
  "it": {
    "about": {
      "eyebrow": "CHI SONO",
      "title": "Dai sistemi industriali al software e all’AI applicata.",
      "description": "Sono uno sviluppatore software, laureato in Ingegneria Elettrica, con esperienza pratica nella realizzazione di applicazioni web. Il precedente lavoro nel commissioning e nella diagnostica industriale ha rafforzato il mio approccio concreto e orientato ai sistemi. Ora sto approfondendo il software con AI, le applicazioni basate su LLM e i sistemi di retrieval.",
      "imageAlt": "Ritratto di Stefano Chiabrando",
      "principlesTitle": "Come affronto un problema",
      "principles": [
        "Capire il bisogno reale e i vincoli del sistema.",
        "Scegliere l’architettura più semplice che possa evolvere con il prodotto.",
        "Costruire, verificare e migliorare una soluzione concreta."
      ]
    }
  },
  "es": {
    "about": {
      "eyebrow": "SOBRE MÍ",
      "title": "De los sistemas industriales al software y la IA aplicada.",
      "description": "Soy desarrollador de software y graduado en Ingeniería Eléctrica, con experiencia práctica en aplicaciones web. Mi trabajo previo en puesta en marcha y diagnóstico industrial reforzó un enfoque práctico y orientado a sistemas. Ahora estoy profundizando en software con IA, aplicaciones basadas en LLM y sistemas de recuperación de información.",
      "imageAlt": "Retrato de Stefano Chiabrando",
      "principlesTitle": "Cómo abordo un problema",
      "principles": [
        "Entender la necesidad real y las limitaciones del sistema.",
        "Elegir la arquitectura más sencilla que pueda evolucionar con el producto.",
        "Construir, probar y mejorar una solución concreta."
      ]
    }
  }
} as const satisfies Record<Locale, AboutContent>;
