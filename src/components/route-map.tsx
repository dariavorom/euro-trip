"use client";

import { useEffect, useId, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import type { LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Waypoint } from "@/data/trip";

function FitRoute({ points }: { points: LatLngExpression[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;
    map.fitBounds(points as [number, number][], { padding: [28, 28] });
    // Leaflet can mount before the flex parent has final size.
    const t = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(t);
  }, [map, points]);

  return null;
}

function markersFrom(waypoints: Waypoint[], prefix: string) {
  return waypoints.map((w, i) => {
    const ends = i === 0 || i === waypoints.length - 1;
    return (
      <CircleMarker
        key={`${prefix}-${w.id}-${i}`}
        center={[w.lat, w.lng]}
        radius={ends ? 8 : 5}
        pathOptions={{
          color: ends ? "#c45c26" : "#1d5d63",
          fillColor: ends ? "#e8a060" : "#4aa3a8",
          fillOpacity: 1,
          weight: 2,
        }}
      >
        <Tooltip direction="top" offset={[0, -6]}>
          {w.name}
        </Tooltip>
        <Popup>
          <strong>{w.name}</strong>
          {w.note ? <div>{w.note}</div> : null}
        </Popup>
      </CircleMarker>
    );
  });
}

export function RouteMap({
  waypoints,
  returnWaypoints,
}: {
  waypoints: Waypoint[];
  returnWaypoints?: Waypoint[];
}) {
  // Defer MapContainer until after paint so Strict Mode / dynamic import
  // don't call Leaflet appendChild on a detached node.
  const [ready, setReady] = useState(false);
  const mapId = useId();
  const routeKey = `${waypoints.map((w) => w.id).join("-")}_${
    returnWaypoints?.map((w) => w.id).join("-") ?? "none"
  }`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => {
      window.cancelAnimationFrame(frame);
      setReady(false);
    };
  }, [routeKey]);

  const outPoints = waypoints.map((w) => [w.lat, w.lng] as LatLngExpression);
  const backPoints =
    returnWaypoints?.map((w) => [w.lat, w.lng] as LatLngExpression) ?? [];
  const allPoints = [...outPoints, ...backPoints];

  if (!ready) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Загружаем карту…
      </div>
    );
  }

  return (
    <MapContainer
      key={`${mapId}-${routeKey}`}
      center={[48.6, 16.5]}
      zoom={5}
      className="h-full w-full rounded-[inherit]"
      scrollWheelZoom={false}
      attributionControl
      ref={(map: LeafletMap | null) => {
        if (map) {
          window.setTimeout(() => map.invalidateSize(), 0);
        }
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitRoute points={allPoints} />
      <Polyline
        positions={outPoints}
        pathOptions={{ color: "#1d5d63", weight: 4, opacity: 0.9 }}
      />
      {backPoints.length > 1 ? (
        <Polyline
          positions={backPoints}
          pathOptions={{
            color: "#c45c26",
            weight: 4,
            opacity: 0.85,
            dashArray: "10 8",
          }}
        />
      ) : null}
      {markersFrom(waypoints, "out")}
      {returnWaypoints ? markersFrom(returnWaypoints, "back") : null}
    </MapContainer>
  );
}
