import React, { useMemo, useState } from "react";
import VisaUI from "./VisaUI";
import { FlightModal, HotelModal, InsuranceModal } from "./BookingModals";
import MultiCityModal, { ReturnFromModal } from "./MultiCityModal";
import UpsellModal from "./UpsellModal";
import { NoVisaBubble, SelectCitiesBubble, InfoBubble, UpsellBubble } from "./ChatBubbles";
import { isVisaFree, getAllCountries } from "./visaEngine";
import { getCities } from "./cityData";

type User = { id: string; username: string; email: string } | null;
type Route = "chat" | "dashboard";

function useAuth() {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem("tripodin_user");
    return raw ? JSON.parse(raw) : null;
  });
  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("tripodin_user", JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("tripodin_user");
  };
  return { user, login, logout };
}

function Header({ user, onLogin, onLogout, route, setRoute }: { user: User; onLogin: (u: User) => void; onLogout: () => void; route: Route; setRoute: (r: Route) => void }) {
  const [lang, setLang] = useState("en");
  return (
    <div className="gradient-header border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary-500 text-white grid place-items-center">🧭</div>
          <div className="text-lg font-semibold">TripOdin AI-Travel Assistant</div>
        </div>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="btn btn-secondary">
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
          </select>
          <button className="btn btn-secondary" onClick={() => setRoute("chat")}>New chat</button>
          {!user ? (
            <>
              <button className="btn btn-secondary" onClick={() => onLogin({ id: crypto.randomUUID(), username: "demo", email: "demo@example.com" })}>Log in</button>
              <button className="btn btn-primary" onClick={() => onLogin({ id: crypto.randomUUID(), username: "demo", email: "demo@example.com" })}>Sign Up</button>
            </>
          ) : (
            <>
              <button className={`btn ${route === "dashboard" ? "btn-primary" : "btn-secondary"}`} onClick={() => setRoute("dashboard")}>Dashboard</button>
              <button className="btn btn-secondary" onClick={onLogout}>Sign Out</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TopContext({ dest, origin }: { dest?: string; origin?: string }) {
  if (!dest && !origin) return null;
  return (
    <div className="w-full bg-slate-100 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-2 text-sm flex gap-4">
        {origin ? <div className="">Origin: {origin}</div> : null}
        {dest ? <div className="">Destination: {dest}</div> : null}
      </div>
    </div>
  );
}

function Chatbot({ onSetDest, onSetOrigin, user, setRoute }: { onSetDest: (c: string) => void; onSetOrigin: (c: string) => void; user: User; setRoute: (r: Route) => void }) {
  const [countries, setCountries] = useState<string[]>([]);
  React.useEffect(() => { getAllCountries().then(setCountries).catch(() => setCountries(["United States", "United Kingdom", "Germany", "France", "Spain", "Italy", "Canada", "Australia", "Singapore", "UAE", "Turkey", "Mexico", "Brazil", "Thailand", "India"])); }, []);
  const popular = ["United States", "United Kingdom", "France", "Germany", "Spain", "Italy"];
  const [messages, setMessages] = useState<Array<{ type: string; text?: string }>>([]);
  const [input, setInput] = useState("");
  const [dontNeedVisa, setDontNeedVisa] = useState(false);
  const [dest, setDest] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [showFlight, setShowFlight] = useState(false);
  const [showHotel, setShowHotel] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [flowStarted, setFlowStarted] = useState(false);
  const [citiesSelected, setCitiesSelected] = useState(false);
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [upsellShown, setUpsellShown] = useState(false);
  const [showMulti, setShowMulti] = useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);
  const originCities = React.useMemo(() => (origin ? getCities(origin) : []), [origin]);
  const destCities = React.useMemo(() => (dest ? getCities(dest) : []), [dest]);
  const send = (text: string) => {
    if (!text.trim()) return;
    const t = text.trim();
    setMessages((m) => [...m, { type: "text", text: t }]);
    if (t.toLowerCase() === "i don’t need a visa" || t.toLowerCase() === "i don't need a visa") {
      setMessages((m) => [...m, { type: "text", text: "Visa not required flow." }]);
      setShowFlight(true);
      setShowHotel(true);
      setShowInsurance(true);
      return;
    }
    const found = countries.find((c) => c.toLowerCase() === t.toLowerCase());
    if (found) {
      if (!origin) {
        setOrigin(found);
        onSetOrigin(found);
        setMessages((m) => [...m, { type: "text", text: `Nationality set to ${found}. Now pick your destination.` }]);
      } else if (!dest) {
        setDest(found);
        onSetDest(found);
        setMessages((m) => [...m, { type: "text", text: `Destination set to ${found}.` }]);
      }
      return;
    }
  };
  const onPopular = (c: string) => {
    setInput(`I’d like to travel to ${c}`);
    setTimeout(() => send(c), 0);
  };
  const [promptFromTo, setPromptFromTo] = useState(false);
  React.useEffect(() => { if (dest && origin) setPromptFromTo(false); }, [dest, origin]);
  React.useEffect(() => {
    if (dest && origin && !flowStarted) {
      setFlowStarted(true);
      const free = isVisaFree(origin, dest);
      setMessages((m) => [...m, free ? { type: "noVisa" } : { type: "info", text: "Visa may be required. Select purposes to get recommendations." }, { type: "selectCities" }]);
    }
  }, [dest, origin]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-slate-700">
          <div>💬</div>
          <div className="h-px w-12 bg-slate-300" />
          <div>✈️</div>
          <div className="h-px w-12 bg-slate-300" />
          <div>📍</div>
        </div>
        <div className="">
          <div className="text-2xl font-bold">Your AI Travel Companion</div>
          <div className="text-slate-600">Get accurate visa requirements, detailed application guidance, and personalized flight recommendations in one place</div>
          <div className="mt-1 text-sm text-slate-500">AI-powered visa information</div>
        </div>
      </div>
      <div className="card p-4 mb-4">
        <div className="hero-title">Welcome to TripOdin!</div>
        <div className="hero-sub">Start by selecting your nationality, then pick your destination.</div>
      </div>
      <div className="card p-4 mb-4">
        <div className="mb-2 font-medium flex items-center gap-2"><span className="pill pill-green">🪪 Nationality</span><span>Where are you traveling from?</span></div>
        <CountrySelect options={countries} value={origin} onChange={(v) => { setOrigin(v); onSetOrigin(v); }} />
      </div>
      <div className="card p-4 mb-4">
        <div className="mb-2 font-medium flex items-center gap-2"><span className="pill pill-blue">📍 Destination</span><span>Where are you planning to travel?</span></div>
        <CountrySelect options={countries} value={dest} onChange={(v) => { setDest(v); onSetDest(v); }} />
        <div className="text-sm text-slate-600">Popular: {popular.map((p) => (
          <button key={p} className="underline mr-2" onClick={() => onPopular(p)}>{p}</button>
        ))}</div>
      </div>
      {origin && dest ? (
        <SelectionStatus origin={origin} dest={dest} visaFree={isVisaFree(origin, dest)} />
      ) : null}
      {messages.length > 0 ? (
      <div className="card p-0 mb-4" ref={listRef}>
        <div className="p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className="animate-[fadeIn_0.3s_ease]">
              {m.type === "text" ? (<div>{m.text}</div>) : null}
              {m.type === "noVisa" ? (<NoVisaBubble />) : null}
              {m.type === "selectCities" && dest && origin ? (
                <SelectCitiesBubble originCountry={origin} destCountry={dest} onContinue={(f, t) => { setFromCity(f); setToCity(t); setCitiesSelected(true); setShowMulti(true); if (!upsellShown) { setUpsellShown(true); setMessages((mm) => [...mm, { type: "upsell" }]); } }} />
              ) : null}
              {m.type === "info" ? (<InfoBubble title="Info" text={m.text || ""} />) : null}
              {m.type === "upsell" ? (
                <UpsellBubble
                  onFlights={() => setShowFlight(true)}
                  onHotels={() => setShowHotel(true)}
                  onInsurance={() => setShowInsurance(true)}
                  showInsurance={!isVisaFree(origin, dest)}
                  from={fromCity}
                  to={toCity}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      ) : null}
      {(!origin || !dest || (!isVisaFree(origin, dest) && !citiesSelected)) ? (
        <div className="flex items-start gap-2 mb-2">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={dontNeedVisa} onChange={(e) => setDontNeedVisa(e.target.checked)} />
            <span>I don’t need a visa</span>
          </label>
        </div>
      ) : null}
      {null}
      {dest && origin ? <VisaUI origin={origin} dest={dest} /> : null}
      <FlightModal open={showFlight} onClose={() => setShowFlight(false)} originCountry={origin || ""} destCountry={dest || ""} />
      <HotelModal open={showHotel} onClose={() => setShowHotel(false)} destCountry={dest || ""} />
      <InsuranceModal open={showInsurance} onClose={() => setShowInsurance(false)} originCountry={origin || ""} destCountry={dest || ""} />
      <MultiCityModal open={showMulti} onClose={() => setShowMulti(false)} originCountry={origin || ""} destCountry={dest || ""} onSubmit={() => setShowMulti(false)} />
    </div>
  );
}

function SelectionStatus({ origin, dest, visaFree }: { origin: string; dest: string; visaFree: boolean }) {
  return (
    <div className="card p-4 mb-4 animate-in">
      <div className="flex items-center gap-3">
        <div className="pill pill-green">✓ Selections Confirmed</div>
        <div className="text-sm text-slate-700">{origin} → {dest}</div>
        {visaFree ? (
          <div className="badge badge-selected">Visa‑free detected</div>
        ) : (
          <div className="badge badge-best">Visa may be required</div>
        )}
      </div>
    </div>
  );
}

function CountrySelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
    return list.slice(0, 50);
  }, [query, options]);
  const pick = (v: string) => { onChange(v); setQuery(""); setOpen(false); };
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = ref.current; if (!el) return; if (!el.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("mousedown", onDown); window.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-2">
        <div className="icon-square bg-blue-600 text-white">🌍</div>
        <input className="w-full border rounded p-2" placeholder="Search or pick a country" value={value || query} onFocus={() => setOpen(true)} onChange={(e) => { setQuery(e.target.value); setOpen(true); }} onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, filtered.length - 1));
          else if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
          else if (e.key === "Enter" && filtered[active]) pick(filtered[active]);
        }} />
      </div>
      {open && filtered.length > 0 ? (
        <div className="absolute z-10 left-0 right-0 mt-2 card max-h-64 overflow-y-auto">
          {filtered.map((o, i) => (
            <button key={o} className={`w-full text-left px-3 py-2 ${i === active ? "bg-blue-50" : ""}`} onMouseEnter={() => setActive(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(o)}>{o}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Dashboard({ origin, dest }: { origin?: string; dest?: string }) {
  const [tab, setTab] = useState<"overview" | "trips" | "documents" | "profile">("overview");
  const [flightOpen, setFlightOpen] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);
  const [insOpen, setInsOpen] = useState(false);
  const [multiOpen, setMultiOpen] = useState(false);
  const [retOpen, setRetOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [upsellOpen, setUpsellOpen] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex gap-2 mb-4">
        {(["overview", "trips", "documents", "profile"] as const).map((t) => (
          <button key={t} className={`btn ${tab === t ? "btn-primary" : "btn-secondary"}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="card p-4">
        {tab === "overview" ? (
          <div>
            <div className="font-medium mb-2">Quick Actions</div>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={() => setFlightOpen(true)}>Flights</button>
              <button className="btn btn-secondary" onClick={() => setHotelOpen(true)}>Hotels</button>
              <button className="btn btn-secondary" onClick={() => setInsOpen(true)}>Insurance</button>
              <button className="btn btn-secondary" onClick={() => setMultiOpen(true)}>Multi-City</button>
              <button className="btn btn-secondary" onClick={() => setUpsellOpen(true)}>Special Offers</button>
            </div>
          </div>
        ) : tab === "trips" ? (
          <div>
            <div className="font-medium mb-2">My Trips</div>
            <div className="text-sm text-slate-600">Trips will appear here grouped by destination.</div>
          </div>
        ) : tab === "documents" ? (
          <div>
            <div className="font-medium mb-2">Documents</div>
            <div className="text-sm">Manage flight tickets and hotel vouchers.</div>
            <div className="mt-2 flex gap-2">
              <button className="btn btn-secondary">Download Selected</button>
              <button className="btn btn-secondary">Delete Selected</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-medium mb-2">Profile</div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <div className="text-sm mb-1">Nationality</div>
                <input className="w-full border rounded p-2" defaultValue={origin || ""} />
              </div>
              <div>
                <div className="text-sm mb-1">Destination</div>
                <input className="w-full border rounded p-2" defaultValue={dest || ""} />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-secondary" onClick={() => {
                const data = { origin, dest };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url; a.download = "tripodin-profile.json"; a.click();
                URL.revokeObjectURL(url);
              }}>Export Data</button>
              <button className="btn btn-secondary" onClick={() => { localStorage.clear(); location.reload(); }}>Reset Profile</button>
              <button className="btn btn-secondary" onClick={() => { localStorage.clear(); alert("Account deleted"); }}>Delete Account</button>
            </div>
          </div>
        )}
      </div>
      <VisaUI origin={origin || "United Kingdom"} dest={dest || "France"} />
      <FlightModal open={flightOpen} onClose={() => setFlightOpen(false)} originCountry={origin || "United Kingdom"} destCountry={dest || "France"} />
      <HotelModal open={hotelOpen} onClose={() => setHotelOpen(false)} destCountry={dest || "France"} />
      <InsuranceModal open={insOpen} onClose={() => setInsOpen(false)} originCountry={origin || "United Kingdom"} destCountry={dest || "France"} />
      <MultiCityModal open={multiOpen} onClose={() => setMultiOpen(false)} originCountry={origin || "United Kingdom"} destCountry={dest || "France"} onSubmit={(cities) => { setSelectedCities(cities); setRetOpen(true); }} />
      <ReturnFromModal open={retOpen} onClose={() => setRetOpen(false)} cities={selectedCities} onSelect={() => setRetOpen(false)} />
      <UpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} />
    </div>
  );
}

export default function App() {
  const { user, login, logout } = useAuth();
  const [route, setRoute] = useState<Route>("chat");
  const [dest, setDest] = useState<string | undefined>();
  const [origin, setOrigin] = useState<string | undefined>();
  return (
    <div className="min-h-screen">
      <TopContext dest={dest} origin={origin} />
      <Header user={user} onLogin={login} onLogout={logout} route={route} setRoute={setRoute} />
      {route === "chat" ? (
        <Chatbot onSetDest={setDest} onSetOrigin={setOrigin} user={user} setRoute={setRoute} />
      ) : (
        <Dashboard origin={origin} dest={dest} />
      )}
    </div>
  );
}
