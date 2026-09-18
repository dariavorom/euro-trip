export const EUR_TO_BYN = 3.49;
export const PRICES_AS_OF = "7 сентября 2026";

export const vehicle = {
  make: "Volkswagen Tiguan Allspace",
  engineCode: "DFGA",
  engine: "2.0 TDI, 1968 см³, 150 л.с. / 110 кВт, 340 Н·м",
  gearbox: "DQ381, 7-ступенчатый «мокрый» DSG",
  tankL: 58,
  adblueL: 12,
  wltpCombined: 5.2,
  realFwdHighway: 7.2,
  real4motionHighway: 7.8,
};

export const dieselPrices: Record<string, number> = {
  BY: 0.77,
  PL: 1.98,
  CZ: 1.96,
  AT: 2.13,
  IT: 2.14,
  DE: 2.33,
};

export type CountryCode = "BY" | "PL" | "CZ" | "AT" | "IT" | "DE";

export type RouteId = "alps" | "germany";

export type Waypoint = {
  id: string;
  name: string;
  country: CountryCode;
  lat: number;
  lng: number;
  note?: string;
};

export type DayLeg = {
  from: string;
  to: string;
  km: number;
  driveHours: number;
  roads: string;
};

export type TripDay = {
  day: number;
  title: string;
  summary: string;
  start: string;
  end: string;
  km: number;
  driveHours: number;
  extraHours?: string;
  legs: DayLeg[];
  overnight: string;
  tips: string[];
};

export type TollItem = {
  country: string;
  item: string;
  amount: number;
  note: string;
  buy?: string;
};

export type RouteOption = {
  id: RouteId;
  name: string;
  tagline: string;
  distanceKm: number;
  driveHours: number;
  countries: { code: CountryCode; name: string; km: number }[];
  waypoints: Waypoint[];
  days: TripDay[];
  tolls: TollItem[];
  why: string[];
};

/** Виза с 11 октября 2026 — 14 календарных дней до 24 октября включительно. */
export const tripDates = {
  visaFrom: "2026-10-11",
  visaLabel: "виза с 11 октября 2026",
  startLabel: "11 октября",
  endLabel: "24 октября",
  totalDays: 14,
  italyNights: 9,
  italyFrom: "13 октября",
  italyUntil: "утро 22 октября",
};

export type CalendarKind = "drive" | "italy" | "return";

export type CalendarDay = {
  day: number;
  date: string;
  weekday: string;
  kind: CalendarKind;
  title: string;
  summary: string;
  km?: number;
  driveHours?: number;
  overnight: string;
  countryNight: CountryCode | "HOME";
  transitOnly?: string[];
  outlets?: string[];
  tips: string[];
};

/**
 * Сжатый транзит: Чехия без ночёвки, Австрия — одна ночь в Инсбруке
 * (чтобы на 2-й день не гнать 15 ч до Вероны). Италия — 9 ночей у озера.
 */
