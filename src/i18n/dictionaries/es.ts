import type { Dictionary } from "./ru";

/* Peninsular Spanish, second person singular. The site sells from Barcelona to
   people running one shop or one chair, and `usted` puts a counter between them
   and a person who answers his own messages.
   Spanish is a writing language here, not a speaking one — see `about.facts`
   and the remote-work answer in the FAQ. The visitor learns that on the page
   rather than on the call, which is the only place it could go wrong. */
export const es: Dictionary = {
  metadata: {
    title: "Webs para pequeños negocios, en 3 días | Ruslan",
    description:
      "Hago webs para negocios pequeños: servicios, precios, ejemplos de trabajo y reservas. La maqueta de la página principal es gratis en 24 horas, la web se hace en tres días, y el precio lo digo antes de empezar.",
    ogTitle: "Webs para pequeños negocios | Service Studio by Ruslan",
    ogDescription:
      "Hago webs para negocios pequeños: servicios, precios, ejemplos de trabajo y reservas. La maqueta de la página principal es gratis en 24 horas, la web se hace en tres días, y el precio lo digo antes de empezar.",
  },

  header: {
    nav: {
      formats: "Cómo empezar",
      faq: "Preguntas",
      about: "Sobre mí",
    },
    cta: "Enviar solicitud",
    language: "Idioma",
    theme: "Tema",
  },

  hero: {
    brand: "Service Studio by Ruslan",
    // `backtick` segments render in the accent colour in the hero h1.
    // Non-breaking space before "pagar" — same reason as in ru.ts: the h1 wraps
    // at three widths and "de" kept ending up alone at the end of a line.
    title: "Una web para tu negocio. Ves el `diseño` antes de pagar.",
    // The offer itself — the hero's only call to action, rendered as a button.
    offerCta: "Ver la maqueta de tu web gratis",
    // The guarantee, in the order the deal happens — see the note in ru.ts.
    promises: [
      "La portada dibujada `gratis`, en 24 horas",
      "No te encaja — no me debes nada",
      "Te gusta — la web en 3 días y un mes de cambios",
    ],
    pricesLink: "Cuánto cuesta",
    // Shown in the About card, not in the hero.
    availability: "Puedo empezar esta semana",
  },

  // Real work / proof. Renders only when `items` has entries — no fake cases.
  cases: {
    heading: "Ejemplos de trabajo",
    intro: "Webs en funcionamiento: ábrelas y mira cómo está montado todo.",
    taskLabel: "Encargo",
    builtLabel: "Qué monté",
    resultLabel: "Resultado",
    openLabel: "Abrir el ejemplo",
    items: [
      // First, and therefore the wide card at the top of the grid.
      {
        task: "Panadería",
        image: "/cases/halfpastsix-bakery.webp",
        built:
          "Un tablero de existencias en la primera pantalla: cuántas piezas de cada pan quedan en el mostrador ahora mismo, qué se ha acabado y a qué hora, qué sale del horno a las once. Reserva para recoger sin registrarse, se paga en el mostrador.",
        result: "Nadie cruza la ciudad a por un pan que ya se ha vendido.",
        link: "https://bakery.servicestudiobyruslan.com/",
      },
      {
        task: "Salón de belleza",
        image: "/cases/maison-salon.webp",
        phone: "/cases/maison-phone.webp",
        built:
          "Servicios con precios y duración exactos, un deslizador de antes y después, reseñas de clientas, reserva en un toque.",
        result:
          "La gente ve el precio y cuánto dura antes de reservar — menos preguntas por chat.",
        link: "https://maison.servicestudiobyruslan.com/",
      },
      {
        task: "Barbería",
        image: "/cases/strop-barbershop.webp",
        phone: "/cases/strop-phone.webp",
        built:
          "Los próximos sillones libres van en la primera pantalla — hora, barbero, un toque. Lista de precios con la duración de cada servicio, los cuatro barberos, una galería de cortes y cómo encontrar la puerta en el segundo patio.",
        result:
          "Ves a qué hora te sientas antes de haber abierto la lista de precios.",
        link: "https://barbershop.servicestudiobyruslan.com/",
      },
      {
        task: "Clínica dental",
        image: "/cases/brightsmile-dental.webp",
        phone: "/cases/brightsmile-phone.webp",
        built:
          "Cinco servicios con precios, textos tranquilos para quien teme al dentista, y un formulario de cita sin llamada de teléfono.",
        result:
          "El paciente sabe en qué consiste la visita y la reserva él mismo.",
        link: "https://brightsmile.servicestudiobyruslan.com/",
      },
      {
        task: "Casa de huéspedes",
        image: "/cases/north-house.webp",
        phone: "/cases/north-house-phone.webp",
        built:
          "Nueve habitaciones con descripciones y precios honestos, filtros por planta y vistas, las normas de la casa en la propia página, y reserva directa sin intermediarios.",
        result:
          "Los huéspedes eligen habitación y miran fechas por su cuenta — sin mensajes y sin comisiones de plataforma.",
        link: "https://boutiquehotel.servicestudiobyruslan.com/",
      },
    ],
  },

  formats: {
    heading: "Cómo empezar",
    note: "El precio lo fijo antes de empezar y no lo cambio por el camino. Lo que quede fuera de la lista se presupuesta aparte, también antes de empezar. Los cambios pequeños son gratis el primer mes después del lanzamiento; después, un paquete de 5 cambios por $60.",
    mockupFirst:
      "Primero la maqueta, después el dinero: solo cobro el 30% de anticipo cuando ya has visto tu página principal y te ha gustado.",
    ctaText: "¿No sabes qué necesitas?",
    ctaLink: "Enviar solicitud",
    // The checklist is what makes a fixed price honest: it says where the
    // price stops. `term` sits at the card's foot so both tiers line up.
    includesLabel: "Qué incluye",
    termLabel: "Plazo",
    // Two tiers, both websites. Design work is deliberately absent here: a
    // third, cheaper number pulls the eye away from the choice this section
    // exists to make. It lives in the FAQ answer about missing materials.
    items: [
      {
        title: "Web de negocio",
        price: "$450",
        description:
          "Una primera web para un profesional por su cuenta, un salón o un estudio: para que te encuentren y te escriban directamente.",
        includes: [
          "Una página: servicios, precios, ejemplos, contacto",
          "Escribo los textos; te asesoro con las fotos",
          "Formulario de solicitud — los mensajes llegan a tu correo",
          "Dominio a tu nombre, alojamiento y configuración",
          "Igual de cuidada en el móvil que en el ordenador",
          "Un mes de cambios pequeños tras el lanzamiento",
        ],
        term: "3 días desde el anticipo",
      },
      {
        title: "Web con catálogo",
        price: "$850",
        description:
          "Para cuando una página no basta: una casa de huéspedes, una tienda, una clínica con agenda.",
        includes: [
          "Todo lo de la web de negocio",
          "Varias páginas en lugar de una",
          "Un catálogo de productos o habitaciones",
          "Filtros y búsqueda en el catálogo",
          "Reserva o solicitud de un artículo concreto",
        ],
        term: "7 días desde el anticipo",
      },
    ],
  },

  process: {
    heading: "Cómo trabajamos",
    subheading:
      "De la primera conversación al lanzamiento — cuatro pasos y ninguna sorpresa en el precio.",
    steps: [
      {
        title: "Me cuentas qué necesitas",
        description:
          "Escríbeme por el formulario o por mensajería: qué es tu negocio y qué tiene que hacer la web. Con un enlace a tu perfil o a tu lista de precios basta — el resto te lo pregunto yo.",
      },
      {
        title: "Dibujo la maqueta de la portada — gratis, en 24 horas",
        description:
          "Te enseño cómo va a quedar tu página: bloques, textos, colores. Míralo en el móvil y dime qué cambiar. Si no te encaja, no me debes nada.",
      },
      {
        title: "30% de anticipo y montaje",
        description:
          "Si te gusta, monto la web funcionando, conecto el formulario y el dominio, y te ayudo a lanzarla: tres días para una página, siete con catálogo.",
      },
      {
        title: "Lanzamiento y un mes de cambios",
        description:
          "Te entrego la web terminada y el resto del pago se abona en la entrega. Los cambios pequeños son gratis el primer mes.",
      },
    ],
  },

  about: {
    heading: "Sobre mí",
    name: "Ruslan",
    paragraphs: [
      "Soy Ruslan. Hago webs para negocios pequeños — salones, clínicas, casas de huéspedes y profesionales que tratan con sus clientes directamente.",
      "Hablas conmigo en persona: sin gestores ni intermediarios. Me meto en el encargo, dibujo tu página principal gratis en 24 horas — y solo si te gusta acordamos el montaje.",
      "Lo dibujo, lo monto y conecto el dominio y el formulario yo mismo — por eso los plazos son cortos y los cambios no esperan en una cola. No acepto tiendas online grandes ni aplicaciones móviles: eso es otro trabajo y otro dinero.",
    ],
    location: "Barcelona, España",
    photoAlt: "Ruslan, la persona detrás de Service Studio",
    // Concrete, checkable facts for the side card — no invented numbers. The
    // third leads with Spanish because that is the one this reader is checking,
    // and says "por escrito" because that is where it stops.
    facts: [
      "Hablas conmigo directamente, sin gestores",
      "Maqueta en 24 horas, web en 3–7 días",
      "En español por escrito — también ruso, inglés y ucraniano",
    ],
  },

  // Objection handling, right before the form. Only answers I can actually
  // stand behind — no invented policy.
  faq: {
    heading: "Preguntas frecuentes",
    intro:
      "Lo que suele preguntar la gente antes de empezar. Si tu pregunta no está aquí, escríbeme y te respondo personalmente.",
    items: [
      {
        q: "¿Y si no me gusta la maqueta?",
        a: "Entonces lo dejamos aquí: no pagas nada y no me debes nada. Dibujo la maqueta de la portada gratis y te la enseño antes de que el dinero entre siquiera en la conversación — por eso el anticipo va después de la maqueta y no antes.",
      },
      {
        q: "¿Cuánto se tarda en total?",
        a: "La maqueta de la portada, 24 horas. Una web de una página, tres días desde el anticipo; una web con catálogo, siete. Un logotipo, una tarjeta o una carta, dos o tres días. Si tienes prisa, dímelo desde el principio y miro qué se puede hacer.",
      },
      {
        q: "¿Y si necesito una tienda online o una aplicación?",
        a: "Entonces no soy la persona indicada. Una tienda con pagos, stock y cuentas de cliente, o una aplicación móvil, es otro trabajo, otro plazo y otro dinero, y no lo voy a aceptar solo por quedarme el encargo. Un catálogo con reserva o con solicitud de un artículo concreto sí lo hago — eso entra en la web de $850.",
      },
      {
        q: "¿Cómo funciona el pago?",
        a: "Digo el precio antes de empezar y no lo cambio por el camino. Una vez aprobada la maqueta, un 30% de anticipo y el resto en la entrega de la web terminada. El método de pago lo acordamos según lo que te venga bien.",
      },
      {
        q: "¿De quién son la web y el dominio?",
        a: "Tuyos. El dominio se compra a tu nombre — son unos $10–15 al año y sigue siendo tuyo pase lo que pase. El alojamiento para webs como estas es gratuito. Comprarlo, configurarlo y conectarlo corre de mi cuenta.",
      },
      {
        q: "¿Podré cambiar yo mismo los textos y las fotos?",
        a: "Por defecto los cambios los hago yo: los pequeños son gratis el primer mes tras el lanzamiento y después van en paquetes de 5 cambios por $60. Si prefieres cambiar el contenido tú, te monto un panel de administración sencillo — dímelo antes de empezar, porque cambia cómo se construye la web.",
      },
      {
        q: "Tú estás en Barcelona y yo en otro país, ¿es un problema?",
        a: "No, trabajo en remoto con cualquier país. Hablamos por Telegram, WhatsApp o correo, y en español nos escribimos sin problema. Si prefieres una llamada, esa será en inglés o en ruso — te lo digo ahora y no a mitad del encargo.",
      },
      {
        q: "¿Y si no tengo textos ni fotos buenas?",
        a: "No es un impedimento. Los textos los escribo yo — basta con que me describas tus servicios y precios en un mensaje o en un audio. Para las fotos te digo qué hacer con el móvil, y donde encaje elijo imágenes de banco adecuadas. Puede que tampoco tengas logotipo: te lo hago junto con la web por $150.",
      },
    ],
  },

  contact: {
    heading: "Enviar solicitud",
    subheading:
      "Cuéntame qué es tu negocio y cómo te imaginas la web. Te respondo, te digo el precio y dibujo la maqueta de tu portada gratis.",
    bullets: [
      "Respondo en un día laborable",
      "Nada de spam — al grano",
      "Digo el precio antes de empezar",
    ],
    form: {
      name: "Nombre",
      namePlaceholder: "Cómo te llamo",
      businessType: "Sector / encargo",
      businessTypePlaceholder: "Por ejemplo: una cafetería",
      contactMethod: "Cómo te contacto",
      // Short on purpose — see the note in ru.ts.
      contactMethodPlaceholder: "Elige uno",
      methods: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        instagram: "Instagram",
        email: "Correo",
      },
      contactValue: "Contacto",
      contactValuePlaceholder: "Teléfono o @usuario",
      automate: "¿Qué necesitas?",
      automatePlaceholder:
        "Por ejemplo: una web para una barbería — servicios, precios y reservas. Ahora mismo solo tengo Instagram.",
      optional: "opcional",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      privacyNote:
        "Al enviar este formulario aceptas el tratamiento de tus datos.",
      privacyLink: "Política de privacidad",
    },
    validation: {
      required: "Rellena los campos obligatorios.",
      email: "Introduce un correo válido.",
    },
    success: {
      title: "¡Solicitud enviada!",
      text: "Gracias. Te respondo en un día laborable.",
      again: "Enviar otra solicitud",
    },
    error: {
      generic:
        "No se ha podido enviar la solicitud. Inténtalo de nuevo más tarde.",
      unavailable:
        "El envío no está disponible ahora mismo. Escríbeme directamente y te respondo.",
    },
  },

  footer: {
    brand: "Service Studio by Ruslan",
    tagline: "Webs para pequeños negocios. Puedes empezar con poco.",
    privacy: "Política de privacidad",
  },

  privacy: {
    title: "Política de privacidad",
    subtitle:
      "Esta página explica qué información recibo a través del formulario de contacto y cómo la uso para responder a tu solicitud.",
    back: "Volver al inicio",
    sections: [
      {
        heading: "Qué información se recoge",
        paragraphs: ["A través del formulario de la web puedo recibir:"],
        items: [
          "tu nombre;",
          "datos de contacto como correo electrónico, teléfono, usuario de Telegram u otro medio que facilites;",
          "tu sector, tu encargo o la descripción de tu proyecto;",
          "el mensaje que envías a través del formulario.",
        ],
      },
      {
        heading: "Para qué se usa la información",
        paragraphs: ["Esta información se usa únicamente para:"],
        items: [
          "responder a tu solicitud;",
          "entender el encargo;",
          "proponer una posible solución;",
          "preparar un ejemplo funcional, un presupuesto o los siguientes pasos a partir de tu solicitud.",
        ],
      },
      {
        heading: "Adónde va la información",
        paragraphs: [
          "Al enviar el formulario, la información puede transmitirse a través de un servicio de correo que se encarga de entregar los mensajes de la web.",
          "La información también puede quedar guardada en mi correo o en mis herramientas de trabajo si hace falta para comunicarnos sobre tu solicitud.",
        ],
        items: [],
      },
      {
        heading: "Cesión a terceros",
        paragraphs: [
          "No vendo ni cedo tu información a terceros con fines publicitarios.",
          "La información puede ser tratada por servicios técnicos que hacen funcionar la web, el formulario o el envío de correo.",
        ],
        items: [],
      },
      {
        heading: "Conservación",
        paragraphs: [
          "Conservo la información solo el tiempo necesario para tramitar la solicitud, comunicarnos sobre el encargo y mantener un historial de trabajo básico.",
          "Si quieres que borre tu información, puedes escribirme por cualquiera de los medios de contacto que aparecen en la web.",
        ],
        items: [],
      },
      {
        heading: "Tus derechos",
        paragraphs: ["Puedes pedirme que:"],
        items: [
          "confirme qué información he recibido;",
          "corrija la información;",
          "borre la información;",
          "deje de usar tu información para seguir contactando contigo.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Para cuestiones de privacidad, escríbeme por Telegram o WhatsApp — los enlaces están en la sección de solicitud de la página principal.",
        ],
        items: [],
      },
    ],
  },
};
