export const EUR_TO_BYN = 3.49;
export const PRICES_AS_OF = "20 сентября 2026";
/** Потолок на двоих, без шопинга в аутлетах. */
export const BUDGET_CAP_EUR = 3000;
export const ADULTS = 2;

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
  italyNights: 7,
  lakeNights: 5,
  gardaNights: 2,
  dolomitesNights: 0,
  italyFrom: "14 октября",
  italyUntil: "утро 21 октября",
};

/** Потолок чистого хода в день — без марафонов по 1000+ км. */
export const MAX_DRIVE_KM = 700;

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
 * Максимум 700 км/день. Красивые недорогие ночёвки: Краков, Грац, Регенсбург, Вроцлав.
 * Гарда — с юга через Тарвизио, не марафон через Инсбрук.
 */
export const calendar: CalendarDay[] = [
  {
    day: 1,
    date: "11 октября",
    weekday: "вс",
    kind: "drive",
    title: "Гомель → Белосток",
    summary: "Единственный длинный день из-за границы. 680 км — у потолка. Ночёвка сразу в Шенгене, не в Кузнице.",
    km: 680,
    driveHours: 8,
    overnight: "Белосток",
    countryNight: "PL",
    tips: [
      "Выезд из Гомеля к 5:00 — к Брузгам до полудня. Дальше Кракова сегодня не бывает: лимит 700 км.",
      "Полный бак и AdBlue в Гродно. После границы — Biedronka в холодильник.",
      "Вечером рынок Костюшко, если останутся силы. Завтра Краков.",
    ],
  },
  {
    day: 2,
    date: "12 октября",
    weekday: "пн",
    kind: "drive",
    title: "Белосток → Краков",
    summary: "550 км, ~6 ч. Вечер в одном из самых красивых городов Польши: Рынок, Вавель, Казимеж. Номера дешевле Вены и Праги.",
    km: 550,
    driveHours: 6,
    overnight: "Краков",
    countryNight: "PL",
    tips: [
      "S8 → Варшава объезд → S7 на Краков. Аутлет Варшавы не берём.",
      "Парковка у кольца или в отеле, в Старый город пешком. ZTL нет, но узко.",
      "Ужин на Рынке или в Казимеже — кафе по пути, не ресторан «на отдых».",
    ],
  },
  {
    day: 3,
    date: "13 октября",
    weekday: "вт",
    kind: "drive",
    title: "Краков → Грац",
    summary: "590 км через Остраву, Брно и Freeport Hatě. Грац: Шлоссберг, старый город, дешевле Зальцбурга и Вены.",
    km: 590,
    driveHours: 6.5,
    overnight: "Грац",
    countryNight: "AT",
    transitOnly: ["Чехия"],
    outlets: ["freeport"],
    tips: [
      "Freeport у Hatě — обед + шопинг 1–1,5 ч, затем A2 на Грац, не в центр Вены.",
      "Вечером фуникулёр на Schlossberg и Hauptplatz. Парковка у отеля, не в Altstadt.",
      "Завтра в Италию через Виллах / Тарвизио — без Бреннера и без 11 часов за рулём.",
    ],
  },
  {
    day: 4,
    date: "14 октября",
    weekday: "ср",
    kind: "drive",
    title: "Грац → Гарда",
    summary: "480 км, ~5 ч. К обеду / раннему вечеру южный берег: Пескьера или Дезенцано. Если приедете к 14:00 — Сирмионе в тот же день.",
    km: 480,
    driveHours: 5,
    overnight: "Пескьера / Дезенцано",
    countryNight: "IT",
    transitOnly: ["Австрия (A2 Виллах)"],
    tips: [
      "A2 Villach → A23 Tarvisio → A4, без Словении и без Бреннера.",
      "База на юге: Верона 20–30 мин, Сирмионе 15 мин. Не Сирмионе на ночь.",
      "Выезд из Граца к 8:30 — запас на Сирмионе после обеда.",
    ],
  },
  {
    day: 5,
    date: "15 октября",
    weekday: "чт",
    kind: "italy",
    title: "Верона",
    summary: "Полный день в городе с базы на Гарде: арена, центр, кафе. Без смены отеля и без гонки на Комо.",
    km: 50,
    driveHours: 0.8,
    overnight: "Пескьера / Дезенцано",
    countryNight: "IT",
    tips: [
      "Поезд Peschiera–Verona ≈15 мин или парковка Isolo / Porta Palio. В ZTL не лезьте.",
      "Если Сирмионе не успели вчера — час-полтора вечером после Вероны, не оба города «с утра до ночи».",
    ],
  },
  {
    day: 6,
    date: "16 октября",
    weekday: "пт",
    kind: "italy",
    title: "Гарда → Канту",
    summary: "180 км, ~2 ч. После обеда Комо: распаковка, Eurospin, набережная.",
    km: 180,
    driveHours: 2,
    overnight: "Канту / Грандате",
    countryNight: "IT",
    tips: [
      "Не на рассвете. A4 → A8/A9. Serravalle — в понедельник.",
      "Ночь в Канту / Грандате / Липомо, не на набережной Комо.",
    ],
  },
  {
    day: 7,
    date: "17 октября",
    weekday: "сб",
    kind: "italy",
    title: "Милан",
    summary: "Поезд с Como S. Giovanni. Дуомо и прогулка — без машины и Area C. Суббота живая, музеи открыты.",
    overnight: "Канту",
    countryNight: "IT",
    tips: [
      "Tiguan у отеля. Один маршрут, не «весь Милан».",
      "Воскресенье в Милане часть магазинов закрыта — поэтому город сегодня.",
    ],
  },
  {
    day: 8,
    date: "18 октября",
    weekday: "вс",
    kind: "italy",
    title: "Озеро · Беладжио / Варенна",
    summary: "Паром, без серпантина на Tiguan. Воскресные паромные рейсы в октябре проверьте с вечера.",
    overnight: "Канту",
    countryNight: "IT",
    tips: [
      "Menaggio–Bellagio–Varenna. Машину не в Беладжио.",
      "Швейцария только если очень хотите: виньетка и другой ценник.",
    ],
  },
  {
    day: 9,
    date: "19 октября",
    weekday: "пн",
    kind: "italy",
    title: "Serravalle Designer Outlet",
    summary: "Самый большой аутлет круга, ~1 ч 20 мин. Понедельник спокойнее выходных.",
    overnight: "Канту",
    countryNight: "IT",
    outlets: ["serravalle"],
    tips: [
      "К открытию, парковка бесплатная. Обратно A7/A50.",
      "Второй аутлет не нужен.",
    ],
  },
  {
    day: 10,
    date: "20 октября",
    weekday: "вт",
    kind: "italy",
    title: "Комо · город и виллы",
    summary: "Последний полный день у озера: Villa Melzi / набережная / Черноббио. Завтра выезд без марафона.",
    overnight: "Канту",
    countryNight: "IT",
    tips: [
      "Соберите документы с вечера. Утром только выезд на Регенсбург.",
      "Vicolungo не берём.",
    ],
  },
  {
    day: 11,
    date: "21 октября",
    weekday: "ср",
    kind: "return",
    title: "Канту → Регенсбург",
    summary: "600 км, ~6,5 ч: Бреннер и Бавария. Регенсбург — ЮНЕСКО, старый город у Дуная, дешевле Мюнхена.",
    km: 600,
    driveHours: 6.5,
    overnight: "Регенсбург",
    countryNight: "DE",
    transitOnly: ["Австрия (Бреннер)"],
    tips: [
      "Выезд к 8:00. A9/A22 → A13 → A8/A93, без Ingolstadt Village.",
      "Вечером Steinerne Brücke и собор пешком. Парковка Park+Ride или отель у A3.",
      "Дизель в DE почти не лить — дотянуть до Польши завтра.",
    ],
  },
  {
    day: 12,
    date: "22 октября",
    weekday: "чт",
    kind: "return",
    title: "Регенсбург → Вроцлав",
    summary: "610 км через Дрезден. Вроцлав: рынок, Остров Тумский, мосты — красиво и по-польски недорого.",
    km: 610,
    driveHours: 6.5,
    overnight: "Вроцлав",
    countryNight: "PL",
    tips: [
      "A93/A4 Дрезден → Görlitz → A4 PL. Полный бак сразу в Польше.",
      "Ночь у рынка или у кольца A8. Вечерняя прогулка по Острову Тумскому.",
      "Fashion House не берём — шопинг уже Freeport и Serravalle.",
    ],
  },
  {
    day: 13,
    date: "23 октября",
    weekday: "пт",
    kind: "return",
    title: "Вроцлав → Белосток",
    summary: "530 км. Спокойный автобан, вечером знакомый Белосток перед границей.",
    km: 530,
    driveHours: 5.5,
    overnight: "Белосток",
    countryNight: "PL",
    tips: [
      "A4/A1/A2 → S8. Не на платную A2 западнее Конина.",
      "К Белостоку с запасом: завтра последний день визы.",
    ],
  },
  {
    day: 14,
    date: "24 октября",
    weekday: "сб",
    kind: "return",
    title: "Белосток → Гомель",
    summary: "680 км, у потолка. Кузница / Брузги и домой. Без лишних остановок.",
    km: 680,
    driveHours: 8,
    overnight: "Гомель",
    countryNight: "HOME",
    tips: [
      "К границе почти пустой бак, заливка в Гродно (~€0,77).",
      "24.10 — последний день визы.",
    ],
  },
];

