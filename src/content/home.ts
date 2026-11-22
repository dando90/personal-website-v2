import type { Locale } from "@/lib/i18n";
import type { HomeContent } from "./types";

export const homeCopy = {
  "en": {
    "metadata": {
      "title": "Stefano Chiabrando — Software Engineering & Applied AI",
      "description": "Software developer with hands-on experience in web development and industrial systems, now building deeper expertise in AI applications, LLMs and retrieval systems."
    },
    "hero": {
      "areasLabel": "Areas of focus",
      "eyebrow": "SOFTWARE · AI · INTELLIGENT SYSTEMS",
      "title": "Software engineering for useful, intelligent applications.",
      "description": "I build web software and bring an engineering background from industrial automation. I’m now developing my focus on AI applications, LLMs and retrieval systems.",
      "projects": "View projects",
      "about": "About me",
      "tags": [
        "Applied AI",
        "LLM & RAG",
        "Full-stack development"
      ]
    },
    "explore": {
      "eyebrow": "EXPLORE",
      "title": "Explore the portfolio",
      "description": "Learn about my background, experience, skills and projects.",
      "items": [
        {
          "page": "about",
          "description": "My engineering background and approach to software."
        },
        {
          "page": "experience",
          "description": "Selected work across software development and industrial systems."
        },
        {
          "page": "skills",
          "description": "Technologies and areas I work with and continue to develop."
        },
        {
          "page": "projects",
          "description": "A selection of practical software projects."
        },
        {
          "page": "contact",
          "description": "Ways to connect and discuss a project."
        }
      ]
    }
  },
  "it": {
    "metadata": {
      "title": "Stefano Chiabrando — Ingegneria del software e AI applicata",
      "description": "Sviluppatore software con esperienza pratica nello sviluppo web e nei sistemi industriali; sto approfondendo applicazioni AI, LLM e sistemi di retrieval."
    },
    "hero": {
      "areasLabel": "Aree di interesse",
      "eyebrow": "SOFTWARE · AI · SISTEMI INTELLIGENTI",
      "title": "Ingegneria del software per applicazioni intelligenti e utili.",
      "description": "Sviluppo software web e porto con me una formazione ingegneristica maturata anche nell’automazione industriale. Ora sto approfondendo applicazioni AI, LLM e sistemi di retrieval.",
      "projects": "Vedi i progetti",
      "about": "Chi sono",
      "tags": [
        "AI applicata",
        "LLM & RAG",
        "Sviluppo full stack"
      ]
    },
    "explore": {
      "eyebrow": "ESPLORA",
      "title": "Esplora il portfolio",
      "description": "Scopri il mio percorso, le esperienze, le competenze e i progetti.",
      "items": [
        {
          "page": "about",
          "description": "La mia formazione ingegneristica e il mio approccio al software."
        },
        {
          "page": "experience",
          "description": "Esperienze tra sviluppo software e sistemi industriali."
        },
        {
          "page": "skills",
          "description": "Tecnologie e aree di competenza che continuo ad approfondire."
        },
        {
          "page": "projects",
          "description": "Una selezione di progetti software concreti."
        },
        {
          "page": "contact",
          "description": "I canali per entrare in contatto e parlare di un progetto."
        }
      ]
    }
  },
  "es": {
    "metadata": {
      "title": "Stefano Chiabrando — Ingeniería de software e IA aplicada",
      "description": "Desarrollador de software con experiencia práctica en desarrollo web y sistemas industriales; estoy ampliando mis conocimientos en aplicaciones de IA, LLM y sistemas de recuperación."
    },
    "hero": {
      "areasLabel": "Áreas de enfoque",
      "eyebrow": "SOFTWARE · IA · SISTEMAS INTELIGENTES",
      "title": "Ingeniería de software para aplicaciones inteligentes y útiles.",
      "description": "Desarrollo software web y aporto una formación en ingeniería aplicada también a la automatización industrial. Ahora estoy profundizando en aplicaciones de IA, LLM y sistemas de recuperación.",
      "projects": "Ver proyectos",
      "about": "Sobre mí",
      "tags": [
        "IA aplicada",
        "LLM y RAG",
        "Desarrollo full stack"
      ]
    },
    "explore": {
      "eyebrow": "EXPLORA",
      "title": "Explora el portfolio",
      "description": "Conoce mi trayectoria, experiencia, habilidades y proyectos.",
      "items": [
        {
          "page": "about",
          "description": "Mi formación en ingeniería y mi enfoque del software."
        },
        {
          "page": "experience",
          "description": "Experiencia en desarrollo de software y sistemas industriales."
        },
        {
          "page": "skills",
          "description": "Tecnologías y áreas que utilizo y sigo desarrollando."
        },
        {
          "page": "projects",
          "description": "Una selección de proyectos de software prácticos."
        },
        {
          "page": "contact",
          "description": "Formas de conectar y hablar sobre un proyecto."
        }
      ]
    }
  }
} as const satisfies Record<Locale, HomeContent>;