export const calendar: CalendarDay[] = [
  {
    day: 1,
    date: "11 октября",
    weekday: "вс",
    kind: "drive",
    title: "Гомель → Белосток",
    summary: "Выезд в первый день визы. Граница Брузги / Кузница, ночёвка сразу в Шенгене.",
    km: 680,
    driveHours: 8,
    overnight: "Белосток",
    countryNight: "PL",
    tips: [
      "Выезд из Гомеля к 5:00 — цель подойти к Брузгам до полудня.",
      "Полный бак и AdBlue в Гродно. Не ночуйте в Кузнице.",
      "Если границу прошли до 15:00 и сил хватает — можно дотянуть до Лодзи; иначе Белосток.",
    ],
  },
  {
    day: 2,
    date: "12 октября",
    weekday: "пн",
    kind: "drive",
    title: "Белосток → Инсбрук",
    summary:
      "Чехия транзитом без ночёвки. Аутлеты Варшава и Freeport Hatě. Ночь в Тироле — утром сразу Бреннер.",
    km: 1180,
    driveHours: 11.5,
    overnight: "Инсбрук",
    countryNight: "AT",
    transitOnly: ["Чехия"],
    outlets: ["warsaw", "freeport"],
    tips: [
      "Выезд не позже 6:30. Designer Outlet Warszawa (Piaseczno) — 40–60 мин утром, не больше.",
      "Freeport Hatě у чешско-австрийской границы: удобный обед + шопинг 1–1,5 ч.",
      "Parndorf в этот день только если очень рано на графике — иначе оставьте силы на Альпы.",
      "Ночь в Инсбруке или Hall in Tirol: утром A13 Бреннер без утренней пробки Вены.",
    ],
  },
  {
    day: 3,
    date: "13 октября",
    weekday: "вт",
    kind: "drive",
    title: "Инсбрук → Комо",
    summary: "Бреннер и спуск в Италию. К обеду / раннему вечеру уже на озере — начало итальянских ночей.",
    km: 430,
    driveHours: 4.5,
    overnight: "Комо / Черноббио",
    countryNight: "IT",
    transitOnly: ["Австрия (до Бреннера)"],
    outlets: ["mantova"],
    tips: [
      "A13 sondermaut ≈ €12,50 + виньетка на A12.",
      "По пути можно заехать в Mantova Outlet Village (~30 мин от A22) — или перенести на день у озера.",
      "В Комо не лезьте в ZTL: парковка Lungo Lario / Tavernola / отель с парковкой.",
    ],
  },
  {
    day: 4,
    date: "14 октября",
    weekday: "ср",
    kind: "italy",
    title: "Озеро Комо · база",
    summary: "Распаковка, набережная, Беладжио паромом или Варенна без машины в центре.",
    overnight: "Комо",
    countryNight: "IT",
    tips: [
      "Машину лучше оставить у отеля: по берегу узко и платные парковки.",
      "Короткий круг: Brunate funicular или Villa Olmo.",
    ],
  },
  {
    day: 5,
    date: "15 октября",
    weekday: "чт",
    kind: "italy",
    title: "Serravalle Designer Outlet",
    summary: "Главный итальянский аутлет-день: один из крупнейших в Европе, ~1 ч 20 мин от Комо.",
    overnight: "Комо",
    countryNight: "IT",
    outlets: ["serravalle"],
    tips: [
      "Выезд к открытию (обычно 10:00). Парковка бесплатная, большой выбор брендов.",
      "Обратно через A7/A50 — к ужину снова у озера.",
    ],
  },
  {
    day: 6,
    date: "16 октября",
    weekday: "пт",
    kind: "italy",
    title: "Озеро · Беладжио / Варенна",
    summary: "Классика Комо без дальних перегонов. При желании — лёгкая поездка в Лугано (паспорт).",
    overnight: "Комо",
    countryNight: "IT",
    tips: [
      "Паром Menaggio–Bellagio–Varenna удобнее, чем гонять серпантин на Tiguan.",
      "Швейцария: виньетка и другой ценник — только если очень хотите.",
    ],
  },
  {
    day: 7,
    date: "17 октября",
    weekday: "сб",
    kind: "italy",
    title: "Franciacorta Outlet + вино",
    summary: "Бреша / Франчакорта: аутлет у трассы A4 и дегустации игристых — ближе, чем Serravalle.",
    overnight: "Комо",
    countryNight: "IT",
    outlets: ["franciacorta"],
    tips: [
      "Franciacorta Outlet Village у Rodengo Saiano — ~1 ч 10 мин.",
      "После шопинга — короткая дегустация в погребе по записи.",
    ],
  },
  {
    day: 8,
    date: "18 октября",
    weekday: "вс",
    kind: "italy",
    title: "Милан или спокойный берег",
    summary: "Либо день в Милане (поезд с Como S. Giovanni), либо повтор любимого уголка озера.",
    overnight: "Комо",
    countryNight: "IT",
    tips: [
      "В Милан удобнее без машины: Area C и парковки дорогие.",
      "Vicolungo The Style Outlets — запасной аутлет севернее, если Serravalle уже закрыли.",
    ],
  },
  {
    day: 9,
    date: "19 октября",
    weekday: "пн",
    kind: "italy",
    title: "Озеро · свободный день",
    summary: "Запас под погоду, отдых после шопинга или поездка в Бергамо Alta.",
    overnight: "Комо",
    countryNight: "IT",
    tips: ["Держите этот день гибким: октябрь на озере часто с дождём."],
  },
  {
    day: 10,
    date: "20 октября",
    weekday: "вт",
    kind: "italy",
    title: "Комо · город и виллы",
    summary: "Villa Melzi / Balbianello по сезону или прогулка до Черноббио.",
    overnight: "Комо",
    countryNight: "IT",
    tips: ["Проверьте часы вилл — в будни спокойнее, чем в выходные."],
  },
  {
    day: 11,
    date: "21 октября",
    weekday: "ср",
    kind: "italy",
    title: "Последний полный день в Италии",
    summary: "Добор покупок, стирка, полный бак не обязателен — уедете утром с запасом до Мюнхена.",
    overnight: "Комо",
    countryNight: "IT",
    outlets: ["vicolungo"],
    tips: [
      "Опция: Vicolungo The Style Outlets по пути «на север», если ещё не были.",
      "Соберите документы и Green Card с вечера — утром только выезд.",
    ],
  },
  {
    day: 12,
    date: "22 октября",
    weekday: "чт",
    kind: "return",
    title: "Комо → Мюнхен",
    summary: "Подъём на Бреннер и Бавария. Чехию не трогаем. Аутлет Ingolstadt Village по пути.",
    km: 520,
    driveHours: 5.5,
    overnight: "Мюнхен-юг / Розенхайм",
    countryNight: "DE",
    transitOnly: ["Австрия (Бреннер)"],
    outlets: ["ingolstadt"],
    tips: [
      "Выезд из Комо до 9:00. Ingolstadt Village — съезд с A9, ~1–1,5 ч шопинга.",
      "Ночь южнее Мюнхена: утром сразу на Nürnberg / Dresden.",
      "Дизель в DE дорогой — лейте минимум до Польши.",
    ],
  },
  {
    day: 13,
    date: "23 октября",
    weekday: "пт",
    kind: "return",
    title: "Мюнхен → Белосток",
    summary: "Автобан и Польша. Fashion House Outlet Wrocław — последняя крупная точка. Чехия снова транзитом не нужна.",
    km: 1080,
    driveHours: 10.5,
    overnight: "Белосток",
    countryNight: "PL",
    outlets: ["wroclaw"],
    tips: [
      "Выезд из Мюнхена к 7:00. Полный бак у Згожелеца / Вроцлава.",
      "Fashion House Outlet Wrocław — удобно на A4, не уходите в центр города.",
      "К Белостоку подойдите с запасом: утром очередь на выезд из EU спокойнее.",
    ],
  },
  {
    day: 14,
    date: "24 октября",
    weekday: "сб",
    kind: "return",
    title: "Белосток → Гомель",
    summary: "Кузница / Брузги и домой. Последний день визы — без лишних остановок.",
    km: 680,
    driveHours: 8,
    overnight: "Гомель",
    countryNight: "HOME",
    tips: [
      "К границе — почти пустой бак, заливка уже в Гродно (~€0,77).",
      "Документы те же. После Брузгов полный бак хватит до Гомеля.",
    ],
  },
];

