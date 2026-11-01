import type { ProjectId } from "@/lib/project-assets";

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

export const copy = {
  en: {
    metadata: {
      title: "Stefano Chiabrando — Software Engineering & Applied AI",
      description:
        "Software developer with a background in electrical engineering, web development and industrial systems, now focusing on applied AI, LLM applications and RAG.",
    },
    nav: {
      navigation: "Main navigation",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      language: "Language",
    },
    hero: {
      areasLabel: "Areas of focus",
      eyebrow: "SOFTWARE · AI · INTELLIGENT SYSTEMS",
      title: "Software engineering for practical AI.",
      description:
        "I build web applications and am expanding my work into LLMs, retrieval-augmented generation and applied AI.",
      projects: "View projects",
      about: "About me",
      tags: ["Applied AI", "LLM & RAG", "Full-stack development"],
    },
    about: {
      eyebrow: "ABOUT",
      title: "From industrial systems to software and applied AI.",
      description:
        "I’m a software developer with a degree in Electrical Engineering and hands-on experience building web applications. Earlier work in industrial commissioning and troubleshooting shaped my practical, systems-oriented approach. I’m now deepening my focus on AI-powered software, including LLM applications and retrieval-based systems.",
      imageAlt: "Portrait of Stefano Chiabrando",
      principlesTitle: "How I approach a problem",
      principles: [
        "Understand the real need and the system constraints.",
        "Choose the simplest architecture that can grow with the product.",
        "Build, test and refine a concrete solution.",
      ],
    },
    experience: {
      eyebrow: "EXPERIENCE",
      title: "Software delivery grounded in engineering practice.",
      items: [
        {
          role: "Service Engineer",
          company: "Inductotherm Group Italy",
          period: "Jan 2025 – Apr 2026",
          description:
            "Installed, commissioned and maintained industrial induction welding and cutting systems; diagnosed electrical and automation faults and contributed to a Siemens-based production-line project.",
        },
        {
          role: "Full Stack Developer",
          company: "Niomind s.r.l. SB",
          period: "Aug 2023 – Apr 2024",
          description:
            "Built frontend applications with Next.js and Tailwind CSS and developed plugins and integrations for Moodle-based e-learning platforms.",
        },
        {
          role: "Web Developer",
          company: "El Garbo de Greta Comunicación",
          period: "Dec 2022 – Jan 2023",
          description:
            "Redesigned a corporate website and developed and maintained websites for hospitality and small-business clients, including WordPress and PrestaShop projects.",
        },
        {
          role: "Commissioning Technician",
          company: "SAET S.p.A.",
          period: "May 2019 – Nov 2019",
          description:
            "Tested and commissioned industrial induction machinery, verified Siemens PLCs and ran automatic-cycle and fault-simulation tests.",
        },
      ],
    },
    projects: {
      tagsLabel: "Technologies and topics",
      sourceCode: "Source code",
      liveDemo: "Live demo",
      eyebrow: "AREAS OF WORK",
      title: "From intelligent systems to useful products.",
      description:
        "A snapshot of the problems and technologies I’m focusing on. More detailed project case studies will be added as they are ready.",
      items: [
        {
          id: "counterJavaScript" satisfies ProjectId,
          number: "01",
          title: "Counter JavaScript",
          imageAlt: "Placeholder artwork for the Counter JavaScript project",
          description:
            "A simple counter application built with JavaScript to practice the fundamentals of the language.",
          tags: ["JavaScript", "DOM Manipulation"],
        },
        {
          id: "bookFinder" satisfies ProjectId,
          number: "02",
          title: "Book Finder",
          imageAlt: "Placeholder artwork for the Book Finder project",
          description: "A web application focused on searching for books.",
          tags: ["Web Development"],
        },
        {
          id: "phpRestApi" satisfies ProjectId,
          number: "03",
          title: "PHP REST API",
          imageAlt: "Placeholder artwork for the PHP REST API project",
          description: "A backend project for building a REST API using PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          id: "reactNyTimesClone" satisfies ProjectId,
          number: "04",
          title: "React NY Times Clone",
          imageAlt: "Placeholder artwork for the React NY Times Clone project",
          description:
            "A recreation of The New York Times website built with React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Explore my GitHub repositories",
    },
    skills: {
      eyebrow: "SKILLS",
      title: "A practical toolkit across software, data and AI.",
      groups: [
        {
          title: "Software engineering",
          items: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Python", "PHP", "Laravel", "REST APIs"],
        },
        {
          title: "Applied AI",
          items: ["LangChain", "LLM integration", "RAG", "Embeddings", "Semantic search"],
        },
        {
          title: "Data and engineering practice",
          items: [
            "Systems thinking",
            "Technical problem solving",
            "SQL · MySQL",
          ],
        },
        {
          title: "Languages",
          items: ["Italian · Native", "English · B2", "Spanish · B2"],
        },
      ],
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let’s build useful software with a clear purpose.",
      description:
        "I’m looking to grow as a software developer in an innovative, international technology environment, contributing to practical products and exploring applied AI.",
      linkedin: "Connect on LinkedIn",
      github: "GitHub profile",
    },
    footer: {
      note: "Designed and built with care.",
      socialLinks: "Social links",
      backToTop: "Back to top",
    },
  },
  it: {
    metadata: {
      title: "Stefano Chiabrando — Ingegneria del software e AI applicata",
      description:
        "Sviluppatore software con formazione in ingegneria elettrica ed esperienza nello sviluppo web e nei sistemi industriali; oggi con focus sull’AI applicata, gli LLM e il RAG.",
    },
    nav: {
      navigation: "Navigazione principale",
      about: "Chi sono",
      experience: "Esperienza",
      projects: "Progetti",
      skills: "Competenze",
      contact: "Contatti",
      language: "Lingua",
    },
    hero: {
      areasLabel: "Aree di interesse",
      eyebrow: "SOFTWARE · AI · SISTEMI INTELLIGENTI",
      title: "Ingegneria del software per un’AI concreta.",
      description:
        "Sviluppo applicazioni web e sto approfondendo LLM, generazione aumentata dal recupero delle informazioni e AI applicata.",
      projects: "Vedi i progetti",
      about: "Chi sono",
      tags: ["AI applicata", "LLM & RAG", "Sviluppo full stack"],
    },
    about: {
      eyebrow: "CHI SONO",
      title: "Dai sistemi industriali al software e all’AI applicata.",
      description:
        "Sono uno sviluppatore software, laureato in Ingegneria Elettrica, con esperienza pratica nella realizzazione di applicazioni web. Il precedente lavoro nel commissioning e nella diagnostica industriale ha rafforzato il mio approccio concreto e orientato ai sistemi. Ora sto approfondendo il software con AI, le applicazioni basate su LLM e i sistemi di retrieval.",
      imageAlt: "Ritratto di Stefano Chiabrando",
      principlesTitle: "Come affronto un problema",
      principles: [
        "Capire il bisogno reale e i vincoli del sistema.",
        "Scegliere l’architettura più semplice che possa evolvere con il prodotto.",
        "Costruire, verificare e migliorare una soluzione concreta.",
      ],
    },
    experience: {
      eyebrow: "ESPERIENZA",
      title: "Software concreto, con solide basi ingegneristiche.",
      items: [
        {
          role: "Service Engineer",
          company: "Inductotherm Group Italy",
          period: "Gen 2025 – Apr 2026",
          description:
            "Installazione, commissioning e manutenzione di impianti industriali per saldatura e taglio a induzione; diagnosi di guasti elettrici e di automazione e contributo a un progetto di linea produttiva basato su Siemens.",
        },
        {
          role: "Full Stack Developer",
          company: "Niomind s.r.l. SB",
          period: "Ago 2023 – Apr 2024",
          description:
            "Sviluppo di applicazioni frontend con Next.js e Tailwind CSS e realizzazione di plugin e integrazioni per piattaforme e-learning basate su Moodle.",
        },
        {
          role: "Web Developer",
          company: "El Garbo de Greta Comunicación",
          period: "Dic 2022 – Gen 2023",
          description:
            "Restyling di un sito aziendale e sviluppo e gestione di siti per attività ricettive e piccole imprese, con progetti WordPress e PrestaShop.",
        },
        {
          role: "Tecnico di commissioning",
          company: "SAET S.p.A.",
          period: "Mag 2019 – Nov 2019",
          description:
            "Collaudo e messa in servizio di macchinari industriali a induzione, verifiche su PLC Siemens e test di cicli automatici e simulazione guasti.",
        },
      ],
    },
    projects: {
      tagsLabel: "Tecnologie e argomenti",
      sourceCode: "Codice sorgente",
      liveDemo: "Demo online",
      eyebrow: "AREE DI LAVORO",
      title: "Dai sistemi intelligenti a prodotti utili.",
      description:
        "Una panoramica dei problemi e delle tecnologie su cui mi sto concentrando. Aggiungerò casi studio più dettagliati man mano che saranno pronti.",
      items: [
        {
          id: "counterJavaScript" satisfies ProjectId,
          number: "01",
          title: "Counter JavaScript",
          imageAlt: "Immagine segnaposto del progetto Counter JavaScript",
          description:
            "Una semplice applicazione contatore sviluppata con JavaScript per mettere in pratica i fondamenti del linguaggio.",
          tags: ["JavaScript", "DOM Manipulation"],
        },
        {
          id: "bookFinder" satisfies ProjectId,
          number: "02",
          title: "Book Finder",
          imageAlt: "Immagine segnaposto del progetto Book Finder",
          description: "Un'applicazione web dedicata alla ricerca di libri.",
          tags: ["Web Development"],
        },
        {
          id: "phpRestApi" satisfies ProjectId,
          number: "03",
          title: "PHP REST API",
          imageAlt: "Immagine segnaposto del progetto PHP REST API",
          description:
            "Un progetto backend per la creazione di un'API REST utilizzando PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          id: "reactNyTimesClone" satisfies ProjectId,
          number: "04",
          title: "React NY Times Clone",
          imageAlt: "Immagine segnaposto del progetto React NY Times Clone",
          description:
            "Una riproduzione del sito The New York Times realizzata utilizzando React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Esplora i repository su GitHub",
    },
    skills: {
      eyebrow: "COMPETENZE",
      title: "Competenze pratiche tra software, dati e AI.",
      groups: [
        {
          title: "Ingegneria del software",
          items: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Python", "PHP", "Laravel", "API REST"],
        },
        {
          title: "AI applicata",
          items: ["LangChain", "Integrazione LLM", "RAG", "Embeddings", "Ricerca semantica"],
        },
        {
          title: "Dati e metodo ingegneristico",
          items: [
            "Pensiero sistemico",
            "Problem solving tecnico",
            "SQL · MySQL",
          ],
        },
        {
          title: "Lingue",
          items: ["Italiano · Madrelingua", "Inglese · B2", "Spagnolo · B2"],
        },
      ],
    },
    contact: {
      eyebrow: "CONTATTI",
      title: "Costruiamo software utile, con uno scopo chiaro.",
      description:
        "Voglio crescere come sviluppatore software in un contesto tecnologico innovativo e internazionale, contribuendo a prodotti concreti e approfondendo l’AI applicata.",
      linkedin: "Connettiti su LinkedIn",
      github: "Profilo GitHub",
    },
    footer: {
      note: "Progettato e realizzato con cura.",
      socialLinks: "Profili social",
      backToTop: "Torna all’inizio",
    },
  },
  es: {
    metadata: {
      title: "Stefano Chiabrando — Ingeniería de software e IA aplicada",
      description:
        "Desarrollador de software con formación en ingeniería eléctrica y experiencia en desarrollo web y sistemas industriales; ahora enfocado en IA aplicada, LLM y RAG.",
    },
    nav: {
      navigation: "Navegación principal",
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
      language: "Idioma",
    },
    hero: {
      areasLabel: "Áreas de enfoque",
      eyebrow: "SOFTWARE · IA · SISTEMAS INTELIGENTES",
      title: "Ingeniería de software para una IA práctica.",
      description:
        "Desarrollo aplicaciones web y estoy ampliando mi experiencia en LLM, generación aumentada por recuperación e IA aplicada.",
      projects: "Ver proyectos",
      about: "Sobre mí",
      tags: ["IA aplicada", "LLM y RAG", "Desarrollo full stack"],
    },
    about: {
      eyebrow: "SOBRE MÍ",
      title: "De los sistemas industriales al software y la IA aplicada.",
      description:
        "Soy desarrollador de software y graduado en Ingeniería Eléctrica, con experiencia práctica en aplicaciones web. Mi trabajo previo en puesta en marcha y diagnóstico industrial reforzó un enfoque práctico y orientado a sistemas. Ahora estoy profundizando en software con IA, aplicaciones basadas en LLM y sistemas de recuperación de información.",
      imageAlt: "Retrato de Stefano Chiabrando",
      principlesTitle: "Cómo abordo un problema",
      principles: [
        "Entender la necesidad real y las limitaciones del sistema.",
        "Elegir la arquitectura más sencilla que pueda evolucionar con el producto.",
        "Construir, probar y mejorar una solución concreta.",
      ],
    },
    experience: {
      eyebrow: "EXPERIENCIA",
      title: "Desarrollo de software con base en la ingeniería práctica.",
      items: [
        {
          role: "Service Engineer",
          company: "Inductotherm Group Italy",
          period: "Ene 2025 – Abr 2026",
          description:
            "Instalación, puesta en marcha y mantenimiento de equipos industriales de soldadura y corte por inducción; diagnóstico de fallos eléctricos y de automatización y participación en un proyecto de producción basado en Siemens.",
        },
        {
          role: "Full Stack Developer",
          company: "Niomind s.r.l. SB",
          period: "Ago 2023 – Abr 2024",
          description:
            "Desarrollo de aplicaciones frontend con Next.js y Tailwind CSS, además de plugins e integraciones para plataformas de aprendizaje basadas en Moodle.",
        },
        {
          role: "Web Developer",
          company: "El Garbo de Greta Comunicación",
          period: "Dic 2022 – Ene 2023",
          description:
            "Rediseño de un sitio corporativo y desarrollo y gestión de webs para alojamientos y pequeñas empresas, con proyectos en WordPress y PrestaShop.",
        },
        {
          role: "Técnico de puesta en marcha",
          company: "SAET S.p.A.",
          period: "May 2019 – Nov 2019",
          description:
            "Pruebas y puesta en marcha de maquinaria industrial por inducción, verificaciones de PLC Siemens y pruebas de ciclos automáticos y simulación de fallos.",
        },
      ],
    },
    projects: {
      tagsLabel: "Tecnologías y temas",
      sourceCode: "Código fuente",
      liveDemo: "Demo en vivo",
      eyebrow: "ÁREAS DE TRABAJO",
      title: "De los sistemas inteligentes a productos útiles.",
      description:
        "Una muestra de los problemas y tecnologías en los que me estoy enfocando. Añadiré casos de estudio más detallados cuando estén listos.",
      items: [
        {
          id: "counterJavaScript" satisfies ProjectId,
          number: "01",
          title: "Counter JavaScript",
          imageAlt: "Imagen provisional del proyecto Counter JavaScript",
          description:
            "Una sencilla aplicación de contador desarrollada con JavaScript para poner en práctica los fundamentos del lenguaje.",
          tags: ["JavaScript", "Manipulación del DOM"],
        },
        {
          id: "bookFinder" satisfies ProjectId,
          number: "02",
          title: "Book Finder",
          imageAlt: "Imagen provisional del proyecto Book Finder",
          description: "Una aplicación web centrada en la búsqueda de libros.",
          tags: ["Desarrollo web"],
        },
        {
          id: "phpRestApi" satisfies ProjectId,
          number: "03",
          title: "PHP REST API",
          imageAlt: "Imagen provisional del proyecto PHP REST API",
          description:
            "Un proyecto backend para crear una API REST utilizando PHP.",
          tags: ["PHP", "REST API", "Backend"],
        },
        {
          id: "reactNyTimesClone" satisfies ProjectId,
          number: "04",
          title: "React NY Times Clone",
          imageAlt: "Imagen provisional del proyecto React NY Times Clone",
          description:
            "Una recreación del sitio web The New York Times desarrollada con React.",
          tags: ["React", "JavaScript", "Frontend"],
        },
      ],
      github: "Explora mis repositorios en GitHub",
    },
    skills: {
      eyebrow: "HABILIDADES",
      title: "Habilidades prácticas en software, datos e IA.",
      groups: [
        {
          title: "Ingeniería de software",
          items: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Python", "PHP", "Laravel", "API REST"],
        },
        {
          title: "IA aplicada",
          items: ["LangChain", "Integración LLM", "RAG", "Embeddings", "Búsqueda semántica"],
        },
        {
          title: "Datos y enfoque de ingeniería",
          items: [
            "Pensamiento sistémico",
            "Resolución de problemas",
            "SQL · MySQL",
          ],
        },
        {
          title: "Idiomas",
          items: ["Italiano · Nativo", "Inglés · B2", "Español · B2"],
        },
      ],
    },
    contact: {
      eyebrow: "CONTACTO",
      title: "Construyamos software útil y con un propósito claro.",
      description:
        "Busco crecer como desarrollador de software en un entorno tecnológico innovador e internacional, contribuyendo a productos prácticos y profundizando en la IA aplicada.",
      linkedin: "Conecta en LinkedIn",
      github: "Perfil de GitHub",
    },
    footer: {
      note: "Diseñado y desarrollado con cuidado.",
      socialLinks: "Redes sociales",
      backToTop: "Volver arriba",
    },
  },
} as const;

export type SiteCopy = (typeof copy)[Locale];
