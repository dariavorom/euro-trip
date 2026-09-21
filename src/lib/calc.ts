import {
  calendar,
  dieselPrices,
  foodProfiles,
  hotelNights,
  routes,
  roundTrip,
  vehicle,
  type FoodId,
  type RouteId,
  type RouteOption,
} from "@/data/trip";

export function litersFor(km: number, l100: number) {
  return (km * l100) / 100;
}

export function rangeKm(tankL: number, l100: number) {
  return (tankL / l100) * 100;
}

export function roundMoney(n: number) {
  return Math.round(n * 10) / 10;
}

export type FuelStop = {
  place: string;
  country: string;
  liters: number;
  price: number;
  cost: number;
};

export type FuelPlan = {
  consumedL: number;
  naiveCost: number;
  smartCost: number;
  saved: number;
  stops: FuelStop[];
  leftoverL: number;
};

export function naiveFuelCost(route: RouteOption, l100: number) {
  return route.countries.reduce((sum, c) => {
    const price = dieselPrices[c.code] ?? 2.1;
    return sum + litersFor(c.km, l100) * price;
  }, 0);
}

function kmOf(route: RouteOption, code: string) {
  return route.countries.find((c) => c.code === code)?.km ?? 0;
}

/** Туда: максимум белорусского ДТ, затем Чехия, минимум Италии. */
function outboundFuelPlan(route: RouteOption, l100: number): FuelPlan {
  const tank = vehicle.tankL;
  const consumedL = litersFor(route.distanceKm, l100);
  const byKm = kmOf(route, "BY");
  const byUsed = litersFor(byKm, l100);
  const byPriced = Math.min(consumedL, byUsed + tank);
  const rest = Math.max(0, consumedL - byPriced);

  const czPrice = dieselPrices.CZ;
  const plPrice = dieselPrices.PL;
  const cheapEu = Math.min(czPrice, plPrice);
  const cheapCode = czPrice <= plPrice ? "CZ" : "PL";
  const cheapLabel =
    cheapCode === "CZ"
      ? "Чехия, Freeport Hatě / Бржецлав"
      : "Польша, АЗС перед следующей границей";

  const euFill = Math.min(tank, rest);
  const lastFill = Math.max(0, rest - euFill);
  const expensivePrice = dieselPrices.IT;

  const stops: FuelStop[] = [
    {
      place: "Гомель, полный бак на старте",
      country: "BY",
      liters: tank,
      price: dieselPrices.BY,
      cost: tank * dieselPrices.BY,
    },
    {
      place: "Гродно, долить до полного перед Брузгами",
      country: "BY",
      liters: byUsed,
      price: dieselPrices.BY,
      cost: byUsed * dieselPrices.BY,
    },
  ];

  if (euFill > 0.2) {
    stops.push({
      place: cheapLabel,
      country: cheapCode,
      liters: euFill,
      price: cheapEu,
      cost: euFill * cheapEu,
    });
  }

  if (lastFill > 0.2) {
    stops.push({
      place: "Италия, Гарда / Верона",
      country: "IT",
      liters: lastFill,
      price: expensivePrice,
      cost: lastFill * expensivePrice,
    });
  }

  const purchased = stops.reduce((s, x) => s + x.liters, 0);
  const smartCost =
    byPriced * dieselPrices.BY + euFill * cheapEu + lastFill * expensivePrice;
  const naive = naiveFuelCost(route, l100);

  return {
    consumedL,
    naiveCost: naive,
    smartCost,
    saved: Math.max(0, naive - smartCost),
    stops,
    leftoverL: Math.max(0, purchased - consumedL),
  };
}

function returnFuelPlan(route: RouteOption, l100: number): FuelPlan {
  const tank = vehicle.tankL;
  const consumedL = litersFor(route.distanceKm, l100);
  const byL = litersFor(kmOf(route, "BY"), l100);
  const plL = litersFor(kmOf(route, "PL"), l100);
  const expensiveKm =
    kmOf(route, "IT") + kmOf(route, "AT") + kmOf(route, "DE");
  const expensiveL = litersFor(expensiveKm, l100);
  const expensivePrice =
    (dieselPrices.IT * kmOf(route, "IT") +
      dieselPrices.AT * kmOf(route, "AT") +
      dieselPrices.DE * kmOf(route, "DE")) /
    Math.max(1, expensiveKm);

  const westFill = Math.min(tank, expensiveL);
  const westTopUp = Math.max(0, expensiveL - westFill);
  const plFill = Math.min(tank, plL);
  const plTopUp = Math.max(0, plL - plFill);
  const byFill = Math.min(tank, byL);
  const byExtra = Math.max(0, byL - byFill);

  const stops: FuelStop[] = [
    {
      place: "Комо / Верона, минимум до Польши",
      country: "IT",
      liters: westFill * 0.35,
      price: dieselPrices.IT,
      cost: westFill * 0.35 * dieselPrices.IT,
    },
    {
      place: "Австрия / юг Германии, дотянуть до PL",
      country: "DE",
      liters: westFill * 0.65 + westTopUp,
      price: expensivePrice,
      cost: (westFill * 0.65 + westTopUp) * expensivePrice,
    },
    {
      place: "Вроцлав, полный бак после Германии",
      country: "PL",
      liters: plFill,
      price: dieselPrices.PL,
      cost: plFill * dieselPrices.PL,
    },
  ];

  if (plTopUp > 0.2) {
    stops.push({
      place: "Лодзь / Варшава, долив по Польше",
      country: "PL",
      liters: plTopUp,
      price: dieselPrices.PL,
      cost: plTopUp * dieselPrices.PL,
    });
  }

  stops.push({
    place: "Гродно, полный бак после Брузгов",
    country: "BY",
    liters: byFill + byExtra,
    price: dieselPrices.BY,
    cost: (byFill + byExtra) * dieselPrices.BY,
  });

  const smartCost = stops.reduce((s, x) => s + x.cost, 0);
  const purchased = stops.reduce((s, x) => s + x.liters, 0);
  const naive = naiveFuelCost(route, l100);

  return {
    consumedL,
    naiveCost: naive,
    smartCost,
    saved: Math.max(0, naive - smartCost),
    stops,
    leftoverL: Math.max(0, purchased - consumedL),
  };
}

