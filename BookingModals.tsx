import React, { useEffect, useMemo, useState } from "react";
import { getCities, distanceKm } from "./cityData";
import { RoundTripConfirmation, HotelConfirmation, OpenJawConfirmation } from "./Confirmations";

export function FlightModal({ open, onClose, originCountry, destCountry, totalStay, fullItinerary }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; totalStay?: number; fullItinerary?: string[] }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [to, setTo] = useState<string>(destCities[0]?.name || "");
  const [retFrom, setRetFrom] = useState<string>("");
  const [tripType, setTripType] = useState<"oneway" | "round" | "openjaw" | "multicity">("round");
  const [dep, setDep] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [ret, setRet] = useState<string>(() => new Date(Date.now() + (totalStay ? totalStay * 86400000 : 86400000)).toISOString().slice(0, 10));
  const [pax, setPax] = useState<number>(2);
  const [showConf, setShowConf] = useState(false);
  const daysBetween = (a: string, b: string) => {
    try {
      const d1 = new Date(a);
      const d2 = new Date(b);
      const ms = d2.getTime() - d1.getTime();
      return Math.max(0, Math.round(ms / 86400000));
    } catch {
      return 0;
    }
  };
  const totalDays = useMemo(() => {
    return typeof totalStay === "number" ? totalStay : (tripType === "round" ? daysBetween(dep, ret) : 0);
  }, [totalStay, tripType, dep, ret]);
  useEffect(() => {
    if (totalStay) {
      const d = new Date(dep);
      d.setDate(d.getDate() + totalStay);
      setRet(d.toISOString().slice(0, 10));
    }
  }, [totalStay, dep]);
  useEffect(() => {
    if (tripType === "openjaw") {
      const o = originCities.find((c) => c.name === from);
      const t = destCities.find((c) => c.name === to);
      const candidates = destCities.filter((c) => c.name !== to && c.airport);
      let best = candidates[0]?.name || "";
      const hubSet = new Set(["FRA","LHR","CDG","MAD","BCN","DXB","AUH","BER","MUC","ORD","JFK","LAX","YYZ","YVR","SYD","MEL","SIN","FCO","MXP"]);
      if (o && t && candidates.length) {
        const hubs = candidates.filter((c) => hubSet.has((c.airport?.code || "").toUpperCase()));
        const list = (hubs.length ? hubs : candidates).map((c) => ({ c, d: distanceKm(o as any, c as any) }));
        best = list.sort((a, b) => a.d - b.d)[0].c.name;
      }
      setRetFrom(best);
    } else if (tripType === "round") {
      setRetFrom("");
    } else if (tripType === "oneway") {
      setRetFrom("");
    }
  }, [tripType, from, to, originCities, destCities]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100]" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 flex justify-between items-center shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 grid place-items-center text-2xl backdrop-blur-sm">✈️</div>
            <div>
              <div className="text-xl font-bold">Book Flight</div>
              <div className="text-xs text-blue-100 font-medium tracking-wide opacity-90">SECURE BOOKING</div>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">Close</button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar bg-slate-50/50">
          
          {/* Trip Preferences Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Trip Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">From</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400">🛫</span>
                  </div>
                  <select 
                    className="w-full border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 group-hover:bg-white appearance-none" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">To</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400">🛬</span>
                  </div>
                  <select 
                    className="w-full border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 group-hover:bg-white appearance-none" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)}
                  >
                    {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100 w-fit">
                  <button className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${tripType === "oneway" ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTripType("oneway")}>One‑way</button>
                  <button className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${tripType === "round" ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTripType("round")}>Round‑trip</button>
                  <button className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${tripType === "openjaw" ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTripType("openjaw")}>Open‑jaw</button>
                </div>
              </div>

              {tripType === "round" ? (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Return From (Optional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400">↩️</span>
                    </div>
                    <select 
                      className="w-full border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 group-hover:bg-white appearance-none" 
                      value={retFrom} 
                      onChange={(e) => setRetFrom(e.target.value)}
                    >
                      <option value="">Same as arrival ({to})</option>
                      {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              ) : tripType === "openjaw" ? (
                <div className="md:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Open-Jaw</span>
                    <div className="text-sm font-semibold text-blue-900">Return Configuration</div>
                  </div>
                  <label className="block text-xs font-semibold text-blue-800 mb-1.5 uppercase tracking-wide">Return From</label>
                  <select 
                    className="w-full border border-blue-200 rounded-lg py-2.5 px-3 text-blue-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none mb-2" 
                    value={retFrom} 
                    onChange={(e) => setRetFrom(e.target.value)}
                  >
                    {destCities.filter((c) => c.name !== to).map((c) => (<option key={c.name} value={c.name}>{c.name}{c.airport?.code ? ` (${c.airport.code})` : ""}</option>))}
                  </select>
                  <div className="text-xs text-blue-600/80">Recommended return city is pre‑selected based on proximity and hub presence.</div>
                </div>
              ) : null}

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Departure Date</label>
                  <input className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" type="date" value={dep} onChange={(e) => setDep(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Return Date</label>
                  <input className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed" type="date" value={ret} onChange={(e) => setRet(e.target.value)} disabled={tripType !== "round" && tripType !== "openjaw"} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Passengers</label>
                  <div className="relative">
                    <input 
                      className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" 
                      type="number" 
                      min={1} 
                      value={pax} 
                      onChange={(e) => setPax(Number(e.target.value))} 
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">pax</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Preview */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative mb-6 transform transition-all hover:scale-[1.01] duration-300">
            {/* Decorative top bar */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Confirmed</span>
                    <span className="text-slate-400 text-xs">• TripOdin</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Flight Reservation</h2>
                </div>
                {totalDays ? (
                  <div className="text-right bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                    <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Duration</div>
                    <div className="text-lg font-black text-blue-600 leading-none">{totalDays} <span className="text-sm font-medium text-blue-400">Days</span></div>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-2">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Route</div>
                  <div className="font-bold text-slate-700 text-lg leading-tight flex items-center gap-2">
                    {from} <span className="text-slate-300">→</span> {to}
                    {tripType === "round" && <span className="text-slate-300">→</span>}
                    {tripType === "round" ? (retFrom || from) : null}
                  </div>
                </div>
                
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Departure</div>
                  <div className="font-bold text-slate-700">{new Date(dep).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                </div>
                
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Return</div>
                  <div className="font-bold text-slate-700">
                    {(tripType === "round" || tripType === "openjaw") ? new Date(ret).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "—"}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Passengers</div>
                  <div className="font-bold text-slate-700">{pax} Pax</div>
                </div>

                <div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Class</div>
                   <div className="font-bold text-slate-700">Economy</div>
                </div>

                <div className="col-span-2">
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Type</div>
                   <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                     {tripType === "oneway" ? "One‑way" : tripType === "round" ? "Round trip" : tripType === "openjaw" ? "Open‑jaw" : "Multi‑city"}
                   </span>
                </div>
              </div>

              {/* Barcode Section */}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 flex justify-between items-end">
                <div className="text-xs text-slate-400 font-mono tracking-widest">
                  REF: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
                <svg className="h-8 w-32 text-slate-800 opacity-80" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,0 h2 v30 h-2 z M4,0 h1 v30 h-1 z M7,0 h3 v30 h-3 z M12,0 h1 v30 h-1 z M15,0 h2 v30 h-2 z M20,0 h3 v30 h-3 z M25,0 h1 v30 h-1 z M30,0 h2 v30 h-2 z M35,0 h1 v30 h-1 z M40,0 h3 v30 h-3 z M45,0 h1 v30 h-1 z M50,0 h2 v30 h-2 z M55,0 h1 v30 h-1 z M60,0 h3 v30 h-3 z M65,0 h2 v30 h-2 z M70,0 h1 v30 h-1 z M75,0 h2 v30 h-2 z M80,0 h3 v30 h-3 z M85,0 h1 v30 h-1 z M90,0 h2 v30 h-2 z M95,0 h1 v30 h-1 z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowConf(true)}>Search via Amadeus</button>
        </div>
        <div className="mt-4 grid gap-2">
          <div className="card p-3">Mock Flight A</div>
          <div className="card p-3">Mock Flight B</div>
          <div className="card p-3">Mock Flight C</div>
        </div>
        {showConf ? (
          <div className="mt-4">
            {tripType === "round" && retFrom ? (
              <OpenJawConfirmation from={from} arrive={to} returnFrom={retFrom} dep={dep} ret={ret} pax={pax} />
            ) : tripType === "round" ? (
              <RoundTripConfirmation from={from} to={to} dep={dep} ret={ret} pax={pax} />
            ) : (
              <div className="card p-3 text-sm">One-way search prepared for {from} → {to} on {dep}</div>
            )}
          </div>
        ) : null}
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500 shrink-0">
          <div>Trusted by 10,000+ travelers</div>
          <div className="flex gap-4">
            <span>🔒 SSL Secured</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HotelModal({ open, onClose, destCountry, totalStay }: { open: boolean; onClose: () => void; destCountry: string; totalStay?: number }) {
  const cities = useMemo(() => getCities(destCountry), [destCountry]);
  const [city, setCity] = useState<string>(cities[0]?.name || "");
  const [inDate, setInDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [outDate, setOutDate] = useState<string>(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [rooms, setRooms] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [showConf, setShowConf] = useState(false);
  const daysBetween = (a: string, b: string) => {
    try {
      const d1 = new Date(a).getTime();
      const d2 = new Date(b).getTime();
      return Math.max(0, Math.round((d2 - d1) / 86400000));
    } catch {
      return 0;
    }
  };
  const totalDays = useMemo(() => {
    return typeof totalStay === "number" ? totalStay : daysBetween(inDate, outDate);
  }, [totalStay, inDate, outDate]);
  useEffect(() => {
    if (totalStay) {
      const d = new Date(inDate);
      d.setDate(d.getDate() + totalStay);
      setOutDate(d.toISOString().slice(0, 10));
    }
  }, [totalStay, inDate]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100] p-4" onClick={onClose}>
      <div className="bp-card w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bp-header-blue">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 grid place-items-center text-2xl backdrop-blur-sm">🏨</div>
            <div>
              <div className="text-xl font-bold">Book Hotel</div>
              <div className="text-xs text-blue-100 font-medium tracking-wide opacity-90">SECURE BOOKING</div>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">Close</button>
        </div>
        <div className="p-4 overflow-y-auto custom-scrollbar">
          
          {/* Search Parameters Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Stay Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Destination City</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400">📍</span>
                  </div>
                  <select 
                    className="w-full border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 group-hover:bg-white appearance-none" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {cities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Check-in</label>
                  <input className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500" type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Check-out</label>
                  <input className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500" type="date" value={outDate} onChange={(e) => setOutDate(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Guests</label>
                <div className="relative">
                  <input 
                    className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    type="number" 
                    min={1} 
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))} 
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-sm">pax</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Rooms</label>
                <div className="relative">
                  <input 
                    className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    type="number" 
                    min={1} 
                    value={rooms} 
                    onChange={(e) => setRooms(Number(e.target.value))} 
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-sm">qty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Preview */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative mb-6 transform transition-all hover:scale-[1.01] duration-300">
            {/* Decorative top bar */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Confirmed</span>
                    <span className="text-slate-400 text-xs">• TripOdin</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Hotel Reservation</h2>
                </div>
                <div className="text-right bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                  <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Duration</div>
                  <div className="text-lg font-black text-blue-600 leading-none">{totalDays} <span className="text-sm font-medium text-blue-400">Nights</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Location</div>
                  <div className="font-bold text-slate-700 text-lg leading-tight">{city}</div>
                  <div className="text-xs text-slate-500">{destCountry}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Details</div>
                  <div className="font-medium text-slate-700">{guests} Guest{guests > 1 ? 's' : ''}</div>
                  <div className="text-xs text-slate-500">{rooms} Room{rooms > 1 ? 's' : ''}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Check-in</div>
                  <div className="font-bold text-slate-700">{inDate}</div>
                  <div className="text-xs text-slate-500">After 14:00</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Check-out</div>
                  <div className="font-bold text-slate-700">{outDate}</div>
                  <div className="text-xs text-slate-500">Before 11:00</div>
                </div>
              </div>

              {/* Dashed line with notches */}
              <div className="my-6 relative flex items-center">
                <div className="absolute -left-8 w-6 h-6 bg-slate-50 rounded-full z-10"></div>
                <div className="w-full border-t-2 border-dashed border-slate-200"></div>
                <div className="absolute -right-8 w-6 h-6 bg-slate-50 rounded-full z-10"></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Booking Reference</span>
                  <span className="font-mono text-slate-600 tracking-widest text-sm">HOTEL-{city.substring(0,3).toUpperCase()}-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <svg className="h-10 w-40 text-slate-800 opacity-80" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,0 h2 v30 h-2 z M4,0 h1 v30 h-1 z M7,0 h3 v30 h-3 z M12,0 h1 v30 h-1 z M15,0 h2 v30 h-2 z M20,0 h3 v30 h-3 z M25,0 h1 v30 h-1 z M30,0 h2 v30 h-2 z M35,0 h1 v30 h-1 z M40,0 h3 v30 h-3 z M45,0 h1 v30 h-1 z M50,0 h2 v30 h-2 z M55,0 h1 v30 h-1 z M60,0 h3 v30 h-3 z M65,0 h2 v30 h-2 z M70,0 h1 v30 h-1 z M75,0 h2 v30 h-2 z M80,0 h3 v30 h-3 z M85,0 h1 v30 h-1 z M90,0 h2 v30 h-2 z M95,0 h1 v30 h-1 z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] text-lg flex justify-center items-center gap-2"
            onClick={() => setShowConf(true)}
          >
            <span>Find Best Hotels in {city}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>

          {showConf ? (
            <div className="mt-6 animate-in">
              <HotelConfirmation hotel="Sample Hotel" city={city} checkIn={inDate} checkOut={outDate} rooms={rooms} guests={guests} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function InsuranceModal({ open, onClose, originCountry, destCountry, totalStay }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string; totalStay?: number }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState(originCountry);
  const [destination, setDestination] = useState(destCountry);
  const [dep, setDep] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [ret, setRet] = useState<string>(() => new Date(Date.now() + (totalStay ? totalStay * 86400000 : 86400000)).toISOString().slice(0, 10));
  const [level, setLevel] = useState("Standard");
  const [amount, setAmount] = useState("50000");
  const [addons, setAddons] = useState<string[]>([]);
  const [solo, setSolo] = useState(true);
  const [trav, setTrav] = useState(1);
  const duration = useMemo(() => {
    const d = new Date(dep).getTime();
    const r = new Date(ret).getTime();
    return Math.max(1, Math.round((r - d) / 86400000));
  }, [dep, ret]);
  useEffect(() => {
    if (totalStay) {
      const d = new Date(dep);
      d.setDate(d.getDate() + totalStay);
      setRet(d.toISOString().slice(0, 10));
    }
  }, [totalStay, dep]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100]" onClick={onClose}>
      <div className="card w-full max-w-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-xl font-semibold mb-2">Visa-Compliant Travel Insurance</div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">Full Name</div>
            <input className="w-full border rounded p-2" placeholder="As shown on passport" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Date of Birth</div>
            <input className="w-full border rounded p-2" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Nationality</div>
            <input className="w-full border rounded p-2" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Destination</div>
            <input className="w-full border rounded p-2" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Departure Date</div>
            <input className="w-full border rounded p-2" type="date" value={dep} onChange={(e) => setDep(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Return Date</div>
            <input className="w-full border rounded p-2" type="date" value={ret} onChange={(e) => setRet(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Coverage Level</div>
            <select className="w-full border rounded p-2" value={level} onChange={(e) => setLevel(e.target.value)}>
              {(["Basic", "Standard", "Premium"] as const).map((x) => (<option key={x} value={x}>{x}</option>))}
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">Maximum Coverage Amount</div>
            <select className="w-full border rounded p-2" value={amount} onChange={(e) => setAmount(e.target.value)}>
              {["30000", "50000", "100000"].map((x) => (<option key={x} value={x}>${x} USD</option>))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm mb-1">Optional Add-ons</div>
          <div className="flex flex-wrap gap-2">
            {["Adventure sports", "Trip cancellation", "Extra luggage"].map((x) => (
              <label key={x} className="inline-flex items-center gap-2">
                <input type="checkbox" checked={addons.includes(x)} onChange={(e) => {
                  const v = e.target.checked;
                  if (v) setAddons((a) => [...a, x]); else setAddons((a) => a.filter((y) => y !== x));
                }} />
                <span>{x}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={solo} onChange={(e) => setSolo(e.target.checked)} />
            <span>Are you traveling alone?</span>
          </label>
          {!solo ? (
            <div className="mt-2">
              <div className="text-sm mb-1">Number of Travelers</div>
              <input className="w-full border rounded p-2" type="number" min={1} value={trav} onChange={(e) => setTrav(Number(e.target.value))} />
            </div>
          ) : null}
        </div>
        <div className="mt-4 card p-3">
          <div className="font-medium">Summary</div>
          <div className="text-sm">{duration} days in {destination}</div>
          <div className="text-sm">Plan {level} – ${amount} coverage</div>
          <div className="text-sm">Add-ons: {addons.join(", ") || "None"}</div>
          <div className="font-semibold mt-1">Total: $18.50 USD</div>
          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" />
            <span>Terms and Conditions</span>
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary">Generate My Travel Insurance</button>
          <button className="btn btn-secondary">Add to Visa Document Bundle</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
