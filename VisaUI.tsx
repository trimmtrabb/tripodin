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
    <div className="mt-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <div className="text-2xl">✈️</div>
        <div>
           <div className="font-bold text-blue-900">International Flights Required</div>
           <div className="text-sm text-blue-800 mt-1">You can choose to return from the same city you arrived in ({dest}), or from another city in the same country (open-jaw ticket).</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="font-bold text-xl text-slate-800 mb-2">Select travel purposes</div>
        <div className="text-slate-500 mb-4">Select all activities you plan to do to get the best visa recommendation.</div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = purposes.includes(c);
            return (
              <button 
                key={c} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200 transform scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} 
                onClick={() => {
                  setPurposes((p) => active ? p.filter((x) => x !== c) : [...p, c]);
                  setSelected(null);
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-xl inline-flex">
        <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "options" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTab("options")}>Visa Options</button>
        <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "docs" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`} onClick={() => setTab("docs")}>Required Documents</button>
      </div>

      {tab === "options" ? (
        list.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
            <div className="text-5xl mb-4 opacity-50">🔍</div>
            <div className="text-xl font-bold text-slate-700 mb-2">No matching visas found</div>
            <div className="text-slate-600 max-w-md mx-auto">
              {purposes.length > 0 
                ? "We couldn't find a single visa that covers all your selected activities. Try selecting fewer purposes."
                : "Select at least one travel purpose above to see recommendations."}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {list.map((v, i) => {
              const best = i === 0;
              const isSel = selected?.name === v.name;
              return (
                <div 
                    key={v.name} 
                    className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border ${isSel ? "border-blue-500 ring-2 ring-blue-200 shadow-xl scale-[1.02]" : "border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300"}`} 
                    onClick={() => setSelected(v)}
                >
                  {/* Card Header */}
                  <div className={`px-6 py-4 flex items-center justify-between ${isSel ? "bg-blue-600" : "bg-slate-50 group-hover:bg-blue-50/50"}`}>
                     <div className="flex items-center gap-3">
                        <div className={`font-bold text-lg ${isSel ? "text-white" : "text-slate-800"}`}>{v.name}</div>
                        {best && !isSel && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700 tracking-wide">Best Match</span>}
                     </div>
                     {isSel && <div className="bg-white/20 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">Selected</div>}
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-center">
                          <div className="bg-slate-50 rounded-lg p-2">
                              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Fee</div>
                              <div className="font-bold text-slate-800">{v.fee}</div>
                          </div>
                           <div className="bg-slate-50 rounded-lg p-2">
                              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Time</div>
                              <div className="font-bold text-slate-800">{v.processing}</div>
                          </div>
                           <div className="bg-slate-50 rounded-lg p-2">
                              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Validity</div>
                              <div className="font-bold text-slate-800">{v.validity}</div>
                          </div>
                      </div>
                      
                      {v.description && <div className="text-sm text-slate-600 italic mb-4 border-l-2 border-blue-200 pl-3">{v.description}</div>}
                      
                      <div className="flex flex-wrap gap-1">
                          {v.mappedCategories.map(c => (
                              <span key={c} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">{c}</span>
                          ))}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[300px]">
          {selected ? (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                 <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center text-xl">📄</div>
                 <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Requirements For</div>
                    <div className="text-xl font-bold text-slate-800">{selected.name}</div>
                 </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(selected.documents).map(([k, items]) => (
                  <div key={k} className="">
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {k}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((it) => (
                          <li key={it} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="text-blue-400 mt-0.5">•</span>
                              <span>{it}</span>
                          </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                 <div className="font-bold text-slate-800 mb-3">Interactive Checklist</div>
                 <div className="flex flex-wrap gap-3">
                    {Object.values(selected.documents).flat().map((d, idx) => (
                      <label key={idx} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="text-sm text-slate-700">{d}</span>
                      </label>
                    ))}
                  </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-6xl mb-4 opacity-20">📋</div>
                <div className="text-xl font-medium text-slate-500">Select a visa option to view documents</div>
                <div className="text-slate-400 mt-2">Go back to "Visa Options" and click a card</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
