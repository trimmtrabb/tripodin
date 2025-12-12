import React, { useEffect, useMemo, useState } from "react";
import { City, getCities, distanceKm } from "./cityData";

export default function MultiCityModal({ open, onClose, originCountry, destCountry, onSubmit }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; onSubmit?: (cities: string[]) => void }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [city1, setCity1] = useState<string>(destCities[0]?.name || "");
  const [city1Days, setCity1Days] = useState<number>(3);
  const [extra, setExtra] = useState<{ name: string; days: number }[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  const totalDays = city1Days + extra.reduce((s, e) => s + (e.days || 0), 0);
  const allCities: City[] = [city1, ...extra.map((e) => e.name)].map((n) => destCities.find((c) => c.name === n)!).filter(Boolean);
  const legs = allCities.slice(0, -1).map((c, i) => ({ from: c, to: allCities[i + 1], km: distanceKm(c, allCities[i + 1]) }));
  const canSubmit = from && city1 && (extra.every((e) => e.name)) && totalDays > 0;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="card w-full max-w-3xl p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="pill pill-blue">Multi-City Itinerary</div>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        <div className="text-sm text-slate-600 mb-3">Plan Your Journey From {originCountry} To {destCountry}</div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">From ({originCountry})</div>
            <select className="w-full border rounded p-2" value={from} onChange={(e) => setFrom(e.target.value)}>
              {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
            </select>
            <div className="text-xs text-slate-500 mt-1">✈️ Airport required</div>
          </div>
          <div>
            <div className="text-sm mb-1">City 1 ({destCountry})</div>
            <select className="w-full border rounded p-2" value={city1} onChange={(e) => setCity1(e.target.value)}>
              {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
            </select>
            <div className="text-xs text-slate-500 mt-1">✈️ Airport required</div>
            <div className="mt-2">
              <div className="text-xs mb-1">Stay (days)</div>
              <select className="w-full border rounded p-2" value={city1Days} onChange={(e) => setCity1Days(Number(e.target.value))}>{[1,2,3,4,5,6,7].map((d) => (<option key={d} value={d}>{d}</option>))}</select>
            <div className="text-xs text-slate-500 mt-1">💡 Tip: Add more cities to allow any destination</div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          {extra.map((e, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3 items-end mb-2" draggable onDragStart={() => setDragIndex(i)} onDragOver={(ev) => ev.preventDefault()} onDrop={() => {
              if (dragIndex === null) return; const arr = extra.slice(); const [m] = arr.splice(dragIndex,1); arr.splice(i,0,m); setExtra(arr); setDragIndex(null);
            }}>
              <div>
                <div className="text-sm mb-1">City {i+2} ({destCountry})</div>
                <select className="w-full border rounded p-2" value={e.name} onChange={(ev) => setExtra((arr) => arr.map((x,idx) => idx===i ? { ...x, name: ev.target.value } : x))}>
                  {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                </select>
                <div className="text-xs text-slate-500 mt-1">🚗 Any city</div>
              </div>
              <div>
                <div className="text-xs mb-1">Stay (days)</div>
                <select className="w-full border rounded p-2" value={e.days} onChange={(ev) => setExtra((arr) => arr.map((x,idx) => idx===i ? { ...x, days: Number(ev.target.value) } : x))}>{[1,2,3,4,5,6,7].map((d) => (<option key={d} value={d}>{d}</option>))}</select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button className="btn btn-secondary" onClick={() => setExtra((arr) => arr.filter((_,idx) => idx!==i))}>Delete</button>
              </div>
            </div>
          ))}
          <div className="mt-2">
            {extra.length < 4 ? (
              <button className="btn btn-primary btn-lg" onClick={() => setExtra((arr) => [...arr, { name: destCities[0]?.name || "", days: 3 }])}>+ Add Another City</button>
            ) : (
              <button className="btn btn-secondary btn-lg" disabled>+ Add Another City</button>
            )}
          </div>
        </div>
        <div className="card p-3 mt-3">
          <div className="font-medium mb-2">Ground Route Summary</div>
          <div className="space-y-1">
            {legs.map((l, idx) => (
              <div key={idx} className="flex justify-between"><span>{l.from.name} → {l.to.name}</span><span>{l.km} km</span></div>
            ))}
          </div>
          <div className="mt-2 border-t pt-2 font-semibold">Total Ground Route {legs.reduce((s, l) => s + l.km, 0)} km</div>
          <div className="mt-1 text-sm">Total Stay {totalDays} days</div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" disabled={!canSubmit} onClick={() => { onSubmit?.([city1, ...extra.map((e) => e.name)]); onClose(); }}>Continue to Booking Options</button>
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