export type OutletPick = "biggest" | "value";

export type OutletStop = {
  id: string;
  name: string;
  brand: string;
  country: string;
  near: string;
  when: string;
  detourMin: number;
  pick: OutletPick;
  why: string;
  brands: string;
  tip: string;
  lat: number;
  lng: number;
  url?: string;
};

/**
 * Только два стопа: самый крупный и самый выгодный с широким выбором.
 * Варшава, Parndorf, Mantova, Franciacorta, Vicolungo, Ingolstadt, Вроцлав — не берём.
 */
export const outlets: OutletStop[] = [
  {
    id: "freeport",
    name: "Freeport Fashion Outlet",
    brand: "Freeport",
    country: "Чехия",
    near: "Hatě / Znojmo, у границы с Австрией",
    when: "День 3 · Краков → Грац",
    detourMin: 10,
    pick: "value",
    why: "Самый дешёвый крупный аутлет на круге: ~200 магазинов, чешские ценники обычно ниже AT/IT/DE. Лежит почти на съезде Брно → Вена — обед + шопинг без отдельного крюка.",
    brands: "≈ 200 магазинов: спорт, mid-fashion, дом, дети",
    tip: "1–1,5 ч, не больше: вечером Грац. Парковка бесплатная. Дальше A2 на Грац, не в центр Вены.",
    lat: 48.75,
    lng: 16.05,
    url: "https://www.freeport.cz/",
  },
  {
    id: "serravalle",
    name: "Serravalle Designer Outlet",
    brand: "McArthurGlen",
    country: "Италия",
    near: "Serravalle Scrivia, ~1 ч 20 мин от Канту",
    when: "День 9 · с базы Канту",
    detourMin: 0,
    pick: "biggest",
    why: "Самый большой аутлет поездки и один из крупнейших в Европе: 200+ магазинов, сильный luxury/premium. Один выделенный день с базы вместо россыпи мелких стопов.",
    brands: "200+ магазинов, Gucci / Ralph Lauren / Nike и широкий mid-сегмент",
    tip: "Понедельник спокойнее субботы. Выезд к открытию (обычно 10:00). Парковка бесплатная. Обратно A7/A50 — к ужину снова у озера.",
    lat: 44.728,
    lng: 8.856,
    url: "https://www.mcarthurglen.com/en/outlets/it/designer-outlet-serravalle/",
  },
];