export type OutletStop = {
  id: string;
  name: string;
  brand: string;
  country: string;
  near: string;
  when: string;
  detourMin: number;
  why: string;
  brands: string;
  tip: string;
  lat: number;
  lng: number;
  url?: string;
};

/** Крупные популярные аутлеты ровно на коридоре туда / у озера / обратно. */
export const outlets: OutletStop[] = [
  {
    id: "warsaw",
    name: "Designer Outlet Warszawa",
    brand: "McArthurGlen",
    country: "Польша",
    near: "Piaseczno, юг Варшавы",
    when: "День 2 · туда",
    detourMin: 25,
    why: "Первый крупный стоп после Белостока, не уводит с S8/A1 надолго.",
    brands: "Nike, Adidas, Calvin Klein, Guess, Tommy, Cos",
    tip: "Будни утром свободнее. Парковка бесплатная. Не застревайте больше часа — впереди длинный день.",
    lat: 52.0667,
    lng: 21.0167,
    url: "https://www.mcarthurglen.com/en/outlets/pl/designer-outlet-warsaw/",
  },
  {
    id: "freeport",
    name: "Freeport Fashion Outlet",
    brand: "Freeport",
    country: "Чехия",
    near: "Hatě / Znojmo, у границы с Австрией",
    when: "День 2 · туда",
    detourMin: 10,
    why: "Лежит почти на съезде с пути Брно → Вена. Идеальный обед + шопинг без отдельного крюка.",
    brands: "≈ 200 магазинов, спорт и mid-fashion",
    tip: "Чешские цены обычно приятнее австрийских. Дальше сразу A5 на Вену / A1 на Зальцбург.",
    lat: 48.75,
    lng: 16.05,
    url: "https://www.freeport.cz/",
  },
  {
    id: "parndorf",
    name: "Designer Outlet Parndorf",
    brand: "McArthurGlen",
    country: "Австрия",
    near: "Parndorf, восток от Вены",
    when: "День 2 · только если рано",
    detourMin: 40,
    why: "Один из самых известных аутлетов Европы — но это крюк от чистого хода на Зальцбург.",
    brands: "Premium: Gucci, Ralph Lauren, Nike, Tommy и др.",
    tip: "Берите только при выезде из Белостока до 6:00 и коротком Warsaw. Иначе оставьте Serravalle.",
    lat: 48.005,
    lng: 16.86,
    url: "https://www.mcarthurglen.com/en/outlets/at/designer-outlet-parndorf/",
  },
  {
    id: "mantova",
    name: "Mantova Outlet Village",
    brand: "Outlet Village",
    country: "Италия",
    near: "Mantova, у A22",
    when: "День 3 или день у озера",
    detourMin: 20,
    why: "На спуске с Бреннера к Комо — логичная итальянская точка без отдельного дня.",
    brands: "Итальянский mid/premium, спорт, дом",
    tip: "Если приедете в Комо поздно — перенесите на отдельный день с базы.",
    lat: 45.16,
    lng: 10.78,
    url: "https://www.mantovaoutletvillage.it/",
  },
  {
    id: "serravalle",
    name: "Serravalle Designer Outlet",
    brand: "McArthurGlen",
    country: "Италия",
    near: "Serravalle Scrivia, ~1 ч 20 мин от Комо",
    when: "День 5 · база Комо",
    detourMin: 0,
    why: "Самый крупный и «обязательный» аутлет поездки. Ради него и закладываем отдельный день.",
    brands: "200+ магазинов, сильный luxury/premium сегмент",
    tip: "Будни лучше субботы. Возьмите сумки-тележки: расстояния внутри большие.",
    lat: 44.728,
    lng: 8.856,
    url: "https://www.mcarthurglen.com/en/outlets/it/designer-outlet-serravalle/",
  },
  {
    id: "franciacorta",
    name: "Franciacorta Outlet Village",
    brand: "Outlet Village",
    country: "Италия",
    near: "Rodengo Saiano, Бреша",
    when: "День 7 · база Комо",
    detourMin: 0,
    why: "Ближе Serravalle и рядом винодельческий регион — шопинг + дегустация за один день.",
    brands: "Итальянские бренды, спорт, дети",
    tip: "Сочетайте с короткой дегустацией Franciacorta — заранее бронь.",
    lat: 45.595,
    lng: 10.078,
  },
  {
    id: "vicolungo",
    name: "Vicolungo The Style Outlets",
    brand: "The Style Outlets",
    country: "Италия",
    near: "Vicolungo, Новaра / A4",
    when: "День 11 · запасной",
    detourMin: 15,
    why: "Севернее Милана, удобно «закрыть» шопинг перед выездом домой.",
    brands: "150+ stores, mid-fashion",
    tip: "Хорошая альтернатива, если Serravalle в субботу был переполнен.",
    lat: 45.471,
    lng: 8.462,
  },
  {
    id: "ingolstadt",
    name: "Ingolstadt Village",
    brand: "The Bicester Collection",
    country: "Германия",
    near: "Ingolstadt, A9 между Мюнхеном и Нюрнбергом",
    when: "День 12 · обратно",
    detourMin: 15,
    why: "Премиальный немецкий стоп ровно на обратном автобане.",
    brands: "Premium / luxury village-формат",
    tip: "1–1,5 часа максимум: впереди ещё ночёвка и длинный день 13.",
    lat: 48.785,
    lng: 11.395,
    url: "https://www.thebicestercollection.com/ingolstadt-village/",
  },
  {
    id: "wroclaw",
    name: "Fashion House Outlet Wrocław",
    brand: "Fashion House",
    country: "Польша",
    near: "Вроцлав, у A4",
    when: "День 13 · обратно",
    detourMin: 20,
    why: "Последний крупный аутлет перед Белостоком; цены обычно ниже немецких.",
    brands: "Спорт, mid-fashion, дом",
    tip: "Сразу после заправки полным баком. Не уходите далеко от кольца A4/A8.",
    lat: 51.095,
    lng: 17.02,
  },
];

