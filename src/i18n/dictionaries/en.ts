import type { Dictionary } from "./ru";

export const en: Dictionary = {
  metadata: {
    title: "Service Studio by Ruslan — AI, Telegram Bots, Forms, and Automations",
    description:
      "I build practical AI automations, Telegram bots, forms, integrations, and working setups for specific business, specialist, and team tasks.",
    ogTitle: "Service Studio by Ruslan — AI, Telegram Bots, Forms, and Automations",
    ogDescription:
      "I build practical AI automations, Telegram bots, forms, integrations, and working setups for specific business, specialist, and team tasks.",
  },

  header: {
    nav: {
      services: "Services",
      formats: "Formats",
      about: "About",
    },
    cta: "Send request",
    language: "Language",
  },

  hero: {
    brand: "Service Studio by Ruslan",
    title: "I reduce manual work with AI, bots, and forms.",
    subtitle:
      "I build working systems for your task: collect requests, answer repeating questions, and keep your data tidy. You can start with one clear setup.",
    ctaPrimary: "See services",
    ctaSecondary: "Send request",
    preview: {
      caption: "What I can build",
      items: [
        "Telegram bot for requests or questionnaires",
        "Form that sends data to a table",
        "Notifications for new requests",
        "AI helper for replies and routine tasks",
      ],
    },
  },

  trust: [
    "Start with one clear setup",
    "A working example before full build",
    "No unnecessary features",
    "Direct contact",
  ],

  services: {
    heading: "Services",
    subheading:
      "You show me the task — I suggest a clear setup and build a working solution: a form, Telegram bot, notification, table, page, or AI helper.",
    items: [
      {
        title: "AI & chat automation",
        description:
          "Automating messages, replies, and repetitive scenarios in messengers, forms, or on your site.",
      },
      {
        title: "Telegram bots for your task",
        description:
          "Bots for requests, surveys, reminders, internal processes, personal scenarios, or working systems.",
      },
      {
        title: "Forms & data collection",
        description:
          "Link-based forms for requests, briefs, bookings, surveys, collecting contacts, or structured information.",
      },
      {
        title: "Integrations, tracking, and notifications",
        description:
          "Requests, forms, and messages can be connected to tables, email, Telegram, or work tools — with statuses, history, and notifications.",
      },
      {
        title: "Pages for a specific goal",
        description:
          "One-page sites for a service, product, event, portfolio, promo, or to test an idea.",
      },
      {
        title: "AI helpers and agents",
        description:
          "AI helpers and agents that process requests, sort information, prepare replies, analyze text, and handle repeatable actions through a clear workflow.",
      },
    ],
  },

  formats: {
    heading: "Work formats",
    note: "The cost depends on the task, the number of steps, and the tools you want to connect. You can start with one clear setup — without a large system or unnecessary complexity.",
    ctaText: "Not sure which format fits?",
    ctaLink: "Discuss a task",
    items: [
      {
        title: "Single setup",
        description:
          "A form, request, notification, Telegram bot, or one automated step.",
      },
      {
        title: "Telegram bot or tool",
        description:
          "A bot built around a specific need: survey, requests, reminders, a personal process, or a work scenario.",
      },
      {
        title: "Process automation",
        description:
          "Connecting chat, form, or bot → table, notification, tracking system, database, or another action.",
      },
      {
        title: "Page + request",
        description:
          "A page for a service, product, event, portfolio, or to test an idea, with a request form.",
      },
      {
        title: "Custom setup",
        description:
          "A task that needs to be reviewed and designed around a specific process first.",
      },
    ],
  },

  process: {
    heading: "How it works",
    subheading: "A clear, predictable path — from review to a working version.",
    steps: [
      {
        title: "We review the task or process",
        description:
          "We look at what takes time now, repeats manually, or needs automation.",
      },
      {
        title: "We pick a clear scenario",
        description:
          "We take one specific task that can be tested quickly and brought to a result.",
      },
      {
        title: "I build a working example",
        description:
          "I show a working example on your scenario instead of just explaining the idea.",
      },
      {
        title: "I build the working version",
        description:
          "After approval, I refine the solution, connect the needed parts, and help you launch.",
      },
    ],
  },

  about: {
    heading: "About",
    paragraphs: [
      "I'm Ruslan. I build practical AI, chat, form, and request automations for specific tasks: for businesses, specialists, teams, and personal use.",
      "My focus is working solutions that remove manual routine, organize information into a clear structure, speed up replies, and connect the tools you actually use.",
      "I review the task myself, suggest a clear setup, build a working example or first version, and help bring it to launch.",
    ],
  },

  contact: {
    heading: "Send request",
    subheading:
      "Tell me which task or process you'd like to simplify. I'll get in touch, suggest a simple scenario, and show how it can work.",
    bullets: [
      "I reply within a business day",
      "No spam — straight to the point",
      "We start with a clear example, not a long spec",
    ],
    form: {
      name: "Name",
      namePlaceholder: "How should I address you",
      businessType: "Area / task",
      businessTypePlaceholder: "Project, team, process...",
      contactMethod: "Contact method",
      contactMethodPlaceholder: "Choose a contact method",
      methods: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        instagram: "Instagram",
        email: "Email",
      },
      contactValue: "Contact",
      contactValuePlaceholder: "Phone or @username",
      automate: "What do you want to automate?",
      automatePlaceholder: "Bot, form, table, notifications...",
      message: "Message / comment",
      messagePlaceholder: "Tell me more about the task",
      optional: "optional",
      submit: "Send request",
      submitting: "Sending...",
    },
    validation: {
      required: "Please fill in the required fields.",
      email: "Please enter a valid email.",
    },
    success: {
      title: "Request sent!",
      text: "Thank you. I'll get in touch shortly.",
      again: "Send another request",
    },
    error: {
      generic: "Couldn't send the request. Please try again later.",
      unavailable:
        "Sending is temporarily unavailable. Message me directly and I'll reply.",
    },
  },

  footer: {
    brand: "Service Studio by Ruslan",
    tagline:
      "AI, chatbots, forms, and working setups for specific tasks. You can start with one step.",
    contact: "Contact",
    privacy: "Privacy Policy",
  },

  privacy: {
    title: "Privacy Policy",
    subtitle:
      "This page explains what information I receive through the contact form and how I use it to respond to your request.",
    back: "Back to home",
    sections: [
      {
        heading: "What information is collected",
        paragraphs: ["Through the website form, I may receive:"],
        items: [
          "your name;",
          "contact details such as email, phone number, Telegram username, or another contact method you provide;",
          "your field, task, or project description;",
          "the message you send through the form.",
        ],
      },
      {
        heading: "How the information is used",
        paragraphs: ["This information is used only to:"],
        items: [
          "respond to your request;",
          "understand the task;",
          "suggest a possible solution;",
          "prepare a working example, estimate, or next steps based on your request.",
        ],
      },
      {
        heading: "Where the information goes",
        paragraphs: [
          "When you submit the form, the information may be sent through an email service used to deliver website messages.",
          "The information may also be stored in my email or working tools if needed for communication about your request.",
        ],
        items: [],
      },
      {
        heading: "Sharing with third parties",
        paragraphs: [
          "I do not sell or share your information with third parties for advertising.",
          "The information may be processed by technical services that help operate the website, form, or email delivery.",
        ],
        items: [],
      },
      {
        heading: "Retention",
        paragraphs: [
          "I keep the information only as long as needed to process the request, communicate about the task, and keep basic working history.",
          "If you want me to delete your information, you can contact me through any contact method listed on the website.",
        ],
        items: [],
      },
      {
        heading: "Your rights",
        paragraphs: ["You can ask me to:"],
        items: [
          "confirm what information I received;",
          "correct the information;",
          "delete the information;",
          "stop using your information for further contact.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "For privacy-related questions, you can contact me through the contact links in the website footer.",
        ],
        items: [],
      },
    ],
  },
};
