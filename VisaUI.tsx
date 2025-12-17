import React, { useEffect, useMemo, useState } from "react";
import { loadVisaData, recommendVisas, isVisaFree, VisaOption } from "./visaEngine";

export default function VisaUI({ origin, dest }: { origin: string; dest: string }) {
  const [db, setDb] = useState<VisaOption[]>([]);
  const [purposes, setPurposes] = useState<string[]>([]);
  const [tab, setTab] = useState<"options" | "docs">("options");
  const [selected, setSelected] = useState<VisaOption | null>(null);
  useEffect(() => { loadVisaData().then(setDb); }, []);
  const list = useMemo(() => recommendVisas(db, purposes, dest), [db, purposes, dest]);
  const visaFree = isVisaFree(origin, dest);
  const cats = [
    "Leisure & Tourism",
    "Business Travel",
    "Adventure & Sports",
    "Culture & History",
    "Food & Dining",
    "Shopping & Markets",
    "Medical & Wellness",
    "Educational & Study",
    "Family & Friends",
    "Religious & Spiritual",
  ];
  if (visaFree) return null;
  return (
    <div className="mt-4">
      <div className="bubble bubble-blue p-4 animate-in">
        <div className="font-semibold text-slate-800">International Flights Required</div>
        <div className="text-sm text-slate-700 mt-1">✈️ You can choose to return from the same city you arrived in ({dest}), or from another city in the same country. This is called an open-jaw ticket and is supported by most airlines.</div>
      </div>
      <div className="card p-4 mb-3">
        <div className="font-medium mb-2">Select travel purposes</div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = purposes.includes(c);
            return (
              <button key={c} className={`btn ${active ? "btn-primary" : "btn-secondary"}`} onClick={() => setPurposes((p) => active ? p.filter((x) => x !== c) : [...p, c])}>{c}</button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        <button className={`btn ${tab === "options" ? "btn-primary" : "btn-secondary"}`} onClick={() => setTab("options")}>Visa Options</button>
        <button className={`btn ${tab === "docs" ? "btn-primary" : "btn-secondary"}`} onClick={() => setTab("docs")}>Required Documents</button>
      </div>
      {tab === "options" ? (
        <div className="grid md:grid-cols-2 gap-3">
          {list.map((v, i) => {
            const best = i === 0;
            const isSel = selected?.name === v.name;
            return (
              <div key={v.name} className={`card p-4 ${isSel ? "ring-2 ring-green-400" : ""}`} onClick={() => setSelected(v)}>
                <div className="flex items-center gap-2 mb-1">
                  {isSel ? <span className="badge badge-selected">Selected</span> : best ? <span className="badge badge-best">Best Match</span> : null}
                  <div className="font-semibold">{v.name}</div>
                </div>
                <div className="text-sm text-slate-600">Fee {v.fee} · Processing {v.processing} · Validity {v.validity}</div>
                <div className="mt-2 text-sm">{v.mappedCategories.join(", ")}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-4">
          {selected ? (
            <div>
              <div className="font-semibold mb-2">{selected.name}</div>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(selected.documents).map(([k, items]) => (
                  <div key={k} className="">
                    <div className="font-medium mb-1">{k}</div>
                    <ul className="list-disc pl-5 text-sm">
                      {items.map((it) => (<li key={it}>{it}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm">Interactive checklist</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.values(selected.documents).flat().map((d) => (
                  <label key={d} className="inline-flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-slate-600">Select a visa option to view documents</div>
          )}
        </div>
      )}
    </div>
  );
}
