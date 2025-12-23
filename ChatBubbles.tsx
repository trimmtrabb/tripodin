import React, { useMemo, useState, useRef, useEffect } from "react";
import { getCities, distanceKm } from "./cityData";
import { isSameZone } from "./visaEngine";

export function NoVisaBubble() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-in flex items-start gap-4 shadow-sm mt-4">
      <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 grid place-items-center text-2xl shrink-0">
        🎉
      </div>
      <div>
        <div className="text-lg font-bold text-green-900 mb-1">Great news! You can travel visa‑free.</div>
        <div className="text-green-800 leading-relaxed">
          Based on your nationality, you do not need a visa for this trip. You can proceed directly to planning your itinerary.
        </div>
      </div>
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const label = from && to ? `Continue with ${from} → ${to}` : "Continue";
  const mLabel = start && first ? `Plan Multi‑city with ${start} → ${first}` : "Continue";
  const names = React.useMemo(() => [start, first, ...extra].filter(Boolean), [start, first, extra]);
  const pairsRef = React.useRef<[string, string][]>([]);
  const addCityBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    addCityBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [extra.length]);
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
     
     const segs: { d: string; mode: "flight" | "train" | "car"; mx: number; my: number; angle: number; dir: "forward" | "return" }[] = [];
    const forwardCount = Math.max(0, names.length - 1);
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      const mode = getMode(i, p.name, q.name);
      const dir: "forward" | "return" = i < forwardCount ? "forward" : "return";

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
 
       segs.push({ d, mode, mx: x, my: y, angle, dir });
     }
     return segs;
   }, [points, transportModes, names]);
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
      <div className="flex flex-col items-center">
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
            <div className="text-[10px] text-green-700 font-medium mt-1 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 text-center leading-tight max-w-[120px]">
                {recText}
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 shadow-lg animate-in mt-4">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl grid place-items-center text-white text-xl shadow-blue-200 shadow-lg">🏙️</div>
            <h2 className="text-xl font-bold text-blue-900">Select Your Cities</h2>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
             <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === "direct" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTab("direct")}>Direct Trip</button>
             <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === "multi" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTab("multi")}>Multi‑city</button>
        </div>
      </div>

      {tab === "direct" ? (
        <div>
          <div className="text-slate-600 mb-4 font-medium">Please select your departure and arrival cities:</div>
          
          <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-6">
            {/* Departure */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
                 <span className="text-xs font-bold text-blue-900 tracking-wider uppercase">DEPARTURE:</span>
              </div>
              <div className="text-sm text-slate-500 mb-2">Select your departure city in {originCountry}</div>
              <div className="relative">
                <select 
                    className="w-full bg-blue-50/50 border border-blue-100 text-slate-800 rounded-lg p-3 pr-8 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none font-medium" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)}
                >
                    {originCities.map((c) => (
                    <option key={c.name} value={c.name}>
                        {c.name}{c.airport && c.airport.code ? ` (${c.airport.code})` : ""}
                    </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">▼</div>
              </div>
            </div>

            {/* Arrival */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                 <span className="text-xs font-bold text-green-900 tracking-wider uppercase">ARRIVAL:</span>
              </div>
              <div className="text-sm text-slate-500 mb-2">Select your destination city in {destCountry}</div>
              <div className="relative">
                <select 
                    className="w-full bg-green-50/50 border border-green-100 text-slate-800 rounded-lg p-3 pr-8 outline-none focus:ring-2 focus:ring-green-500 transition-shadow appearance-none font-medium" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)}
                >
                    {destCities.map((c) => (
                    <option key={c.name} value={c.name}>
                        {c.name}{c.airport && c.airport.code ? ` (${c.airport.code})` : ""}
                    </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none">▼</div>
              </div>
            </div>
          </div>

          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 text-lg" 
            onClick={() => onContinue(from, to, 3, [from, to], {}, "oneway")}
          >
            <span>Continue with {from} → {to}</span>
            <span>→</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col max-h-[70vh]">
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="font-semibold mb-1">Multi‑city Adventure 🌍</div>
          <div className="text-sm text-slate-700 mb-2">Your journey awaits — pick cities and stays ✨</div>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
                 <span className="text-xs font-bold text-blue-900 tracking-wider uppercase">DEPARTURE:</span>
              </div>
              <div className="relative">
                <select 
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-lg font-medium text-slate-700"
                  value={start} 
                  onChange={(e) => setStart(e.target.value)}
                >
                  {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                 <span className="text-xs font-bold text-green-900 tracking-wider uppercase">ARRIVAL:</span>
              </div>
              <div className="relative mb-2">
                 <select 
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-green-500 outline-none transition-all shadow-sm text-lg font-medium text-slate-700"
                  value={first} 
                  onChange={(e) => setFirst(e.target.value)}
                >
                  {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>
              
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                   <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Transport</span>
                   <TransportSelector idx={0} from={start} to={first} />
                </div>
                <div>
                   <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mr-2">Stay</span>
                   <input 
                      className="w-16 border rounded p-1 text-center text-sm font-semibold" 
                      type="number" 
                      min={1} 
                      value={firstDays} 
                      onChange={(e) => setFirstDays(Number(e.target.value))} 
                   />
                   <span className="text-xs text-slate-400 ml-1">days</span>
                </div>
              </div>
              
              {planReturn && finalCity !== first ? (
                 <div className="mt-2 text-right">
                    <button className="text-xs text-blue-600 hover:underline" onClick={() => { setFinalCity(first); setReturnStops([]); setReturnFilters([]); }}>Mark as Final Return City</button>
                 </div>
               ) : null}
               {finalCity === first ? (<div className="text-xs text-blue-700 mt-1 font-medium text-right">✓ Marked as Final City</div>) : null}
            </div>
          </div>
          <div className="mt-2 mb-4 flex flex-wrap gap-2 items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <button
              ref={addCityBtnRef}
              className="btn btn-secondary shadow-sm hover:shadow-md transition-all bg-white text-blue-700 border-blue-200"
              disabled={[start, ...extra, first].filter(Boolean).length >= maxCities}
              title={[start, ...extra, first].filter(Boolean).length >= maxCities ? "Max 5 cities reached — remove a city to add another" : "Add another city"}
              aria-disabled={[start, ...extra, first].filter(Boolean).length >= maxCities}
              onClick={() => {
                setExtra((arr) => arr.length < maxCities - 2 ? [...arr, ""] : arr);
                setExtraDays((arr) => arr.length < maxCities - 2 ? [...arr, 3] : arr);
                setExtraFilter((arr) => arr.length < maxCities - 2 ? [...arr, ""] : arr);
              }}
            >+ Add more cities ✨</button>
            <button
                className={`pill ${planReturn ? "pill-blue shadow-sm" : "bg-white hover:bg-slate-50 border border-slate-200"}`}
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
                {planReturn ? "Return planned" : "Plan return ↩"}
            </button>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-auto bg-white px-2 py-1 rounded border border-slate-100">{[start, ...extra, first].filter(Boolean).length} / {maxCities} cities</div>
          </div>
          {extra.map((city, idx) => (
            <div
              key={idx}
              className="group relative flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-3 transition-all hover:shadow-md hover:border-blue-300"
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
              <button className="text-slate-400 hover:text-blue-500 cursor-grab active:cursor-grabbing p-1" title="Drag to reorder" aria-label="Drag to reorder">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 4.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 4.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm8-9a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 4.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 4.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/></svg>
              </button>

              <div className="flex-1 min-w-0">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">City {idx + 3}</span>
                    {city && !editingExtras[idx] ? (
                      <div className="flex items-center gap-2 group/edit cursor-pointer" onClick={() => setEditingExtras((prev) => ({ ...prev, [idx]: true }))} title="Click to edit city">
                         <span className="font-bold text-slate-700 text-lg truncate">{city}</span>
                         <span className="text-slate-300 group-hover/edit:text-blue-500 transition-colors text-xs">✎</span>
                      </div>
                    ) : (
                      <input
                        autoFocus={!!editingExtras[idx]}
                        className="w-full bg-slate-50 border-none rounded p-1 text-lg font-bold text-slate-700 focus:ring-0 placeholder:font-normal"
                        placeholder="Select City..."
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
                 </div>
              </div>

              <div className="w-[280px] shrink-0 flex items-center justify-between gap-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Travel</span>
                      <TransportSelector idx={idx + 1} from={idx === 0 ? first : extra[idx - 1]} to={city} />
                  </div>
                  
                  <div className="w-px h-8 bg-slate-200 shrink-0"></div>

                  <div className="flex flex-col w-[70px] shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Stay</span>
                      <div className="flex items-center gap-1 justify-center">
                          <input
                            className="w-12 bg-white border border-slate-200 rounded p-1 text-center text-sm font-bold text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
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
                          <span className="text-xs text-slate-500 font-medium">days</span>
                      </div>
                  </div>
              </div>

              <div className="flex items-center gap-2">
                 <div className="w-[120px] flex justify-end">
                   {finalCity && finalCity === (city || "") ? (
                      <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 shadow-sm cursor-default whitespace-nowrap">
                          Final Return ↩
                      </span>
                   ) : (
                      <button
                          className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100 whitespace-nowrap"
                          onClick={() => {
                            if (city) {
                              setFinalCity(city);
                              setPlanReturn(true);
                              setReturnStops([]);
                              setReturnFilters([]);
                            }
                          }}
                          title="Return from this city (End of outbound trip)"
                      >
                          Return ↩
                      </button>
                   )}
                 </div>
                 
                 <button
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                 </button>
              </div>
            </div>
          ))}

          {returnStops.map((city, idx) => {
            const hasBridge = planReturn && finalCity && finalCity !== names[names.length - 1];
            const baseIdx = names.length - 1 + (hasBridge ? 1 : 0);
            const transportIdx = baseIdx + idx;
            return (
              <div
                key={`ret-${idx}`}
                className="group relative flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-3 transition-all hover:shadow-md hover:border-blue-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Stop {idx + 1}</div>
                  {city && !editingReturns[idx] ? (
                    <div
                      className="text-base font-semibold text-slate-800 cursor-pointer hover:text-blue-600 truncate flex items-center gap-2"
                      onClick={() => setEditingReturns((prev) => ({ ...prev, [idx]: true }))}
                      title="Click to edit stop"
                    >
                      {city}
                      <svg className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        autoFocus={!!editingReturns[idx]}
                        className="w-full text-base font-medium text-slate-800 border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 bg-transparent px-0 py-0.5 placeholder:font-normal"
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
                    </div>
                  )}
                </div>

                <div className="w-[280px] shrink-0 flex items-center justify-center bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Travel</span>
                    <TransportSelector idx={transportIdx} from={idx === 0 ? finalCity : returnStops[idx - 1]} to={city} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-[120px]"></div>
                  <button
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove stop"
                    aria-label="Remove stop"
                    onClick={() => {
                      setReturnStops((arr) => arr.filter((_, i) => i !== idx));
                      setReturnFilters((arr) => arr.filter((_, i) => i !== idx));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
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
                    const forwardArr = [start, first, ...extra].filter(Boolean);
                    const idx = forwardArr.findIndex((n) => n === finalCity);
                    const forward = idx >= 0 ? forwardArr.slice(0, idx + 1) : forwardArr;
                    const back = returnStops.length ? [...returnStops, finalCity, start] : [start];
                    const deduced = [...forward, ...back];
                    const compressed = deduced.filter((n, i, arr) => i === 0 || n !== arr[i - 1]);
                    return <>Deduced itinerary: {compressed.join(" → ")}</>;
                  })()}
                </div>
              ) : null}
              {/* Unified Return Trip Planning UI */}
              {planReturn && finalCity ? (
                <div className="mt-4 bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-blue-50/50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
                     <div className="text-sm font-bold text-blue-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Plan Your Return Journey
                     </div>
                     <div className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-100 rounded-full">
                        Select Transport
                     </div>
                  </div>
                  
                  <div className="p-3 space-y-0 divide-y divide-slate-100">
                     {(() => {
                         // Identify legs that are part of the return journey
                         const forwardLegsCount = Math.max(0, names.length - 1);
                         const totalLegs = points.length - 1;
                         
                         const returnLegs = [];
                         for (let i = forwardLegsCount; i < totalLegs; i++) {
                             returnLegs.push(i);
                         }
                         
                         if (returnLegs.length === 0) {
                            return (
                                <div className="py-4 text-center text-sm text-slate-500 italic">
                                    Route not calculated yet. Please select return city.
                                </div>
                            );
                         }

                         return returnLegs.map((idx) => {
                             const p = points[idx];
                             const q = points[idx + 1];
                             if (!p || !q) return null;
                             
                             const cityA = find(p.name);
                             const cityB = find(q.name);
                             const dist = (cityA && cityB) ? distanceKm(cityA, cityB).toFixed(0) : "?";

                             const mode = getMode(idx, p.name, q.name);
                             
                             return (
                               <div key={idx} className="py-3 flex items-center justify-between group hover:bg-slate-50 transition-colors -mx-3 px-3">
                                 <div className="flex-1 min-w-0 mr-4">
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className="text-sm font-bold text-slate-800 truncate">{p.name}</span>
                                         <span className="text-slate-400">→</span>
                                         <span className="text-sm font-bold text-slate-800 truncate">{q.name}</span>
                                     </div>
                                     <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                         <span className={`inline-flex items-center gap-1 font-medium px-1.5 py-0.5 rounded ${mode === 'flight' ? 'bg-blue-100 text-blue-700' : (mode === 'train' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700')}`}>
                                            {mode === 'flight' ? '✈️ Flight' : (mode === 'train' ? '🚆 Train' : '🚗 Car')}
                                         </span>
                                         <span className="text-slate-300">|</span>
                                         <span>{dist} km</span>
                                     </div>
                                 </div>
                                 <div className="shrink-0">
                                    <TransportSelector idx={idx} from={p.name} to={q.name} />
                                 </div>
                               </div>
                             );
                         });
                     })()}
                  </div>
                  
                  {finalCity !== first && (
                     <div className="px-4 py-3 bg-amber-50 text-amber-800 text-xs border-t border-amber-100 flex items-start gap-2">
                        <span className="mt-0.5 text-amber-600">ℹ️</span>
                        <span className="font-medium">Open-jaw return: You are returning from {finalCity} instead of {first}.</span>
                     </div>
                  )}
                </div>
              ) : null}

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
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-slate-500">Compact route map</div>
                </div>
                <div className="relative group">
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
                        stroke={
                          seg.mode === "flight"
                            ? (seg.dir === "forward" ? "#3b82f6" : "#22d3ee")
                            : (seg.mode === "train"
                              ? (seg.dir === "forward" ? "#eab308" : "#f59e0b")
                              : (seg.dir === "forward" ? "#2563eb" : "#22c55e"))
                        }
                        strokeWidth={seg.mode === "flight" ? 4 : (seg.mode === "train" ? 5 : 6)}
                        strokeLinecap={seg.mode === "train" ? "butt" : "round"}
                        strokeLinejoin="round"
                        strokeDasharray={seg.mode === "flight" ? "6 4" : (seg.mode === "train" ? "3 6" : "none")}
                        filter="url(#routeShadow)"
                      />
                      {/* Transport Icon Background */}
                      <circle cx={seg.mx} cy={seg.my} r="10" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#dotShadow)" />
                      <use
                        href={seg.mode === "flight" ? "#planeIcon" : (seg.mode === "train" ? "#trainIcon" : "#carIcon")}
                        x={seg.mx - 10}
                        y={seg.my - 10}
                        width="20"
                        height="20"
                        fill={
                          seg.mode === "flight"
                            ? (seg.dir === "forward" ? "#1d4ed8" : "#0891b2")
                            : (seg.mode === "train"
                              ? (seg.dir === "forward" ? "#ca8a04" : "#c2410c")
                              : (seg.dir === "forward" ? "#1e40af" : "#047857"))
                        }
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

                    const items = Array.from(uniqueLabels.values());
                    // Keep track of placed labels to avoid overlapping them
                    const placedRects: { x: number; y: number; w: number; h: number }[] = [];

                    return items.map((item) => {
                      const { x, y, name, label, idx } = item;
                      
                      // Smart positioning to avoid overlap
                      const distToSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
                        const A = px - x1;
                        const B = py - y1;
                        const C = x2 - x1;
                        const D = y2 - y1;
                        const dot = A * C + B * D;
                        const len_sq = C * C + D * D;
                        let param = -1;
                        if (len_sq !== 0) param = dot / len_sq;
                        let xx, yy;
                        if (param < 0) { xx = x1; yy = y1; }
                        else if (param > 1) { xx = x2; yy = y2; }
                        else { xx = x1 + param * C; yy = y1 + param * D; }
                        const dx = px - xx;
                        const dy = py - yy;
                        return Math.sqrt(dx * dx + dy * dy);
                      };

                      const candidates = [
                        { dx: 0, dy: -1, a: "middle" },    // N
                        { dx: 0, dy: 1, a: "middle" },     // S
                        { dx: 1, dy: 0, a: "start" },      // E
                        { dx: -1, dy: 0, a: "end" },       // W
                        { dx: 0.707, dy: -0.707, a: "start" }, // NE
                        { dx: -0.707, dy: -0.707, a: "end" },  // NW
                        { dx: 0.707, dy: 0.707, a: "start" },  // SE
                        { dx: -0.707, dy: 0.707, a: "end" },   // SW
                      ];
                      
                      // Add bisector strategy for corners
                      const prev = points[idx - 1];
                      const next = points[idx + 1];
                      if (prev && next) {
                         const vx1 = prev.x - x;
                         const vy1 = prev.y - y;
                         const len1 = Math.sqrt(vx1*vx1 + vy1*vy1);
                         
                         const vx2 = next.x - x;
                         const vy2 = next.y - y;
                         const len2 = Math.sqrt(vx2*vx2 + vy2*vy2);
                         
                         if (len1 > 0 && len2 > 0) {
                            // Bisector of the "inside" angle
                            const bx = (vx1/len1) + (vx2/len2);
                            const by = (vy1/len1) + (vy2/len2);
                            const blen = Math.sqrt(bx*bx + by*by);
                            
                            if (blen > 0.1) {
                                // Point AWAY from the bisector (outside the turn)
                                const dirX = -(bx / blen);
                                const dirY = -(by / blen);
                                
                                let anchor = "middle";
                                if (dirX > 0.3) anchor = "start";
                                else if (dirX < -0.3) anchor = "end";
                                
                                candidates.push({ dx: dirX, dy: dirY, a: anchor });
                            }
                         }
                      }

                      let bestScore = -Infinity;
                      let bestDx = 0;
                      let bestDy = -15;
                      let anchor = "middle";
                      
                      const labelW = label.length * 8; // Increased width estimate
                      const labelH = 14; // Approx height

                      // Try all directions
                      for (const cand of candidates) {
                        const dist = 24; // Increased distance from dot center
                        const tx = x + cand.dx * dist;
                        const ty = y + cand.dy * dist;

                        // Calculate label bounding box
                        let lx = tx;
                        if (cand.a === "end") lx = tx - labelW;
                        else if (cand.a === "middle") lx = tx - labelW / 2;
                        const ly = ty - labelH / 2;
                        
                        // Checkpoints on the label box (corners + center)
                        const checks = [
                            { cx: lx, cy: ly },
                            { cx: lx + labelW, cy: ly },
                            { cx: lx, cy: ly + labelH },
                            { cx: lx + labelW, cy: ly + labelH },
                            { cx: lx + labelW/2, cy: ly + labelH/2 }
                        ];

                        // 1. Penalty for being out of bounds
                        if (lx < 5 || lx + labelW > 355 || ly < 5 || ly + labelH > 135) continue;

                        // 2. Calculate min distance to any route segment (line) AND transport icons
                        let minDistLine = Infinity;
                        let minDistIcon = Infinity;
                        
                        // Check vs Lines
                        for (let k = 0; k < points.length - 1; k++) {
                           const p1 = points[k];
                           const p2 = points[k+1];
                           
                           // Check all checkpoints against this segment
                           for (const cp of checks) {
                               const d = distToSegment(cp.cx, cp.cy, p1.x, p1.y, p2.x, p2.y);
                               if (d < minDistLine) minDistLine = d;
                           }
                        }
                        
                        // Check vs Transport Icons (midpoints)
                        for (const seg of routeSegments) {
                            for (const cp of checks) {
                                const d = Math.sqrt((seg.mx - cp.cx) ** 2 + (seg.my - cp.cy) ** 2);
                                if (d < minDistIcon) minDistIcon = d;
                            }
                        }

                        // 3. Calculate min distance to any other point
                        let minDistPoint = Infinity;
                        for (let k = 0; k < points.length; k++) {
                           if (k === idx) continue;
                           const pt = points[k];
                           // Check all checkpoints
                           for (const cp of checks) {
                               const d = Math.sqrt((pt.x - cp.cx) ** 2 + (pt.y - cp.cy) ** 2);
                               if (d < minDistPoint) minDistPoint = d;
                           }
                        }
                        
                        // 4. Check overlap with existing labels
                        let overlapsLabel = false;
                        for (const r of placedRects) {
                            if (lx < r.x + r.w && lx + labelW > r.x &&
                                ly < r.y + r.h && ly + labelH > r.y) {
                                overlapsLabel = true;
                                break;
                            }
                        }

                        // Score logic
                        // Base score: min distance to lines/points/icons
                        let score = Math.min(minDistLine, minDistPoint, minDistIcon - 5); // -5 penalty to give icons extra space
                        
                        // Heavy penalty for label overlap
                        if (overlapsLabel) score -= 1000;
                        
                        // Penalty for being VERY close to a line (touching)
                        if (score < 5) score -= 500; 
                        
                        // Penalty for being close to an icon
                        if (minDistIcon < 15) score -= 200;

                        if (score > bestScore) {
                           bestScore = score;
                           bestDx = cand.dx * dist;
                           bestDy = cand.dy * dist;
                           anchor = cand.a;
                        }
                      }
                      
                      const dx = bestDx;
                      const dy = bestDy;
                      
                      // Register this label's position
                      let finalLx = x + dx;
                      if (anchor === "end") finalLx -= labelW;
                      else if (anchor === "middle") finalLx -= labelW / 2;
                      placedRects.push({ x: finalLx, y: y + dy - labelH/2, w: labelW, h: labelH });
                      
                      return (
                        <g key={`lbl-${name}`}>
                           <rect x={finalLx - 2} y={y + dy - labelH/2 - 1} width={labelW + 4} height={labelH + 2} rx="2" fill="white" fillOpacity="0.85" />
                           <text x={x + dx} y={y + dy} fontSize="11" fontWeight="600" textAnchor={anchor as any} fill="#0f172a">{label}</text>
                        </g>
                      );
                    });
                  })()}
                  </svg>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-sm rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                  >
                    ✎ Edit Stops
                  </button>
                </div>
              </div>
            ) : null}
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black/50 z-[100] grid place-items-center p-4 animate-in fade-in duration-200" onClick={() => setIsEditModalOpen(false)}>
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">Edit Trip Duration</h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 grid place-items-center text-slate-500">✕</button>
                  </div>
                  <div className="p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 grid place-items-center text-sm font-bold shrink-0">1</div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">{first}</div>
                                <div className="text-xs text-slate-500">Main Arrival</div>
                            </div>
                            <div className="w-24">
                                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5 block">Days</label>
                                <input 
                                    type="number" 
                                    min={1} 
                                    className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={firstDays}
                                    onChange={(e) => setFirstDays(Math.max(1, parseInt(e.target.value) || 1))}
                                />
                            </div>
                        </div>

                        {extra.map((city, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 grid place-items-center text-sm font-bold shrink-0">{idx + 2}</div>
                                <div className="flex-1">
                                    <div className="font-medium text-slate-900">{city || "Select City"}</div>
                                    <div className="text-xs text-slate-500">Stop {idx + 1}</div>
                                </div>
                                <div className="w-24">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5 block">Days</label>
                                    <input 
                                        type="number" 
                                        min={1} 
                                        className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={extraDays[idx] ?? 3}
                                        onChange={(e) => {
                                            const val = Math.max(1, parseInt(e.target.value) || 1);
                                            setExtraDays(prev => {
                                                const next = [...prev];
                                                next[idx] = val;
                                                return next;
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                    <button 
                        onClick={() => setIsEditModalOpen(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm shadow-blue-200 transition-colors"
                    >
                        Done
                    </button>
                  </div>
                </div>
              </div>
            )}
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
        </div>
        <div className="shrink-0 p-3 border-t bg-white z-10">
          <button className="btn btn-primary btn-lg w-full" onClick={() => {
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
