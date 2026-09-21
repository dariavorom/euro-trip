"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Flame,
  Fuel,
  UtensilsCrossed,
  Ticket,
  BedDouble,
  Clock3,
  Gauge,
  Mountain,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  Route,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EUR_TO_BYN,
  PRICES_AS_OF,
  BUDGET_CAP_EUR,
  ADULTS,
  calendar,
  dieselPrices,
  documents,
  foodProfiles,
  foodKit,
  hotelNights,
  lodgingPlan,
  outlets,
  MAX_DRIVE_KM,
  roundTrip,
  routes,
  speedLimits,
  tripDates,
  vehicle,
  type FoodId,
} from "@/data/trip";
import { viewTotals, type ViewMode } from "@/lib/calc";

const RouteMap = dynamic(
  () => import("@/components/route-map").then((m) => m.RouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Загружаем карту…
      </div>
    ),
  },
);

function eur(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function eur1(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n);
}

function byn(n: number) {
  return `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(Math.round(n * EUR_TO_BYN))} Br`;
}

function hours(n: number) {
  const h = Math.floor(n);
  const m = Math.round((n - h) * 60);
  return m ? `${h} ч ${m} мин` : `${h} ч`;
}

const kindLabel = {
  drive: "Туда",
  italy: "Италия",
  return: "Обратно",
} as const;

