import React, { useEffect, useMemo, useState } from "react";
import { City, getCities, distanceKm } from "./cityData";

export default function MultiCityModal({ open, onClose, originCountry, destCountry, onSubmit, tripType, dep, ret, pax, transportModes, fullItinerary, totalStay, stays }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; onSubmit?: (cities: string[], cost: string) => void; tripType?: "oneway" | "round" | "multicity"; dep?: string; ret?: string; pax?: number; transportModes?: Record<number, "flight" | "train" | "car" | "surface">; fullItinerary?: string[]; totalStay?: number; stays?: Record<string, number> }) {
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
  
  const flightLegs = useMemo(() => {
    return legs.map((l, i) => ({ ...l, mode: transportModes ? transportModes[i] || "flight" : "flight" }))
               .filter(l => l.mode === "flight");
  }, [legs, transportModes]);

  const displayTripType = useMemo(() => {
    if (tt === "oneway") return "One‑way";
    if (tt === "round") return "Round trip";
    
    // Analyze for Open-jaw
    if (flightLegs.length < 2) return "Multi‑city";

    // Check for surface sectors (gaps between flights)
    let hasGap = false;
    // We need to check if flight i+1 starts where flight i ended.
    // Note: flightLegs is a filtered array. If there was a non-flight leg in between, 
    // flightLegs[i].to will NOT match flightLegs[i+1].from IF the non-flight leg connected them?
    // Wait. legs are continuous: A->B, B->C, C->D.
    // If A->B is flight, B->C is train, C->D is flight.
    // flightLegs = [A->B, C->D].
    // flightLegs[0].to is B. flightLegs[1].from is C.
    // B != C. -> Gap detected.
    
    for (let i = 0; i < flightLegs.length - 1; i++) {
        if (flightLegs[i].to.name !== flightLegs[i+1].from.name) {
            hasGap = true;
            break;
        }
    }

    if (hasGap) return "Open‑jaw";

    // Check for Origin/Destination Open-jaw (Start != End)
    const first = flightLegs[0].from.name;
    const last = flightLegs[flightLegs.length - 1].to.name;
    if (first !== last) return "Open‑jaw";

    return "Multi‑city";
  }, [tt, flightLegs]);

  const modalTitle = useMemo(() => {
      if (displayTripType === "Open‑jaw") return "Open-jaw Flight";
      if (displayTripType === "Multi‑city") return "Multi-city Flight";
      if (tt === "oneway") return "One-way Flight";
      return "Round Trip Flight";
  }, [displayTripType, tt]);

  const passengers = pax || 1;

  const flightItineraryHeader = useMemo(() => {
    if (!legs.length) return fullItinerary ? fullItinerary.join(" → ") : `${originCountry} → ${destCountry}`;

    const chains: string[][] = [];
    let currentChain: string[] = [];

    legs.forEach((l, idx) => {
      const mode = transportModes ? transportModes[idx] || "flight" : "flight";
      if (mode === "flight") {
        if (currentChain.length === 0) {
          currentChain.push(l.from.name);
          currentChain.push(l.to.name);
        } else {
           if (currentChain[currentChain.length - 1] === l.from.name) {
             currentChain.push(l.to.name);
           } else {
             chains.push(currentChain);
             currentChain = [l.from.name, l.to.name];
           }
        }
      } else {
        if (currentChain.length > 0) {
          chains.push(currentChain);
          currentChain = [];
        }
      }
    });
    if (currentChain.length > 0) chains.push(currentChain);

    if (chains.length === 0) return "No flights selected";
    
    return (
      <span className="inline-flex items-center gap-2">
        {chains.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="text-white/40 font-bold mx-0.5 text-[10px] tracking-tighter select-none" title="Surface / Open-jaw Gap">
                {'//'}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              {c.map((city, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[10px] opacity-70">✈</span>}
                  <span>{city}</span>
                </React.Fragment>
              ))}
            </span>
          </React.Fragment>
        ))}
      </span>
    );
  }, [legs, transportModes, fullItinerary, originCountry, destCountry]);

  if (!open) return null;

  const totalCostVal = legs.reduce((s, l, idx) => {
      const mode = transportModes ? transportModes[idx] || "flight" : "flight";
      if (mode !== "flight") return s;
      const rate = 0.35;
      return s + (l.km * rate);
    }, 0).toFixed(0);

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100] p-4" onClick={onClose}>
      <div className="bp-card w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
          <div className="min-w-0 w-full sm:w-auto">
            <div className="text-xl font-bold">{modalTitle}</div>
            <div className="text-xs text-purple-100 font-medium tracking-wide opacity-90">SECURE BOOKING</div>
            <div className="text-xs font-mono mt-1 flex items-center gap-2 opacity-80 truncate max-w-full">{flightItineraryHeader}</div>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded w-full sm:w-auto mt-2 sm:mt-0">Close</button>
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
              <div className="space-y-3 mb-4">
                <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Flight Itinerary</div>
                {legs.map((l, idx) => {
                    const mode = transportModes ? transportModes[idx] || "flight" : "flight";
                    if (mode !== "flight") return null;
                    const fromCode = l.from.airport?.code || l.from.name.substring(0, 3).toUpperCase();
                    const toCode = l.to.airport?.code || l.to.name.substring(0, 3).toUpperCase();
                    return (
                       <div key={idx} className="p-3 border border-blue-100 bg-blue-50/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100 grid place-items-center text-blue-600 shrink-0">✈️</div>
                             <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                   <span className="text-xl font-bold text-slate-900">{fromCode}</span>
                                   <span className="text-slate-300">→</span>
                                   <span className="text-xl font-bold text-slate-900">{toCode}</span>
                                </div>
                                <div className="text-xs text-slate-500 truncate">{l.from.name} → {l.to.name}</div>
                             </div>
                          </div>
                          <div className="text-right self-end sm:self-auto shrink-0">
                             <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold border border-green-200 uppercase">Confirmed</div>
                          </div>
                       </div>
                    );
                 })}
                 {legs.every((_, idx) => (transportModes ? transportModes[idx] : "flight") !== "flight") && (
                    <div className="text-sm text-slate-500 italic p-4 border border-dashed border-slate-300 rounded-xl text-center">No flight segments in this itinerary.</div>
                 )}
              </div>
              <div className="card p-3 mt-3">
                <div className="font-medium mb-2">Route Summary</div>
                <div className="space-y-1">
                  {legs.map((l, idx) => {
                    const mode = transportModes ? transportModes[idx] || "flight" : "flight";
                    if (mode !== "flight") return null;
                    const icon = "✈️";
                    const text = "by flight";
                    return (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span>{l.from.name} → {l.to.name}</span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-1 rounded flex items-center gap-1">
                            <span>{icon}</span><span>{text}</span>
                          </span>
                        </div>
                        <span>{l.km.toFixed(0)} km</span>
                      </div>
                    );
                  })}
                </div>
                {legs.length ? (
                  <div className="mt-2 border-t pt-2 font-semibold">Total Distance {legs.reduce((s, l, idx) => {
                    const mode = transportModes ? transportModes[idx] || "flight" : "flight";
                    return mode === "flight" ? s + l.km : s;
                  }, 0).toFixed(0)} km</div>
                ) : null}
              </div>

              

            </div>
            <div className="card p-3">
              <div className="font-medium mb-1">Travel Details</div>
              <div className="text-xs mb-1">Type</div>
              <div className="pill pill-blue w-fit">{displayTripType}</div>
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
                  if (mode !== "flight") return s;
                  const rate = 0.35;
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
            <button className="btn btn-primary" disabled={!canSubmit} onClick={() => { onSubmit?.([city1, ...extra.map((e) => e.name)], `$ ${totalCostVal}`); onClose(); }}>
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