export const foodProfiles = {
  budget: {
    id: "budget" as const,
    label: "Скромно",
    hint: "пекарни, Lidl, траттория без вина",
    roadPerDay: 55,
    italyPerDay: 70,
  },
  medium: {
    id: "medium" as const,
    label: "Обычно",
    hint: "кафе + нормальный ужин",
    roadPerDay: 90,
    italyPerDay: 110,
  },
  comfort: {
    id: "comfort" as const,
    label: "Комфорт",
    hint: "рестораны у озера",
    roadPerDay: 130,
    italyPerDay: 160,
  },
};

export type FoodId = keyof typeof foodProfiles;

/** Ночёвки в смете: 2 транзита туда + 9 Италия + 2 транзита обратно. */
export const hotelNights = [
  { place: "Белосток (11.10)", amount: 55, kind: "transit" as const },
  { place: "Инсбрук (12.10)", amount: 100, kind: "transit" as const },
  { place: "Комо × 9 ночей (13–21.10)", amount: 990, kind: "italy" as const },
  { place: "Мюнхен (22.10)", amount: 95, kind: "transit" as const },
  { place: "Белосток (23.10)", amount: 55, kind: "transit" as const },
];

export type LodgingPick = {
  name: string;
  note: string;
  fromEur: number;
};

export type LodgingNight = {
  id: string;
  nightLabel: string;
  city: string;
  phase: "out" | "italy" | "back";
  area: string;
  why: string;
  budgetEur: [number, number];
  picks: LodgingPick[];
  backup: string;
  nights?: number;
};