export const foodKit = {
  burner: "газовая горелка",
  fridge: "автомобильный холодильник",
  note: "База — дискаунтер, горелка и автохолодильник. По пути и у озёр иногда кафе или простая траттория: не каждый приём пищи с горелки.",
  shops: [
    { where: "Польша", name: "Biedronka, Lidl" },
    { where: "Чехия", name: "Lidl, Kaufland" },
    { where: "AT / DE", name: "Lidl, Aldi, Penny — только дотянуть" },
    { where: "Италия", name: "Eurospin, Lidl, Penny Market" },
  ],
};

export const foodProfiles = {
  budget: {
    id: "budget" as const,
    label: "Сами",
    hint: "дискаунтер + горелка",
    roadPerDay: 30,
    italyPerDay: 34,
  },
  medium: {
    id: "medium" as const,
    label: "Микс",
    hint: "горелка + кафе по пути",
    roadPerDay: 45,
    italyPerDay: 58,
  },
  comfort: {
    id: "comfort" as const,
    label: "Ресторан",
    hint: "без готовки",
    roadPerDay: 100,
    italyPerDay: 140,
  },
};

export type FoodId = keyof typeof foodProfiles;

/** Ночёвки в смете: 3 транзита туда + 2 Гарда + 5 Канту + 3 транзита обратно. Цены — 1 номер на двоих. */
export const hotelNights = [
  { place: "Белосток (11.10)", amount: 48, kind: "transit" as const },
  { place: "Краков (12.10)", amount: 55, kind: "transit" as const },
  { place: "Грац (13.10)", amount: 68, kind: "transit" as const },
  { place: "Гарда × 2 (14–15.10)", amount: 150, kind: "italy" as const },
  { place: "Канту × 5 (16–20.10)", amount: 350, kind: "italy" as const },
  { place: "Регенсбург (21.10)", amount: 65, kind: "transit" as const },
  { place: "Вроцлав (22.10)", amount: 50, kind: "transit" as const },
  { place: "Белосток (23.10)", amount: 48, kind: "transit" as const },
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
  phase: "out" | "garda" | "italy" | "back";
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
    why: "После Брузгов не геройствовать. 680 км — у потолка дня. Вечер на рынке Костюшко, если останутся силы. Завтра Краков.",
    budgetEur: [40, 60],
    picks: [
      {
        name: "Hotel Royal Magnat",
        note: "тихо, удобный выезд на S8, часто дешевле сети",
        fromEur: 45,
      },
      {
        name: "Ibis Styles Białystok",
        note: "сетевой 3★, завтрак, парковка",
        fromEur: 50,
      },
      {
        name: "Hotel Cristal / похожий 2–3★",
        note: "если Magnat занят",
        fromEur: 48,
      },
    ],
    backup: "Не ночуйте в Кузнице. Даже если граница рано — до Кракова сегодня не едем.",
  },
  {
    id: "krakow",
    nightLabel: "Ночь 2 · 12 октября",
    city: "Краков",
    phase: "out",
    area: "кольцо или Казимеж, не под Вавелем на машине",
    why: "Один из самых красивых городов Польши и дешевле Вены. Рынок, Вавель, Казимеж вечером. 550 км — спокойный день.",
    budgetEur: [45, 70],
    picks: [
      {
        name: "Ibis Budget Kraków Stare Miasto",
        note: "пешком до Рынка, парковка рядом платно",
        fromEur: 52,
      },
      {
        name: "B&B Hotel Kraków Centrum",
        note: "сеть, часто с парковкой, номер на двоих",
        fromEur: 58,
      },
      {
        name: "Апартаменты Казимеж",
        note: "кухня под горелку, вечер в квартале",
        fromEur: 50,
      },
    ],
    backup: "Не бронируйте Rynek Główny 4★ — бюджет сразу прыгает. Парковка у кольца, в Старый город пешком.",
  },
  {
    id: "graz",
    nightLabel: "Ночь 3 · 13 октября",
    city: "Грац",
    phase: "out",
    area: "у вокзала или A2, не Altstadt на ночь с машиной",
    why: "Шлоссберг и старый город ЮНЕСКО, дешевле Зальцбурга и Вены. Утром A2 Виллах / Тарвизио — к Гарде без Бреннера и без 11 часов.",
    budgetEur: [55, 85],
    picks: [
      {
        name: "a&o Graz Hauptbahnhof",
        note: "приватный номер на двоих, выезд на A2",
        fromEur: 65,
      },
      {
        name: "B&B Hotel Graz-Hbf",
        note: "сеть у вокзала, парковка, часто дешевле центра",
        fromEur: 70,
      },
      {
        name: "ibis budget Graz",
        note: "если a&o разобран; без завтрака",
        fromEur: 62,
      },
    ],
    backup: "Не ночуйте в Вене: дороже и лишний час. Вечером фуникулёр на Schlossberg.",
  },
  {
    id: "garda",
    nightLabel: "2 ночи · 14–15 октября",
    city: "Пескьера / Дезенцано",
    phase: "garda",
    area: "южный берег Гарды, вне Сирмионе",
    why: "Одна база на Верону и Гарду: 20–30 мин до арены, 15 мин до Сирмионе. Не Сирмионе и не север озера — там дороже и с пробками.",
    budgetEur: [60, 90],
    nights: 2,
    picks: [
      {
        name: "B&B / ibis Peschiera del Garda",
        note: "поезд в Верону ~15 мин, парковка, номер на двоих",
        fromEur: 70,
      },
      {
        name: "Апартаменты Desenzano / Castelnuovo",
        note: "кухня под горелку, часто дешевле отеля",
        fromEur: 65,
      },
      {
        name: "3★ Lazise / Peschiera у A4",
        note: "если сети разобраны; уточняйте парковку",
        fromEur: 80,
      },
    ],
    backup:
      "В смете €75 × 2 = €150. Сирмионе — днём, не на ночь. Тре Чиме в этот заезд не вставляем.",
  },
  {
    id: "como",
    nightLabel: "5 ночей · 16–20 октября",
    city: "Канту / Грандате / Липомо",
    phase: "italy",
    area: "15–20 мин до озера, у A9, вне ZTL Комо",
    why: "После Гарды — вторая база. Отсюда Милан на поезде, Serravalle на машине, Комо без переездов с чемоданами.",
    budgetEur: [60, 90],
    nights: 5,
    picks: [
      {
        name: "Апартаменты Lipomo / Cantù",
        note: "кухня удобнее для горелки; парковка, Booking с отменой",
        fromEur: 65,
      },
      {
        name: "3★ Канту (Axolute Comfort и аналоги)",
        note: "бесплатная парковка, 15 мин до набережной",
        fromEur: 85,
      },
      {
        name: "Ibis Como Grandate",
        note: "сеть у A9, парковка бесплатно; если апартаменты разобраны",
        fromEur: 95,
      },
    ],
    backup:
      "В смете €70/ночь × 5 = €350 на двоих. Не бронируйте набережную Комо — бюджет сразу ломается.",
  },
  {
    id: "regensburg",
    nightLabel: "Ночь · 21 октября",
    city: "Регенсбург",
    phase: "back",
    area: "старый город пешком или Park+Ride у A3",
    why: "ЮНЕСКО у Дуная, дешевле Мюнхена. Steinerne Brücke и собор вечером после Бреннера. 600 км — в лимите.",
    budgetEur: [55, 80],
    picks: [
      {
        name: "ibis budget Regensburg Ost",
        note: "двойной номер, рядом A3, не центр",
        fromEur: 58,
      },
      {
        name: "B&B Hotel Regensburg",
        note: "часто с парковкой, 15 мин до Старого города",
        fromEur: 65,
      },
      {
        name: "Hotel Apollo / похожий 3★",
        note: "если хотите ближе к Дунаю",
        fromEur: 72,
      },
    ],
    backup: "Не ночуйте в Мюнхене: дороже и без вечерней прогулки такого же калибра.",
  },
  {
    id: "wroclaw",
    nightLabel: "Ночь · 22 октября",
    city: "Вроцлав",
    phase: "back",
    area: "рынок или кольцо A8, не Fashion House",
    why: "Рынок, Остров Тумский, мосты — красиво и по-польски недорого. Полный бак сразу после Германии.",
    budgetEur: [40, 65],
    picks: [
      {
        name: "Ibis Styles Wrocław Centrum",
        note: "пешком до рынка, номер на двоих",
        fromEur: 48,
      },
      {
        name: "Hotel Patio / похожий 3★ у рынка",
        note: "тихий двор, удобно вечером",
        fromEur: 52,
      },
      {
        name: "B&B Hotel Wrocław Centrum",
        note: "сеть, парковка, если центр разобран",
        fromEur: 50,
      },
    ],
    backup: "Аутлет Fashion House не берём — шопинг уже Freeport и Serravalle.",
  },
  {
    id: "bialystok-back",
    nightLabel: "Ночь · 23 октября",
    city: "Белосток",
    phase: "back",
    area: "та же зона, что 11 октября",
    why: "Перед утренним выездом на Кузницу в последний день визы. Тот же бюджетный номер на двоих.",
    budgetEur: [40, 60],
    picks: [
      {
        name: "Hotel Royal Magnat",
        note: "тихо перед ранним подъёмом",
        fromEur: 45,
      },
      {
        name: "Ibis Styles Białystok",
        note: "уже знакомый вариант",
        fromEur: 50,
      },
      {
        name: "Hotel Cristal / похожий 2–3★",
        note: "если сеть дороже в пятницу",
        fromEur: 48,
      },
    ],
    backup: "Сувалки ближе к границе, но сервиса меньше.",
  },
];

