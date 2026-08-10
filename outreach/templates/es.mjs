/* The Spanish outreach copy.

   Rules this file follows, and why:

   - Every first message names one true thing about *their* shop. A DM that
     would read the same sent to two hundred barbershops gets treated as what
     it is. The observation comes from `lead.hook`; the angle templates below
     are the fallback wording when the hook is the generic version of itself.
   - No link in the first Instagram DM. A first-time DM from a stranger with a
     URL in it lands in Requests and stays unread. The proof goes in the
     second message, once the thread exists.
   - The ask is the free mockup, never a call and never "¿te interesa?".
     Looking at a drawing costs the reader nothing, which is the only reason
     a stranger says yes to anything.
   - The discount is not in the first message. Opening with a price cut sells
     a discount rather than a website, and there is nothing left to give when
     they hesitate later. It arrives at touch 3, or the moment they ask what
     it costs.
   - `vosotros`, because the reader is a shop with two or three chairs. For a
     single-chair barber switch to `tú` by hand — it is two words per message.
*/

export const PRICE = "450 €";
export const DISCOUNT_PRICE = "300 €";
export const CASE_URL = "https://barbershop.servicestudiobyruslan.com/";

/** The angles, each tied to a signal the audit or the harvest can actually see. */
export const ANGLES = {
  no_website: {
    label: "Только Instagram, сайта нет",
    hook: "he visto que no tenéis web propia — quien os busca en Google llega al perfil y ahí no ve ni los precios ni las horas libres",
  },
  booking_only: {
    label: "Только Booksy / Fresha / Treatwell",
    hook: "os he encontrado en Booksy, pero página vuestra no hay — cada reserva pasa por ellos y se lleva su comisión, y quien os busca por el nombre no llega a nada que sea vuestro",
  },
  linktree: {
    label: "В шапке профиля Linktree или агрегатор",
    hook: "el enlace de vuestro perfil lleva a una lista de botones: ni precios, ni fotos del trabajo, ni nada que os distinga de la barbería de al lado",
  },
  broken_site: {
    label: "Сайт не открывается или без HTTPS",
    hook: "vuestra web no llega a abrirse — el móvil avisa de que el sitio no es seguro, y el que ve ese aviso se va",
  },
  not_mobile: {
    label: "Сайт не адаптирован под телефон",
    hook: "he abierto vuestra web en el móvil y hay que hacer zoom para leer los precios, y casi todo el mundo os busca desde el móvil",
  },
  no_prices: {
    label: "На сайте нет цен и услуг",
    hook: "vuestra web no dice los precios ni cuánto dura cada servicio, así que acabáis contestando eso por DM uno a uno",
  },
  outdated: {
    label: "Сайт устарел / данные не совпадают",
    hook: "en vuestra web siguen unos datos que ya no cuadran con lo que ponéis en Instagram, y el cliente se fía del que encuentra primero",
  },
};

const cut = (s) => s.replace(/\n{3,}/g, "\n\n").trim();

/* Instagram DM. Short enough to read without tapping "more". */
const instagram = {
  1: (c) =>
    cut(`Hola! Soy Ruslan, hago webs para negocios de barrio aquí en Barcelona.

${cap(c.hook)}.

Os dibujo la portada de vuestra web gratis para que la veáis: si os encaja seguimos, y si no, lo dejamos ahí y no me debéis nada. ¿Os la enseño?`),

  2: (c) =>
    cut(`Os dejo un ejemplo de lo que hago, así se ve mejor que explicándolo: ${c.caseUrl}

Es una barbería — las horas libres salen en la primera pantalla y los precios llevan al lado cuánto dura cada servicio. Lo vuestro lo dibujo igual, gratis, y lo miráis con calma.`),

  3: (c) =>
    cut(`Una cosa más y os dejo tranquilos: estoy cerrando los tres primeros trabajos aquí en Barcelona por ${c.discountPrice} en vez de ${c.price}, a cambio de poder enseñar vuestra web en mi portfolio y de dos líneas vuestras contando qué tal fue.

${c.slotsLine} Si os viene bien, dibujo la portada hoy y mañana la tenéis.`),

  4: (c) =>
    cut(`No os escribo más, que ya está bien de dar la lata.

Si algún día queréis ver cómo quedaría vuestra web, escribidme y os la dibujo — eso sigue siendo gratis. Mucha suerte con la barbería.`),
};

/* WhatsApp. They see a phone number they don't know, so the first line has to
   say who I am and where I found them before anything else. */
const whatsapp = {
  1: (c) =>
    cut(`Buenas! Soy Ruslan, hago webs para negocios pequeños en Barcelona. Os escribo por el número que tenéis en Google.

${cap(c.hook)}.

Os dibujo la portada de vuestra web gratis, sin compromiso: la veis y decidís. Ejemplo de una barbería que monté: ${c.caseUrl}`),

  2: (c) =>
    cut(`Os escribí hace unos días por lo de la web — os dejo esto por si se perdió: ${c.caseUrl}

Si queréis, dibujo la portada de la vuestra y la veis mañana. Gratis y sin compromiso.`),

  3: (c) =>
    cut(`Último aviso y no insisto más: los tres primeros trabajos en Barcelona los hago por ${c.discountPrice} en vez de ${c.price}, a cambio de enseñar la web en mi portfolio y una reseña corta vuestra. ${c.slotsLine}`),

  4: (c) =>
    cut(`Lo dejo aquí para no molestar. Si en algún momento os hace falta la web, escribidme y os dibujo la portada gratis. Suerte!`),
};