export const lodgingPlan: LodgingNight[] = [
  {
    id: "bialystok-out",
    nightLabel: "Ночь 1 · 11 октября",
    city: "Белосток",
    phase: "out",
    area: "центр или выезд на S8",
    why: "После Брузгов не геройствовать. Утром сразу на аутлет Варшавы и длинный ход к Альпам.",
    budgetEur: [45, 75],
    picks: [
      {
        name: "Ibis Styles Białystok",
        note: "сетевой 3★, завтрак, парковка",
        fromEur: 55,
      },
      {
        name: "Hotel Royal Magnat",
        note: "тихо, удобный выезд на S8",
        fromEur: 50,
      },
      {
        name: "Focus Hotel Premium Białystok",
        note: "чуть выше классом после границы",
        fromEur: 70,
      },
    ],
    backup: "Если граница до 15:00 — Лодзь у A1. Не ночуйте в Кузнице.",
  },
  {
    id: "innsbruck",
    nightLabel: "Ночь 2 · 12 октября",
    city: "Инсбрук / Hall in Tirol",
    phase: "out",
    area: "юг к A13 Бреннер",
    why: "Чехия уже позади транзитом. Одна австрийская ночь вместо марафона до Вероны — утром свежими в Италию.",
    budgetEur: [85, 130],
    picks: [
      {
        name: "a&o Innsbruck Hauptbahnhof",
        note: "бюджетно, парковка рядом",
        fromEur: 85,
      },
      {
        name: "Hotel Binders / ibis Innsbruck",
        note: "проще с машиной, быстрый выезд на A13",
        fromEur: 100,
      },
      {
        name: "Stage 12 / Adlers Hotel",
        note: "если хотите нормально выспаться после 11+ часов",
        fromEur: 120,
      },
    ],
    backup: "Запасной короче дня — Rosenheim уже в DE, но тогда утром лишний кусок до Бреннера.",
  },
  {
    id: "como",
    nightLabel: "9 ночей · 13–21 октября",
    city: "Комо / Черноббио / Менджо",
    phase: "italy",
    area: "берег озера, вне ZTL центра Комо",
    why: "Главная цель поездки. Одна база на 9 ночей — меньше переездов с чемоданами, отсюда Serravalle и Franciacorta.",
    budgetEur: [95, 150],
    nights: 9,
    picks: [
      {
        name: "Hotel Firenze (Como)",
        note: "часто с парковкой, пешком до набережной",
        fromEur: 110,
      },
      {
        name: "Albergo Centrale / Continental Como",
        note: "уточняйте парковку в подтверждении",
        fromEur: 100,
      },
      {
        name: "Hotel Villa Flori / Cernobbio 3–4★",
        note: "если база сразу «на отдых»",
        fromEur: 140,
      },
    ],
    backup:
      "Дешевле на 9 ночей: Канту / Grandate у A9 или апартаменты с парковкой через Booking (отмена!). Средний ориентир в смете — €110/ночь.",
  },
  {
    id: "munich",
    nightLabel: "Ночь · 22 октября",
    city: "Мюнхен-юг / Розенхайм",
    phase: "back",
    area: "к A8 / A9",
    why: "После Бреннера и Ingolstadt Village. Утром длинный автобан на Польшу.",
    budgetEur: [85, 130],
    picks: [
      {
        name: "IBIS Budget München City Süd",
        note: "дешевле центра, быстрый автобан",
        fromEur: 85,
      },
      {
        name: "Hotel Jaegerhof Rosenheim",
        note: "если устали на Бреннере",
        fromEur: 90,
      },
      {
        name: "Motel One München-Deutsches Museum",
        note: "комфортнее, парковка +€15–20",
        fromEur: 110,
      },
    ],
    backup: "Не лезьте в центр Мюнхена вечером после длинного дня.",
  },
  {
    id: "bialystok-back",
    nightLabel: "Ночь · 23 октября",
    city: "Белосток",
    phase: "back",
    area: "та же зона, что 11 октября",
    why: "Перед утренним выездом на Кузницу в последний день визы.",
    budgetEur: [45, 75],
    picks: [
      {
        name: "Ibis Styles Białystok",
        note: "уже знакомый вариант",
        fromEur: 55,
      },
      {
        name: "Hotel Royal Magnat",
        note: "тихо перед ранним подъёмом",
        fromEur: 50,
      },
      {
        name: "Focus Hotel Premium Białystok",
        note: "выспаться после автобана",
        fromEur: 70,
      },
    ],
    backup: "Сувалки ближе к границе, но сервиса меньше.",
  },
];

