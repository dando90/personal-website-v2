import type { Locale } from "@/lib/i18n";
import type { ContactContent } from "./types";

export const contactCopy = {
  "en": {
    "contact": {
      "eyebrow": "CONTACT",
      "title": "Let’s build useful software with a clear purpose.",
      "description": "I’m looking to grow as a software developer in an innovative, international technology environment, contributing to practical products and exploring applied AI.",
      "form": {
        "name": "Name",
        "nameOptional": "Optional",
        "email": "Email",
        "emailPlaceholder": "you@example.com",
        "message": "Message",
        "messageHelp": "Describe your request in 500 words or less.",
        "send": "Send message",
        "sending": "Sending…",
        "loading": "Preparing the secure form…",
        "sent": "Your message has been sent. Thank you for getting in touch.",
        "invalid": "Check the required fields and try again.",
        "tooManyWords": "The message must be 500 words or fewer.",
        "rateLimited": "Too many attempts. Please wait a few minutes before trying again.",
        "unavailable": "The contact service is temporarily unavailable. Please try again later.",
        "genericError": "We could not send your message. Please try again."
      }
    }
  },
  "it": {
    "contact": {
      "eyebrow": "CONTATTI",
      "title": "Costruiamo software utile, con uno scopo chiaro.",
      "description": "Voglio crescere come sviluppatore software in un contesto tecnologico innovativo e internazionale, contribuendo a prodotti concreti e approfondendo l’AI applicata.",
      "form": {
        "name": "Nome",
        "nameOptional": "Facoltativo",
        "email": "Email",
        "emailPlaceholder": "tu@esempio.it",
        "message": "Messaggio",
        "messageHelp": "Descrivi la tua richiesta in massimo 500 parole.",
        "send": "Invia messaggio",
        "sending": "Invio in corso…",
        "loading": "Preparazione del modulo sicuro…",
        "sent": "Messaggio inviato. Grazie per avermi contattato.",
        "invalid": "Controlla i campi obbligatori e riprova.",
        "tooManyWords": "Il messaggio deve contenere al massimo 500 parole.",
        "rateLimited": "Hai effettuato troppi tentativi. Attendi qualche minuto e riprova.",
        "unavailable": "Il servizio contatti non è momentaneamente disponibile. Riprova più tardi.",
        "genericError": "Non è stato possibile inviare il messaggio. Riprova."
      }
    }
  },
  "es": {
    "contact": {
      "eyebrow": "CONTACTO",
      "title": "Construyamos software útil y con un propósito claro.",
      "description": "Busco crecer como desarrollador de software en un entorno tecnológico innovador e internacional, contribuyendo a productos prácticos y profundizando en la IA aplicada.",
      "form": {
        "name": "Nombre",
        "nameOptional": "Opcional",
        "email": "Correo electrónico",
        "emailPlaceholder": "tu@ejemplo.com",
        "message": "Mensaje",
        "messageHelp": "Describe tu solicitud en un máximo de 500 palabras.",
        "send": "Enviar mensaje",
        "sending": "Enviando…",
        "loading": "Preparando el formulario seguro…",
        "sent": "Mensaje enviado. Gracias por ponerte en contacto conmigo.",
        "invalid": "Revisa los campos obligatorios e inténtalo de nuevo.",
        "tooManyWords": "El mensaje debe tener 500 palabras o menos.",
        "rateLimited": "Demasiados intentos. Espera unos minutos antes de volver a intentarlo.",
        "unavailable": "El servicio de contacto no está disponible temporalmente. Inténtalo más tarde.",
        "genericError": "No se pudo enviar el mensaje. Inténtalo de nuevo."
      }
    }
  }
} as const satisfies Record<Locale, ContactContent>;
