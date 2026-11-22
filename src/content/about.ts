import type { Locale } from "@/lib/i18n";
import type { AboutContent } from "./types";

export const aboutCopy = {
  "en": {
    "about": {
      "eyebrow": "ABOUT",
      "title": "From electrical engineering to software and applied AI.",
      "description": "My path combines an Electrical Engineering degree with hands-on work across industrial automation and web development. In the field, I commissioned and diagnosed production equipment, worked directly with customers across Italy and Spain, and coordinated complex issues with engineers in the UK. In software, I built web experiences and Moodle integrations with Next.js, Tailwind CSS and other web platforms. I’m now developing my focus on AI-powered applications, LLMs and retrieval systems, bringing the same practical, systems-oriented mindset to new problems.",
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
      "title": "Dall’ingegneria elettrica al software e all’AI applicata.",
      "description": "Il mio percorso unisce la laurea in Ingegneria Elettrica all’esperienza pratica nell’automazione industriale e nello sviluppo web. Sul campo ho seguito la messa in servizio e la diagnosi di impianti produttivi, lavorando a contatto con clienti in Italia e Spagna e coordinandomi con tecnici nel Regno Unito. Nel software ho realizzato esperienze web e integrazioni Moodle con Next.js, Tailwind CSS e altre piattaforme web. Oggi sto sviluppando il mio focus sulle applicazioni AI, sugli LLM e sui sistemi di retrieval, con lo stesso approccio concreto e orientato ai sistemi.",
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
      "title": "De la ingeniería eléctrica al software y la IA aplicada.",
      "description": "Mi trayectoria combina un grado en Ingeniería Eléctrica con experiencia práctica en automatización industrial y desarrollo web. En campo, participé en la puesta en marcha y el diagnóstico de equipos de producción, trabajé directamente con clientes de Italia y España y coordiné incidencias complejas con ingenieros del Reino Unido. En software, desarrollé experiencias web e integraciones con Moodle usando Next.js, Tailwind CSS y otras plataformas web. Ahora estoy ampliando mi enfoque hacia las aplicaciones de IA, los LLM y los sistemas de recuperación, con la misma perspectiva práctica y orientada a sistemas.",
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
