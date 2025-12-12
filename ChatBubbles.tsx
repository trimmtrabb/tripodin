import React, { useMemo, useState } from "react";
import { getCities } from "./cityData";

export function NoVisaBubble() {
  return (
    <div className="bubble bubble-green p-4 animate-in">
      <div className="flex items-center gap-2">
        <span className="icon-square bg-green-600 text-white">✅</span>
        <div className="font-semibold text-green-700">Great news! You can travel visa‑free.</div>
      </div>
      <div className="text-sm text-green-800 mt-1">Select your cities below to continue.</div>
    </div>
  );
}

export function SelectCitiesBubble({ originCountry, destCountry, onContinue }: { originCountry: string; destCountry: string; onContinue: (from: string, to: string) => void }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [tab, setTab] = useState<"direct" | "multi">("direct");
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [to, setTo] = useState<string>(destCities[0]?.name || "");
  const [start, setStart] = useState<string>(from);
  const [first, setFirst] = useState<string>(to);
  const [days, setDays] = useState<number>(3);
  const [extra, setExtra] = useState<string[]>([]);
  const maxCities = 5;
  React.useEffect(() => {
    if (tab === "multi") {
      setStart(from);
      setFirst(to);
    }
  }, [tab, from, to]);
  const label = from && to ? `Continue with ${from} → ${to}` : "Continue";
  const mLabel = start && first ? `Plan Multi‑city with ${start} → ${first}` : "Continue";
  const find = (name: string) => {
    const all = [...originCities, ...destCities];
    return all.find((c) => c.name === name);
  };
  const distKm = React.useMemo(() => {
    const seq = [start, first, ...extra].filter(Boolean);
    if (seq.length < 2) return 0;
    const R = 6371;
    const toRad = (d: number) => (d * Math.PI) / 180;
    let sum = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      const a = find(seq[i]);
      const b = find(seq[i + 1]);
      if (!a || !b) continue;
      const dLat = toRad((b.lat as number) - (a.lat as number));
      const dLon = toRad((b.lng as number) - (a.lng as number));
      const lat1 = toRad(a.lat as number);
      const lat2 = toRad(b.lat as number);
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      sum += 2 * R * Math.asin(Math.sqrt(h));
    }
    return sum;
  }, [start, first, extra]);
  const feet = Math.round(distKm * 1000 * 3.28084);
  return (
    <div className="bubble bubble-blue p-4 animate-in">
      <div className="flex items-center gap-2 mb-2">
        <button className={`btn ${tab === "direct" ? "btn-primary" : "btn-secondary"}`} onClick={() => setTab("direct")}>Direct Trip</button>
        <button className={`btn ${tab === "multi" ? "btn-primary" : "btn-secondary"}`} onClick={() => setTab("multi")}>Multi‑city</button>
      </div>
      {tab === "direct" ? (
        <div>
          <div className="font-semibold mb-1">Select Your Cities</div>
          <div className="text-sm text-slate-700 mb-2">Please select your departure and arrival cities:</div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs mb-1 text-blue-700">Departure</div>
              <select className="w-full border rounded p-2" value={from} onChange={(e) => setFrom(e.target.value)}>
                {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1 text-green-700">Arrival</div>
              <select className="w-full border rounded p-2" value={to} onChange={(e) => setTo(e.target.value)}>
                {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => onContinue(from, to)}>{label}</button>
        </div>
      ) : (
        <div>
          <div className="font-semibold mb-1">Multi‑city Itinerary</div>
          <div className="text-sm text-slate-700 mb-2">Your selections are prefilled. Add stays if needed.</div>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs mb-1 text-blue-700">Start</div>
              <select className="w-full border rounded p-2" value={start} onChange={(e) => setStart(e.target.value)}>
                {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1 text-green-700">First City</div>
              <select className="w-full border rounded p-2" value={first} onChange={(e) => setFirst(e.target.value)}>
                {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1">Days</div>
              <input className="w-full border rounded p-2" type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} />
            </div>
          </div>
          {extra.map((city, idx) => (
            <div key={idx} className="mt-3">
              <div className="text-xs mb-1">City {idx + 2}</div>
              <select className="w-full border rounded p-2" value={city} onChange={(e) => setExtra((arr) => arr.map((x, i) => i === idx ? e.target.value : x))}>
                {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <button className="btn btn-secondary" disabled={[start, first, ...extra].filter(Boolean).length >= maxCities} onClick={() => setExtra((arr) => arr.length < maxCities - 2 ? [...arr, destCities[0]?.name || ""] : arr)}>+ Add more cities</button>
            <div className="text-sm text-slate-600">{[start, first, ...extra].filter(Boolean).length} / {maxCities} cities</div>
          </div>
          <div className="mt-3">
            <div className="route-dots">
              {[start, first, ...extra].filter(Boolean).map((c, i, arr) => (
                <React.Fragment key={`${c}-${i}`}>
                  <div className="route-dot" />
                  {i < arr.length - 1 ? <div className="route-line" /> : null}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[start, first, ...extra].filter(Boolean).map((c, i, arr) => {
                if (i >= arr.length - 1) return null;
                const a = arr[i]; const b = arr[i + 1];
                const A = find(a); const B = find(b);
                let km = 0; if (A && B) {
                  const R = 6371; const toRad = (d: number) => (d * Math.PI) / 180;
                  const dLat = toRad((B.lat as number) - (A.lat as number));
                  const dLon = toRad((B.lng as number) - (A.lng as number));
                  const lat1 = toRad(A.lat as number); const lat2 = toRad(B.lat as number);
                  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
                  km = 2 * R * Math.asin(Math.sqrt(h));
                }
                return (<span key={`${a}-${b}`} className="route-chip">{a} → {b} · {km.toFixed(1)} km</span>);
              })}
            </div>
            <div className="mt-3">
              <div className="meter"><div className="meter-fill" style={{ width: `${Math.min(100, (distKm / 3000) * 100)}%` }} /></div>
              <div className="text-sm mt-1">Total ground route: {distKm.toFixed(1)} km ({feet.toLocaleString()} ft)</div>
            </div>
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => onContinue(start, first)}>{mLabel}</button>
        </div>
      )}
    </div>
  );
}

export function UpsellBubble({ onFlights, onHotels, onInsurance, showInsurance, from, to }: { onFlights: () => void; onHotels: () => void; onInsurance: () => void; showInsurance: boolean; from?: string; to?: string }) {
  return (
    <div className="bubble bubble-blue p-4 animate-in">
      <div className="font-semibold text-slate-800">Let me help you with flights and hotels.</div>
      {from && to ? (<div className="text-sm text-slate-700 mt-1">Route: {from} → {to}</div>) : null}
      <div className="text-sm text-slate-700">[UPSELL] Special offers available</div>
      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={onFlights}>Book Flights</button>
        <button className="btn btn-secondary" onClick={onHotels}>Book Hotels</button>
        {showInsurance ? (<button className="btn btn-secondary" onClick={onInsurance}>Get Travel Insurance</button>) : null}
      </div>
    </div>
  );
}

export function InfoBubble({ title, text }: { title: string; text: string }) {
  return (
    <div className="bubble bubble-blue p-4 animate-in">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-slate-700">{text}</div>
    </div>
  );
}
