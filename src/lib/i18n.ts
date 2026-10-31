export const locales = ["en", "it", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localePreferenceKey = "portfolio-locale";

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function resolveLocale(
  browserLanguages: readonly string[],
  savedLocale?: string | null,
): Locale {
  if (savedLocale && isLocale(savedLocale)) return savedLocale;

  for (const language of browserLanguages) {
    const baseLanguage = language.toLowerCase().split(/[-_]/)[0];
    if (baseLanguage && isLocale(baseLanguage)) return baseLanguage;
  }

  return defaultLocale;
}

export const copy = {
  en: {
    metadata: {
      title: "Stefano Chiabrando — Software Engineering & Applied AI",
      description:
        "Software engineering, AI-powered applications, LLM systems, RAG and agentic workflows.",
    },
    nav: {
      navigation: "Main navigation",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      language: "Language",
    },
    hero: {
      areasLabel: "Areas of focus",
      eyebrow: "SOFTWARE · AI · INTELLIGENT SYSTEMS",
      title: "Building intelligent software.",
      description:
        "AI-powered applications, LLM systems and agentic workflows.",
      projects: "View projects",
      about: "About me",
      tags: ["LLM & RAG", "AI Agents", "Software Engineering"],
    },
    about: {
      eyebrow: "ABOUT",
      title: "Engineering thinking, applied to software and AI.",
      description:
        "With a background in electrical engineering and web development, I bring a practical, systems-oriented perspective to software. I focus on turning AI capabilities into useful applications, with thoughtful workflows and maintainable foundations.",
      principlesTitle: "How I approach a problem",
      principles: [
        "Understand the real need and the system constraints.",
        "Choose the simplest architecture that can grow with the product.",
        "Build, test and refine a concrete solution.",
      ],
    },
    projects: {
      tagsLabel: "Technologies and topics",
      eyebrow: "AREAS OF WORK",
      title: "From intelligent systems to useful products.",
      description:
        "A snapshot of the problems and technologies I’m focusing on. More detailed project case studies will be added as they are ready.",
      items: [
        {
          number: "01",
          title: "Counter JavaScript",
          description:
            "A simple counter application built with JavaScript to practice the fundamentals of the language.",
          tags: ["JavaScript", "DOM Manipulation"],
        },
        {
          number: "02",
          title: "Book Finder",
          description: "A web application focused on searching for books.",
          tags: ["Web Development"],
        },
        {
          number: "03",
          title: "PHP REST API",
          description: "A backend project for building a REST API using PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          number: "04",
          title: "React NY Times Clone",
          description:
            "A recreation of The New York Times website built with React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Explore my GitHub repositories",
    },
    skills: {
      eyebrow: "SKILLS",
      title: "A practical, cross-disciplinary toolkit.",
      groups: [
        {
          title: "Software engineering",
          items: ["TypeScript", "JavaScript", "React", "Next.js", "PHP"],
        },
        {
          title: "Applied AI",
          items: ["AI applications", "LLMs", "RAG", "Agentic systems"],
        },
        {
          title: "Engineering mindset",
          items: [
            "Systems thinking",
            "Technical problem solving",
            "Integration",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Have a thoughtful problem to solve?",
      description:
        "I’m interested in practical software and AI challenges. Find me on LinkedIn or explore my work on GitHub.",
      linkedin: "Connect on LinkedIn",
      github: "GitHub profile",
    },
    footer: {
      note: "Designed and built with care.",
      backToTop: "Back to top",
    },
  },
  it: {
    metadata: {
      title: "Stefano Chiabrando — Ingegneria del software e AI applicata",
      description:
        "Ingegneria del software, applicazioni AI, sistemi LLM, RAG e workflow agentici.",
    },
    nav: {
      navigation: "Navigazione principale",
      about: "Chi sono",
      projects: "Progetti",
      skills: "Competenze",
      contact: "Contatti",
      language: "Lingua",
    },
    hero: {
      areasLabel: "Aree di interesse",
      eyebrow: "SOFTWARE · AI · SISTEMI INTELLIGENTI",
      title: "Sviluppo software intelligente.",
      description: "Applicazioni AI, sistemi LLM e workflow agentici.",
      projects: "Vedi i progetti",
      about: "Chi sono",
      tags: ["LLM & RAG", "Agenti AI", "Software Engineering"],
    },
    about: {
      eyebrow: "CHI SONO",
      title: "Il pensiero ingegneristico applicato a software e AI.",
      description:
        "Con una formazione in ingegneria elettrica e sviluppo web, affronto il software con un approccio pratico e orientato ai sistemi. Mi concentro sul trasformare le capacità dell’AI in applicazioni utili, con workflow curati e basi manutenibili.",
      principlesTitle: "Come affronto un problema",
      principles: [
        "Capire il bisogno reale e i vincoli del sistema.",
        "Scegliere l’architettura più semplice che possa evolvere con il prodotto.",
        "Costruire, verificare e migliorare una soluzione concreta.",
      ],
    },
    projects: {
      tagsLabel: "Tecnologie e argomenti",
      eyebrow: "AREE DI LAVORO",
      title: "Dai sistemi intelligenti a prodotti utili.",
      description:
        "Una panoramica dei problemi e delle tecnologie su cui mi sto concentrando. Aggiungerò casi studio più dettagliati man mano che saranno pronti.",
      items: [
        {
          number: "01",
          title: "Counter JavaScript",
          description:
            "Una semplice applicazione contatore sviluppata con JavaScript per mettere in pratica i fondamenti del linguaggio.",
          tags: ["JavaScript", "DOM Manipulation"],
        },
        {
          number: "02",
          title: "Book Finder",
          description: "Un'applicazione web dedicata alla ricerca di libri.",
          tags: ["Web Development"],
        },
        {
          number: "03",
          title: "PHP REST API",
          description:
            "Un progetto backend per la creazione di un'API REST utilizzando PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          number: "04",
          title: "React NY Times Clone",
          description:
            "Una riproduzione del sito The New York Times realizzata utilizzando React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Esplora i repository su GitHub",
    },
    skills: {
      eyebrow: "COMPETENZE",
      title: "Competenze pratiche e trasversali.",
      groups: [
        {
          title: "Ingegneria del software",
          items: ["TypeScript", "JavaScript", "React", "Next.js", "PHP"],
        },
        {
          title: "AI applicata",
          items: ["Applicazioni AI", "LLM", "RAG", "Sistemi agentici"],
        },
        {
          title: "Approccio ingegneristico",
          items: [
            "Pensiero sistemico",
            "Problem solving tecnico",
            "Integrazione",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "CONTATTI",
      title: "Hai un problema interessante da risolvere?",
      description:
        "Mi interessano le sfide concrete nel software e nell’AI. Mi trovi su LinkedIn o puoi esplorare il mio lavoro su GitHub.",
      linkedin: "Connettiti su LinkedIn",
      github: "Profilo GitHub",
    },
    footer: {
      note: "Progettato e realizzato con cura.",
      backToTop: "Torna all’inizio",
    },
  },
  es: {
    metadata: {
      title: "Stefano Chiabrando — Ingeniería de software e IA aplicada",
      description:
        "Ingeniería de software, aplicaciones de IA, sistemas LLM, RAG y flujos de trabajo agénticos.",
    },
    nav: {
      navigation: "Navegación principal",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
      language: "Idioma",
    },
    hero: {
      areasLabel: "Áreas de enfoque",
      eyebrow: "SOFTWARE · IA · SISTEMAS INTELIGENTES",
      title: "Desarrollo software inteligente.",
      description:
        "Aplicaciones de IA, sistemas LLM y flujos de trabajo agénticos.",
      projects: "Ver proyectos",
      about: "Sobre mí",
      tags: ["LLM y RAG", "Agentes de IA", "Ingeniería de software"],
    },
    about: {
      eyebrow: "SOBRE MÍ",
      title: "Pensamiento de ingeniería aplicado al software y la IA.",
      description:
        "Con formación en ingeniería eléctrica y desarrollo web, aporto al software una perspectiva práctica y centrada en sistemas. Me enfoco en convertir las capacidades de la IA en aplicaciones útiles, con flujos de trabajo bien pensados y bases fáciles de mantener.",
      principlesTitle: "Cómo abordo un problema",
      principles: [
        "Entender la necesidad real y las limitaciones del sistema.",
        "Elegir la arquitectura más sencilla que pueda evolucionar con el producto.",
        "Construir, probar y mejorar una solución concreta.",
      ],
    },
    projects: {
      tagsLabel: "Tecnologías y temas",
      eyebrow: "ÁREAS DE TRABAJO",
      title: "De los sistemas inteligentes a productos útiles.",
      description:
        "Una muestra de los problemas y tecnologías en los que me estoy enfocando. Añadiré casos de estudio más detallados cuando estén listos.",
      items: [
        {
          number: "01",
          title: "Counter JavaScript",
          description:
            "Una sencilla aplicación de contador desarrollada con JavaScript para poner en práctica los fundamentos del lenguaje.",
          tags: ["JavaScript", "Manipulación del DOM"],
        },
        {
          number: "02",
          title: "Book Finder",
          description: "Una aplicación web centrada en la búsqueda de libros.",
          tags: ["Desarrollo web"],
        },
        {
          number: "03",
          title: "PHP REST API",
          description:
            "Un proyecto backend para crear una API REST utilizando PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          number: "04",
          title: "React NY Times Clone",
          description:
            "Una recreación del sitio web The New York Times desarrollada con React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Explora mis repositorios en GitHub",
    },
    skills: {
      eyebrow: "HABILIDADES",
      title: "Un conjunto de habilidades práctico y transversal.",
      groups: [
        {
          title: "Ingeniería de software",
          items: ["TypeScript", "JavaScript", "React", "Next.js", "PHP"],
        },
        {
          title: "IA aplicada",
          items: ["Aplicaciones de IA", "LLM", "RAG", "Sistemas agénticos"],
        },
        {
          title: "Enfoque de ingeniería",
          items: [
            "Pensamiento sistémico",
            "Resolución de problemas",
            "Integración",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "CONTACTO",
      title: "¿Tienes un problema interesante que resolver?",
      description:
        "Me interesan los retos prácticos de software e IA. Puedes encontrarme en LinkedIn o explorar mi trabajo en GitHub.",
      linkedin: "Conecta en LinkedIn",
      github: "Perfil de GitHub",
    },
    footer: {
      note: "Diseñado y desarrollado con cuidado.",
      backToTop: "Volver arriba",
    },
  },
} as const;

export type SiteCopy = (typeof copy)[Locale];
