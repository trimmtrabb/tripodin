import React, { useEffect, useMemo, useState } from "react";
import { City, getCities, distanceKm } from "./cityData";

export default function MultiCityModal({ open, onClose, originCountry, destCountry, onSubmit, tripType, dep, ret, pax }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; onSubmit?: (cities: string[]) => void; tripType?: "oneway" | "round" | "multicity"; dep?: string; ret?: string; pax?: number }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [city1, setCity1] = useState<string>(destCities[0]?.name || "");
  const [city1Days, setCity1Days] = useState<number>(3);
  const [extra, setExtra] = useState<{ name: string; days: number }[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const ref = `MC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  const totalDays = city1Days + extra.reduce((s, e) => s + (e.days || 0), 0);
  const allCities: City[] = [...extra.map((e) => e.name), city1].map((n) => destCities.find((c) => c.name === n)!).filter(Boolean);
  const legs = allCities.slice(0, -1).map((c, i) => ({ from: c, to: allCities[i + 1], km: distanceKm(c, allCities[i + 1]) }));
  const canSubmit = from && city1;
  const routeText = [from, ...extra.map((e) => e.name).filter(Boolean), city1].filter(Boolean).join(" → ");
  const findCity = (list: City[], name: string | undefined) => list.find((c) => c.name === name);
  const fromCity = findCity(originCities as any, from);
  const firstCity = findCity(destCities as any, city1);
  const tt = tripType || "round";
  const depDate = dep || new Date().toISOString().slice(0, 10);
  const retDate = ret || (tt === "round" ? new Date(Date.now() + 86400000).toISOString().slice(0, 10) : "");
  const passengers = pax || 1;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="bp-card w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className={tt === "round" ? "bp-header-purple" : "bp-header-blue"}>
          <div className="flex items-center gap-3">
            <div className="uppercase tracking-wide">{tt === "round" ? "Round Trip Flight" : "One‑way Flight"}</div>
            <div className="bp-code">{ref}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm">{routeText || `${originCountry} → ${destCountry}`}</div>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold">Confirmation</div>
          <div className="card p-3 mt-3">
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-wide text-slate-500">Confirmation Code</div>
              <div className="text-xs text-slate-400">Scan</div>
            </div>
            <div className="mt-1 font-mono text-xl tracking-widest">{ref.replace("MC-", "FL")}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-3 items-stretch mt-3">
            <div className="md:col-span-2">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm mb-1">From ({originCountry})</div>
                  <div className="p-2 border rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>✈️</span>
                      <div className="text-lg font-extrabold">{fromCity?.airport?.code || ""} → {firstCity?.airport?.code || ""}</div>
                    </div>
                    <div className="text-sm text-slate-500">{fromCity?.name || from}</div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{fromCity?.name || from} → {firstCity?.name || city1}</div>
                </div>
                <div>
                  <div className="text-sm mb-1">{tt === "round" ? "To & Return" : "Destination"}</div>
                  <div className="p-2 border rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>✈️</span>
                      <div className="text-lg font-extrabold">{tt === "round" ? `${firstCity?.airport?.code || ""} → ${fromCity?.airport?.code || ""}` : `${firstCity?.airport?.code || ""}`}</div>
                    </div>
                    <div className="text-sm text-slate-500">{firstCity?.name || city1}</div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{tt === "round" ? `${firstCity?.name || city1} → ${fromCity?.name || from}` : `${firstCity?.name || city1}`}</div>
                </div>
              </div>
              <div className="mt-3">
                {extra.length ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {extra.map((e, i) => {
                      const ci = findCity(destCities as any, e.name);
                      return (
                        <div key={i}>
                          <div className="text-sm mb-1">Via</div>
                          <div className="p-2 border rounded flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>✈️</span>
                              <div className="text-lg font-extrabold">{ci?.airport?.code || ""}</div>
                            </div>
                            <div className="text-sm text-slate-500">{ci?.name || e.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="card p-3 mt-3">
                <div className="font-medium mb-2">Route Summary</div>
                <div className="space-y-1">
                  {legs.filter((l) => l.from.name !== l.to.name).map((l, idx) => (
                    <div key={idx} className="flex justify-between"><span>{l.from.name} → {l.to.name}</span><span>{l.km} km</span></div>
                  ))}
                </div>
                {legs.filter((l) => l.from.name !== l.to.name).length ? (
                  <div className="mt-2 border-t pt-2 font-semibold">Total Distance {legs.filter((l) => l.from.name !== l.to.name).reduce((s, l) => s + l.km, 0)} km</div>
                ) : null}
              </div>
            </div>
            <div className="card p-3">
              <div className="font-medium mb-1">Travel Details</div>
              <div className="text-xs mb-1">Type</div>
              <div className="pill pill-blue w-fit">{tt === "oneway" ? "One‑way" : tt === "round" ? "Round‑trip" : "Multi‑city"}</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <div className="text-xs mb-1">Departure</div>
                  <div className="text-sm">{depDate}</div>
                </div>
                {tt === "round" ? (
                  <div>
                    <div className="text-xs mb-1">Return</div>
                    <div className="text-sm">{retDate}</div>
                  </div>
                ) : null}
                <div>
                  <div className="text-xs mb-1">Passengers</div>
                  <div className="text-sm">{passengers}</div>
                </div>
                <div>
                  <div className="text-xs mb-1">Status</div>
                  <div className="text-sm text-green-600 font-semibold">Confirmed</div>
                </div>
              </div>
              <div className="mt-3 rounded border border-green-200 bg-green-50 p-3">
                <div className="text-xs text-green-700">Total Fare</div>
                <div className="text-2xl font-extrabold text-green-700">$ {(legs.filter((l) => l.from.name !== l.to.name).reduce((s, l) => s + l.km, 0) * 0.35).toFixed(0)}</div>
                <div className="text-xs text-green-700 mt-1">All taxes and fees included</div>
              </div>
              <div className="mt-3 h-12 bg-white rounded overflow-hidden border">
                <div className="h-full w-full flex">
                  <div className="w-1 bg-black" />
                  <div className="w-2 bg-black ml-1" />
                  <div className="w-1 bg-black ml-2" />
                  <div className="w-3 bg-black ml-3" />
                  <div className="w-1 bg-black ml-1" />
                  <div className="w-4 bg-black ml-2" />
                  <div className="w-1 bg-black ml-1" />
                  <div className="w-2 bg-black ml-3" />
                  <div className="w-1 bg-black ml-1" />
                </div>
              </div>
              <div className="text-xs text-slate-600 mt-2">Booking Confirmed • TripOdin</div>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary" disabled={!canSubmit} onClick={() => { onSubmit?.([city1, ...extra.map((e) => e.name)]); onClose(); }}>Continue to Booking Options</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReturnFromModal({ open, onClose, cities, onSelect }: { open: boolean; onClose: () => void; cities: string[]; onSelect: (c: string) => void }) {
  const [c, setC] = useState<string>(cities[0] || "");
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="card w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-lg font-semibold mb-2">Return From City</div>
        <select className="w-full border rounded p-2" value={c} onChange={(e) => setC(e.target.value)}>
          {cities.map((x) => (<option key={x} value={x}>{x}</option>))}
        </select>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={() => { onSelect(c); onClose(); }}>Confirm</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
