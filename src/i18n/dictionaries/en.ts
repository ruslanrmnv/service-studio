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
    // The guarantee, in the order the deal happens — see the note in ru.ts.
    promises: [
      "Your home page, drawn `free` — in a day",
      "Not right for you — you owe nothing",
      "You like it — the site in 3 days, then a month of edits",
    ],
    pricesLink: "How much it costs",
    // Shown in the About card, not in the hero.
    availability: "I can start this week",
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
      // First, and therefore the wide card at the top of the grid.
      {
        task: "Bakery",
        image: "/cases/halfpastsix-bakery.webp",
        built:
          "A stock board in the first screen: how many of each loaf are on the shelf this minute, what went and at what time, what leaves the oven at eleven. Pickup reserved without an account, paid at the counter.",
        result:
          "Nobody drives across town for bread that has already gone.",
        link: "https://bakery.servicestudiobyruslan.com/",
      },
      {
        task: "Beauty salon",
        image: "/cases/maison-salon.webp",
        phone: "/cases/maison-phone.webp",
        built:
          "Services with exact prices and durations, a before-and-after slider, client reviews, booking in one tap.",
        result:
          "People see the price and how long it takes before booking — fewer questions in the chat.",
        link: "https://maison.servicestudiobyruslan.com/",
      },
      {
        task: "Barbershop",
        image: "/cases/strop-barbershop.webp",
        phone: "/cases/strop-phone.webp",
        built:
          "The next free chairs sit in the first screen — time, barber, one tap. A price list with the length of every service, the four barbers, a gallery of cuts, and how to find the door in the second courtyard.",
        result:
          "You can see when you'd be in the chair before you have opened the price list.",
        link: "https://barbershop.servicestudiobyruslan.com/",
      },
      {
        task: "Dental clinic",
        image: "/cases/brightsmile-dental.webp",
        phone: "/cases/brightsmile-phone.webp",
        built:
          "Five services with prices, calm copy for people who dread the dentist, a booking form with no phone call.",
        result: "The patient knows what the appointment involves and books it themselves.",
        link: "https://brightsmile.servicestudiobyruslan.com/",
      },
      {
        task: "Guest house",
        image: "/cases/north-house.webp",
        phone: "/cases/north-house-phone.webp",
        built:
          "Nine rooms with honest descriptions and prices, filters by floor and view, house rules on the page itself, direct booking with no middlemen.",
        result:
          "Guests pick a room and check dates themselves — no messaging, no platform fees.",
        link: "https://boutiquehotel.servicestudiobyruslan.com/",
      },
    ],
  },

  formats: {
    heading: "How to start",
    note: "I set the price before the work starts and don't change it along the way. Anything outside the list is priced separately, also before we start. Small edits are free for the first month after launch, then it's a pack of 5 edits for €60.",
    mockupFirst:
      "Mockup first, money after: I only take the 30% deposit once you've seen your home page and liked it.",
    ctaText: "Not sure what you need?",
    ctaLink: "Send request",
    // The checklist is what makes a fixed price honest: it says where the
    // price stops. `term` sits at the card's foot so both tiers line up.
    includesLabel: "What's included",
    termLabel: "Turnaround",
    // Two tiers, both websites. Design work is deliberately absent here: a
    // third, cheaper number pulls the eye away from the choice this section
    // exists to make. It lives in the FAQ answer about missing materials.
    items: [
      {
        title: "Business website",
        price: "€450",
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
        price: "€850",
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
      "Russian, English, Ukrainian — Spanish in writing",
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
        q: "What if I need an online shop or an app?",
        a: "Then I'm the wrong person for it. A shop with payments, stock and customer accounts, or a mobile app, is different work on a different timeline for different money, and I won't take it on just to keep the order. A catalogue with booking or a request for a specific item I do make — that's part of the €850 site.",
      },
      {
        q: "How does payment work?",
        a: "I name the price before the work starts and don't change it along the way. Once the mockup is approved — a 30% deposit, the rest on delivery of the finished site. We settle on whichever payment method suits you.",
      },
      {
        q: "Who owns the site and the domain?",
        a: "You do. The domain is bought in your name — that's roughly €10–15 a year, and it stays yours no matter what. Hosting for sites like these is free. Buying, configuring, and connecting it is on me.",
      },
      {
        q: "Will I be able to change the text and photos myself?",
        a: "By default I make the edits: small ones are free for the first month after launch, then it's a pack of 5 edits for €60. If you'd rather change the content yourself, I'll build a simple admin panel — tell me before we start, it affects how the site is built.",
      },
      {
        q: "You're in Barcelona and I'm in another country — is that a problem?",
        a: "No, I work remotely with any country. We talk over Telegram, WhatsApp, or email — in Russian, English, or Ukrainian, whichever suits you. Spanish works in writing; if you'd rather talk out loud, that will be in Russian or English.",
      },
      {
        q: "What if I have no copy and no good photos?",
        a: "That's not a blocker. I write the copy myself — it's enough for you to describe your services and prices in a message or a voice note. For photos I'll tell you what to shoot on your phone, and where it fits I'll pick suitable stock images. You may have no logo either: I'll make one alongside the site for €150.",
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
      // Short on purpose — see the note in ru.ts.
      contactMethodPlaceholder: "Choose one",
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
      text: "Thank you. I'll reply within a business day.",
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