export const alpsRoute: RouteOption = {
  id: "alps",
  name: "Туда: Краков · Грац · Гарда · Комо",
  tagline: "Белосток → Краков → Freeport → Грац → Гарда → Канту",
  distanceKm: 2480,
  driveHours: 27.5,
  countries: [
    { code: "BY", name: "Беларусь", km: 610 },
    { code: "PL", name: "Польша", km: 720 },
    { code: "CZ", name: "Чехия", km: 240 },
    { code: "AT", name: "Австрия", km: 520 },
    { code: "IT", name: "Италия", km: 390 },
  ],
  waypoints: [
    { id: "gomel", name: "Гомель", country: "BY", lat: 52.4345, lng: 30.9754 },
    { id: "minsk", name: "Минск, объезд", country: "BY", lat: 53.9, lng: 27.5667 },
    { id: "grodno", name: "Гродно", country: "BY", lat: 53.6694, lng: 23.8131, note: "Заправка ДТ до полного" },
    { id: "bruzgi", name: "Брузги", country: "BY", lat: 53.655, lng: 23.508, note: "ПК Беларуси" },
    { id: "kuznica", name: "Кузница", country: "PL", lat: 53.521, lng: 23.647, note: "Граница EU/Schengen" },
    { id: "bialystok", name: "Белосток", country: "PL", lat: 53.1325, lng: 23.1688 },
    { id: "warsaw", name: "Варшава, объезд", country: "PL", lat: 52.2297, lng: 21.0122 },
    { id: "krakow", name: "Краков", country: "PL", lat: 50.0647, lng: 19.945, note: "Ночь 2, Рынок и Вавель" },
    { id: "ostrava", name: "Острава", country: "CZ", lat: 49.8209, lng: 18.2625 },
    { id: "brno", name: "Брно", country: "CZ", lat: 49.1951, lng: 16.6068 },
    {
      id: "freeport",
      name: "Freeport Hatě",
      country: "CZ",
      lat: 48.75,
      lng: 16.05,
      note: "Аутлет: дешевле и шире выбор",
    },
    { id: "graz", name: "Грац", country: "AT", lat: 47.0707, lng: 15.4395, note: "Ночь 3, Schlossberg" },
    { id: "villach", name: "Виллах / Тарвизио", country: "AT", lat: 46.6103, lng: 13.8558 },
    { id: "verona", name: "Верона", country: "IT", lat: 45.4384, lng: 10.9916, note: "День 5, с базы Гарда" },
    {
      id: "peschiera",
      name: "Пескьера / Гарда",
      country: "IT",
      lat: 45.4385,
      lng: 10.6889,
      note: "2 ночи, Верона и Сирмионе с базы",
    },
    { id: "como", name: "Комо", country: "IT", lat: 45.8081, lng: 9.0852, note: "5 ночей Канту" },
  ],
  days: [
    {
      day: 1,
      title: "Гомель → Белосток",
      summary: "Гродно и ПК Брузги — Кузница. 680 км, у потолка.",
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
      title: "Белосток → Краков",
      summary: "550 км. Вечер на Рынке, не марафон в Альпы.",
      start: "Белосток",
      end: "Краков",
      km: 550,
      driveHours: 6,
      legs: [
        {
          from: "Белосток",
          to: "Варшава, объезд",
          km: 200,
          driveHours: 2.2,
          roads: "S8",
        },
        {
          from: "Варшава",
          to: "Краков",
          km: 350,
          driveHours: 3.8,
          roads: "S7 / A4, без варшавского аутлета",
        },
      ],
      overnight: "Краков",
      tips: [
        "Парковка у кольца, Старый город пешком.",
        "Ужин на Рынке или в Казимеже.",
      ],
    },
    {
      day: 3,
      title: "Краков → Грац",
      summary: "590 км через Остраву, Брно и Freeport. Ночь в Граце.",
      start: "Краков",
      end: "Грац",
      km: 590,
      driveHours: 6.5,
      legs: [
        {
          from: "Краков",
          to: "Брно",
          km: 330,
          driveHours: 3.5,
          roads: "A4 PL → D1 CZ",
        },
        {
          from: "Freeport Hatě",
          to: "Грац",
          km: 260,
          driveHours: 3.0,
          roads: "A2, не в центр Вены",
        },
      ],
      overnight: "Грац",
      tips: [
        "Чехия — только транзит, виньетка 10 дней и Freeport.",
        "Вечером Schlossberg. Завтра Тарвизио, не Бреннер.",
      ],
    },
    {
      day: 4,
      title: "Грац → Гарда",
      summary: "480 км через Виллах / Тарвизио. К обеду / вечеру южный берег.",
      start: "Грац",
      end: "Пескьера",
      km: 480,
      driveHours: 5,
      legs: [
        {
          from: "Грац",
          to: "Тарвизио",
          km: 280,
          driveHours: 3.0,
          roads: "A2 Villach → A23",
        },
        {
          from: "Тарвизио",
          to: "Пескьера / Дезенцано",
          km: 200,
          driveHours: 2.0,
          roads: "A23 → A4, без центра Вероны",
        },
      ],
      overnight: "Пескьера / Дезенцано",
      tips: [
        "Без Словении и без Бреннера.",
        "Если к 14:00 — Сирмионе в тот же день.",
      ],
    },
    {
      day: 5,
      title: "Гарда → Канту",
      summary: "A4, ~2 ч. Serravalle не в этот день.",
      start: "Пескьера",
      end: "Канту",
      km: 180,
      driveHours: 2,
      legs: [
        {
          from: "Пескьера",
          to: "Канту",
          km: 180,
          driveHours: 2,
          roads: "A4 → A8/A9",
        },
      ],
      overnight: "Канту",
      tips: ["5 ночей у Комо: Милан поездом, Serravalle в понедельник."],
    },
  ],
  tolls: [
    {
      country: "Польша",
      item: "S8 / S7 / A4 выбранного маршрута",
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
      note: "Купить 13.10 при въезде. Покроет Грац, A2 и обратный Бреннер 21.10.",
      buy: "https://shop.asfinag.at",
    },
    {
      country: "Италия",
      item: "A23 Тарвизио + A4 до Гарды и далее до Комо",
      amount: 45,
      note: "Ориентир класс A. Бреннера туда нет.",
    },
  ],
  why: [
    "Ни один день не длиннее 700 км.",
    "Ночёвки в Кракове и Граце — красивые города, не только заправка.",
    "К Гарде через Тарвизио, без марафона через Инсбрук.",
    "По пути только Freeport Hatě; Serravalle — отдельный понедельник с Канту.",
  ],
};

