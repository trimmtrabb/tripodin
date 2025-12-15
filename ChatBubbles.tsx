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
  const [firstDays, setFirstDays] = useState<number>(3);
  const [extra, setExtra] = useState<string[]>([]);
  const [extraDays, setExtraDays] = useState<number[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const maxCities = 5;
  React.useEffect(() => {
    if (tab === "multi") {
      setStart(from);
      setFirst(to);
      setExtra([]);
      setFirstDays(3);
      setExtraDays([]);
    }
  }, [tab, from, to]);
  const [extraFilter, setExtraFilter] = useState<string[]>([]);
  const [mapError, setMapError] = useState<boolean>(false);
  const label = from && to ? `Continue with ${from} → ${to}` : "Continue";
  const mLabel = start && first ? `Plan Multi‑city with ${start} → ${first}` : "Continue";
  const find = (name: string) => {
    const all = [...originCities, ...destCities];
    return all.find((c) => c.name === name);
  };
  const distKm = React.useMemo(() => {
    const seq = [start, ...extra, first].filter(Boolean);
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
  const MAP_W = 360, MAP_H = 140, MAP_PAD = 24;
  const countryBounds = React.useMemo(() => {
    const pool = destCities;
    if (!pool.length) return null as null | { minLat: number; maxLat: number; minLng: number; maxLng: number; minY: number; maxY: number };
    const lats = pool.map((c) => c.lat as number);
    const lngs = pool.map((c) => c.lng as number);
    let minLat = Math.min(...lats), maxLat = Math.max(...lats);
    let minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const padLat = 0.3, padLng = 0.3;
    if (minLat === maxLat) { minLat -= padLat; maxLat += padLat; }
    if (minLng === maxLng) { minLng -= padLng; maxLng += padLng; }
    const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
    const minY = merc(minLat), maxY = merc(maxLat);
    return { minLat, maxLat, minLng, maxLng, minY, maxY };
  }, [destCities]);
  const mapUrl = React.useMemo(() => {
    if (!countryBounds) return "";
    const w = MAP_W, h = MAP_H;
    const { minLng, minLat, maxLng, maxLat } = countryBounds;
    const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
    return `https://staticmap.openstreetmap.de/staticmap.php?bbox=${encodeURIComponent(bbox)}&size=${w}x${h}&format=png&scale=1&maptype=mapnik`;
  }, [countryBounds]);
  const tileImages = React.useMemo(() => {
    if (!countryBounds) return [];
    const W = MAP_W, H = MAP_H, P = MAP_PAD;
    const innerW = W - 2 * P, innerH = H - 2 * P;
    const zClamp = (z: number) => Math.max(3, Math.min(11, z));
    const lonToPx = (lng: number, z: number) => ((lng + 180) / 360) * 256 * Math.pow(2, z);
    const latToPy = (lat: number, z: number) => {
      const s = Math.sin((lat * Math.PI) / 180);
      const y = Math.log((1 + s) / (1 - s)) / 2; // sinh inverse approx for Mercator
      return (0.5 - y / (2 * Math.PI)) * 256 * Math.pow(2, z);
    };
    let z = 5;
    const widthAt = (z0: number) => Math.abs(lonToPx(countryBounds.maxLng, z0) - lonToPx(countryBounds.minLng, z0));
    const heightAt = (z0: number) => Math.abs(latToPy(countryBounds.maxLat, z0) - latToPy(countryBounds.minLat, z0));
    // Adjust zoom to keep tiles lightweight and fit inner box closely
    for (let i = 0; i < 10; i++) {
      const wpx = widthAt(z);
      const hpx = heightAt(z);
      if (wpx < innerW * 0.9 || hpx < innerH * 0.9) z = zClamp(z + 1);
      else if (wpx > innerW * 3.0 || hpx > innerH * 3.0) z = zClamp(z - 1);
      else break;
    }
    const pxMin = lonToPx(countryBounds.minLng, z);
    const pxMax = lonToPx(countryBounds.maxLng, z);
    const pyMin = latToPy(countryBounds.minLat, z);
    const pyMax = latToPy(countryBounds.maxLat, z);
    const x0 = Math.floor(pxMin / 256), x1 = Math.floor(pxMax / 256);
    const y0 = Math.floor(pyMin / 256), y1 = Math.floor(pyMax / 256);
    const scaleX = innerW / (pxMax - pxMin || 1);
    const scaleY = innerH / (pyMax - pyMin || 1);
    const tiles: { x: number; y: number; w: number; h: number; url: string }[] = [];
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        const tileLeftPx = x * 256;
        const tileTopPx = y * 256;
        const vx = (tileLeftPx - pxMin) * scaleX;
        const vy = (pyMax - tileTopPx - 256) * scaleY;
        const vw = 256 * scaleX;
        const vh = 256 * scaleY;
        const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
        tiles.push({ x: vx, y: vy, w: vw, h: vh, url });
      }
    }
    return tiles;
  }, [countryBounds]);
  const points = React.useMemo(() => {
    const seq = [start, ...extra, first].filter(Boolean);
    const cities = seq.map((n) => find(n)).filter(Boolean) as any[];
    if (cities.length < 2) return [];
    const W = MAP_W, H = MAP_H, P = MAP_PAD;
    const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
    const localBounds = (() => {
      if (countryBounds) return countryBounds;
      const lats = cities.map((c) => c.lat as number);
      const lngs = cities.map((c) => c.lng as number);
      let minLat = Math.min(...lats), maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
      const padLat = 0.3, padLng = 0.3;
      if (minLat === maxLat) { minLat -= padLat; maxLat += padLat; }
      if (minLng === maxLng) { minLng -= padLng; maxLng += padLng; }
      const minY = merc(minLat), maxY = merc(maxLat);
      return { minLat, maxLat, minLng, maxLng, minY, maxY };
    })();
    const xScale = (lng: number) => P + ((lng - localBounds.minLng) / ((localBounds.maxLng - localBounds.minLng) || 1)) * (W - 2 * P);
    const yScale = (lat: number) => {
      const y = merc(lat);
      return P + ((localBounds.maxY - y) / ((localBounds.maxY - localBounds.minY) || 1)) * (H - 2 * P);
    };
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    return cities.map((c) => {
      const x = clamp(xScale(c.lng as number), P, W - P);
      const y = clamp(yScale(c.lat as number), P, H - P);
      return { x, y, name: c.name };
    });
  }, [start, first, extra, originCities, destCities, countryBounds]);
  const countryPoints = React.useMemo(() => {
    const cities = destCities;
    if (!cities.length) return [];
    const lats = cities.map((c) => c.lat as number);
    const lngs = cities.map((c) => c.lng as number);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const W = MAP_W, H = 120, P = 16;
    const xScale = (lng: number) => P + ((lng - minLng) / (maxLng - minLng || 1)) * (W - 2 * P);
    const yScale = (lat: number) => P + ((maxLat - lat) / (maxLat - minLat || 1)) * (H - 2 * P);
    return cities.map((c) => ({ x: xScale(c.lng as number), y: yScale(c.lat as number), name: c.name }));
  }, [destCities]);
  const pathD = React.useMemo(() => {
    if (points.length < 2) return "";
    const mids = (a: { x: number; y: number }, b: { x: number; y: number }) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      if (i < points.length - 2) {
        const m = mids(p, q);
        d += ` Q ${p.x} ${p.y} ${m.x} ${m.y}`;
      } else {
        d += ` Q ${p.x} ${p.y} ${q.x} ${q.y}`;
      }
    }
    return d;
  }, [points]);
  // removed strip and compass views per request
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
              <select className="w-full border rounded p-2" value={from} onChange={(e) => setFrom(e.target.value)} title="Select your departure city">
                {originCities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.airport ? "✈️ " : ""}{c.name}{c.airport && c.airport.code ? ` (${c.airport.code})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1 text-green-700">Arrival</div>
              <select className="w-full border rounded p-2" value={to} onChange={(e) => setTo(e.target.value)} title="Select your arrival city">
                {destCities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.airport ? "✈️ " : ""}{c.name}{c.airport && c.airport.code ? ` (${c.airport.code})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => onContinue(from, to)}>{label}</button>
        </div>
      ) : (
        <div>
          <div className="font-semibold mb-1">Multi‑city Adventure 🌍</div>
          <div className="text-sm text-slate-700 mb-2">Your journey awaits — pick cities and stays ✨</div>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs mb-1 text-blue-700">🛫 Departure</div>
              <select className="w-full border rounded p-2" value={start} onChange={(e) => setStart(e.target.value)}>
                {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1 text-green-700">🛬 Arrival</div>
              <select className="w-full border rounded p-2" value={first} onChange={(e) => setFirst(e.target.value)}>
                {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <div className="text-xs mb-1">🕒 Stay (days)</div>
              <input className="w-full border rounded p-2" type="number" min={1} value={firstDays} onChange={(e) => setFirstDays(Number(e.target.value))} />
            </div>
          </div>
          {extra.map((city, idx) => (
            <div
              key={idx}
              className="mt-3"
              draggable
              onDragStart={() => setDragIndex(idx)}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => {
                if (dragIndex === null) return;
                const arr = extra.slice();
                const [m] = arr.splice(dragIndex, 1);
                arr.splice(idx, 0, m);
                setExtra(arr);
                const d = extraDays.slice();
                const [md] = d.splice(dragIndex, 1);
                d.splice(idx, 0, md);
                setExtraDays(d);
                const f = extraFilter.slice();
                const [mf] = f.splice(dragIndex, 1);
                f.splice(idx, 0, mf);
                setExtraFilter(f);
                setDragIndex(null);
              }}
            >
              <div className="text-xs mb-1">City {idx + 2}</div>
              <div className="flex items-center gap-2">
                <button className="btn btn-secondary" title="Drag to reorder" aria-label="Drag to reorder">⇅</button>
                <input
                  className="flex-1 border rounded p-2"
                  placeholder="Search & select city ✈️"
                  list={`city-suggest-${idx}`}
                  value={extraFilter[idx] ?? (city || "")}
                  onChange={(e) => {
                    const v = e.target.value;
                    setExtraFilter((arr) => {
                      const next = arr.slice();
                      next[idx] = v;
                      return next;
                    });
                    if (!v) {
                      setExtra((arr) => arr.map((x, i) => i === idx ? "" : x));
                      return;
                    }
                  }}
                  onBlur={() => {
                    const v = extraFilter[idx] ?? "";
                    const match = destCities.find((c) => c.name.toLowerCase() === v.toLowerCase());
                    if (match) {
                      setExtra((arr) => arr.map((x, i) => i === idx ? match.name : x));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const v = extraFilter[idx] ?? "";
                      const match = destCities.find((c) => c.name.toLowerCase().startsWith(v.toLowerCase()));
                      if (match) {
                        setExtra((arr) => arr.map((x, i) => i === idx ? match.name : x));
                        setExtraFilter((arr) => {
                          const next = arr.slice();
                          next[idx] = match.name;
                          return next;
                        });
                      }
                    }
                  }}
                  title="Search and select your next city"
                />
                <datalist id={`city-suggest-${idx}`}>
                  {destCities.map((c) => (
                    <option key={c.name} value={c.name} label={`${c.airport ? "✈️ " : ""}${c.name}${c.airport && c.airport.code ? ` (${c.airport.code})` : ""}`} />
                  ))}
                </datalist>
                <input
                  className="w-24 border rounded p-2"
                  type="number"
                  min={1}
                  value={extraDays[idx] ?? 3}
                  onChange={(e) => setExtraDays((arr) => {
                    const next = arr.slice();
                    next[idx] = Number(e.target.value);
                    return next;
                  })}
                  title="Stay days"
                />
                <button
                  className="btn btn-secondary"
                  title="Remove city"
                  aria-label="Remove city"
                  onClick={() => {
                    setExtra((arr) => arr.filter((_, i) => i !== idx));
                    setExtraDays((arr) => arr.filter((_, i) => i !== idx));
                    setExtraFilter((arr) => arr.filter((_, i) => i !== idx));
                  }}
                >
                  Remove
                </button>
              </div>
              {!city ? (<div className="text-xs text-slate-500 mt-1">Select your next city</div>) : <div className="text-xs text-slate-500 mt-1">Stay: {(extraDays[idx] ?? 3)} days</div>}
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <button
              className="btn btn-secondary"
              disabled={[start, ...extra, first].filter(Boolean).length >= maxCities}
              title={[start, ...extra, first].filter(Boolean).length >= maxCities ? "Max 5 cities reached — remove a city to add another" : "Add another city"}
              aria-disabled={[start, ...extra, first].filter(Boolean).length >= maxCities}
              onClick={() => {
                setExtra((arr) => arr.length < maxCities - 2 ? [...arr, ""] : arr);
                setExtraDays((arr) => arr.length < maxCities - 2 ? [...arr, 3] : arr);
                setExtraFilter((arr) => arr.length < maxCities - 2 ? [...arr, ""] : arr);
              }}
            >+ Add more cities ✨</button>
            <div className="text-sm text-slate-600">{[start, ...extra, first].filter(Boolean).length} / {maxCities} cities</div>
          </div>
          <div className="mt-3">
            <div className="route-dots">
              {[start, ...extra, first].filter(Boolean).map((c, i, arr) => (
                <React.Fragment key={`${c}-${i}`}>
                  <div className="route-dot" />
                  {i < arr.length - 1 ? <div className="route-line" /> : null}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[start, ...extra, first].filter(Boolean).map((c, i, arr) => {
                if (i >= arr.length - 1) return null;
                const a = arr[i]; const b = arr[i + 1];
                if (!a || !b || a === b) return null;
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
              <div className="meter"><div className="meter-fill" style={{ width: `${Math.min(100, (distKm / 3000) * 100)}%`, background: "linear-gradient(to right, #22c55e, #3b82f6)" }} /></div>
              <div className="text-sm mt-1">Total ground route: {distKm.toFixed(1)} km ({feet.toLocaleString()} ft)</div>
              <div className="text-sm text-slate-600">Total stay: {firstDays + extraDays.reduce((s, d) => s + (d || 0), 0)} days</div>
            </div>
            {points.length > 1 ? (
              <div className="mt-3">
                <div className="text-xs text-slate-500 mb-1">Compact route map</div>
                <svg viewBox="0 0 360 140" width="100%" height="140" className="rounded border border-slate-200 bg-white">
                  {countryBounds && tileImages.length > 0 ? (
                    <g transform={`translate(${MAP_PAD},${MAP_PAD})`}>
                      {tileImages.map((t, i) => (
                        <image
                          key={`tile-${i}`}
                          x={t.x}
                          y={t.y}
                          width={t.w}
                          height={t.h}
                          href={t.url}
                          xlinkHref={t.url}
                          preserveAspectRatio="none"
                          crossOrigin="anonymous"
                          opacity="0.95"
                        />
                      ))}
                    </g>
                  ) : (
                    <>
                      <defs>
                        <pattern id="fallbackGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="360" height="140" fill="url(#fallbackGrid)" />
                    </>
                  )}
                  <text x="8" y="136" fontSize="8" textAnchor="start" fill="#64748b">© OpenStreetMap contributors</text>
                  <defs>
                    <filter id="dotShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#0f172a" flood-opacity="0.18" />
                    </filter>
                    <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" flood-color="#1e3a8a" flood-opacity="0.18" />
                    </filter>
                    <marker id="arrowHead" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto">
                      <path d="M 0 1 L 6 4 L 0 7 L 2.2 4 z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="0.6" />
                    </marker>
                  </defs>
                  <text x="180" y="14" fontSize="10" textAnchor="middle" fill="#334155">N</text>
                  <text x="180" y="136" fontSize="10" textAnchor="middle" fill="#334155">S</text>
                  <text x="12" y="74" fontSize="10" textAnchor="start" fill="#334155">W</text>
                  <text x="348" y="74" fontSize="10" textAnchor="end" fill="#334155">E</text>
                  {pathD ? (
                    <>
                      <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#routeShadow)" markerMid="url(#arrowHead)" />
                    </>
                  ) : null}
                  {points.length > 1 ? (
                    <>
                      {points.map((p, i) => {
                        if (i >= points.length - 1) return null;
                        const q = points[i + 1];
                        const lerp = (t: number) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
                        return [0.25, 0.5, 0.75].map((t) => {
                          const m = lerp(t);
                          return (
                            <circle
                              key={`${i}-via-${t}`}
                              cx={m.x}
                              cy={m.y}
                              r="3"
                              fill="#2563eb"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              opacity="0.85"
                            />
                          );
                        });
                      })}
                    </>
                  ) : null}
                  {points.map((p, i) => (
                    <g key={`${p.name}-${i}`}>
                      <circle cx={p.x} cy={p.y} r="6" fill={i === 0 ? "#10b981" : (i === points.length - 1 ? "#ef4444" : "#2563eb")} stroke="#ffffff" strokeWidth="2" filter="url(#dotShadow)" />
                      {(() => {
                        const x = p.x < MAP_PAD ? p.x + 8 : (p.x > MAP_W - MAP_PAD ? p.x - 8 : p.x);
                        const y = p.y < MAP_PAD ? p.y + 12 : (p.y > MAP_H - MAP_PAD ? p.y - 12 : p.y - 8);
                        const anchor = p.x < MAP_PAD ? "start" : (p.x > MAP_W - MAP_PAD ? "end" : "middle");
                        const days = i === 0 ? "" : ` (${i === points.length - 1 ? firstDays : (extraDays[i - 1] ?? 3)}d)`;
                        return <text x={x} y={y} fontSize="10" textAnchor={anchor as any} fill="#334155">{p.name}{days}</text>;
                      })()}
                    </g>
                  ))}
                </svg>
              </div>
            ) : null}
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => onContinue(start, first)}>{mLabel}</button>
        </div>
      )}
    </div>
  );
}

export function UpsellBubble({ onFlights, onHotels, onInsurance, showInsurance, from, to }: { onFlights: () => void; onHotels: () => void; onInsurance: () => void; showInsurance: boolean; from?: string; to?: string }) {
  return (
    <div className="p-0 animate-in">
      <div className="rounded-xl overflow-hidden shadow ring-1 ring-blue-200">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="flex items-center gap-2">
            <span className="icon-square bg-white/20">🔥</span>
            <div className="text-lg font-bold">Exclusive TripOdin Offers</div>
          </div>
          {from && to ? (<div className="text-sm mt-1">{from} → {to}</div>) : null}
        </div>
        <div className="px-4 py-3 bg-blue-50">
          <div className="text-sm text-slate-700">Hand‑picked flight and hotel deals for your route</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn btn-primary" onClick={onFlights}>✈️ Book Flights</button>
            <button className="btn btn-secondary" onClick={onHotels}>🏨 Book Hotels</button>
            {showInsurance ? (<button className="btn btn-secondary" onClick={onInsurance}>🛡️ Travel Insurance</button>) : null}
          </div>
        </div>
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