export const alpsRoute: RouteOption = {
  id: "alps",
  name: "Туда: Чехия транзитом · Австрия · Бреннер",
  tagline: "Белосток → (аутлеты) → Инсбрук → Комо",
  distanceKm: 2290,
  driveHours: 24,
  countries: [
    { code: "BY", name: "Беларусь", km: 610 },
    { code: "PL", name: "Польша", km: 620 },
    { code: "CZ", name: "Чехия", km: 240 },
    { code: "AT", name: "Австрия", km: 520 },
    { code: "IT", name: "Италия", km: 300 },
  ],
  waypoints: [
    { id: "gomel", name: "Гомель", country: "BY", lat: 52.4345, lng: 30.9754 },
    { id: "minsk", name: "Минск, объезд", country: "BY", lat: 53.9, lng: 27.5667 },
    { id: "grodno", name: "Гродно", country: "BY", lat: 53.6694, lng: 23.8131, note: "Заправка ДТ до полного" },
    { id: "bruzgi", name: "Брузги", country: "BY", lat: 53.655, lng: 23.508, note: "ПК Беларуси" },
    { id: "kuznica", name: "Кузница", country: "PL", lat: 53.521, lng: 23.647, note: "Граница EU/Schengen" },
    { id: "bialystok", name: "Белосток", country: "PL", lat: 53.1325, lng: 23.1688 },
    {
      id: "warsaw-outlet",
      name: "Designer Outlet Warszawa",
      country: "PL",
      lat: 52.0667,
      lng: 21.0167,
      note: "Аутлет",
    },
    { id: "lodz", name: "Лодзь", country: "PL", lat: 51.7592, lng: 19.456 },
    { id: "katowice", name: "Катовице", country: "PL", lat: 50.2649, lng: 19.0238 },
    { id: "ostrava", name: "Острава", country: "CZ", lat: 49.8209, lng: 18.2625 },
    { id: "brno", name: "Брно", country: "CZ", lat: 49.1951, lng: 16.6068 },
    {
      id: "freeport",
      name: "Freeport Hatě",
      country: "CZ",
      lat: 48.75,
      lng: 16.05,
      note: "Аутлет",
    },
    { id: "vienna", name: "Вена, объезд", country: "AT", lat: 48.2082, lng: 16.3738 },
    { id: "salzburg", name: "Зальцбург", country: "AT", lat: 47.8095, lng: 13.055 },
    { id: "innsbruck", name: "Инсбрук", country: "AT", lat: 47.2692, lng: 11.4041 },
    { id: "brenner", name: "Бреннер", country: "AT", lat: 47.0034, lng: 11.5066 },
    { id: "bolzano", name: "Больцано", country: "IT", lat: 46.4983, lng: 11.3548 },
    { id: "verona", name: "Верона", country: "IT", lat: 45.4384, lng: 10.9916 },
    { id: "como", name: "Комо", country: "IT", lat: 45.8081, lng: 9.0852 },
  ],
  days: [
    {
      day: 1,
      title: "Гомель → Белосток",
      summary: "Гродно и ПК Брузги — Кузница.",
      start: "Гомель",
      end: "Белосток",
      km: 680,
      driveHours: 8.0,
      extraHours: "очередь на Брузгах 2–6 ч",
      legs: [
        {
          from: "Гомель",
          to: "Минск (объезд)",
          km: 310,
          driveHours: 3.6,
          roads: "М5 через Бобруйск",
        },
        {
          from: "Минск",
          to: "Гродно",
          km: 280,
          driveHours: 3.2,
          roads: "М6",
        },
        {
          from: "Гродно",
          to: "Белосток",
          km: 90,
          driveHours: 1.2,
          roads: "М6 → Брузги / Кузница → DK19",
        },
      ],
      overnight: "Белосток",
      tips: [
        "Выезжайте к 5:00. Полный бак в Гродно.",
        "Очереди: gpk.gov.by, granica.gov.pl, nakordoni.eu.",
      ],
    },
    {
      day: 2,
      title: "Белосток → Инсбрук",
      summary: "Чехия без ночёвки. Аутлеты Warszawa + Freeport. Ночь в Тироле.",
      start: "Белосток",
      end: "Инсбрук",
      km: 1180,
      driveHours: 11.5,
      legs: [
        {
          from: "Белосток",
          to: "Designer Outlet Warszawa",
          km: 200,
          driveHours: 2.0,
          roads: "S8",
        },
        {
          from: "Варшава",
          to: "Брно",
          km: 520,
          driveHours: 5.0,
          roads: "A2 → A1 → D1 CZ",
        },
        {
          from: "Freeport Hatě",
          to: "Инсбрук",
          km: 460,
          driveHours: 4.5,
          roads: "A5/A1 → A8 → A12 Inntal",
        },
      ],
      overnight: "Инсбрук",
      tips: [
        "Чехия — только транзит и виньетка 10 дней.",
        "Не застревайте в Parndorf, если уже после 14:00.",
      ],
    },
    {
      day: 3,
      title: "Инсбрук → Комо",
      summary: "Бреннер и первый вечер на озере.",
      start: "Инсбрук",
      end: "Комо",
      km: 430,
      driveHours: 4.5,
      legs: [
        {
          from: "Инсбрук",
          to: "Верона",
          km: 260,
          driveHours: 2.6,
          roads: "A13 Brenner → A22",
        },
        {
          from: "Верона",
          to: "Комо",
          km: 170,
          driveHours: 1.9,
          roads: "A4 → A8/A9, опционально Mantova Outlet",
        },
      ],
      overnight: "Комо",
      tips: ["A13 sondermaut отдельно от виньетки.", "С 13 октября — 9 ночей в Италии."],
    },
  ],
  tolls: [
    {
      country: "Польша",
      item: "S8 / A1 выбранного маршрута",
      amount: 0,
      note: "Легковые на этом коридоре без оплаты.",
    },
    {
      country: "Чехия",
      item: "Электронная виньетка, 10 дней",
      amount: 12.4,
      note: "Нужна даже для транзита. edalnice.cz",
      buy: "https://edalnice.cz",
    },
    {
      country: "Австрия",
      item: "Цифровая виньетка, 10 дней",
      amount: 12.8,
      note: "Покроет туда и обратный кусок A12/A13 при сроке до 24.10.",
      buy: "https://shop.asfinag.at",
    },
    {
      country: "Австрия",
      item: "A13 Brenner, участокная оплата",
      amount: 12.5,
      note: "Каждый проезд отдельно.",
    },
    {
      country: "Италия",
      item: "A22 + A4 + A8/A9 до Комо",
      amount: 38.7,
      note: "Ориентир класс A.",
    },
  ],
  why: [
    "Чехия — чистый транзит без ночёвки.",
    "Одна ночь в Инсбруке вместо опасного 15-часового марафона.",
    "С 13 октября максимум дней именно в Италии.",
    "Аутлеты Warszawa и Freeport встроены в день 2.",
  ],
};

