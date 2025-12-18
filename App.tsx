import React, { useMemo, useState } from "react";
import VisaUI from "./VisaUI";
import { FlightModal, HotelModal, InsuranceModal } from "./BookingModals";
import MultiCityModal, { ReturnFromModal } from "./MultiCityModal";
import UpsellModal from "./UpsellModal";
import { NoVisaBubble, SelectCitiesBubble, InfoBubble, UpsellBubble } from "./ChatBubbles";
import { isVisaFree, getAllCountries } from "./visaEngine";
import { getCities } from "./cityData";

type User = { id: string; username: string; email: string; picture?: string } | null;
type Route = "chat" | "dashboard";

function useAuth() {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem("tripodin_user");
    return raw ? JSON.parse(raw) : null;
  });
  const login = () => {
    const anyWin = window as any;
    const google = anyWin.google;
    const clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    
    if (!clientId) {
      if (confirm("Configuration Error: Google Client ID is missing (VITE_GOOGLE_CLIENT_ID).\n\nWould you like to use the insecure test login for now?")) {
         const u = { id: "test-user", username: "Test User", email: "test@example.com" };
         setUser(u);
         localStorage.setItem("tripodin_user", JSON.stringify(u));
      }
      return;
    }

    if (!google || !google.accounts || !google.accounts.oauth2) {
      alert("Google Sign-In script is not loaded yet. Please check your internet connection or ad blockers.");
      return;
    }
    
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: (response: any) => {
        if (response.access_token) {
          fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` },
          })
            .then((res) => res.json())
            .then((data) => {
              const u: User = {
                id: data.sub,
                username: data.name || data.email || "user",
                email: data.email || "",
                picture: data.picture,
              };
              setUser(u);
              localStorage.setItem("tripodin_user", JSON.stringify(u));
            })
            .catch((err) => console.error("Failed to fetch user info", err));
        }
      },
    });
    
    client.requestAccessToken();
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("tripodin_user");
  };
  return { user, login, logout };
}

function Header({ user, onLogin, onLogout, route, setRoute, onNewChat }: { user: User; onLogin: () => void; onLogout: () => void; route: Route; setRoute: (r: Route) => void; onNewChat: () => void }) {
  const [lang, setLang] = useState("en");
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm/50 backdrop-blur-md bg-white/90">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onNewChat}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white grid place-items-center shadow-blue-200 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
            <span className="text-xl">🧭</span>
          </div>
          <div>
             <div className="text-xl font-bold text-slate-900 tracking-tight">TripOdin</div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">AI Travel Assistant</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="en">🇺🇸 EN</option>
            <option value="de">🇩🇪 DE</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
          </select>
          
          <button className="hidden md:block px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" onClick={onNewChat}>New Trip</button>
          
          {!user ? (
            <>
              <button className="hidden md:block px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900" onClick={onLogin}>Log in</button>
              <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5" onClick={onLogin}>Sign Up</button>
            </>
          ) : (
            <>
              <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${route === "dashboard" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => setRoute("dashboard")}>Dashboard</button>
              <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600" onClick={onLogout}>Sign Out</button>
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
  const [totalStay, setTotalStay] = useState<number>(0);
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [transportModes, setTransportModes] = useState<Record<number, "flight" | "train" | "car">>({});
  const [tripType, setTripType] = useState<"oneway" | "round" | "multicity">("round");
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
      setMessages((m) => [...m, free ? { type: "noVisa" } : { type: "info", text: "Visa may be required. Select purposes to get recommendations." }]);
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
      <div className="card p-6 mb-6 shadow-lg border-blue-100 bg-white">
        <div className="hero-title mb-2 text-center text-blue-900">Start Your Journey</div>
        <div className="hero-sub mb-6 text-center">Select your origin and destination to get started</div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <CountrySelect 
              label="DEPARTURE:"
              color="blue"
              placeholder="Select origin country"
              options={countries} 
              value={origin} 
              onChange={(v) => { setOrigin(v); onSetOrigin(v); }} 
            />
          </div>
          <div>
            <CountrySelect 
              label="ARRIVAL:"
              color="green"
              placeholder="Select destination country"
              options={countries} 
              value={dest} 
              onChange={(v) => { setDest(v); onSetDest(v); }} 
            />
          </div>
        </div>

        <div className="mt-4 text-center">
             <div className="text-sm text-slate-500 mb-2">Popular Destinations</div>
             <div className="flex flex-wrap justify-center gap-2">
                {popular.map((p) => (
                  <button 
                    key={p} 
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-700 transition-colors" 
                    onClick={() => onPopular(p)}
                  >
                    {p}
                  </button>
                ))}
             </div>
        </div>
      </div>
      {origin && dest ? (
        <SelectionStatus origin={origin} dest={dest} visaFree={isVisaFree(origin, dest)} />
      ) : null}

      {/* 
        Step 1: Visa Information (Always First)
        Only show VisaUI immediately if destination is selected.
        The city selection will be hidden until the user is done with Visa.
      */}
      {dest && origin ? <VisaUI origin={origin} dest={dest} /> : null}

      {/* 
        Step 2: Trip Planning (After Visa)
        We will show a button to proceed to trip planning only after visa info is shown.
      */}
      {dest && origin && !citiesSelected ? (
        <div className="card p-4 mb-4 text-center">
          <div className="mb-2 font-medium text-lg">Ready to plan your trip?</div>
          <div className="text-slate-600 mb-4">Once you know your visa requirements, proceed to select your cities and flights.</div>
          <button 
            className="btn btn-primary w-full md:w-auto" 
            onClick={() => {
              setCitiesSelected(true);
              setMessages(m => [...m, { type: "selectCities" }]);
            }}
          >
            Plan My Trip (Flights & Hotels)
          </button>
        </div>
      ) : null}

      {messages.length > 0 ? (
      <div className="card p-0 mb-4" ref={listRef}>
        <div className="p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className="animate-[fadeIn_0.3s_ease]">
              {m.type === "text" ? (<div>{m.text}</div>) : null}
              {m.type === "noVisa" ? (<NoVisaBubble />) : null}
              {m.type === "selectCities" && dest && origin ? (
                <SelectCitiesBubble originCountry={origin} destCountry={dest} onContinue={(f, t, d, i, tm, tt) => { setFromCity(f); setToCity(t); if(d) setTotalStay(d); if(i) setItinerary(i); if(tm) setTransportModes(tm); if(tt) setTripType(tt); setShowMulti(true); if (!upsellShown) { setUpsellShown(true); setMessages((mm) => [...mm, { type: "upsell" }]); } }} />
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

      <FlightModal open={showFlight} onClose={() => setShowFlight(false)} originCountry={origin || ""} destCountry={dest || ""} totalStay={totalStay} fullItinerary={itinerary} />
      <HotelModal open={showHotel} onClose={() => setShowHotel(false)} destCountry={dest || ""} />
      <InsuranceModal open={showInsurance} onClose={() => setShowInsurance(false)} originCountry={origin || ""} destCountry={dest || ""} totalStay={totalStay} />
      <MultiCityModal open={showMulti} onClose={() => setShowMulti(false)} originCountry={origin || ""} destCountry={dest || ""} onSubmit={() => setShowMulti(false)} transportModes={transportModes} fullItinerary={itinerary} tripType={tripType} totalStay={totalStay} />
    </div>
  );
}

function SelectionStatus({ origin, dest, visaFree }: { origin: string; dest: string; visaFree: boolean }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 mb-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4 animate-in">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
           <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Origin</span>
           <span className="font-bold text-lg">{origin}</span>
        </div>
        <div className="text-slate-500">→</div>
        <div className="flex flex-col">
           <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Destination</span>
           <span className="font-bold text-lg">{dest}</span>
        </div>
      </div>
      
      <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${visaFree ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
        {visaFree ? (
           <><span>✅</span> <span>Visa-Free Travel</span></>
        ) : (
           <><span>⚠️</span> <span>Visa May Be Required</span></>
        )}
      </div>
    </div>
  );
}

function CountrySelect({ options, value, onChange, placeholder, label, color = "blue" }: { options: string[]; value: string; onChange: (v: string) => void; placeholder?: string; label?: string; color?: "blue" | "green" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [editing, setEditing] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
    return list.slice(0, 300);
  }, [query, options]);
  const pick = (v: string) => { onChange(v); setQuery(""); setOpen(false); setEditing(false); };
  
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = ref.current; if (!el) return; if (!el.contains(e.target as Node)) { setOpen(false); setEditing(false); }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setEditing(false); } };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("mousedown", onDown); window.removeEventListener("keydown", onKey); };
  }, []);

  const dotColor = color === "blue" ? "bg-blue-500" : "bg-green-500";
  const ringColor = color === "blue" ? "focus:ring-blue-500" : "focus:ring-green-500";
  const bgColor = color === "blue" ? "bg-blue-50" : "bg-green-50";

  return (
    <div className="relative" ref={ref}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${dotColor}`} />
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">{label}</div>
        </div>
      )}
      <div className="relative group">
        {value && !editing ? (
          <div 
            className={`w-full border border-slate-200 rounded-xl p-3 ${bgColor} cursor-pointer flex items-center justify-between hover:border-${color}-300 transition-colors shadow-sm`}
            onClick={() => { setEditing(true); setQuery(value); setOpen(true); }}
          >
            <span className="font-medium text-lg text-slate-800">{value}</span>
            <span className="text-xs text-slate-400 group-hover:text-slate-600">Edit</span>
          </div>
        ) : (
          <input 
            className={`w-full border border-slate-200 rounded-xl p-3 text-lg outline-none focus:ring-2 ${ringColor} transition-shadow shadow-sm placeholder:text-slate-300`} 
            placeholder={placeholder || "Search country..."}
            value={query} 
            autoFocus={editing}
            onFocus={() => setOpen(true)} 
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }} 
            onKeyDown={(e) => {
              if (!open) return;
              if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, filtered.length - 1));
              else if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
              else if (e.key === "Enter" && filtered[active]) pick(filtered[active]);
            }} 
          />
        )}
      </div>
      {open && filtered.length > 0 ? (
        <div className="absolute z-20 left-0 right-0 mt-2 bg-white rounded-xl border border-slate-100 shadow-xl max-h-64 overflow-y-auto py-1">
          {filtered.map((o, i) => (
            <button 
              key={o} 
              className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors ${i === active ? "bg-slate-50 text-blue-600" : "text-slate-700"}`} 
              onMouseEnter={() => setActive(i)} 
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => pick(o)}
            >
              {o}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Dashboard({ origin, dest, onReset }: { origin?: string; dest?: string; onReset: () => void }) {
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
              <button className="btn btn-secondary" onClick={onReset}>Reset Profile</button>
              <button className="btn btn-secondary" onClick={() => { alert("Account deleted"); onReset(); }}>Delete Account</button>
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
  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {
    setOrigin(undefined);
    setDest(undefined);
    setRoute("chat");
    setChatKey((k) => k + 1);
  };
  
  // Force cleanup of old caches on mount
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    }
    caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
  }, []);

  const handleReset = () => {
    localStorage.clear();
    logout();
    setOrigin(undefined);
    setDest(undefined);
    setRoute("chat");
  };

  return (
    <div className="min-h-screen">
      <TopContext dest={dest} origin={origin} />
      <Header user={user} onLogin={login} onLogout={logout} route={route} setRoute={setRoute} onNewChat={handleNewChat} />
      {route === "chat" ? (
        <Chatbot key={chatKey} onSetDest={setDest} onSetOrigin={setOrigin} user={user} setRoute={setRoute} />
      ) : (
        <Dashboard origin={origin} dest={dest} onReset={handleReset} />
      )}
    </div>
  );
}
