export const ru = {
  metadata: {
    title: "Сайты для малого бизнеса за 3 дня | Руслан",
    description:
      "Делаю сайты для небольшого бизнеса: услуги, цены, примеры работ и запись. Макет главной страницы — бесплатно за сутки, сайт — за три дня, цену называю до начала работы.",
    ogTitle: "Сайты для малого бизнеса | Service Studio by Ruslan",
    ogDescription:
      "Делаю сайты для небольшого бизнеса: услуги, цены, примеры работ и запись. Макет главной страницы — бесплатно за сутки, сайт — за три дня, цену называю до начала работы.",
  },

  header: {
    nav: {
      formats: "Как начать",
      faq: "Вопросы",
      about: "Обо мне",
    },
    cta: "Оставить заявку",
    language: "Язык",
    theme: "Тема",
  },

  hero: {
    brand: "Service Studio by Ruslan",
    // `backtick` segments render in the accent colour in the hero h1.
    // Non-breaking space before "оплаты": the h1 wraps at three different
    // widths and "до" kept being stranded at the end of a line.
    title: "Сайт под ваш бизнес. `Дизайн` увидите до оплаты.",
    // The offer itself — the hero's only call to action, rendered as a button.
    offerCta: "Посмотреть макет сайта бесплатно",
    // What the visitor is actually guaranteed, in the order the deal happens:
    // what is free, what they owe if it misses, what they get if it lands.
    // Three ticked lines, not a paragraph — a first screen is scanned, not
    // read, and prose there only postpones the one question ("what do I risk
    // if I write to him"). `backtick` renders in the accent colour.
    promises: [
      "Макет главной — `бесплатно`, за сутки",
      "Не подойдёт — вы ничего не должны",
      "Понравится — сайт за 3 дня и месяц правок",
    ],
    // Phones only. The header nav is hidden below 768 and there is no room to
    // put it back — 21px of slack once the logo, language, theme and CTA are
    // measured. So the one question a visitor arrives with gets its own way
    // down, rather than four screens of scrolling to find the number.
    pricesLink: "Сколько это стоит",
    // Shown in the About card, not in the hero. Deliberately concrete: "open
    // for new projects" is what every freelancer writes, so it reads as filler.
    // A date the visitor can act on does the work instead.
    availability: "Могу начать на этой неделе",
  },

  // Real work / proof. The section renders only when `items` has entries —
  // add real projects here (task → what was built → result). No fake cases.
  cases: {
    heading: "Примеры работ",
    intro: "Живые сайты: откройте и посмотрите, как всё устроено.",
    taskLabel: "Задача",
    builtLabel: "Что собрал",
    resultLabel: "Результат",
    openLabel: "Открыть пример",
    items: [
      // First, and therefore the wide card at the top of the grid.
      {
        task: "Пекарня",
        image: "/cases/halfpastsix-bakery.webp",
        built:
          "Табло остатков в первом экране: сколько чего лежит на полке в эту минуту, что уже разобрали и во сколько, что выйдет из печи в одиннадцать. Бронь на самовывоз без регистрации, оплата на кассе.",
        result:
          "Человек не едет через весь город за хлебом, которого уже нет.",
        link: "https://bakery.servicestudiobyruslan.com/",
      },
      {
        task: "Салон красоты",
        image: "/cases/maison-salon.webp",
        phone: "/cases/maison-phone.webp",
        built:
          "Услуги с точной ценой и длительностью, слайдер «до и после», отзывы клиентов, запись в один клик.",
        result:
          "Человек видит цену и сколько это займёт ещё до записи — меньше вопросов в переписке.",
        link: "https://maison.servicestudiobyruslan.com/",
      },
      {
        task: "Барбершоп",
        image: "/cases/strop-barbershop.webp",
        phone: "/cases/strop-phone.webp",
        built:
          "Ближайшие свободные окна прямо в первом экране — время, мастер, одно касание. Прайс с длительностью каждой услуги, четверо мастеров, галерея работ и как найти вход во втором дворе.",
        result:
          "Человек видит, когда его посадят в кресло, ещё до того, как открыл прайс.",
        link: "https://barbershop.servicestudiobyruslan.com/",
      },
      {
        task: "Стоматология",
        image: "/cases/brightsmile-dental.webp",
        phone: "/cases/brightsmile-phone.webp",
        built:
          "Пять услуг с ценами, спокойный текст для тех, кто боится лечиться, форма записи без звонка.",
        result: "Пациент понимает, что будет на приёме, и записывается сам.",
        link: "https://brightsmile.servicestudiobyruslan.com/",
      },
      {
        task: "Гостевой дом",
        image: "/cases/north-house.webp",
        phone: "/cases/north-house-phone.webp",
        built:
          "Девять номеров с честными описаниями и ценами, фильтр по этажу и виду, правила заселения на самой странице, бронирование напрямую без посредников.",
        result:
          "Гость выбирает номер и проверяет даты сам — без переписки и комиссий площадок.",
        link: "https://boutiquehotel.servicestudiobyruslan.com/",
      },
    ] as {
      task: string;
      built: string;
      result: string;
      link?: string;
      image?: string;
      /* The same page at phone width, pinned over the cover. */
      phone?: string;
    }[],
  },

  formats: {
    heading: "С чего начать",
    note: "Цену называю до начала работы и не меняю по ходу. Что за пределами списка — считаем отдельно и тоже до начала. Первый месяц после запуска мелкие правки бесплатно, дальше — пакет из 5 правок за 60 €.",
    // A published price raises exactly one objection — why would I hand €450 to
    // someone I've never met? It gets answered next to the number rather than
    // three screens down in the FAQ, where nobody hesitating has scrolled yet.
    mockupFirst:
      "Сначала макет, потом деньги: предоплату 30% беру только после того, как вы увидели главную и она вам понравилась.",
    ctaText: "Не знаете, что вам нужно?",
    ctaLink: "Оставить заявку",
    // The checklist is what makes a fixed price honest: it says where the
    // price stops. `term` sits at the card's foot so both tiers line up.
    includesLabel: "Что входит",
    termLabel: "Срок",
    // Two tiers, both websites. Design work is deliberately absent here: a
    // third, cheaper number pulls the eye away from the choice this section
    // exists to make. It lives in the FAQ answer about missing materials.
    //
    // Every price on the site is in euros, which is what the invoice says; a
    // client paying in another currency is billed at the day's rate, and the
    // page stays one number for everyone. The space before € is a NON-BREAKING
    // one (U+00A0), here and in the FAQ — ru/uk/es put the symbol after the
    // number, and "60" must not be left at the end of a line without its "€".
    // English writes €60 instead, so en.ts needs no such space.
    items: [
      {
        title: "Сайт для бизнеса",
        price: "450 €",
        description:
          "Первый сайт для мастера, салона или студии: чтобы вас нашли и написали напрямую.",
        includes: [
          "Одна страница: услуги, цены, работы, контакты",
          "Тексты пишу сам, по фото подскажу",
          "Форма заявки — письма приходят вам на почту",
          "Домен на ваше имя, хостинг и подключение",
          "Одинаково аккуратно на телефоне и на компьютере",
          "Месяц мелких правок после запуска",
        ],
        term: "3 дня с момента предоплаты",
      },
      {
        title: "Сайт с каталогом",
        price: "850 €",
        description:
          "Когда одной страницы мало: гостевой дом, магазин, клиника с расписанием.",
        includes: [
          "Всё, что входит в «Сайт для бизнеса»",
          "Несколько страниц вместо одной",
          "Каталог товаров или номеров",
          "Фильтры и поиск по каталогу",
          "Бронирование или заявка на конкретную позицию",
        ],
        term: "7 дней с момента предоплаты",
      },
    ],
  },

  process: {
    heading: "Как мы работаем",
    subheading: "От разговора до запуска — четыре шага, без сюрпризов по цене.",
    steps: [
      {
        title: "Рассказываете, что нужно",
        description:
          "Пишете в форму или в мессенджер: какой бизнес, что должен уметь сайт. Хватит ссылки на ваш профиль или прайса — остальное спрошу сам.",
      },
      {
        title: "Рисую макет главной — бесплатно, за сутки",
        description:
          "Показываю, как будет выглядеть ваша страница: блоки, тексты, цвета. Смотрите с телефона и говорите, что поправить. Ничего не должны, если не подошло.",
      },
      {
        title: "Предоплата 30% и сборка",
        description:
          "Нравится — собираю рабочий сайт, подключаю форму и домен, помогаю запустить: одностраничный за три дня, с каталогом — за семь.",
      },
      {
        title: "Запуск и месяц правок",
        description:
          "Отдаю готовый сайт, остаток оплаты — при сдаче. Первый месяц мелкие правки делаю бесплатно.",
      },
    ],
  },

  about: {
    heading: "Обо мне",
    name: "Руслан",
    paragraphs: [
      "Меня зовут Руслан. Делаю сайты для небольших бизнесов — салонов, клиник, гостевых домов и мастеров, которые работают с клиентами напрямую.",
      "Со мной вы общаетесь лично: без менеджеров и посредников. Разбираю задачу, за сутки бесплатно рисую макет главной — и только если он понравился, договариваемся о сборке.",
      "Сам рисую, сам собираю, сам подключаю домен и форму — поэтому сроки короткие, а правки не ждут очереди. За крупные интернет-магазины и мобильные приложения не берусь: это другая работа и другие деньги.",
    ],
    location: "Барселона, Испания",
    photoAlt: "Руслан, автор Service Studio",
    // Concrete, checkable facts for the side card — no invented numbers.
    facts: [
      "Отвечаю лично, без менеджеров",
      "Макет главной — за сутки, сайт — за 3–7 дней",
      "Русский, английский, украинский — испанский в переписке",
    ],
  },

  // Objection handling, right before the form. Only answers I can actually
  // stand behind — no invented policy.
  faq: {
    heading: "Частые вопросы",
    intro:
      "То, что обычно спрашивают до начала работы. Если вашего вопроса тут нет — напишите, отвечу лично.",
    items: [
      {
        q: "А если макет не понравится?",
        a: "Значит, расходимся: вы ничего не платите и ничего не должны. Макет главной я рисую бесплатно и показываю до того, как речь заходит о деньгах — поэтому предоплата идёт после макета, а не до него.",
      },
      {
        q: "Сколько времени всё занимает?",
        a: "Макет главной — сутки. Одностраничный сайт — три дня с момента предоплаты, сайт с каталогом — семь. Логотип, визитка или меню — два-три дня. Если у вас горит, скажите сразу: посмотрю, что можно сделать.",
      },
      // Placed third, right after scope and timing: the sooner someone who
      // needs a shop learns it isn't me, the less of their time I take. Saying
      // no costs money, which is exactly why it reads as true.
      {
        q: "А если мне нужен интернет-магазин или приложение?",
        a: "Тогда вам не ко мне. Магазин с оплатой, складом и личными кабинетами или мобильное приложение — другая работа, другие сроки и другие деньги; браться за них, чтобы не упустить заказ, я не стану. А вот каталог с бронированием или заявкой на конкретную позицию делаю — он входит в сайт за 850 €.",
      },
      {
        q: "Как происходит оплата?",
        a: "Цену называю до начала работы и не меняю по ходу. После того как макет утверждён — предоплата 30%, остаток при сдаче готового сайта. Способ оплаты подбираем тот, который удобен вам.",
      },
      {
        q: "Кому принадлежит сайт и домен?",
        a: "Вам. Домен покупается на ваше имя — это примерно 10–15 € в год, и он остаётся вашим при любом раскладе. Хостинг для таких сайтов бесплатный. Покупку, настройку и подключение беру на себя.",
      },
      {
        q: "Смогу ли я потом сам менять тексты и фото?",
        a: "По умолчанию правки делаю я: первый месяц после запуска мелкие — бесплатно, дальше пакет из 5 правок за 60 €. Если хотите менять содержимое сами, соберу простую панель управления — скажите об этом до начала, это влияет на сборку.",
      },
      {
        q: "Вы в Барселоне, а я в другой стране — это проблема?",
        a: "Нет, работаю удалённо с любой страной. Общаемся в Telegram, WhatsApp или по почте — на русском, английском или украинском, как вам удобнее. На испанском переписываюсь; если нужен созвон, он будет на русском или английском.",
      },
      {
        q: "А если у меня нет ни текстов, ни хороших фотографий?",
        a: "Это не блокер. Тексты пишу сам — достаточно, чтобы вы рассказали про услуги и цены сообщением или голосовым. По фотографиям подскажу, что снять на телефон, а где уместно — подберу подходящие из стоков. Логотипа тоже может не быть: сделаю вместе с сайтом за 150 €.",
      },
    ],
  },

  contact: {
    heading: "Оставить заявку",
    subheading:
      "Напишите, что за бизнес и каким вы видите сайт. Отвечу, назову цену и бесплатно нарисую макет главной страницы.",
    bullets: [
      "Отвечаю в течение рабочего дня",
      "Без спама — только по делу",
      "Называю цену до начала работы",
    ],
    form: {
      name: "Имя",
      namePlaceholder: "Как к вам обращаться",
      businessType: "Сфера / задача",
      businessTypePlaceholder: "Например: кофейня",
      contactMethod: "Способ связи",
      // Not "Выберите способ связи": the label right above already says what
      // the field is, and repeating it made the option 187px wide in a 186px
      // field — the browser clipped the last letter. The placeholder's one job
      // is "nothing is chosen yet".
      contactMethodPlaceholder: "Выберите",
      methods: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        instagram: "Instagram",
        email: "Email",
      },
      contactValue: "Контакт",
      contactValuePlaceholder: "Телефон или @username",
      automate: "Что нужно сделать?",
      automatePlaceholder:
        "Например: сайт для барбершопа — услуги, цены и запись. Сейчас только инстаграм.",
      optional: "необязательно",
      submit: "Отправить заявку",
      submitting: "Отправляем...",
      privacyNote: "Отправляя форму, вы соглашаетесь с обработкой этих данных.",
      privacyLink: "Политика конфиденциальности",
    },
    validation: {
      required: "Заполните обязательные поля.",
      email: "Укажите корректный email.",
    },
    success: {
      title: "Заявка отправлена!",
      // Repeats the bullet above the form word for word. A promise that turns
      // vague at the moment it comes due is the one place a visitor is most
      // likely to notice it.
      text: "Спасибо. Отвечу в течение рабочего дня.",
      again: "Отправить ещё одну заявку",
    },
    error: {
      generic: "Не удалось отправить заявку. Попробуйте позже.",
      unavailable:
        "Отправка временно недоступна. Напишите мне напрямую, и я отвечу.",
    },
  },

  footer: {
    brand: "Service Studio by Ruslan",
    tagline: "Сайты для небольшого бизнеса. Начать можно с малого.",
    privacy: "Политика конфиденциальности",
  },

  privacy: {
    title: "Политика конфиденциальности",
    subtitle:
      "Эта страница объясняет, какие данные я получаю через форму заявки и как использую их для ответа на обращение.",
    back: "На главную",
    sections: [
      {
        heading: "Какие данные собираются",
        paragraphs: ["Через форму на сайте я могу получить:"],
        items: [
          "имя;",
          "контакт для связи: email, телефон, Telegram username или другой указанный способ связи;",
          "сферу, задачу или описание проекта;",
          "сообщение, которое вы отправляете через форму.",
        ],
      },
      {
        heading: "Зачем используются данные",
        paragraphs: ["Эти данные используются только для того, чтобы:"],
        items: [
          "ответить на ваше обращение;",
          "уточнить задачу;",
          "предложить возможное решение;",
          "подготовить рабочий пример, оценку или дальнейшие шаги по вашему запросу.",
        ],
      },
      {
        heading: "Куда отправляются данные",
        paragraphs: [
          "Когда вы отправляете форму, данные могут быть переданы через email-сервис, используемый для доставки сообщений с сайта.",
          "Данные также могут храниться в моей почте или рабочих инструментах, если это нужно для общения по вашему запросу.",
        ],
        items: [],
      },
      {
        heading: "Передача третьим лицам",
        paragraphs: [
          "Я не продаю и не передаю ваши данные третьим лицам для рекламы.",
          "Данные могут быть обработаны техническими сервисами, которые помогают работе сайта, формы или email-доставки.",
        ],
        items: [],
      },
      {
        heading: "Срок хранения",
        paragraphs: [
          "Я храню данные только столько, сколько это нужно для обработки обращения, общения по задаче и базовой рабочей истории.",
          "Если вы хотите, чтобы я удалил ваши данные, вы можете написать мне через любой контакт, указанный на сайте.",
        ],
        items: [],
      },
      {
        heading: "Ваши права",
        paragraphs: ["Вы можете попросить:"],
        items: [
          "уточнить, какие данные я получил;",
          "исправить данные;",
          "удалить данные;",
          "больше не использовать ваши данные для связи.",
        ],
      },
      {
        heading: "Контакты",
        paragraphs: [
          "По вопросам конфиденциальности напишите мне в Telegram или WhatsApp — ссылки в разделе «Оставить заявку» на главной странице.",
        ],
        items: [],
      },
    ],
  },
};

export type Dictionary = typeof ru;
