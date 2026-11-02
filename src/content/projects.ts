import type { Locale } from "@/lib/i18n";
import type { ProjectsContent } from "./types";

export const projectsCopy = {
  "en": {
    "projects": {
      "tagsLabel": "Technologies and topics",
      "sourceCode": "Source code",
      "liveDemo": "Live demo",
      "eyebrow": "AREAS OF WORK",
      "title": "From intelligent systems to useful products.",
      "description": "A snapshot of the problems and technologies I’m focusing on. More detailed project case studies will be added as they are ready.",
      "items": [
        {
          "id": "counterJavaScript",
          "number": "01",
          "title": "Counter JavaScript",
          "imageAlt": "Placeholder artwork for the Counter JavaScript project",
          "description": "A simple counter application built with JavaScript to practice the fundamentals of the language.",
          "tags": [
            "JavaScript",
            "DOM Manipulation"
          ]
        },
        {
          "id": "bookFinder",
          "number": "02",
          "title": "Book Finder",
          "imageAlt": "Placeholder artwork for the Book Finder project",
          "description": "A web application focused on searching for books.",
          "tags": [
            "Web Development"
          ]
        },
        {
          "id": "phpRestApi",
          "number": "03",
          "title": "PHP REST API",
          "imageAlt": "Placeholder artwork for the PHP REST API project",
          "description": "A backend project for building a REST API using PHP.",
          "tags": [
            "PHP",
            "REST API",
            "Backend"
          ]
        },
        {
          "id": "reactNyTimesClone",
          "number": "04",
          "title": "React NY Times Clone",
          "imageAlt": "Placeholder artwork for the React NY Times Clone project",
          "description": "A recreation of The New York Times website built with React.",
          "tags": [
            "React",
            "JavaScript",
            "Frontend"
          ]
        }
      ],
      "github": "Explore my GitHub repositories"
    }
  },
  "it": {
    "projects": {
      "tagsLabel": "Tecnologie e argomenti",
      "sourceCode": "Codice sorgente",
      "liveDemo": "Demo online",
      "eyebrow": "AREE DI LAVORO",
      "title": "Dai sistemi intelligenti a prodotti utili.",
      "description": "Una panoramica dei problemi e delle tecnologie su cui mi sto concentrando. Aggiungerò casi studio più dettagliati man mano che saranno pronti.",
      "items": [
        {
          "id": "counterJavaScript",
          "number": "01",
          "title": "Counter JavaScript",
          "imageAlt": "Immagine segnaposto del progetto Counter JavaScript",
          "description": "Una semplice applicazione contatore sviluppata con JavaScript per mettere in pratica i fondamenti del linguaggio.",
          "tags": [
            "JavaScript",
            "DOM Manipulation"
          ]
        },
        {
          "id": "bookFinder",
          "number": "02",
          "title": "Book Finder",
          "imageAlt": "Immagine segnaposto del progetto Book Finder",
          "description": "Un'applicazione web dedicata alla ricerca di libri.",
          "tags": [
            "Web Development"
          ]
        },
        {
          "id": "phpRestApi",
          "number": "03",
          "title": "PHP REST API",
          "imageAlt": "Immagine segnaposto del progetto PHP REST API",
          "description": "Un progetto backend per la creazione di un'API REST utilizzando PHP.",
          "tags": [
            "PHP",
            "REST API",
            "Backend"
          ]
        },
        {
          "id": "reactNyTimesClone",
          "number": "04",
          "title": "React NY Times Clone",
          "imageAlt": "Immagine segnaposto del progetto React NY Times Clone",
          "description": "Una riproduzione del sito The New York Times realizzata utilizzando React.",
          "tags": [
            "React",
            "JavaScript",
            "Frontend"
          ]
        }
      ],
      "github": "Esplora i repository su GitHub"
    }
  },
  "es": {
    "projects": {
      "tagsLabel": "Tecnologías y temas",
      "sourceCode": "Código fuente",
      "liveDemo": "Demo en vivo",
      "eyebrow": "ÁREAS DE TRABAJO",
      "title": "De los sistemas inteligentes a productos útiles.",
      "description": "Una muestra de los problemas y tecnologías en los que me estoy enfocando. Añadiré casos de estudio más detallados cuando estén listos.",
      "items": [
        {
          "id": "counterJavaScript",
          "number": "01",
          "title": "Counter JavaScript",
          "imageAlt": "Imagen provisional del proyecto Counter JavaScript",
          "description": "Una sencilla aplicación de contador desarrollada con JavaScript para poner en práctica los fundamentos del lenguaje.",
          "tags": [
            "JavaScript",
            "Manipulación del DOM"
          ]
        },
        {
          "id": "bookFinder",
          "number": "02",
          "title": "Book Finder",
          "imageAlt": "Imagen provisional del proyecto Book Finder",
          "description": "Una aplicación web centrada en la búsqueda de libros.",
          "tags": [
            "Desarrollo web"
          ]
        },
        {
          "id": "phpRestApi",
          "number": "03",
          "title": "PHP REST API",
          "imageAlt": "Imagen provisional del proyecto PHP REST API",
          "description": "Un proyecto backend para crear una API REST utilizando PHP.",
          "tags": [
            "PHP",
            "REST API",
            "Backend"
          ]
        },
        {
          "id": "reactNyTimesClone",
          "number": "04",
          "title": "React NY Times Clone",
          "imageAlt": "Imagen provisional del proyecto React NY Times Clone",
          "description": "Una recreación del sitio web The New York Times desarrollada con React.",
          "tags": [
            "React",
            "JavaScript",
            "Frontend"
          ]
        }
      ],
      "github": "Explora mis repositorios en GitHub"
    }
  }
} as const satisfies Record<Locale, ProjectsContent>;