export const germanyRoute: RouteOption = {
  id: "germany",
  name: "Обратно: Регенсбург · Вроцлав · без Чехии",
  tagline: "Комо → Регенсбург → Вроцлав → Белосток → Гомель",
  distanceKm: 2420,
  driveHours: 26.5,
  countries: [
    { code: "IT", name: "Италия", km: 280 },
    { code: "AT", name: "Австрия", km: 90 },
    { code: "DE", name: "Германия", km: 580 },
    { code: "PL", name: "Польша", km: 860 },
    { code: "BY", name: "Беларусь", km: 610 },
  ],
  waypoints: [
    { id: "como", name: "Комо", country: "IT", lat: 45.8081, lng: 9.0852 },
    { id: "verona", name: "Верона", country: "IT", lat: 45.4384, lng: 10.9916 },
    { id: "brenner", name: "Бреннер", country: "AT", lat: 47.0034, lng: 11.5066 },
    { id: "innsbruck", name: "Инсбрук, транзит", country: "AT", lat: 47.2692, lng: 11.4041 },
    { id: "regensburg", name: "Регенсбург", country: "DE", lat: 49.0134, lng: 12.1016, note: "Ночь, ЮНЕСКО у Дуная" },
    { id: "dresden", name: "Дрезден", country: "DE", lat: 51.0504, lng: 13.7373 },
    { id: "wroclaw", name: "Вроцлав", country: "PL", lat: 51.1079, lng: 17.0385, note: "Ночь, рынок и Остров Тумский" },
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
      title: "Канту → Регенсбург",
      summary: "Бреннер и Бавария, без Ingolstadt Village. 600 км.",
      start: "Комо",
      end: "Регенсбург",
      km: 600,
      driveHours: 6.5,
      legs: [
        {
          from: "Канту",
          to: "Инсбрук",
          km: 300,
          driveHours: 3.2,
          roads: "A9/A4/A22 → A13",
        },
        {
          from: "Инсбрук",
          to: "Регенсбург",
          km: 300,
          driveHours: 3.3,
          roads: "A12 → A8/A93, без Мюнхена на ночь",
        },
      ],
      overnight: "Регенсбург",
      tips: ["Виньетка AT с 13.10 ещё действует.", "Минимум дизеля в DE."],
    },
    {
      day: 2,
      title: "Регенсбург → Вроцлав",
      summary: "610 км через Дрезден. Вечер на Острове Тумском.",
      start: "Регенсбург",
      end: "Вроцлав",
      km: 610,
      driveHours: 6.5,
      legs: [
        {
          from: "Регенсбург",
          to: "Дрезден",
          km: 350,
          driveHours: 3.5,
          roads: "A93 / A4 DE",
        },
        {
          from: "Дрезден",
          to: "Вроцлав",
          km: 260,
          driveHours: 3.0,
          roads: "A4 Görlitz → A4 PL",
        },
      ],
      overnight: "Вроцлав",
      tips: ["Полный бак сразу в Польше.", "Fashion House не берём."],
    },
    {
      day: 3,
      title: "Вроцлав → Белосток",
      summary: "530 км. Спокойный автобан перед границей.",
      start: "Вроцлав",
      end: "Белосток",
      km: 530,
      driveHours: 5.5,
      legs: [
        {
          from: "Вроцлав",
          to: "Варшава, объезд",
          km: 350,
          driveHours: 3.5,
          roads: "A4/A1/A2 → S8",
        },
        {
          from: "Варшава",
          to: "Белосток",
          km: 180,
          driveHours: 2.0,
          roads: "S8",
        },
      ],
      overnight: "Белосток",
      tips: ["Не на платную A2 западнее Конина.", "Завтра последний день визы."],
    },
    {
      day: 4,
      title: "Белосток → Гомель",
      summary: "Последний день визы. 680 км, у потолка.",
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
      note: "Та же, что купили 13.10 — действует на Бреннер 21.10.",
    },
    {
      country: "Австрия",
      item: "A13 Brenner",
      amount: 12.5,
      note: "Участковая оплата. Туда ехали через Тарвизио, обратно — Бреннер.",
    },
    {
      country: "Германия / Польша",
      item: "Легковые на выбранных участках",
      amount: 0,
      note: "DE автобан бесплатен. В PL не на платную A2 западнее Конина.",
    },
  ],
  why: [
    "Обратно без Чехии и без лишних аутлетов — шопинг уже Freeport + Serravalle.",
    "Из Италии выезжаем 21 октября, чтобы ни один день не был длиннее 700 км.",
    "Регенсбург и Вроцлав — красивые недорогие ночёвки, не Мюнхен и не марафон.",
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
  drivingDaysOut: 5,
  drivingDaysBack: 4,
  italyDays: 6,
  totalDays: 14,
  transitHotelNights: 6,
  italyHotelNights: 7,
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
    title: "Еда: горелка, холодильник и кафе",
    body: "На двоих: дискаунтер + горелка + автохолодильник как база. По пути и у озёр иногда кафе или простая траттория. Закупки: Biedronka/Lidl в Польше, Eurospin/Lidl в Италии. В AT/DE продукты почти не берём. В гостиничном номере не готовим.",
  },
  {
    title: "Лимит 700 км",
    body: "Ни один день не длиннее 700 км. Туда ночуем в Белостоке, Кракове, Граце, на Гарде. Обратно — Регенсбург, Вроцлав, Белосток. Вечер в старом городе, не только заправка и сон.",
  },
  {
    title: "Верона и Гарда",
    body: "В Вероне ZTL: поезд Peschiera–Verona или парковка Isolo / Porta Palio. Сирмионе — пешком с P1/P2, Tiguan в косу не заводить. Север Гарды (Рива, Мальчезине) в этот заезд не берём.",
  },
  {
    title: "Тре Чиме",
    body: "В 14 днях визы вместе с Гардой, Вероной, Миланом и Комо Тре Чиме не влезают без гонки: это крюк на восток на два дня. Оставляем на другой заезд.",
  },
  {
    title: "AdBlue и ДТ",
    body: "На ~4900 км круга заложите контроль AdBlue. Дизель EN 590; в октябре ещё без зимних сюрпризов.",
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
