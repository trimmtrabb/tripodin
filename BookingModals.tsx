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
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center text-xl">✈️</div>
            <div className="text-lg font-semibold">Book Flight</div>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded">Close</button>
        </div>
        <div className="p-4">
        <div className="text-sm text-slate-600 mb-3">
          {fullItinerary && fullItinerary.length > 0 ? (
            <div className="flex flex-wrap gap-1 items-center">
              {fullItinerary.map((city, i) => (
                <React.Fragment key={i}>
                  <span className="font-medium">{city}</span>
                  {i < fullItinerary.length - 1 && <span className="text-slate-400">→</span>}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <>{from} ⇄ {to}</>
          )}
          {totalDays ? <div className="text-xs text-slate-500 mt-1">Total Trip Duration: {totalDays} days</div> : null}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">From</div>
            <select className="w-full border rounded p-2" value={from} onChange={(e) => setFrom(e.target.value)}>
              {originCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">To</div>
            <select className="w-full border rounded p-2" value={to} onChange={(e) => setTo(e.target.value)}>
              {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name} {c.airport ? `(${c.airport.name} (${c.airport.code}))` : ""}</option>))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className={`pill ${tripType === "oneway" ? "pill-blue" : ""}`} onClick={() => setTripType("oneway")}>One‑way</button>
          <button className={`pill ${tripType === "round" ? "pill-blue" : ""}`} onClick={() => setTripType("round")}>Round‑trip</button>
          <button className={`pill ${tripType === "openjaw" ? "pill-blue" : ""}`} onClick={() => setTripType("openjaw")}>Open‑jaw</button>
        </div>
        {tripType === "round" ? (
          <div className="mt-3">
            <div className="text-sm mb-1">Return From (optional, different city)</div>
            <select className="w-full border rounded p-2" value={retFrom} onChange={(e) => setRetFrom(e.target.value)}>
              <option value="">Same as arrival</option>
              {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
            </select>
            <div className="text-xs text-slate-500 mt-1">Leaving blank means return flight will start from {to}.</div>
          </div>
        ) : tripType === "openjaw" ? (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span className="pill pill-blue">Open‑jaw</span>
              <div className="text-sm">Return From</div>
            </div>
            <select className="w-full border rounded p-2 mt-1" value={retFrom} onChange={(e) => setRetFrom(e.target.value)}>
              {destCities.filter((c) => c.name !== to).map((c) => (<option key={c.name} value={c.name}>{c.name}{c.airport?.code ? ` (${c.airport.code})` : ""}</option>))}
            </select>
            <div className="text-xs text-slate-500 mt-1">Recommended return city is pre‑selected based on proximity and hub presence.</div>
            <div className="card p-3 mt-2">
              <div className="text-sm font-medium mb-1">Ticket Preview</div>
              <div className="text-sm">Outbound: {from} → {to}</div>
              <div className="text-sm">Return: {retFrom || "—"} → {from}</div>
            </div>
          </div>
        ) : tripType === "multicity" ? (
          <div className="mt-3 text-sm text-slate-600">For complex itineraries, consider the Multi‑City planner from the dashboard.</div>
        ) : null}
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div>
            <div className="text-sm mb-1">Trip Type</div>
            <select className="w-full border rounded p-2" value={tripType} onChange={(e) => setTripType(e.target.value as any)}>
              <option value="oneway">One-way</option>
              <option value="round">Round-trip</option>
              <option value="openjaw">Open-jaw</option>
              <option value="multicity">Multi-city</option>
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">Departure Date</div>
            <input className="w-full border rounded p-2" type="date" value={dep} onChange={(e) => setDep(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Return Date</div>
            <input className="w-full border rounded p-2" type="date" value={ret} onChange={(e) => setRet(e.target.value)} disabled={tripType !== "round"} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm mb-1">Passengers</div>
          <input className="w-full border rounded p-2" type="number" min={1} value={pax} onChange={(e) => setPax(Number(e.target.value))} />
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div className="card p-3">
            <div className="font-medium mb-1">Travel Details</div>
            <div className="text-xs mb-1">Type</div>
            <div className="pill pill-blue w-fit">{tripType === "oneway" ? "One‑way" : tripType === "round" ? "Round trip" : tripType === "openjaw" ? "Open‑jaw" : "Multi‑city"}</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <div className="text-xs mb-1">Departure</div>
                <div className="text-sm">{dep}</div>
              </div>
              {tripType === "round" ? (
                <div>
                  <div className="text-xs mb-1">Return</div>
                  <div className="text-sm">{ret}</div>
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <div className="text-xs mb-1">Passengers</div>
                <div className="text-sm">{pax}</div>
              </div>
              {totalDays ? (
                <div>
                  <div className="text-xs mb-1">Total Days</div>
                  <div className="text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-1 w-fit">{totalDays} days</div>
                </div>
              ) : null}
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[100]" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center text-xl">🏨</div>
            <div className="text-lg font-semibold">Book Hotel</div>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded">Close</button>
        </div>
        <div className="p-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">City</div>
            <select className="w-full border rounded p-2" value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">Rooms</div>
            <input className="w-full border rounded p-2" type="number" min={1} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div>
            <div className="text-sm mb-1">Check-in</div>
            <input className="w-full border rounded p-2" type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} />
          </div>
          <div>
            <div className="text-sm mb-1">Check-out</div>
            <input className="w-full border rounded p-2" type="date" value={outDate} onChange={(e) => setOutDate(e.target.value)} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm mb-1">Guests</div>
          <input className="w-full border rounded p-2" type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div className="card p-3">
            <div className="font-medium mb-1">Travel Details</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs mb-1">City</div>
                <div className="text-sm">{city}</div>
              </div>
              <div>
                <div className="text-xs mb-1">Rooms</div>
                <div className="text-sm">{rooms}</div>
              </div>
              <div>
                <div className="text-xs mb-1">Check‑in</div>
                <div className="text-sm">{inDate}</div>
              </div>
              <div>
                <div className="text-xs mb-1">Check‑out</div>
                <div className="text-sm">{outDate}</div>
              </div>
              <div>
                <div className="text-xs mb-1">Guests</div>
                <div className="text-sm">{guests}</div>
              </div>
              <div>
                <div className="text-xs mb-1">Status</div>
                <div className="text-sm text-green-600 font-semibold">Confirmed</div>
              </div>
              {totalDays ? (
                <div className="col-span-2">
                  <div className="text-xs mb-1">Total Days</div>
                  <div className="text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-1 w-fit">{totalDays} days</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowConf(true)}>Search Hotels</button>
        </div>
        {showConf ? (
          <div className="mt-4">
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
