import React, { useEffect, useMemo, useState } from "react";
import { getCities } from "./cityData";
import { RoundTripConfirmation, HotelConfirmation, OpenJawConfirmation } from "./Confirmations";

export function FlightModal({ open, onClose, originCountry, destCountry }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string }) {
  const originCities = useMemo(() => getCities(originCountry), [originCountry]);
  const destCities = useMemo(() => getCities(destCountry), [destCountry]);
  const [from, setFrom] = useState<string>(originCities[0]?.name || "");
  const [to, setTo] = useState<string>(destCities[0]?.name || "");
  const [retFrom, setRetFrom] = useState<string>("");
  const [tripType, setTripType] = useState<"oneway" | "round" | "multicity">("round");
  const [dep, setDep] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [ret, setRet] = useState<string>(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [pax, setPax] = useState<number>(2);
  const [showConf, setShowConf] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="card w-full max-w-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-xl font-semibold mb-2">Book Flight</div>
        <div className="text-sm text-slate-600 mb-3">{from} ⇄ {to}</div>
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
        {tripType === "round" ? (
          <div className="mt-3">
            <div className="text-sm mb-1">Return From (optional, different city)</div>
            <select className="w-full border rounded p-2" value={retFrom} onChange={(e) => setRetFrom(e.target.value)}>
              <option value="">Same as arrival</option>
              {destCities.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
            </select>
            <div className="text-xs text-slate-500 mt-1">Leaving blank means return flight will start from {to}.</div>
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
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowConf(true)}>Search via Amadeus</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
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
  );
}

export function HotelModal({ open, onClose, destCountry }: { open: boolean; onClose: () => void; destCountry: string }) {
  const cities = useMemo(() => getCities(destCountry), [destCountry]);
  const [city, setCity] = useState<string>(cities[0]?.name || "");
  const [inDate, setInDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [outDate, setOutDate] = useState<string>(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [rooms, setRooms] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [showConf, setShowConf] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="card w-full max-w-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-xl font-semibold mb-2">Book Hotel</div>
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
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowConf(true)}>Search Hotels</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        {showConf ? (
          <div className="mt-4">
            <HotelConfirmation hotel="Sample Hotel" city={city} checkIn={inDate} checkOut={outDate} rooms={rooms} guests={guests} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function InsuranceModal({ open, onClose, originCountry, destCountry }: { open: boolean; onClose: () => void; originCountry: string; destCountry: string }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState(originCountry);
  const [destination, setDestination] = useState(destCountry);
  const [dep, setDep] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [ret, setRet] = useState<string>(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
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
