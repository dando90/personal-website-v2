import type { Locale } from "@/lib/i18n";
import type { ExperienceContent } from "./types";

export const experienceCopy = {
  "en": {
    "experience": {
      "eyebrow": "EXPERIENCE",
      "title": "Software delivery grounded in engineering practice.",
      "items": [
        {
          "role": "Service Engineer",
          "company": "Inductotherm Group Italy",
          "period": "Jan 2025 – Apr 2026",
          "description": "Installed, commissioned and maintained industrial induction welding and cutting systems; diagnosed electrical and automation faults and contributed to a Siemens-based production-line project."
        },
        {
          "role": "Full Stack Developer",
          "company": "Niomind s.r.l. SB",
          "period": "Aug 2023 – Apr 2024",
          "description": "Built frontend applications with Next.js and Tailwind CSS and developed plugins and integrations for Moodle-based e-learning platforms."
        },
        {
          "role": "Web Developer",
          "company": "El Garbo de Greta Comunicación",
          "period": "Dec 2022 – Jan 2023",
          "description": "Redesigned a corporate website and developed and maintained websites for hospitality and small-business clients, including WordPress and PrestaShop projects."
        },
        {
          "role": "Commissioning Technician",
          "company": "SAET S.p.A.",
          "period": "May 2019 – Nov 2019",
          "description": "Tested and commissioned industrial induction machinery, verified Siemens PLCs and ran automatic-cycle and fault-simulation tests."
        }
      ]
    }
  },
  "it": {
    "experience": {
      "eyebrow": "ESPERIENZA",
      "title": "Software concreto, con solide basi ingegneristiche.",
      "items": [
        {
          "role": "Service Engineer",
          "company": "Inductotherm Group Italy",
          "period": "Gen 2025 – Apr 2026",
          "description": "Installazione, commissioning e manutenzione di impianti industriali per saldatura e taglio a induzione; diagnosi di guasti elettrici e di automazione e contributo a un progetto di linea produttiva basato su Siemens."
        },
        {
          "role": "Full Stack Developer",
          "company": "Niomind s.r.l. SB",
          "period": "Ago 2023 – Apr 2024",
          "description": "Sviluppo di applicazioni frontend con Next.js e Tailwind CSS e realizzazione di plugin e integrazioni per piattaforme e-learning basate su Moodle."
        },
        {
          "role": "Web Developer",
          "company": "El Garbo de Greta Comunicación",
          "period": "Dic 2022 – Gen 2023",
          "description": "Restyling di un sito aziendale e sviluppo e gestione di siti per attività ricettive e piccole imprese, con progetti WordPress e PrestaShop."
        },
        {
          "role": "Tecnico di commissioning",
          "company": "SAET S.p.A.",
          "period": "Mag 2019 – Nov 2019",
          "description": "Collaudo e messa in servizio di macchinari industriali a induzione, verifiche su PLC Siemens e test di cicli automatici e simulazione guasti."
        }
      ]
    }
  },
  "es": {
    "experience": {
      "eyebrow": "EXPERIENCIA",
      "title": "Desarrollo de software con base en la ingeniería práctica.",
      "items": [
        {
          "role": "Service Engineer",
          "company": "Inductotherm Group Italy",
          "period": "Ene 2025 – Abr 2026",
          "description": "Instalación, puesta en marcha y mantenimiento de equipos industriales de soldadura y corte por inducción; diagnóstico de fallos eléctricos y de automatización y participación en un proyecto de producción basado en Siemens."
        },
        {
          "role": "Full Stack Developer",
          "company": "Niomind s.r.l. SB",
          "period": "Ago 2023 – Abr 2024",
          "description": "Desarrollo de aplicaciones frontend con Next.js y Tailwind CSS, además de plugins e integraciones para plataformas de aprendizaje basadas en Moodle."
        },
        {
          "role": "Web Developer",
          "company": "El Garbo de Greta Comunicación",
          "period": "Dic 2022 – Ene 2023",
          "description": "Rediseño de un sitio corporativo y desarrollo y gestión de webs para alojamientos y pequeñas empresas, con proyectos en WordPress y PrestaShop."
        },
        {
          "role": "Técnico de puesta en marcha",
          "company": "SAET S.p.A.",
          "period": "May 2019 – Nov 2019",
          "description": "Pruebas y puesta en marcha de maquinaria industrial por inducción, verificaciones de PLC Siemens y pruebas de ciclos automáticos y simulación de fallos."
        }
      ]
    }
  }
} as const satisfies Record<Locale, ExperienceContent>;