export const germanyRoute: RouteOption = {
  id: "germany",
  name: "Обратно: Германия · без Чехии",
  tagline: "Комо → Мюнхен → Вроцлав → Белосток → Гомель",
  distanceKm: 2280,
  driveHours: 24,
  countries: [
    { code: "IT", name: "Италия", km: 180 },
    { code: "AT", name: "Австрия", km: 160 },
    { code: "DE", name: "Германия", km: 700 },
    { code: "PL", name: "Польша", km: 630 },
    { code: "BY", name: "Беларусь", km: 610 },
  ],
  waypoints: [
    { id: "como", name: "Комо", country: "IT", lat: 45.8081, lng: 9.0852 },
    { id: "verona", name: "Верона", country: "IT", lat: 45.4384, lng: 10.9916 },
    { id: "brenner", name: "Бреннер", country: "AT", lat: 47.0034, lng: 11.5066 },
    { id: "innsbruck", name: "Инсбрук", country: "AT", lat: 47.2692, lng: 11.4041 },
    { id: "munich", name: "Мюнхен", country: "DE", lat: 48.1351, lng: 11.582 },
    {
      id: "ingolstadt",
      name: "Ingolstadt Village",
      country: "DE",
      lat: 48.785,
      lng: 11.395,
      note: "Аутлет",
    },
    { id: "nuremberg", name: "Нюрнберг", country: "DE", lat: 49.4521, lng: 11.0767 },
    { id: "dresden", name: "Дрезден", country: "DE", lat: 51.0504, lng: 13.7373 },
    { id: "wroclaw", name: "Вроцлав", country: "PL", lat: 51.1079, lng: 17.0385 },
    {
      id: "wroclaw-outlet",
      name: "Fashion House Wrocław",
      country: "PL",
      lat: 51.095,
      lng: 17.02,
      note: "Аутлет",
    },
    { id: "warsaw", name: "Варшава", country: "PL", lat: 52.2297, lng: 21.0122 },
    { id: "bialystok", name: "Белосток", country: "PL", lat: 53.1325, lng: 23.1688 },
    { id: "kuznica", name: "Кузница", country: "PL", lat: 53.521, lng: 23.647 },
    { id: "bruzgi", name: "Брузги", country: "BY", lat: 53.655, lng: 23.508 },
    { id: "grodno", name: "Гродно", country: "BY", lat: 53.6694, lng: 23.8131 },
    { id: "gomel", name: "Гомель", country: "BY", lat: 52.4345, lng: 30.9754 },
  ],
  days: [
    {
      day: 1,
      title: "Комо → Мюнхен",
      summary: "Бреннер + Ingolstadt Village.",
      start: "Комо",
      end: "Мюнхен",
      km: 520,
      driveHours: 5.5,
      legs: [
        {
          from: "Комо",
          to: "Инсбрук",
          km: 300,
          driveHours: 3.2,
          roads: "A9/A4/A22 → A13",
        },
        {
          from: "Инсбрук",
          to: "Ingolstadt Village / Мюнхен",
          km: 220,
          driveHours: 2.3,
          roads: "A12 → A8 → A9",
        },
      ],
      overnight: "Мюнхен-юг",
      tips: ["Виньетка AT с пути туда ещё действует.", "Минимум дизеля в DE."],
    },
    {
      day: 2,
      title: "Мюнхен → Белосток",
      summary: "Автобан и Fashion House Wrocław.",
      start: "Мюнхен",
      end: "Белосток",
      km: 1080,
      driveHours: 10.5,
      legs: [
        {
          from: "Мюнхен",
          to: "Вроцлав",
          km: 690,
          driveHours: 6.5,
          roads: "A9/A4 DE → A4 PL",
        },
        {
          from: "Вроцлав",
          to: "Белосток",
          km: 390,
          driveHours: 4.0,
          roads: "A4/A1/A2 → S8",
        },
      ],
      overnight: "Белосток",
      tips: ["Полный бак в Польше.", "Не заезжайте на платную A2 западнее Конина."],
    },
    {
      day: 3,
      title: "Белосток → Гомель",
      summary: "Последний день визы.",
      start: "Белосток",
      end: "Гомель",
      km: 680,
      driveHours: 8.0,
      extraHours: "очередь на выезде 1–4 ч",
      legs: [
        {
          from: "Белосток",
          to: "Гродно",
          km: 90,
          driveHours: 1.2,
          roads: "Кузница / Брузги",
        },
        {
          from: "Гродно",
          to: "Гомель",
          km: 590,
          driveHours: 6.8,
          roads: "М6 → М5",
        },
      ],
      overnight: "Гомель",
      tips: ["Пустой бак к границе, заливка в Гродно."],
    },
  ],
  tolls: [
    {
      country: "Италия",
      item: "A9 + A4 + A22 до Бреннера",
      amount: 38.7,
      note: "Обратный ход.",
    },
    {
      country: "Австрия",
      item: "Виньетка 10 дней",
      amount: 0,
      note: "Та же, что купили 12.10 — действует до конца поездки.",
    },
    {
      country: "Австрия",
      item: "A13 Brenner",
      amount: 12.5,
      note: "Участковая оплата каждый раз.",
    },
    {
      country: "Германия / Польша",
      item: "Легковые на выбранных участках",
      amount: 0,
      note: "DE автобан бесплатен. В PL не на платную A2 западнее Конина.",
    },
  ],
  why: [
    "Обратно без Чехии — другой коридор и Ingolstadt + Wrocław outlets.",
    "Из Италии выезжаем только 22 октября — максимум дней у озера.",
    "24 октября — финиш ровно в рамке 14 дней визы.",
  ],
};

