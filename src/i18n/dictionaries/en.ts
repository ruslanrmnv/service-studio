import type { Dictionary } from "./ru";

export const en: Dictionary = {
  metadata: {
    title: "Service Studio by Ruslan — Websites, Telegram Bots, and AI Automations",
    description:
      "I build websites for services and local businesses, Telegram bots, forms, broadcasts, and AI automations. A working example — before you pay.",
    ogTitle: "Service Studio by Ruslan — Websites, Telegram Bots, and AI Automations",
    ogDescription:
      "I build websites for services and local businesses, Telegram bots, forms, broadcasts, and AI automations. A working example — before you pay.",
  },

  header: {
    nav: {
      services: "Services",
      formats: "How to start",
      about: "About",
    },
    cta: "Send request",
    language: "Language",
  },

  hero: {
    brand: "Service Studio by Ruslan",
    // `backtick` segments render as the azure accent in the hero h1.
    title: "A website and `automation` for your business. See it first, then pay.",
    subtitle:
      "A booking site, a form, a bot, a broadcast, or an AI helper — built around your task. You'll see a working version by tomorrow.",
    availability: "Available for new projects",
    ctaPrimary: "Send request",
  },

  // Interactive value block — visitor picks a business task and sees what I'd
  // build and the result. Extensible: add a task by adding an entry.
  explorer: {
    prompt: "What can I help with?",
    buildLabel: "What I'll build",
    resultLabel: "Result",
    tasks: [
      {
        id: "site",
        label: "Business website",
        build: "A one-page site with prices, work samples, and booking — for your service.",
        result: "Clients find you and book on their own.",
      },
      {
        id: "leads",
        label: "Requests & leads",
        build: "A form or bot that collects requests into one table and pings you instantly.",
        result: "No request ever slips through.",
      },
      {
        id: "replies",
        label: "Customer replies",
        build: "A bot that answers common questions and hands the tricky ones to you.",
        result: "Customers don't wait for hours.",
      },
      {
        id: "data",
        label: "Tidy data",
        build: "Auto-collection from forms, chats, and sheets — no manual merging.",
        result: "All your data in one place.",
      },
      {
        id: "reminders",
        label: "Reminders",
        build: "A system that nudges clients and you about the right steps on time.",
        result: "Nothing forgotten or overdue.",
      },
      {
        id: "ai",
        label: "AI helper",
        build: "An AI that sorts requests and drafts replies in your tone.",
        result: "Replies and drafts prepare themselves.",
      },
      {
        id: "custom",
        label: "Your own task",
        build: "Describe your process — I'll propose a scenario and build the system for it.",
        result: "A system built around your process.",
      },
    ],
  },

  // Live demo — the interactive centerpiece: a request travels from an
  // incoming message to a table row and a notification, played out on screen.
  demo: {
    heading: "See it work",
    intro:
      "Pick a scenario and watch a request travel the path: a message, a table row, a notification to you.",
    liveLabel: "A live example",
    processing: "Processing",
    replay: "Replay",
    sendLabel: "Send",
    tryHint: "Type your own name and send — watch your request land in the table.",
    newRequest: "New request",
    // Quiet ambient feed — sample requests keep arriving while idle.
    ambient: [
      { from: "Igor", request: "Bot for requests" },
      { from: "Maria", request: "Booking form" },
      { from: "Oleg", request: "Client reminders" },
      { from: "Dana", request: "AI replies" },
      { from: "Peter", request: "Report from sheets" },
    ],
    tableTitle: "Requests",
    columns: ["Time", "From", "Request", "Status"],
    scenarios: [
      {
        id: "form",
        label: "Form",
        source: "Website form",
        kind: "form",
        lines: [
          { role: "field", label: "Name", text: "Anna" },
          { role: "field", label: "Service", text: "Book a consultation" },
          { role: "field", label: "Contact", text: "@anna" },
        ],
        row: { time: "10:42", from: "Anna", request: "Book a consultation", status: "New" },
        notification: "New request from Anna",
      },
      {
        id: "bot",
        label: "Telegram bot",
        source: "@studio_bot",
        kind: "chat",
        lines: [
          { role: "bot", label: "", text: "Hi! What's your name?" },
          { role: "user", label: "", text: "Igor" },
          { role: "bot", label: "", text: "What would you like to automate?" },
          { role: "user", label: "", text: "I need a bot for requests" },
        ],
        row: { time: "10:45", from: "Igor", request: "Bot for requests", status: "New" },
        notification: "Igor sent a request through the bot",
      },
      {
        id: "ai",
        label: "AI helper",
        source: "AI helper",
        kind: "chat",
        lines: [
          { role: "user", label: "", text: "A client sent an email with five questions." },
          { role: "bot", label: "", text: "Reply ready: 5 points, polite tone, ready to send." },
        ],
        row: { time: "10:51", from: "Client email", request: "Reply prepared", status: "Done" },
        notification: "AI prepared a reply — please review",
      },
    ],
  },

  trust: [
    "Start with one setup",
    "A working example before full build",
    "No unnecessary features",
    "Direct contact",
  ],

  services: {
    heading: "Services",
    subheading:
      "You show me the task — I build a working solution: a website, form, Telegram bot, notifications, or an AI helper.",
    items: [
      {
        title: "Websites for services & local business",
        description:
          "A site for your task — from a one-pager to a small website: prices, work samples, a map, booking via form or WhatsApp. A working example in a day.",
      },
      {
        title: "Forms & data collection",
        description:
          "A link-based form drops requests, briefs, and bookings straight into a table — nothing gets lost.",
      },
      {
        title: "Telegram bots for your task",
        description:
          "A bot collects requests and surveys, sends reminders, and walks the client through the steps — with you out of the routine.",
      },
      {
        title: "AI & chat automation",
        description:
          "I answer common questions for you in messengers, forms, and on your site — the client gets a reply within the same minute.",
      },
      {
        title: "Integrations & notifications",
        description:
          "I connect forms, chats, and tables to email, Telegram, and your tools — with statuses, history, and a ping on every request.",
      },
      {
        title: "Auto funnels & broadcasts",
        description:
          "Automated broadcasts in messengers and email — reminders, warm-ups, news for clients. On a schedule or a trigger, without sending by hand.",
      },
      {
        title: "AI helpers for routine",
        description:
          "AI sorts requests, drafts replies, and prepares summaries — the repetitive processing runs itself.",
      },
      {
        title: "Mini-CRM & client portal",
        description:
          "Clients, requests, and statuses tracked around your process — the whole history and next steps in one place.",
      },
      {
        title: "Dashboards & reports",
        description:
          "I pull data from forms, sheets, and chats into one screen — you see what's happening without manual reports.",
      },
    ],
  },

  // Real work / proof. Renders only when `items` has entries — no fake cases.
  cases: {
    heading: "Selected work",
    intro: "Short breakdowns: the client's task, what I built, and what it changed.",
    taskLabel: "Task",
    builtLabel: "What I built",
    resultLabel: "Result",
    items: [],
  },

  formats: {
    heading: "How we can start",
    note: "You don't need to build a large system right away. Start with one setup and expand it later.",
    ctaText: "Not sure where to start?",
    ctaLink: "Send request",
    items: [
      {
        title: "One setup",
        description:
          "A form, request flow, notification, Telegram bot, or one automated step.",
      },
      {
        title: "Working process",
        description:
          "A sequence of steps: data collection, table, notifications, statuses, or AI processing.",
      },
      {
        title: "Custom build",
        description:
          "For tasks that need to be reviewed, designed, and built around a specific process.",
      },
    ],
  },

  process: {
    heading: "How we work",
    subheading: "From reviewing the task to a working version — step by step.",
    steps: [
      {
        title: "We review the task or process",
        description:
          "We look at what takes time now, repeats manually, or needs automation.",
      },
      {
        title: "We pick one scenario",
        description:
          "We take one specific task that can be tested quickly and brought to a result.",
      },
      {
        title: "I build a working example",
        description:
          "I build an example on your scenario — you can open it and see it before paying.",
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
      "I'm Ruslan. I build websites and automations for small businesses: a booking page, a form, a Telegram bot, a broadcast, or an AI helper.",
      "I work simply: I review the task, build an example in a day or two, and show it. If you like it, I take it to launch.",
    ],
  },

  contact: {
    heading: "Send request",
    subheading:
      "Tell me which task you want to solve. I'll reply, suggest an option, and show an example.",
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
      "Websites, bots, and automations for small businesses. You can start with one step.",
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