/* Email. Only for the ones with a real inbox on their own domain — a
   @gmail on a business card is read less often than a WhatsApp. */
const email = {
  1: (c) => ({
    subject: `La web de ${c.name}, dibujada antes de pagar`,
    body: cut(`Hola,

Soy Ruslan, hago webs para negocios pequeños en Barcelona: barberías, salones, clínicas de barrio.

${cap(c.hook)}.

Os propongo esto: dibujo la portada de vuestra web y os la enseño en 24 horas. Gratis. Si no os encaja, no me debéis nada; si os gusta, la web funcionando está en tres días por ${c.price}, precio cerrado antes de empezar.

Un ejemplo de barbería: ${c.caseUrl}
Y quién soy y cómo trabajo: ${c.siteUrl}

Ruslan
Service Studio — Barcelona`),
  }),
  2: (c) => ({
    subject: `Re: la web de ${c.name}`,
    body: cut(`Hola,

Os escribí hace unos días ofreciendo dibujar la portada de vuestra web gratis. Lo dejo por aquí arriba por si se quedó enterrado.

El ejemplo, por si no lo abristeis: ${c.caseUrl}

Si me decís que sí, mañana lo tenéis delante.

Ruslan`),
  }),
  3: (c) => ({
    subject: `${c.discountPrice} en vez de ${c.price}, para los tres primeros`,
    body: cut(`Hola,

Estoy cerrando los tres primeros trabajos en Barcelona por ${c.discountPrice} en vez de ${c.price}. A cambio pido dos cosas: poder enseñar vuestra web en mi portfolio y unas líneas vuestras contando qué tal fue. ${c.slotsLine}

La portada sigo dibujándola gratis antes de que decidáis nada.

Ruslan`),
  }),
  4: (c) => ({
    subject: `Cierro el tema`,
    body: cut(`Hola,

No os escribo más. Si algún día queréis ver cómo quedaría vuestra web, contestad a este correo y os la dibujo — eso sigue siendo gratis.

Suerte con ${c.name}.

Ruslan`),
  }),
};

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export const channels = { instagram, whatsapp, email };

/* What to say when they answer. These are the five replies that actually
   arrive; everything else is a variation of one of them. Kept here rather
   than in the README so `outreach replies` can print them at the moment
   they're needed. */
export const REPLIES = [
  {
    q: "¿Cuánto cuesta? / Cuánto vale",
    a: `Una página con servicios, precios, fotos y formulario: ${PRICE}, precio cerrado antes de empezar. Ahora mismo los tres primeros trabajos en Barcelona los hago por ${DISCOUNT_PRICE} a cambio de enseñar la web en mi portfolio y una reseña corta.\n\nY el orden es este: primero os dibujo la portada gratis, la veis, y solo si os gusta hablamos de dinero (30% al empezar, el resto al entregar).`,
    note: "Цену называем сразу и без пауз. Уклончивый ответ на прямой вопрос о цене убивает сделку быстрее, чем сама цена.",
  },
  {
    q: "Ya tengo web",
    a: `Lo sé, la he visto — por eso os escribo. [одна конкретная вещь: не открывается на телефоне / нет цен / данные устарели]. Rehacerla es el mismo trabajo y el mismo precio, el dominio sigue siendo vuestro y con la misma dirección, y la antigua sigue en pie hasta que la nueva esté lista.\n\nDibujo la portada nueva gratis y las comparáis. Si la vuestra os sigue gustando más, no habéis perdido nada.`,
    note: "Не спорить с их сайтом в лоб. Показать одну проблему и предложить сравнить.",
  },
  {
    q: "Mándame información / Pásame un presupuesto",
    a: `Va todo aquí: ${"{siteUrl}"} — servicios, precios y ejemplos.\n\nPero lo que de verdad ayuda a decidir no es un PDF, es ver vuestra portada dibujada. ¿Cómo se llama la barbería en Google y qué servicios queréis que salgan? Con eso me apaño y mañana la tenéis.`,
    note: "«Пришли инфо» — это вежливое «нет». Не присылаем PDF, возвращаем разговор к макету и задаём один конкретный вопрос.",
  },
  {
    q: "Ahora no / Estamos liados",
    a: `Sin problema. ¿Os escribo dentro de un mes o lo dejo del todo? Las dos me valen, decidme cuál.`,
    note: "Ставим статус replied и дату через месяц. Прямой вопрос «месяц или совсем?» получает ответ, а «ок, удачи» — нет.",
  },
  {
    q: "¿Eres de aquí? / ¿Dónde estás?",
    a: `En Barcelona, sí. Si queréis nos vemos en la barbería y lo miramos allí mismo. Por escrito nos entendemos en español sin problema; si preferís llamada, esa la hago en inglés o en ruso — os lo digo ahora y no a mitad del encargo.`,
    note: "Честно про язык звонка. На сайте это уже написано, в переписке подтверждаем — иначе всплывёт в худший момент.",
  },
  {
    q: "No me interesa",
    a: `Entendido, gracias por contestar. Suerte con la barbería.`,
    note: "Статус lost, без уговоров. Один вежливый выход экономит репутацию для второго захода через полгода.",
  },
];
