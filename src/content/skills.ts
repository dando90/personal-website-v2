import type { Locale } from "@/lib/i18n";
import type { SkillsContent } from "./types";

export const skillsCopy = {
  "en": {
    "skills": {
      "eyebrow": "SKILLS",
      "title": "A practical toolkit across software, data and AI.",
      "groups": [
        {
          "title": "Software engineering",
          "items": [
            "JavaScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Python",
            "PHP",
            "Laravel",
            "REST APIs"
          ]
        },
        {
          "title": "Applied AI",
          "items": [
            "LangChain",
            "LLM integration",
            "RAG",
            "Embeddings",
            "Semantic search"
          ]
        },
        {
          "title": "Data and engineering practice",
          "items": [
            "Systems thinking",
            "Technical problem solving",
            "SQL · MySQL"
          ]
        },
        {
          "title": "Languages",
          "items": [
            "Italian · Native",
            "English · B2",
            "Spanish · B2"
          ]
        }
      ]
    }
  },
  "it": {
    "skills": {
      "eyebrow": "COMPETENZE",
      "title": "Competenze pratiche tra software, dati e AI.",
      "groups": [
        {
          "title": "Ingegneria del software",
          "items": [
            "JavaScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Python",
            "PHP",
            "Laravel",
            "API REST"
          ]
        },
        {
          "title": "AI applicata",
          "items": [
            "LangChain",
            "Integrazione LLM",
            "RAG",
            "Embeddings",
            "Ricerca semantica"
          ]
        },
        {
          "title": "Dati e metodo ingegneristico",
          "items": [
            "Pensiero sistemico",
            "Problem solving tecnico",
            "SQL · MySQL"
          ]
        },
        {
          "title": "Lingue",
          "items": [
            "Italiano · Madrelingua",
            "Inglese · B2",
            "Spagnolo · B2"
          ]
        }
      ]
    }
  },
  "es": {
    "skills": {
      "eyebrow": "HABILIDADES",
      "title": "Habilidades prácticas en software, datos e IA.",
      "groups": [
        {
          "title": "Ingeniería de software",
          "items": [
            "JavaScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Python",
            "PHP",
            "Laravel",
            "API REST"
          ]
        },
        {
          "title": "IA aplicada",
          "items": [
            "LangChain",
            "Integración LLM",
            "RAG",
            "Embeddings",
            "Búsqueda semántica"
          ]
        },
        {
          "title": "Datos y enfoque de ingeniería",
          "items": [
            "Pensamiento sistémico",
            "Resolución de problemas",
            "SQL · MySQL"
          ]
        },
        {
          "title": "Idiomas",
          "items": [
            "Italiano · Nativo",
            "Inglés · B2",
            "Español · B2"
          ]
        }
      ]
    }
  }
} as const satisfies Record<Locale, SkillsContent>;