export function smartFuelPlan(route: RouteOption, l100: number): FuelPlan {
  return route.id === "germany"
    ? returnFuelPlan(route, l100)
    : outboundFuelPlan(route, l100);
}

export function tollTotal(route: RouteOption) {
  return route.tolls.reduce((s, t) => s + t.amount, 0);
}

export function foodTotal(profile: FoodId) {
  const p = foodProfiles[profile];
  return calendar.reduce((sum, day) => {
    const rate = day.kind === "italy" ? p.italyPerDay : p.roadPerDay;
    return sum + rate;
  }, 0);
}

export function foodTotalForMode(profile: FoodId, mode: ViewMode) {
  const p = foodProfiles[profile];
  if (mode === "alps") {
    return calendar
      .filter((d) => d.kind === "drive" || d.kind === "italy")
      .reduce(
        (sum, day) =>
          sum + (day.kind === "italy" ? p.italyPerDay : p.roadPerDay),
        0,
      );
  }
  if (mode === "germany") {
    return calendar
      .filter((d) => d.kind === "return")
      .reduce((sum, day) => sum + p.roadPerDay, 0);
  }
  return foodTotal(profile);
}

export function hotelTotal(opts?: {
  includeTransit?: boolean;
  includeItaly?: boolean;
  phase?: "all" | "out" | "back";
}) {
  const includeTransit = opts?.includeTransit ?? true;
  const includeItaly = opts?.includeItaly ?? true;
  const phase = opts?.phase ?? "all";

  return hotelNights.reduce((s, n) => {
    if (n.kind === "italy") {
      if (!includeItaly) return s;
      if (phase === "back") return s;
      return s + n.amount;
    }
    if (!includeTransit) return s;
    const isOut =
      n.place.includes("11.10") ||
      n.place.includes("Краков") ||
      n.place.includes("Грац");
    const isBack =
      n.place.includes("Регенсбург") ||
      n.place.includes("Вроцлав") ||
      n.place.includes("23.10");
    if (phase === "out" && !isOut) return s;
    if (phase === "back" && !isBack) return s;
    return s + n.amount;
  }, 0);
}

export type ViewMode = RouteId | "round";

export function viewTotals(opts: {
  mode: ViewMode;
  l100: number;
  food: FoodId;
  includeTransitHotels: boolean;
  includeItalyHotels: boolean;
}) {
  const there = routes[roundTrip.thereId];
  const back = routes[roundTrip.backId];

  if (opts.mode === "round") {
    const outFuel = smartFuelPlan(there, opts.l100);
    const retFuel = smartFuelPlan(back, opts.l100);
    const tolls = tollTotal(there) + tollTotal(back);
    const food = foodTotal(opts.food);
    const hotels = hotelTotal({
      includeTransit: opts.includeTransitHotels,
      includeItaly: opts.includeItalyHotels,
    });
    const fuelSmart = outFuel.smartCost + retFuel.smartCost;
    const fuelNaive = outFuel.naiveCost + retFuel.naiveCost;
    const grand = fuelSmart + tolls + food + hotels;

    return {
      mode: "round" as const,
      route: there,
      distanceKm: there.distanceKm + back.distanceKm,
      driveHours: there.driveHours + back.driveHours,
      fuel: {
        consumedL: outFuel.consumedL + retFuel.consumedL,
        naiveCost: fuelNaive,
        smartCost: fuelSmart,
        saved: Math.max(0, fuelNaive - fuelSmart),
        stops: [...outFuel.stops, ...retFuel.stops],
        leftoverL: retFuel.leftoverL,
      },
      tolls,
      food,
      hotels,
      grand,
      perPerson: grand / 2,
      there,
      back,
    };
  }

  const route = routes[opts.mode];
  const fuel = smartFuelPlan(route, opts.l100);
  const tolls = tollTotal(route);
  const food = foodTotalForMode(opts.food, opts.mode);
  const hotels = hotelTotal({
    includeTransit: opts.includeTransitHotels,
    includeItaly: opts.includeItalyHotels,
    phase: opts.mode === "alps" ? "out" : "back",
  });
  const grand = fuel.smartCost + tolls + food + hotels;

  return {
    mode: opts.mode,
    route,
    distanceKm: route.distanceKm,
    driveHours: route.driveHours,
    fuel,
    tolls,
    food,
    hotels,
    grand,
    perPerson: grand / 2,
    there,
    back,
  };
}
