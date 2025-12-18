import React, { useMemo, useState } from "react";
import { getCities, distanceKm } from "./cityData";
import { isSameZone } from "./visaEngine";

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

export function SelectCitiesBubble({ originCountry, destCountry, onContinue }: { originCountry: string; destCountry: string; onContinue: (from: string, to: string, days: number, itinerary: string[], transportModes: Record<number, "flight" | "train" | "car">, tripType: "oneway" | "round" | "multicity") => void }) {
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
  const [finalCity, setFinalCity] = useState<string>("");
  const [returnStops, setReturnStops] = useState<string[]>([]);
  const [returnFilters, setReturnFilters] = useState<string[]>([]);
  const [planReturn, setPlanReturn] = useState<boolean>(false);
  const maxCities = 5;
  React.useEffect(() => {
    if (tab === "multi") {
      setStart(from);
      setFirst(to);
      setExtra([]);
      setFirstDays(3);
      setExtraDays([]);
      setFinalCity("");
      setReturnStops([]);
      setReturnFilters([]);
      setPlanReturn(false);
    }
  }, [tab, from, to]);
  const [extraFilter, setExtraFilter] = useState<string[]>([]);
  const [editingExtras, setEditingExtras] = useState<{[key: number]: boolean}>({});
  const [editingReturns, setEditingReturns] = useState<{[key: number]: boolean}>({});
  const [transportModes, setTransportModes] = useState<{[key: number]: "flight" | "train" | "car"}>({});
  const [mapError, setMapError] = useState<boolean>(false);
  const label = from && to ? `Continue with ${from} → ${to}` : "Continue";
  const mLabel = start && first ? `Plan Multi‑city with ${start} → ${first}` : "Continue";
  const names = React.useMemo(() => [start, first, ...extra].filter(Boolean), [start, first, extra]);
  const pairsRef = React.useRef<[string, string][]>([]);
  const find = (name: string) => {
    const all = [...originCities, ...destCities];
    return all.find((c) => c.name === name);
  };
  const getMode = (idx: number, from: string, to: string) => {
    if (transportModes[idx]) return transportModes[idx];
    const A = find(from);
    const B = find(to);
    if (!A || !B) return "flight";

    const countryA = originCities.some(c => c.name === A.name) ? originCountry : (destCities.some(c => c.name === A.name) ? destCountry : "");
    const countryB = originCities.some(c => c.name === B.name) ? originCountry : (destCities.some(c => c.name === B.name) ? destCountry : "");

    if (countryA && countryB && countryA === countryB) return "train"; // Internal default

    if (countryA && countryB && isSameZone(countryA, countryB)) {
        const d = distanceKm(A, B);
        // User feedback: Car is preferred for short trips (40-50% share vs 10% train)
        return d <= 800 ? "car" : "flight";
    }

    return "flight";
  };
  React.useEffect(() => {
    setTransportModes((prev) => {
      const next = { ...prev };
      delete next[0];
      return next;
    });
  }, [start, first]);
  React.useEffect(() => {
    const forward = names;
    const back = planReturn && finalCity ? (returnStops.length ? [finalCity, ...returnStops, finalCity, start] : [finalCity, start]) : [];
    const fullSeq = [...forward, ...back];
    const currPairs: [string, string][] = [];
    for (let i = 0; i < fullSeq.length - 1; i++) {
      const a = fullSeq[i];
      const b = fullSeq[i + 1];
      if (!a || !b) continue;
      currPairs.push([a, b]);
    }
    const prevPairs = pairsRef.current;
    if (!prevPairs.length) {
      pairsRef.current = currPairs;
      return;
    }
    setTransportModes((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        const idx = Number(k);
        const p = prevPairs[idx];
        const c = currPairs[idx];
        if (!c || !p || p[0] !== c[0] || p[1] !== c[1]) {
          delete next[idx];
        }
      });
      return next;
    });
    pairsRef.current = currPairs;
  }, [names, finalCity, returnStops, planReturn, start]);
  const distKm = React.useMemo(() => {
    const fIdx = finalCity ? names.findIndex((n) => n === finalCity) : -1;
    // Don't truncate forward path based on finalCity - allow the full route to be traversed
    // The finalCity just marks where the return flight departs from.
    const forward = names;
    // Calculate return path from finalCity back to start
    const back = planReturn && finalCity ? (returnStops.length ? [finalCity, ...returnStops, finalCity, start] : [finalCity, start]) : [];
    
    // Check if we need a ground connection from the last city of the forward route to the finalCity
    // (e.g. Berlin -> Paris -> Strasbourg -> (Ground) -> Paris -> (Flight) -> Berlin)
    const lastForward = forward[forward.length - 1];
    const bridge = (planReturn && finalCity && lastForward && lastForward !== finalCity) ? [lastForward, finalCity] : [];
    
    // We don't simply concat because we might double-count the bridge if we aren't careful, 
    // but distKm calculation iterates segments.
    // forward: A -> B -> C. bridge: C -> B. back: B -> A.
    // Sequence: A, B, C, B, A. 
    // Segments: A->B, B->C, C->B, B->A.
    // This looks correct.
    const seq = [...forward];
    if (bridge.length) seq.push(finalCity);
    if (back.length) seq.push(...back.slice(1)); // avoid duplicating finalCity if bridge added it, or if forward ended with it
    // Wait, let's be precise.
    // If forward ends in C. finalCity is B.
    // We want path A->B->C -> B -> A.
    // forward is A,B,C.
    // We need to add B, then A.
    // back is B, A.
    // So [...forward, ...back] gives A,B,C,B,A.
    // This works automatically!
    // But what if forward ends in B?
    // forward: A, B. finalCity: B. back: B, A.
    // [...forward, ...back] -> A, B, B, A.
    // Loop sees A->B, B->B (skip), B->A.
    // Works.
    
    const fullSeq = [...forward, ...back];
    
    if (fullSeq.length < 2) return 0;
    const R = 6371;
    const toRad = (d: number) => (d * Math.PI) / 180;
    let sum = 0;
    for (let i = 0; i < fullSeq.length - 1; i++) {
      const a = find(fullSeq[i]);
      const b = find(fullSeq[i + 1]);
      if (!a || !b || a.name === b.name) continue;
      const dLat = toRad((b.lat as number) - (a.lat as number));
      const dLon = toRad((b.lng as number) - (a.lng as number));
      const lat1 = toRad(a.lat as number);
      const lat2 = toRad(b.lat as number);
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      sum += 2 * R * Math.asin(Math.sqrt(h));
    }
    return sum;
  }, [names, finalCity, returnStops, planReturn]);
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
    const seq = [...names];
    if (planReturn && finalCity) {
      const lastForward = seq[seq.length - 1];
      if (finalCity !== lastForward) {
        seq.push(finalCity);
      }
      if (returnStops.length) {
        seq.push(...returnStops);
      }
      seq.push(start);
    }
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
  }, [names, originCities, destCities, countryBounds, planReturn, finalCity, returnStops, start]);
  const routeSegments = React.useMemo(() => {
     if (points.length < 2) return [];
     
     const segs: { d: string; mode: "flight" | "train" | "car"; mx: number; my: number; angle: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      const mode = getMode(i, p.name, q.name);

      const mx = (p.x + q.x) / 2;
       const my = (p.y + q.y) / 2;
       const dx = q.x - p.x;
       const dy = q.y - p.y;
       const dist = Math.sqrt(dx * dx + dy * dy);
       
       // Flight gets more arc, ground/train gets less
       const offset = mode === "flight" ? Math.max(20, dist * 0.15) : 0; 
       
       const nx = -dy / dist;
       const ny = dx / dist;
       const cx = mx + nx * offset;
       const cy = my + ny * offset;
       
       const d = offset === 0 
         ? `M ${p.x} ${p.y} L ${q.x} ${q.y}` 
         : `M ${p.x} ${p.y} Q ${cx} ${cy} ${q.x} ${q.y}`;
       
       // Icon position
       let x, y, angle;
       if (offset === 0) {
         x = mx;
         y = my;
         angle = Math.atan2(dy, dx) * 180 / Math.PI;
       } else {
         const t = 0.5;
         x = (1 - t) * (1 - t) * p.x + 2 * (1 - t) * t * cx + t * t * q.x;
         y = (1 - t) * (1 - t) * p.y + 2 * (1 - t) * t * cy + t * t * q.y;
         const tx = 2 * (1 - t) * (cx - p.x) + 2 * t * (q.x - cx);
         const ty = 2 * (1 - t) * (cy - p.y) + 2 * t * (q.y - cy);
         angle = Math.atan2(ty, tx) * 180 / Math.PI;
       }
 
       segs.push({ d, mode, mx: x, my: y, angle });
     }
     return segs;
   }, [points, transportModes]);
  // returnD and returnSegs removed as routeSegments now covers full path

  // removed strip and compass views per request
  const feet = Math.round(distKm * 1000 * 3.28084);
  React.useEffect(() => {
    // If auto-final logic is desired, use `names`
    // Skip start city
    const seq = names.slice(1);
    if (!seq.length || !planReturn) { setFinalCity(""); setReturnStops([]); setReturnFilters([]); return; }
    
    // Existing logic was using prev/last of seq
    const prev = seq.length > 1 ? seq[seq.length - 2] : "";
    const last = seq[seq.length - 1];
    const A = find(prev || last);
    const B = find(last);
    const O = find(start);
    const hubSet = new Set(["FRA","LHR","CDG","MAD","BCN","DXB","AUH","BER","MUC","ORD","JFK","LAX","YYZ","YVR","SYD","MEL","SIN","FCO","MXP"]);
    const d = (X?: any, Y?: any) => {
      if (!X || !Y || !X.lat || !X.lng || !Y.lat || !Y.lng) return 0;
      const toRad = (x: number) => (x * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad((Y.lat as number) - (X.lat as number));
      const dLon = toRad((Y.lng as number) - (X.lng as number));
      const lat1 = toRad(X.lat as number);
      const lat2 = toRad(Y.lat as number);
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(h));
    };
    const outward = d(O, B) >= d(O, A);
    if (outward) {
      setFinalCity(last);
    } else {
      const codePrev = (A?.airport?.code || "").toUpperCase();
      const codeLast = (B?.airport?.code || "").toUpperCase();
      if (hubSet.has(codeLast) && !hubSet.has(codePrev)) {
        setFinalCity(last);
      } else if (hubSet.has(codePrev) && !hubSet.has(codeLast)) {
        setFinalCity(prev);
      } else {
        setFinalCity(d(O, B) <= d(O, A) ? last : prev || last);
      }
    }
  }, [names, start, planReturn]);
  const TransportSelector = ({ idx, from, to }: { idx: number; from: string; to: string }) => {
    const mode = getMode(idx, from, to);
    const A = find(from);
    const B = find(to);
    
    // Check recommendation
    let isCarRec = false;
    let recText = "";
    if (A && B) {
        const countryA = originCities.some(c => c.name === A.name) ? originCountry : (destCities.some(c => c.name === A.name) ? destCountry : "");
        const countryB = originCities.some(c => c.name === B.name) ? originCountry : (destCities.some(c => c.name === B.name) ? destCountry : "");
        
        // Check if internal (same country) or same zone
        const isInternal = countryA === countryB;
        const isZone = countryA && countryB && isSameZone(countryA, countryB);
        
        if (isInternal || isZone) {
             const d = distanceKm(A, B);
             if (d <= 800) {
                 isCarRec = true;
                 recText = isInternal 
                    ? "Short distance: Car/Train recommended" 
                    : "Visa-free zone: Car/Train recommended";
             }
        }
    }

    return (
      <div className="flex flex-col items-end">
        <div className="flex bg-slate-100 rounded p-1 gap-1 shrink-0 relative">
          <button
            className={`p-1 rounded text-xs ${mode === "flight" ? "bg-white shadow text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            onClick={() => setTransportModes((prev) => ({ ...prev, [idx]: "flight" }))}
            title="Travel by Flight"
          >✈️</button>
          <button
            className={`p-1 rounded text-xs ${mode === "train" ? "bg-white shadow text-amber-600" : "text-slate-400 hover:text-slate-600"}`}
            onClick={() => setTransportModes((prev) => ({ ...prev, [idx]: "train" }))}
            title="Travel by Train"
          >🚆</button>
          <button
            className={`p-1 rounded text-xs ${mode === "car" ? "bg-white shadow text-blue-800" : "text-slate-400 hover:text-slate-600"}`}
            onClick={() => setTransportModes((prev) => ({ ...prev, [idx]: "car" }))}
            title={isCarRec ? "Recommended: Convenient & Visa-free" : "Travel by Car"}
          >
             🚗
             {isCarRec && mode !== "car" && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </button>
        </div>
        {isCarRec && (
            <div className="text-[10px] text-green-700 font-medium mt-1 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 text-right leading-tight max-w-[120px]">
                {recText}
            </div>
        )}
      </div>
    );
  };

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
          <button className="btn btn-primary btn-lg mt-3" onClick={() => onContinue(from, to, 3, [from, to], {}, "oneway")}>{label}</button>
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
              <div className="flex items-center gap-2">
                <select className="flex-1 border rounded p-2" value={first} onChange={(e) => setFirst(e.target.value)}>
                  {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                </select>
                <TransportSelector idx={0} from={start} to={first} />
                {planReturn && finalCity !== first ? (
                  <button className="pill" onClick={() => { setFinalCity(first); setReturnStops([]); setReturnFilters([]); }}>Mark as Final</button>
                ) : null}
              </div>
              {finalCity === first ? (<div className="text-xs text-blue-700 mt-1">Final</div>) : null}
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
                {city && !editingExtras[idx] ? (
                  <div
                    className="flex-1 border rounded p-2 bg-blue-50 text-blue-900 cursor-pointer flex items-center justify-between group"
                    onClick={() => setEditingExtras((prev) => ({ ...prev, [idx]: true }))}
                    title="Click to edit city"
                  >
                    <span className="font-medium">{city}</span>
                    <span className="text-xs text-blue-400 group-hover:text-blue-600">✎ Edit</span>
                  </div>
                ) : (
                  <input
                    autoFocus={!!editingExtras[idx]}
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
                      const exact = destCities.find((c) => c.name.toLowerCase() === v.toLowerCase());
                      if (exact) {
                        setExtra((arr) => arr.map((x, i) => i === idx ? exact.name : x));
                        setEditingExtras((prev) => ({ ...prev, [idx]: false }));
                        return;
                      }
                      const matches = destCities.filter((c) => c.name.toLowerCase().startsWith(v.toLowerCase()));
                      if (v.length >= 2 && matches.length === 1) {
                        setExtra((arr) => arr.map((x, i) => i === idx ? matches[0].name : x));
                        setExtraFilter((arr) => {
                          const next = arr.slice();
                          next[idx] = matches[0].name;
                          return next;
                        });
                        setEditingExtras((prev) => ({ ...prev, [idx]: false }));
                        return;
                      }
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
                        setEditingExtras((prev) => ({ ...prev, [idx]: false }));
                      } else if (city) {
                        // Revert to previously selected city if current input is invalid
                        setEditingExtras((prev) => ({ ...prev, [idx]: false }));
                        // Also restore the filter text to match the city
                        setExtraFilter((arr) => {
                          const next = arr.slice();
                          next[idx] = city;
                          return next;
                        });
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
                          setEditingExtras((prev) => ({ ...prev, [idx]: false }));
                        }
                      }
                    }}
                    title="Search and select your next city"
                  />
                )}
                <datalist id={`city-suggest-${idx}`}>
                  {destCities.map((c) => (
                    <option key={c.name} value={c.name} label={`${c.airport ? "✈️ " : ""}${c.name}${c.airport && c.airport.code ? ` (${c.airport.code})` : ""}`} />
                  ))}
                </datalist>
                <TransportSelector idx={idx + 1} from={idx === 0 ? first : extra[idx - 1]} to={city} />
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
                {finalCity && finalCity === (city || "") ? (
                  <span className="pill pill-blue">Final</span>
                ) : planReturn ? (
                  <button
                    className="pill"
                    onClick={() => { if (city) { setFinalCity(city); setReturnStops([]); setReturnFilters([]); } }}
                    title="Mark this city as final"
                  >
                    Final
                  </button>
                ) : null}
                <button
                  className="pill"
                  onClick={() => {
                    if (city) {
                      setReturnStops((arr) => [...arr, city]);
                      setReturnFilters((arr) => [...arr, city]);
                      setExtra((arr) => arr.filter((_, i) => i !== idx));
                      setExtraDays((arr) => arr.filter((_, i) => i !== idx));
                      setExtraFilter((arr) => arr.filter((_, i) => i !== idx));
                    }
                  }}
                  title="Mark this city as a return stop"
                >
                  Return
                </button>
                <button
                  className="btn btn-secondary"
                  title="Remove city"
                  aria-label="Remove city"
                  onClick={() => {
                    setExtra((arr) => arr.filter((_, i) => i !== idx));
                    setExtraDays((arr) => arr.filter((_, i) => i !== idx));
                    setExtraFilter((arr) => arr.filter((_, i) => i !== idx));
                    if (finalCity && finalCity === city) { setFinalCity(""); setReturnStops([]); setReturnFilters([]); }
                    setReturnStops((arr) => arr.filter((s) => s !== city));
                    setReturnFilters((arr) => arr.filter((s) => s !== city));
                  }}
                >
                  Remove
                </button>
              </div>
              {!city ? (<div className="text-xs text-slate-500 mt-1">Select your next city</div>) : <div className="text-xs text-slate-500 mt-1">Stay: {(extraDays[idx] ?? 3)} days</div>}
              {finalCity && finalCity === city ? (<div className="text-xs text-blue-700 mt-1">Final</div>) : null}
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
            {planReturn ? (
              <button
                className="btn btn-secondary"
                title={finalCity ? "Add a stop on the return route" : "Choose a Final city first"}
                disabled={!finalCity}
                aria-disabled={!finalCity}
                onClick={() => {
                  if (!finalCity) return;
                  setReturnStops((arr) => [...arr, ""]);
                  setReturnFilters((arr) => [...arr, ""]);
                }}
              >+ Add return stop ↩︎</button>
            ) : null}
            <button
              className={`pill ${planReturn ? "pill-blue" : ""}`}
              onClick={() => {
                if (planReturn) {
                  setPlanReturn(false);
                  setFinalCity("");
                  setReturnStops([]);
                  setReturnFilters([]);
                } else {
                  setPlanReturn(true);
                }
              }}
              title={planReturn ? "Disable return planning" : "Enable return planning"}
            >
              {planReturn ? "Return planned" : "Plan return"}
            </button>
            <div className="text-sm text-slate-600">{[start, ...extra, first].filter(Boolean).length} / {maxCities} cities</div>
          </div>
          {returnStops.map((city, idx) => {
            const hasBridge = planReturn && finalCity && finalCity !== names[names.length - 1];
            const baseIdx = names.length - 1 + (hasBridge ? 1 : 0);
            const transportIdx = baseIdx + idx;
            return (
            <div key={`ret-${idx}`} className="mt-3">
              <div className="text-xs mb-1">Return stop {idx + 1}</div>
              <div className="flex items-center gap-2">
                {city && !editingReturns[idx] ? (
                  <div
                    className="flex-1 border rounded p-2 bg-blue-50 text-blue-900 cursor-pointer flex items-center justify-between group"
                    onClick={() => setEditingReturns((prev) => ({ ...prev, [idx]: true }))}
                    title="Click to edit stop"
                  >
                    <span className="font-medium">{city}</span>
                    <span className="text-xs text-blue-400 group-hover:text-blue-600">✎ Edit</span>
                  </div>
                ) : (
                  <input
                    autoFocus={!!editingReturns[idx]}
                    className="flex-1 border rounded p-2"
                    placeholder="Search & select return stop"
                    list={`ret-suggest-${idx}`}
                    value={returnFilters[idx] ?? (city || "")}
                    onChange={(e) => {
                      const v = e.target.value;
                      setReturnFilters((arr) => {
                        const next = arr.slice();
                        next[idx] = v;
                        return next;
                      });
                      const exact = destCities.find((c) => c.name.toLowerCase() === v.toLowerCase());
                      if (exact) {
                        setReturnStops((arr) => arr.map((x, i) => i === idx ? exact.name : x));
                        setEditingReturns((prev) => ({ ...prev, [idx]: false }));
                        return;
                      }
                      const matches = destCities.filter((c) => c.name.toLowerCase().startsWith(v.toLowerCase()));
                      if (v.length >= 2 && matches.length === 1) {
                        setReturnStops((arr) => arr.map((x, i) => i === idx ? matches[0].name : x));
                        setReturnFilters((arr) => {
                          const next = arr.slice();
                          next[idx] = matches[0].name;
                          return next;
                        });
                        setEditingReturns((prev) => ({ ...prev, [idx]: false }));
                        return;
                      }
                      if (!v) {
                        setReturnStops((arr) => arr.map((x, i) => i === idx ? "" : x));
                      }
                    }}
                    onBlur={() => {
                      const v = returnFilters[idx] ?? "";
                      const match = destCities.find((c) => c.name.toLowerCase() === v.toLowerCase());
                      if (match) {
                        setReturnStops((arr) => arr.map((x, i) => i === idx ? match.name : x));
                        setEditingReturns((prev) => ({ ...prev, [idx]: false }));
                      } else if (city) {
                        setEditingReturns((prev) => ({ ...prev, [idx]: false }));
                        setReturnFilters((arr) => {
                          const next = arr.slice();
                          next[idx] = city;
                          return next;
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const v = returnFilters[idx] ?? "";
                        const match = destCities.find((c) => c.name.toLowerCase().startsWith(v.toLowerCase()));
                        if (match) {
                          setReturnStops((arr) => arr.map((x, i) => i === idx ? match.name : x));
                          setReturnFilters((arr) => {
                            const next = arr.slice();
                            next[idx] = match.name;
                            return next;
                          });
                          setEditingReturns((prev) => ({ ...prev, [idx]: false }));
                        }
                      }
                    }}
                    title="Search and select your return stop"
                  />
                )}
                <TransportSelector idx={transportIdx} from={idx === 0 ? finalCity : returnStops[idx - 1]} to={city} />
                <button
                  className="btn btn-secondary"
                  title="Remove stop"
                  aria-label="Remove stop"
                  onClick={() => {
                    setReturnStops((arr) => arr.filter((_, i) => i !== idx));
                    setReturnFilters((arr) => arr.filter((_, i) => i !== idx));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );})}
          <div className="mt-3">
            <div className="route-dots">
              {points.map((p, i) => (
                <React.Fragment key={`${p.name}-${i}`}>
                  <div className="route-dot" />
                  {i < points.length - 1 ? <div className="route-line" /> : null}
                </React.Fragment>
              ))}
            </div>
             <div className="mt-2 flex flex-wrap gap-2">
              {points.map((p, i) => {
                if (i >= points.length - 1) return null;
                const q = points[i + 1];
                const A = find(p.name); const B = find(q.name);
                let km = 0; if (A && B) {
                  const R = 6371; const toRad = (d: number) => (d * Math.PI) / 180;
                  const dLat = toRad((B.lat as number) - (A.lat as number));
                  const dLon = toRad((B.lng as number) - (A.lng as number));
                  const lat1 = toRad(A.lat as number); const lat2 = toRad(B.lat as number);
                  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
                  km = 2 * R * Math.asin(Math.sqrt(h));
                }
                
                const isInternal = destCities.some(c => c.name === p.name) && destCities.some(c => c.name === q.name);
                const mode = getMode(i, p.name, q.name);
                const icon = mode === "flight" ? "✈️" : (mode === "train" ? "🚆" : "🚗");
                
                return (
                  <span key={`${p.name}-${q.name}-${i}`} className="route-chip">
                    {icon} {p.name} → {q.name} · {km.toFixed(1)} km
                  </span>
                );
              })}
            </div>
            <div className="mt-3">
              <div className="meter"><div className="meter-fill" style={{ width: `${Math.min(100, (distKm / 3000) * 100)}%`, background: "linear-gradient(to right, #22c55e, #3b82f6)" }} /></div>
              <div className="text-sm mt-1">Total ground route: {distKm.toFixed(1)} km ({feet.toLocaleString()} ft)</div>
              <div className="text-sm text-slate-600">Total stay: {firstDays + extraDays.reduce((s, d) => s + (d || 0), 0)} days</div>
              {planReturn && finalCity ? (
                <div className="text-sm text-slate-700 mt-1">
                  {(() => {
                    const forwardArr = [start, ...extra, first].filter(Boolean);
                    const idx = forwardArr.findIndex((n) => n === finalCity);
                    const forward = idx >= 0 ? forwardArr.slice(0, idx + 1) : forwardArr;
                    const back = returnStops.length ? [...returnStops, finalCity, start] : [start];
                    const deduced = [...forward, ...back];
                    const compressed = deduced.filter((n, i, arr) => i === 0 || n !== arr[i - 1]);
                    return <>Deduced itinerary: {compressed.join(" → ")}</>;
                  })()}
                </div>
              ) : null}
              {planReturn && finalCity ? (
                <div className="text-sm text-blue-700 mt-1">
                  Return flight planned: {finalCity} → {start}{finalCity !== first ? " · You’ll return from a different city" : ""}
                </div>
              ) : (
                <div className="text-sm text-slate-600 mt-1">Enable “Plan return” to add a return flight</div>
              )}
              {(() => {
                const selectedDestCities = [first, ...extra].filter(Boolean);
                const uniqueCount = new Set(selectedDestCities.map((n) => n.toLowerCase())).size;
                if (uniqueCount >= 2) {
                  return (
                    <div className="card p-3 mt-2">
                      <div className="text-sm">Multiple cities in {destCountry} detected — consider local transit</div>
                      <div className="mt-2 flex gap-2">
                        <button className="btn btn-secondary" onClick={() => window.open(`https://www.google.com/search?q=train+schedules+in+${destCountry}`, '_blank')}>See train schedules</button>
                        <button className="btn btn-secondary" onClick={() => window.open(`https://www.google.com/search?q=rent+a+car+in+${destCountry}`, '_blank')}>Rent a car</button>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
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
                     <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#0f172a" floodOpacity="0.18" />
                   </filter>
                   <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
                     <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" floodColor="#1e3a8a" floodOpacity="0.18" />
                   </filter>
                   <marker id="arrowHead" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto">
                     <path d="M 0 1 L 6 4 L 0 7 L 2.2 4 z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="0.6" />
                   </marker>
                   <marker id="arrowHeadRed" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto">
                     <path d="M 0 1 L 6 4 L 0 7 L 2.2 4 z" fill="#ef4444" stroke="#ffffff" strokeWidth="0.6" />
                   </marker>
                   <symbol id="planeIcon" viewBox="0 0 24 24">
                     <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                   </symbol>
                   <symbol id="carIcon" viewBox="0 0 24 24">
                     <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                   </symbol>
                   <symbol id="trainIcon" viewBox="0 0 24 24">
                     <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm5.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6h-5V6h5v5z" fill="currentColor"/>
                   </symbol>
                 </defs>
                  <text x="180" y="14" fontSize="10" textAnchor="middle" fill="#334155">N</text>
                  <text x="180" y="136" fontSize="10" textAnchor="middle" fill="#334155">S</text>
                  <text x="12" y="74" fontSize="10" textAnchor="start" fill="#334155">W</text>
                  <text x="348" y="74" fontSize="10" textAnchor="end" fill="#334155">E</text>
                  {routeSegments.map((seg, i) => (
                    <g key={`seg-${i}`}>
                      <path
                        d={seg.d}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={seg.d}
                        fill="none"
                        stroke={seg.mode === "flight" ? "#3b82f6" : (seg.mode === "train" ? "#eab308" : "#2563eb")}
                        strokeWidth={seg.mode === "flight" ? 4 : 6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={seg.mode === "flight" ? "6 4" : (seg.mode === "train" ? "8 2" : "none")}
                        filter="url(#routeShadow)"
                      />
                      <use
                        href={seg.mode === "flight" ? "#planeIcon" : (seg.mode === "train" ? "#trainIcon" : "#carIcon")}
                        x={seg.mx - 12}
                        y={seg.my - 12}
                        width="24"
                        height="24"
                        fill={seg.mode === "flight" ? "#1d4ed8" : (seg.mode === "train" ? "#ca8a04" : "#1e40af")}
                        transform={seg.mode === "flight" ? `rotate(${seg.angle + 90}, ${seg.mx}, ${seg.my})` : ""}
                      />
                    </g>
                  ))}
                  {/* Return paths are now handled by routeSegments */}


                  {points.map((p, i) => (
                    <g key={`dot-${i}`}>
                      <circle cx={p.x} cy={p.y} r="5" fill={i === 0 ? "#10b981" : (i === points.length - 1 ? "#ef4444" : "#2563eb")} stroke="#ffffff" strokeWidth="2" filter="url(#dotShadow)" />
                    </g>
                  ))}
                  {(() => {
                    // Dedup labels by name
                    const uniqueLabels = new Map<string, { x: number; y: number; name: string; label: string; idx: number }>();
                    points.forEach((p, i) => {
                      let days = "";
                      // Logic: Match city name to its duration
                      if (p.name === first) days = ` (${firstDays}d)`;
                      else {
                         const exIdx = extra.indexOf(p.name);
                         if (exIdx >= 0) days = ` (${extraDays[exIdx] ?? 3}d)`;
                      }
                      if (p.name === start) days = ""; // Start never has days
                      
                      const label = `${p.name}${days}`;
                      
                      if (!uniqueLabels.has(p.name) || (days !== "" && !uniqueLabels.get(p.name)?.label.includes("d)"))) {
                        uniqueLabels.set(p.name, { x: p.x, y: p.y, name: p.name, label, idx: i });
                      }
                    });

                    return Array.from(uniqueLabels.values()).map((item) => {
                      const { x, y, name, label, idx } = item;
                      
                      // Smart positioning to avoid overlap with lines
                      let dx = 0; let dy = -12;
                      let anchor = "middle";
                      
                      const prev = points[idx - 1];
                      const next = points[idx + 1];
                      
                      let vx = 0; let vy = 0;
                      
                      if (prev) {
                        vx += (prev.x - x);
                        vy += (prev.y - y);
                      }
                      if (next) {
                        vx += (next.x - x);
                        vy += (next.y - y);
                      }
                      
                      // Normalize
                      const len = Math.sqrt(vx*vx + vy*vy);
                      if (len > 0.1) {
                        vx /= len; vy /= len;
                      } else {
                        // Default up if isolated or zero vector
                        vx = 0; vy = 1; // Points down relative to node, so -vy is up
                      }
                      
                      // Invert to point away from the "average neighbor direction"
                      let dirX = -vx; let dirY = -vy;
                      
                      // Push out by fixed distance
                      const dist = 16;
                      dx = dirX * dist;
                      dy = dirY * dist;
                      
                      // Refine anchor based on direction
                      if (dirX > 0.3) anchor = "start";
                      else if (dirX < -0.3) anchor = "end";
                      
                      // Clamp to map edges
                      if (x + dx < 10) { dx = 10 - x; anchor = "start"; }
                      else if (x + dx > 350) { dx = 350 - x; anchor = "end"; }
                      
                      if (y + dy < 15) { dy = 15 - y; }
                      else if (y + dy > 130) { dy = 130 - y; }
                      
                      return (
                        <g key={`lbl-${name}`}>
                           <text x={x + dx} y={y + dy} fontSize="11" fontWeight="600" textAnchor={anchor as any} stroke="white" strokeWidth="4" strokeLinejoin="round" fill="none" opacity="0.8">{label}</text>
                           <text x={x + dx} y={y + dy} fontSize="11" fontWeight="600" textAnchor={anchor as any} fill="#0f172a">{label}</text>
                        </g>
                      );
                    });
                  })()}
                </svg>
              </div>
            ) : null}
            {planReturn ? (
              <div className="mt-3">
                <div className="card p-3">
                  <div className="flex items-center gap-2">
                    {(finalCity && finalCity !== first) ? (<span className="pill pill-blue">Open‑jaw</span>) : (<span className="pill">Round‑trip</span>)}
                    <div className="text-sm font-medium">Ticket Preview</div>
                  </div>
                  <div className="text-sm mt-1">Outbound: {start || "—"} → {first || "—"}</div>
                  <div className="text-sm">Return: {finalCity || "—"} → {start || "—"}</div>
                </div>
              </div>
            ) : null}
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => {
            const totalDays = firstDays + extraDays.reduce((s, d) => s + (d || 0), 0);
            const itinerary = points.map((p) => p.name);
            const finalModes: { [key: number]: "flight" | "train" | "car" } = {};
            for (let i = 0; i < points.length - 1; i++) {
              if (transportModes[i]) {
                finalModes[i] = transportModes[i];
              } else {
                 const p = points[i]; const q = points[i+1];
                 finalModes[i] = getMode(i, p.name, q.name);
              }
            }
            onContinue(start, first, totalDays, itinerary, finalModes, planReturn ? "round" : "oneway");
          }}>
            {planReturn ? (
              <>Plan Round Trip with {start} ⇄ {first}</>
            ) : (
              <>Plan One-way with {start} → {first}</>
            )}
          </button>
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
