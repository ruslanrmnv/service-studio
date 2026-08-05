import type { Dictionary } from "./ru";

export const en: Dictionary = {
  metadata: {
    title: "Websites for small business, built in 3 days | Ruslan",
    description:
      "I build websites for small businesses: services, prices, work samples, and booking. The home-page mockup is free within a day, the site takes three days, and I name the price before the work starts.",
    ogTitle: "Websites for small business | Service Studio by Ruslan",
    ogDescription:
      "I build websites for small businesses: services, prices, work samples, and booking. The home-page mockup is free within a day, the site takes three days, and I name the price before the work starts.",
  },

  header: {
    nav: {
      services: "Services",
      formats: "How to start",
      faq: "Questions",
      about: "About",
    },
    cta: "Send request",
    language: "Language",
    theme: "Theme",
  },

  hero: {
    brand: "Service Studio by Ruslan",
    // `backtick` segments render in the accent colour in the hero h1.
    // Non-breaking space before "pay" — see the note in ru.ts.
    title: "A website for your business. See the `design` before you pay.",
    // The offer itself — the hero's only call to action, rendered as a button.
    offerCta: "See your website mockup for free",
    // Second promise. Stands on its own line, away from the offer.
    freeEdits: "A month of edits after launch — `free`",
    subtitle:
      "I'll draw how your home page will look: services, prices, work samples, and an easy way for clients to reach you. Like it — I'll build the site in three days.",
    // Shown in the About card, not in the hero.
    availability: "Available for new projects",
  },

  // Interactive value block — visitor picks a business task and sees what I'd
  // build and the result. Extensible: add a task by adding an entry.
  explorer: {
    prompt: "What can I help you with?",
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
        id: "catalog",
        label: "Catalogue or booking",
        build: "Several pages with a catalogue of products or rooms, filters, and direct booking.",
        result: "Guests choose and book on their own, with no messaging.",
      },
      {
        id: "leads",
        label: "Requests & booking",
        build: "A booking form plus WhatsApp and Telegram buttons — the request lands in your messenger right away.",
        result: "No request ever slips through.",
      },
      {
        id: "content",
        label: "No copy or photos",
        build: "I'll write the copy from what you tell me, and say what to shoot on your phone.",
        result: "The site launches with real content, not placeholders.",
      },
      {
        id: "custom",
        label: "Your own task",
        build: "Tell me what the business is and what's getting in the way — I'll propose how a page solves it.",
        result: "An answer to your case, not a template.",
      },
    ],
  },

  services: {
    heading: "Services",
    subheading:
      "One thing, done end to end: a website for a small business — from the first page to launch and the edits after.",
    // Four cards, a clean 2×2 — the parts of one job, not four separate
    // products. Prices live in "How to start" only, so the page has a
    // single price list.
    items: [
      {
        title: "Business website",
        description:
          "From a one-pager to a small website: services, prices, work samples, a catalogue, a map. Everything a client needs to know before they message you.",
      },
      {
        title: "Requests and booking",
        description:
          "A form, WhatsApp, a call, or online booking — whatever suits you and your clients. The request lands in Telegram straight away, so nothing gets lost.",
      },
      {
        title: "Copy and photos",
        description:
          "Describe your services in a message or a voice note — I'll write the copy myself. For photos I'll tell you what to shoot on your phone, and where it fits I'll pick suitable stock.",
      },
      {
        title: "Domain, launch, and edits",
        description:
          "I buy the domain in your name, connect the hosting and the form, and help you launch. Small edits are free for the first month after launch.",
      },
    ],
  },

  // Real work / proof. Renders only when `items` has entries — no fake cases.
  cases: {
    heading: "Selected work",
    intro: "Live websites: open them and see how everything works.",
    taskLabel: "Task",
    builtLabel: "What I built",
    resultLabel: "Result",
    openLabel: "Open the example",
    items: [
      {
        task: "Beauty salon",
        image: "/cases/beauty-salon.webp",
        built:
          "Services with exact prices and durations, a before-and-after slider, client reviews, booking in one tap.",
        result:
          "People see the price and how long it takes before booking — fewer questions in the chat.",
        link: "https://mmaison-studio.netlify.app/",
      },
      {
        task: "Dental clinic",
        image: "/cases/dental.webp",
        built:
          "Five services with prices, calm copy for people who dread the dentist, a booking form with no phone call.",
        result: "The patient knows what the appointment involves and books it themselves.",
        link: "https://bbrightsmiledental.netlify.app/",
      },
      {
        task: "Guest house",
        image: "/cases/guest-house.webp",
        built:
          "Nine rooms with honest descriptions and prices, filters by floor and view, house rules on the page itself, direct booking with no middlemen.",
        result:
          "Guests pick a room and check dates themselves — no messaging, no platform fees.",
        link: "https://north-house-demo.netlify.app/",
      },
    ],
  },

  formats: {
    heading: "How to start",
    note: "I set the price before the work starts and don't change it along the way. Anything outside the list is priced separately, also before we start. Small edits are free for the first month after launch, then it's a pack of 5 edits for $60.",
    ctaText: "Not sure what you need?",
    ctaLink: "Send request",
    // The checklist is what makes a fixed price honest: it says where the
    // price stops. `term` sits at the card's foot so both tiers line up.
    includesLabel: "What's included",
    termLabel: "Turnaround",
    // Two tiers, both websites. Design work is an add-on to a site, not a
    // separate practice — it gets one line under the grid, not a card.
    items: [
      {
        title: "Business website",
        price: "$450",
        description:
          "A first website for a solo pro, salon, or studio: so people find you and write to you directly.",
        includes: [
          "One page: services, prices, work samples, contact",
          "I write the copy; I'll advise you on photos",
          "Request form — messages land in your inbox",
          "Domain in your name, hosting and setup",
          "Just as tidy on a phone as on a desktop",
          "A month of small edits after launch",
        ],
        term: "3 days from the deposit",
      },
      {
        title: "Website with a catalogue",
        price: "$850",
        description:
          "For when one page isn't enough: a guest house, a shop, a clinic with a schedule.",
        includes: [
          "Everything in the business website",
          "Several pages instead of one",
          "A catalogue of products or rooms",
          "Filters and search across the catalogue",
          "Booking or a request for a specific item",
        ],
        term: "7 days from the deposit",
      },
    ],
    addon: "A logo, business card, or menu — $150 when we do it together with the site.",
  },

  process: {
    heading: "How we work",
    subheading: "From the first conversation to launch — four steps, no surprises on price.",
    steps: [
      {
        title: "You tell me what you need",
        description:
          "Write through the form or a messenger: what your business is, what the site should do. A link to your profile or your price list is enough — I'll ask the rest.",
      },
      {
        title: "I draw the home-page mockup — free, within a day",
        description:
          "I show how your page will look: blocks, copy, colours. Look at it on your phone and tell me what to change. You owe nothing if it isn't right.",
      },
      {
        title: "30% deposit and build",
        description:
          "If you like it — I build the working site, connect the form and the domain, and help you launch: three days for one page, seven with a catalogue.",
      },
      {
        title: "Launch and a month of edits",
        description:
          "I hand over the finished site, the rest of the payment is due on delivery. Small edits are free for the first month.",
      },
    ],
  },

  about: {
    heading: "About",
    name: "Ruslan",
    paragraphs: [
      "I'm Ruslan. I build websites for small businesses — salons, clinics, guest houses, and independent professionals who work with clients directly.",
      "You talk to me personally: no managers, no middlemen. I dig into the task, sketch your home page for free within a day — and only if you like it do we agree on the build.",
      "I draw it, build it, and connect the domain and the form myself — that's why the timelines are short and edits don't sit in a queue. I don't take on large online stores or mobile apps: that's different work and different money.",
    ],
    location: "Barcelona, Spain",
    photoAlt: "Ruslan, the person behind Service Studio",
    // Concrete, checkable facts for the side card — no invented numbers.
    facts: [
      "You talk to me directly, no managers",
      "Mockup in a day, website in 3–7 days",
      "I work in Russian, English, and Ukrainian",
    ],
  },

  // Objection handling, right before the form. Only answers I can actually
  // stand behind — no invented policy.
  faq: {
    heading: "Common questions",
    intro:
      "The things people usually ask before we start. If your question isn't here, write to me and I'll answer personally.",
    items: [
      {
        q: "What if I don't like the mockup?",
        a: "Then we part ways: you pay nothing and owe nothing. I draw the home-page mockup for free and show it before money comes up at all — that's why the deposit comes after the mockup, not before it.",
      },
      {
        q: "How long does it all take?",
        a: "The home-page mockup takes a day. A one-page site takes three days from the deposit, a site with a catalogue takes seven. A logo, business card, or menu takes two or three days. If you're in a hurry, say so up front and I'll see what's possible.",
      },
      {
        q: "How does payment work?",
        a: "I name the price before the work starts and don't change it along the way. Once the mockup is approved — a 30% deposit, the rest on delivery of the finished site. We settle on whichever payment method suits you.",
      },
      {
        q: "Who owns the site and the domain?",
        a: "You do. The domain is bought in your name — that's roughly $10–15 a year, and it stays yours no matter what. Hosting for sites like these is free. Buying, configuring, and connecting it is on me.",
      },
      {
        q: "Will I be able to change the text and photos myself?",
        a: "By default I make the edits: small ones are free for the first month after launch, then it's a pack of 5 edits for $60. If you'd rather change the content yourself, I'll build a simple admin panel — tell me before we start, it affects how the site is built.",
      },
      {
        q: "You're in Barcelona and I'm in another country — is that a problem?",
        a: "No, I work remotely with any country. We talk over Telegram, WhatsApp, or email — in Russian, English, or Ukrainian, whichever suits you.",
      },
      {
        q: "What if I have no copy and no good photos?",
        a: "That's not a blocker. I write the copy myself — it's enough for you to describe your services and prices in a message or a voice note. For photos I'll tell you what to shoot on your phone, and where it fits I'll pick suitable stock images.",
      },
    ],
  },

  contact: {
    heading: "Send request",
    subheading:
      "Tell me what the business is and how you picture the site. I'll reply, name the price, and draw your home-page mockup for free.",
    bullets: [
      "I reply within a business day",
      "No spam — straight to the point",
      "I name the price before the work starts",
    ],
    form: {
      name: "Name",
      namePlaceholder: "How should I address you",
      businessType: "Area / task",
      businessTypePlaceholder: "For example: a coffee shop",
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
      automate: "What do you need?",
      automatePlaceholder:
        "For example: a website for a barbershop — services, prices, and booking. Right now there's only Instagram.",
      optional: "optional",
      submit: "Send request",
      submitting: "Sending...",
      privacyNote: "By sending this form you agree to your data being processed.",
      privacyLink: "Privacy policy",
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
    tagline: "Websites for small business. You can start small.",
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
          "For privacy-related questions, message me on Telegram or WhatsApp — the links are in the request section on the home page.",
        ],
        items: [],
      },
    ],
  },
};