export const routes: Record<RouteId, RouteOption> = {
  alps: alpsRoute,
  germany: germanyRoute,
};

export const roundTrip = {
  thereId: "alps" as RouteId,
  backId: "germany" as RouteId,
  label: "Туда через Австрию · обратно через Германию",
  drivingDaysOut: 3,
  drivingDaysBack: 3,
  italyDays: 9,
  totalDays: 14,
  transitHotelNights: 4,
  italyHotelNights: 9,
};

export const documents = [
  {
    title: "Паспорта и шенген",
    body: "Виза с 11 октября 2026 на 14 дней — укладываемся в 11–24 октября. Паспорта с запасом срока по требованиям консульства.",
  },
  {
    title: "Green Card",
    body: "Международная страховка ОСАГО обязательна на весь круг. Без неё на границе развернут.",
  },
  {
    title: "Автомобиль",
    body: "Свидетельство о регистрации, техосмотр. Если машина не на вас — нотариальная доверенность на выезд.",
  },
  {
    title: "Права",
    body: "Белорусские права обычно принимают. Международное — если права старого образца.",
  },
  {
    title: "Набор в машине",
    body: "Жилеты, знак, аптечка, огнетушитель. В AT/IT жилет обязателен на обочине.",
  },
  {
    title: "AdBlue и ДТ",
    body: "На ~4600 км круга заложите контроль AdBlue. Дизель EN 590; в октябре ещё без зимних сюрпризов.",
  },
];

export const speedLimits = [
  { country: "Беларусь", road: "М5 / М6", limit: "90–120 км/ч" },
  { country: "Польша", road: "A / S", limit: "140 / 120 км/ч" },
  { country: "Чехия", road: "D", limit: "130 км/ч" },
  { country: "Германия", road: "A", limit: "130 / без лимита" },
  { country: "Австрия", road: "A / S", limit: "130 км/ч" },
  { country: "Италия", road: "A", limit: "130 км/ч" },
];
