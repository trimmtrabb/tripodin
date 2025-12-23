import React, { useEffect, useMemo, useState } from "react";
import { City, getCities, distanceKm } from "./cityData";

export default function MultiCityModal({ open, onClose, originCountry, destCountry, onSubmit, tripType, dep, ret, pax, transportModes, fullItinerary, totalStay }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; onSubmit?: (cities: string[]) => void; tripType?: "oneway" | "round" | "multicity"; dep?: string; ret?: string; pax?: number; transportModes?: Record<number, "flight" | "train" | "car">; fullItinerary?: string[]; totalStay?: number }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [city1, setCity1] = useState<string>(destCities[0]?.name || "");
  const [city1Days, setCity1Days] = useState<number>(3);
  const [extra, setExtra] = useState<{ name: string; days: number }[]>([]);
  
  const allCitiesInOrder = useMemo(() => {
    if (fullItinerary && fullItinerary.length >= 2) {
      const list: City[] = [];
      // Attempt to resolve each name in fullItinerary to a City object
      // Try origin first, then dest
      fullItinerary.forEach(name => {
         let c = originCities.find(x => x.name === name);
         if (!c) c = destCities.find(x => x.name === name);
         if (c) list.push(c);
         else {
           // fallback dummy if not found in known lists (shouldn't happen if data is consistent)
           list.push({ name, lat: 0, lng: 0, region: "Unknown", country: "Unknown" }); 
         }
      });
      return list;
    }
    // Fallback to legacy state-based if fullItinerary not provided
    return [];
  }, [fullItinerary, originCities, destCities]);

  useEffect(() => {
    if (fullItinerary && fullItinerary.length >= 2) {
      setFrom(fullItinerary[0]);
      setCity1(fullItinerary[1]);
      if (fullItinerary.length > 2) {
        setExtra(fullItinerary.slice(2).map((name) => ({ name, days: 3 })));
      }
    }
  }, [fullItinerary]);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const ref = `MC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  
  // Use passed totalStay if available, else sum local state
  const computedTotalDays = totalStay !== undefined ? totalStay : (city1Days + extra.reduce((s, e) => s + (e.days || 0), 0));
  
  // Construct legs from fullItinerary if available
  const legs = useMemo(() => {
     if (allCitiesInOrder.length > 1) {
       return allCitiesInOrder.slice(0, -1).map((c, i) => ({ 
         from: c, 
         to: allCitiesInOrder[i + 1], 
         km: distanceKm(c, allCitiesInOrder[i + 1]) 
       }));
     }
     // Legacy fallback
     const all = [...extra.map((e) => e.name), city1].map((n) => destCities.find((c) => c.name === n)!).filter(Boolean);
     // Add from city? The legacy logic seemed a bit odd in slicing.
     // Let's just trust allCitiesInOrder for the new flow.
     return []; 
  }, [allCitiesInOrder, extra, city1, destCities]);

  const canSubmit = from && city1;
  const findCity = (list: City[], name: string | undefined) => list.find((c) => c.name === name);
  const fromCity = findCity(originCities as any, from);
  const firstCity = findCity(destCities as any, city1);
  const tt = tripType || "round";
  const depDate = dep || new Date().toISOString().slice(0, 10);
  
  // Calculate return date based on total days
  const retDate = useMemo(() => {
    if (ret) return ret;
    if (tt === "round" && computedTotalDays) {
       const d = new Date(depDate);
       d.setDate(d.getDate() + computedTotalDays);
       return d.toISOString().slice(0, 10);
    }
    return tt === "round" ? new Date(Date.now() + 86400000).toISOString().slice(0, 10) : "";
  }, [ret, tt, computedTotalDays, depDate]);
  
  const passengers = pax || 1;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100] p-4" onClick={onClose}>
      <div className="bp-card w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center shrink-0">
          <div>
            <div className="text-xl font-bold">Round Trip Flight</div>
            <div className="text-xs text-purple-100 font-medium tracking-wide opacity-90">SECURE BOOKING</div>
            <div className="text-xs font-mono mt-1 flex items-center gap-2 opacity-80">{fullItinerary ? fullItinerary.join(" → ") : `${originCountry} → ${destCountry}`}</div>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded">Close</button>
        </div>
        <div className="p-4 overflow-y-auto custom-scrollbar">
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
                  <div className="text-sm mb-1">From ({from})</div>
                  <div className="p-2 border rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>✈️</span>
                      <div className="text-lg font-extrabold">{fromCity?.airport?.code || ""} → {firstCity?.airport?.code || ""}</div>
                    </div>
                    <div className="text-sm text-slate-500">{fromCity?.name || from}</div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{fromCity?.name || from} → {firstCity?.name || city1}</div>
                </div>
                <div>
                  <div className="text-sm mb-1">To ({city1})</div>
                  <div className="p-2 border rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>✈️</span>
                      <div className="text-lg font-extrabold">{tt === "round" ? `${firstCity?.airport?.code || ""} → ${fromCity?.airport?.code || ""}` : `${firstCity?.airport?.code || ""}`}</div>
                    </div>
                    <div className="text-sm text-slate-500">{firstCity?.name || city1}</div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{tt === "round" ? `${firstCity?.name || city1} → ${fromCity?.name || from}` : `${firstCity?.name || city1}`}</div>
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
                  {legs.map((l, idx) => {
                    const mode = transportModes ? transportModes[idx] || "flight" : "flight";
                    const icon = mode === "car" ? "🚗" : mode === "train" ? "🚆" : "✈️";
                    const text = mode === "car" ? "by car" : mode === "train" ? "by train" : "by flight";
                    return (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span>{l.from.name} → {l.to.name}</span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-1 rounded flex items-center gap-1">
                            <span>{icon}</span><span>{text}</span>
                          </span>
                        </div>
                        <span>{l.km} km</span>
                      </div>
                    );
                  })}
                </div>
                {legs.length ? (
                  <div className="mt-2 border-t pt-2 font-semibold">Total Distance {legs.reduce((s, l) => s + l.km, 0)} km</div>
                ) : null}
              </div>
            </div>
            <div className="card p-3">
              <div className="font-medium mb-1">Travel Details</div>
              <div className="text-xs mb-1">Type</div>
              <div className="pill pill-blue w-fit">{tt === "oneway" ? "One‑way" : tt === "round" ? "Round trip" : "Multi‑city"}</div>
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
                <div className="text-xs text-green-700">Estimated Cost</div>
                <div className="text-2xl font-extrabold text-green-700">$ {(legs.reduce((s, l, idx) => {
                  const mode = transportModes ? transportModes[idx] || "flight" : "flight";
                  const rate = mode === "car" ? 0.15 : (mode === "train" ? 0.22 : 0.35);
                  return s + (l.km * rate);
                }, 0)).toFixed(0)}</div>
                <div className="text-xs text-green-700 mt-1">Includes travel & taxes</div>
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
            <button className="btn btn-primary" disabled={!canSubmit} onClick={() => { onSubmit?.([city1, ...extra.map((e) => e.name)]); onClose(); }}>
              Continue to Booking Options {tt === "round" ? "⇄" : "→"}
            </button>
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
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100]" onClick={onClose}>
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