export function TripPlanner() {
  const [mode, setMode] = useState<ViewMode>("round");
  const [drive, setDrive] = useState<"fwd" | "4m">("fwd");
  const [l100, setL100] = useState(vehicle.realFwdHighway);
  const [food, setFood] = useState<FoodId>("medium");
  const [transitHotels, setTransitHotels] = useState(true);
  const [italyHotels, setItalyHotels] = useState(true);

  const there = routes[roundTrip.thereId];
  const back = routes[roundTrip.backId];

  const totals = useMemo(
    () =>
      viewTotals({
        mode,
        l100,
        food,
        includeTransitHotels: transitHotels,
        includeItalyHotels: italyHotels,
      }),
    [mode, l100, food, transitHotels, italyHotels],
  );

  const visibleDays = useMemo(() => {
    if (mode === "alps")
      return calendar.filter((d) => d.kind === "drive" || d.kind === "italy");
    if (mode === "germany") return calendar.filter((d) => d.kind === "return");
    return calendar;
  }, [mode]);

  const visibleLodging = useMemo(() => {
    if (mode === "alps")
      return lodgingPlan.filter(
        (n) => n.phase === "out" || n.phase === "garda" || n.phase === "italy",
      );
    if (mode === "germany")
      return lodgingPlan.filter((n) => n.phase === "back");
    return lodgingPlan;
  }, [mode]);

  const visibleOutlets = useMemo(() => {
    if (mode === "alps")
      return outlets.filter((o) => !o.when.includes("обратно"));
    if (mode === "germany")
      return outlets.filter((o) => o.when.includes("обратно"));
    return outlets;
  }, [mode]);

  const tollList =
    mode === "round"
      ? [...there.tolls, ...back.tolls]
      : mode === "alps"
        ? there.tolls
        : back.tolls;

  const hotelRows = hotelNights.filter((h) => {
    if (h.kind === "italy") return italyHotels && mode !== "germany";
    if (!transitHotels) return false;
    if (mode === "alps")
      return (
        h.place.includes("11.10") ||
        h.place.includes("Краков") ||
        h.place.includes("Грац")
      );
    if (mode === "germany")
      return (
        h.place.includes("Регенсбург") ||
        h.place.includes("Вроцлав") ||
        h.place.includes("23.10")
      );
    return true;
  });

  function setDriveType(next: "fwd" | "4m") {
    setDrive(next);
    setL100(
      next === "fwd" ? vehicle.realFwdHighway : vehicle.real4motionHighway,
    );
  }

  const foodProfile = foodProfiles[food];

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="hero-wash" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex items-center justify-between gap-4 text-white/80">
            <p className="text-xs tracking-[0.28em] uppercase">
              14 дней · {tripDates.visaLabel}
            </p>
            <p className="hidden text-sm sm:block">
              {ADULTS} взрослых · один Tiguan · до {eur(BUDGET_CAP_EUR)}
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-5 text-white">
              <p className="text-sm text-white/70">
                Гомель ↔ Комо · {tripDates.startLabel} – {tripDates.endLabel}
              </p>
              <h1 className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
                Гарда, Верона, Милан и Комо — без гонки
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Не больше {MAX_DRIVE_KM} км в день. Ночёвки в Кракове, Граце,
                Регенсбурге и Вроцлаве. 2 ночи на юге Гарды и 5 у Канту. Верона
                с базы, Милан поездом. Два аутлета: Freeport и Serravalle.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <HeroStat
                icon={<CalendarDays className="size-4" />}
                label="Календарь"
                value="14 дней"
              />
              <HeroStat
                icon={<Mountain className="size-4" />}
                label="Ночи в IT"
                value={`${tripDates.italyNights}`}
              />
              <HeroStat
                icon={<Wallet className="size-4" />}
                label="Смета на двоих"
                value={eur(totals.grand)}
              />
              <HeroStat
                icon={<ShoppingBag className="size-4" />}
                label="Аутлеты"
                value="2"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="overflow-hidden py-0">
            <div className="h-[320px] sm:h-[420px]">
              <RouteMap
                waypoints={
                  mode === "germany" ? back.waypoints : there.waypoints
                }
                returnWaypoints={mode === "round" ? back.waypoints : undefined}
              />
            </div>
            {mode === "round" ? (
              <p className="border-t px-4 py-2 text-xs text-muted-foreground">
                Сплошная — туда (аутлеты на карте). Пунктир — обратно через
                Германию.
              </p>
            ) : null}
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Автомобиль</CardTitle>
              <CardDescription>{vehicle.make}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Spec label="Мотор" value={vehicle.engine} />
              <Spec label="Код" value={vehicle.engineCode} />
              <Spec label="Коробка" value={vehicle.gearbox} />
              <Spec
                label="Бак / AdBlue"
                value={`${vehicle.tankL} л / ${vehicle.adblueL} л`}
              />
              <Spec
                label="Запас хода"
                value={`${Math.round((vehicle.tankL / l100) * 100)} км на баке`}
              />
              <div className="rounded-lg bg-muted p-3 text-muted-foreground">
                Круг ~{totals.distanceKm.toLocaleString("ru-RU")} км. На трассе
                реальность {l100.toFixed(1)} л/100. DQ381 — спокойный круиз в D.
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Как считаем</CardTitle>
              <CardDescription>
                Дизель на {PRICES_AS_OF}. Еда по умолчанию — горелка и кафе по
                пути. Жильё в Италии и транзит — отдельно.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Вид сметы</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <Choice
                    active={mode === "round"}
                    onClick={() => setMode("round")}
                    title="Все 14 дней"
                    text="Круг + Италия"
                  />
                  <Choice
                    active={mode === "alps"}
                    onClick={() => setMode("alps")}
                    title="Туда + озеро"
                    text="До выезда 21.10"
                  />
                  <Choice
                    active={mode === "germany"}
                    onClick={() => setMode("germany")}
                    title="Только обратно"
                    text="21–24 октября"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Привод</p>
                <div className="flex gap-2">
                  <Button
                    variant={drive === "fwd" ? "default" : "outline"}
                    onClick={() => setDriveType("fwd")}
                  >
                    Передний, 7,2 л
                  </Button>
                  <Button
                    variant={drive === "4m" ? "default" : "outline"}
                    onClick={() => setDriveType("4m")}
                  >
                    4MOTION, 7,8 л
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                  <p className="text-sm font-medium">Расход, л/100 км</p>
                  <p className="font-heading text-3xl leading-none">
                    {l100.toFixed(1)}
                  </p>
                </div>
                <Slider
                  min={6.5}
                  max={8.5}
                  step={0.1}
                  value={[l100]}
                  onValueChange={(value) => {
                    const next = Array.isArray(value) ? value[0] : value;
                    if (typeof next === "number")
                      setL100(Number(next.toFixed(1)));
                  }}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Еда на двоих</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(foodProfiles) as FoodId[]).map((id) => (
                    <Choice
                      key={id}
                      active={food === id}
                      onClick={() => setFood(id)}
                      title={foodProfiles[id].label}
                      text={foodProfiles[id].hint}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Дорога ~{eur(foodProfile.roadPerDay)}/день · озеро ~
                  {eur(foodProfile.italyPerDay)}/день
                </p>
                <p className="flex items-start gap-2 rounded-lg bg-muted p-2.5 text-xs text-muted-foreground">
                  <Flame className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    {foodKit.note}{" "}
                    {foodKit.shops.map((s) => `${s.where}: ${s.name}`).join(" · ")}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm">
                  <span className="flex items-center gap-2">
                    <BedDouble className="size-4" />
                    {roundTrip.transitHotelNights} транзитных ночей
                  </span>
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--primary)]"
                    checked={transitHotels}
                    onChange={(e) => setTransitHotels(e.target.checked)}
                  />
                </label>
                {mode !== "germany" ? (
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      <BedDouble className="size-4" />
                      {tripDates.gardaNights} ночи Гарда + {tripDates.lakeNights} Канту
                    </span>
                    <input
                      type="checkbox"
                      className="size-4 accent-[var(--primary)]"
                      checked={italyHotels}
                      onChange={(e) => setItalyHotels(e.target.checked)}
                    />
                  </label>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-primary-foreground">
                {mode === "round"
                  ? "Итого за 14 дней"
                  : mode === "alps"
                    ? "Туда + Италия"
                    : "Только обратно"}
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                На двоих · без шопинга в аутлетах и парковок у вилл
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="font-heading text-5xl tracking-tight sm:text-6xl">
                  {eur(totals.grand)}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  ≈ {byn(totals.grand)} · {eur(totals.perPerson)} на человека
                </p>
                <p
                  className={`mt-2 text-sm ${
                    totals.grand <= BUDGET_CAP_EUR
                      ? "text-primary-foreground/80"
                      : "text-amber-200"
                  }`}
                >
                  Потолок {eur(BUDGET_CAP_EUR)} на двоих
                  {totals.grand <= BUDGET_CAP_EUR
                    ? ` · запас ${eur(BUDGET_CAP_EUR - totals.grand)}`
                    : ` · сверх на ${eur(totals.grand - BUDGET_CAP_EUR)}`}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <Row
                  icon={<Fuel className="size-4" />}
                  label="Топливо"
                  value={eur(totals.fuel.smartCost)}
                />
                <Row
                  icon={<UtensilsCrossed className="size-4" />}
                  label={`Еда, ${foodProfile.label.toLowerCase()}`}
                  value={eur(totals.food)}
                />
                <Row
                  icon={<Ticket className="size-4" />}
                  label="Виньетки и дороги"
                  value={eur(totals.tolls)}
                />
                {transitHotels || italyHotels ? (
                  <Row
                    icon={<BedDouble className="size-4" />}
                    label="Жильё"
                    value={eur(totals.hotels)}
                  />
                ) : null}
              </div>
              <p className="rounded-lg bg-black/15 p-3 text-sm text-primary-foreground/80">
                Умная заправка экономит {eur(totals.fuel.saved)} против «по
                странам» ({eur(totals.fuel.naiveCost)}).
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <MiniStat
            icon={<Route className="size-4" />}
            title="Пробег круга"
            value={`${totals.distanceKm.toLocaleString("ru-RU")} км`}
            hint={hours(totals.driveHours) + " чистого вождения"}
          />
          <MiniStat
            icon={<Fuel className="size-4" />}
            title="Дизель"
            value={`${totals.fuel.consumedL.toFixed(0)} л`}
            hint={`при ${l100.toFixed(1)} л/100 км`}
          />
          <MiniStat
            icon={<Gauge className="size-4" />}
            title="Лимит дня"
            value={`${MAX_DRIVE_KM} км`}
            hint="Чехия без ночёвки · Краков, Грац, Регенсбург, Вроцлав"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl">Календарь поездки</h2>
              <p className="mt-1 text-muted-foreground">
                {tripDates.startLabel} – {tripDates.endLabel}. Не больше{" "}
                {MAX_DRIVE_KM} км в день, ночёвки в красивых городах.
              </p>
            </div>
            <Badge variant="outline">{visibleDays.length} дней</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDays.map((day) => (
              <Card
                key={day.day}
                className={
                  day.kind === "italy"
                    ? "border-[var(--primary)]/35 bg-[var(--primary)]/4"
                    : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {day.date} · {day.weekday}
                    </p>
                    <Badge variant="outline">{kindLabel[day.kind]}</Badge>
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {day.title}
                  </CardTitle>
                  <CardDescription>{day.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {day.km ? (
                    <p>
                      {day.km} км · {hours(day.driveHours ?? 0)}
                    </p>
                  ) : null}
                  {day.transitOnly?.length ? (
                    <p className="text-muted-foreground">
                      Транзит без ночёвки: {day.transitOnly.join(", ")}
                    </p>
                  ) : null}
                  {day.outlets?.length ? (
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <ShoppingBag className="size-3.5 shrink-0" />
                      {day.outlets
                        .map(
                          (id) =>
                            outlets.find((o) => o.id === id)?.name ?? id,
                        )
                        .join(" · ")}
                    </p>
                  ) : null}
                  <p className="rounded-lg bg-muted p-2.5">
                    Ночь: {day.overnight}
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {day.tips.slice(0, 2).map((tip) => (
                      <li key={tip}>· {tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="outlets">
          <TabsList className="flex h-auto w-full flex-wrap justify-start">
            <TabsTrigger value="outlets">Аутлеты</TabsTrigger>
            <TabsTrigger value="fuel">Топливо</TabsTrigger>
            <TabsTrigger value="tolls">Дороги</TabsTrigger>
            <TabsTrigger value="sleep">Ночёвки</TabsTrigger>
            <TabsTrigger value="docs">Документы</TabsTrigger>
          </TabsList>

          <TabsContent value="outlets">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  Крупные аутлеты по пути
                </CardTitle>
                <CardDescription>
                  Только два: самый большой и самый выгодный с широким выбором.
                  Шопинг в смету не входит.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {visibleOutlets.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    На обратном пути аутлетов нет: шопинг уже Freeport и
                    Serravalle.
                  </p>
                ) : (
                  visibleOutlets.map((o) => (
                  <div
                    key={o.id}
                    className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_auto]"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-heading text-xl">{o.name}</p>
                        <Badge variant="outline">{o.country}</Badge>
                        <Badge>
                          {o.pick === "biggest"
                            ? "Самый большой"
                            : "Дешевле и шире выбор"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {o.brand} · {o.near} · {o.when}
                        {o.detourMin > 0
                          ? ` · крюк ~${o.detourMin} мин`
                          : " · с базы / по пути"}
                      </p>
                      <p className="text-sm">{o.why}</p>
                      <p className="text-sm text-muted-foreground">
                        {o.brands}
                      </p>
                      <p className="text-sm text-muted-foreground">{o.tip}</p>
                    </div>
                    {o.url ? (
                      <a
                        href={o.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-2.5 text-sm hover:bg-muted"
                      >
                        Сайт
                      </a>
                    ) : null}
                  </div>
                )))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fuel">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  Где лить дизель
                </CardTitle>
                <CardDescription>
                  BY €{dieselPrices.BY.toFixed(2)} · PL €
                  {dieselPrices.PL.toFixed(2)} · CZ €
                  {dieselPrices.CZ.toFixed(2)} · AT €
                  {dieselPrices.AT.toFixed(2)} · IT €
                  {dieselPrices.IT.toFixed(2)} · DE €
                  {dieselPrices.DE.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  {totals.fuel.stops.map((stop) => (
                    <div
                      key={`${stop.place}-${stop.liters}`}
                      className="flex items-start justify-between gap-3 rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{stop.place}</p>
                        <p className="text-sm text-muted-foreground">
                          {stop.liters.toFixed(0)} л × {eur1(stop.price)}
                        </p>
                      </div>
                      <p className="font-heading text-xl">{eur(stop.cost)}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  На выбранный отрезок ~{totals.fuel.consumedL.toFixed(0)} л.
                  У озера держите 15–20 л на поездки к аутлетам.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tolls">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  Платные дороги
                </CardTitle>
                <CardDescription>
                  {eur(totals.tolls)} · легковой до 3,5 т
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tollList.map((toll, i) => (
                  <div
                    key={`${toll.country}-${toll.item}-${i}`}
                    className="grid gap-1 border-b pb-3 last:border-0 sm:grid-cols-[160px_1fr_auto]"
                  >
                    <p className="text-sm text-muted-foreground">{toll.country}</p>
                    <div>
                      <p className="font-medium">{toll.item}</p>
                      <p className="text-sm text-muted-foreground">{toll.note}</p>
                    </div>
                    <p className="font-heading text-xl">{eur1(toll.amount)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sleep">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Где ночевать</CardTitle>
                <CardDescription>
                  Белосток → Краков → Грац → 2 ночи Гарда → 5 ночей Канту →
                  Регенсбург → Вроцлав → Белосток. Номера на двоих.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {visibleLodging.map((night) => (
                  <div key={night.id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          {night.nightLabel}
                        </p>
                        <p className="font-heading text-2xl">{night.city}</p>
                        <p className="text-sm text-muted-foreground">
                          {night.area}
                        </p>
                      </div>
                      <Badge variant="outline">
                        €{night.budgetEur[0]}–{night.budgetEur[1]}
                        {night.nights ? `/ночь × ${night.nights}` : ""}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{night.why}</p>
                    <ul className="mt-4 space-y-3">
                      {night.picks.map((pick) => (
                        <li
                          key={pick.name}
                          className="flex items-start justify-between gap-3 rounded-lg bg-muted/60 p-3 text-sm"
                        >
                          <div>
                            <p className="font-medium">{pick.name}</p>
                            <p className="text-muted-foreground">{pick.note}</p>
                          </div>
                          <p className="shrink-0 font-heading text-lg">
                            от {eur(pick.fromEur)}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {night.backup}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Перед выездом</CardTitle>
                <CardDescription>
                  Виза {tripDates.startLabel}–{tripDates.endLabel}. Граница
                  Брузги / Кузница.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion>
                  {documents.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>{item.body}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6 grid gap-3 sm:grid-cols-5">
                  {speedLimits.map((s) => (
                    <div
                      key={s.country}
                      className="rounded-lg bg-muted p-3 text-sm"
                    >
                      <p className="font-medium">{s.country}</p>
                      <p className="text-muted-foreground">
                        {s.road}: {s.limit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {hotelRows.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Жильё в смете</CardTitle>
              <CardDescription>
                Гарда €75 × 2 и Канту €70 × 5 на двоих. Аутлет-шопинг не включён.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {hotelRows.map((n) => (
                <div
                  key={n.place}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <p>{n.place}</p>
                  <p className="font-heading text-xl">{eur(n.amount)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-2xl">
                <ShieldCheck className="size-5" />
                Почему так режем дорогу
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Чехия — виньетка и Freeport, ночёвки нет. Австрия — ночь в Граце:
                Шлоссберг вечером, утром Тарвизио к Гарде без Бреннера. Верона и
                Сирмионе с одной базы на юге озера.
              </p>
              <p>
                На Комо переезжаем 16-го, короткие 2 часа по A4. Милан — поездом
                в субботу, Serravalle — в понедельник. Тре Чиме не берём: крюк
                на восток съел бы Верону или Комо.
              </p>
              <p>
                Обратно через Регенсбург и Вроцлав, без марафона и без лишних
                аутлетов. Финиш 24 октября в рамке визы.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-2xl">
                <AlertTriangle className="size-5" />
                Риски по срокам
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Долгая очередь на Брузгах 11.10 съест вечер в Белостоке, не
                Краков: лимит {MAX_DRIVE_KM} км. Freeport всё равно день 3.
              </p>
              <p>
                Самые длинные дни — 680 км на границе. Обратно Регенсбург и
                Вроцлав держат каждый перегон в лимите, без 1080 км за рулём.
              </p>
              <p>
                24.10 — последний день визы: без «ещё одного кафе» у границы.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="border-t pt-6 pb-12 text-sm text-muted-foreground">
          <p>
            Смета на двоих, {vehicle.make} {vehicle.engineCode}. Календарь{" "}
            {tripDates.startLabel}–{tripDates.endLabel}: не больше{" "}
            {MAX_DRIVE_KM} км в день, 2 ночи Гарда и 5 Канту, обратно через
            Регенсбург и Вроцлав. Еда — {foodKit.burner}, {foodKit.fridge} и
            кафе по пути. Два аутлета: Freeport и Serravalle. Топливо и
            виньетки на {PRICES_AS_OF}.
          </p>
        </footer>
      </main>
    </div>
  );
}

function HeroStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/8 px-4 py-3 backdrop-blur-sm">
      <p className="flex items-center gap-2 text-xs text-white/65">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl text-white">{value}</p>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] text-right">{value}</span>
    </div>
  );
}

function Choice({
  active,
  onClick,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-left transition ${
        active
          ? "border-primary bg-primary/8 ring-1 ring-primary/30"
          : "hover:bg-muted"
      }`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{text}</p>
    </button>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-primary-foreground/80">
        {icon}
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function MiniStat({
  icon,
  title,
  value,
  hint,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3">
        <div className="mt-1 rounded-md bg-muted p-2">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-heading text-2xl">{value}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}
