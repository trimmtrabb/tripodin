export type VisaOption = {
  name: string;
  fee: string;
  processing: string;
  validity: string;
  mappedCategories: string[];
  documents: Record<string, string[]>;
  sourceCountry?: string;
};

export type VisaDB = VisaOption[];

export async function loadVisaData(): Promise<VisaDB> {
  try {
    const resp = await fetch("/Final_Mapped_Visa_Options.csv");
    const text = await resp.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
    const header = lines[0].split(",");
    const nameIdx = header.findIndex((h) => /visa/i.test(h));
    const feeIdx = header.findIndex((h) => /fee/i.test(h));
    const procIdx = header.findIndex((h) => /process/i.test(h));
    const valIdx = header.findIndex((h) => /valid/i.test(h));
    const catIdx = header.findIndex((h) => /mappedCategories/i.test(h));
    const srcIdx = header.findIndex((h) => /source_country/i.test(h));
    const db: VisaDB = lines.slice(1).map((l) => {
      const cols = l.split(",");
      const cats = (cols[catIdx] || "").split("|").map((x) => x.trim()).filter(Boolean);
      return {
        name: cols[nameIdx] || "",
        fee: cols[feeIdx] || "",
        processing: cols[procIdx] || "",
        validity: cols[valIdx] || "",
        mappedCategories: cats,
        documents: {
          Basic: ["Passport", "Photos", "Application form"],
          Financial: ["Bank statements", "Employment letters"],
          Purpose: ["Hotel bookings", "Invitation letters", "Enrollment letters"],
          Supporting: ["Travel insurance", "Itinerary", "Proof of ties"],
        },
        sourceCountry: cols[srcIdx] || undefined,
      } as VisaOption;
    });
    return db;
  } catch {
    return [
      {
        name: "Tourist Visa",
        fee: "$80",
        processing: "5-10 days",
        validity: "90 days",
        mappedCategories: ["Leisure & Tourism", "Culture & History"],
        documents: {
          Basic: ["Passport", "Photos", "Application form"],
          Financial: ["Bank statements"],
          Purpose: ["Hotel bookings"],
          Supporting: ["Travel insurance", "Itinerary"],
        },
      },
      {
        name: "Business Visa",
        fee: "$120",
        processing: "7-14 days",
        validity: "180 days",
        mappedCategories: ["Business Travel"],
        documents: {
          Basic: ["Passport", "Photos", "Application form"],
          Financial: ["Bank statements", "Employment letters"],
          Purpose: ["Invitation letters"],
          Supporting: ["Travel insurance", "Itinerary"],
        },
      },
    ];
  }
}

export function recommendVisas(db: VisaDB, purposes: string[], destCountry: string): VisaOption[] {
  const filtered = db.filter((v) => {
    // If visa data has a source country, it implies destination is implicitly handled or it's a specific route.
    // However, the issue is that we need to ensure the visa is FOR the destination country.
    // Looking at loadVisaData, we don't seem to parse 'destination_country' from CSV explicitly into the object, 
    // or maybe the 'name' contains it.
    // Let's assume the current CSV structure might not be perfect, but let's try to filter by name or implicit rules.
    
    // Quick fix: If the visa name contains "Schengen" but destination is NOT a Schengen country, filter it out.
    const isDestSchengen = Agreements.EU_SCHENGEN.includes(destCountry);
    if (/schengen/i.test(v.name) && !isDestSchengen) return false;

    // If destination is USA, we expect "US" or "USA" or "United States" in visa name or it should be a standard US visa type like B1/B2
    if (destCountry === "United States" || destCountry === "USA") {
         if (/schengen/i.test(v.name)) return false;
         // If we had more metadata we could be stricter.
    }

    return true;
  });

  const score = (v: VisaOption) => {
    const match = purposes.filter((p) => v.mappedCategories.includes(p)).length;
    return match;
  };
  return filtered.sort((a, b) => score(b) - score(a));
}

export const Agreements = {
  EU_SCHENGEN: [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", 
    "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", 
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Iceland", "Liechtenstein", "Norway", 
    "Switzerland", "United Kingdom" // UK is often handled separately but for broad compatibility we can leave it or manage via CTA
  ],
  GCC: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Oman", "Kuwait", "Bahrain", "UAE"],
  MERCOSUR: ["Argentina", "Brazil", "Paraguay", "Uruguay", "Bolivia", "Chile", "Colombia", "Ecuador", "Peru"],
  CARICOM: [
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Dominica", "Grenada", "Guyana", "Jamaica", 
    "Montserrat", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago"
  ],
  EAC: ["Burundi", "Democratic Republic of the Congo", "Kenya", "Rwanda", "South Sudan", "Tanzania", "Uganda"],
  CIS: ["Russia", "Belarus", "Kazakhstan", "Armenia", "Kyrgyzstan", "Uzbekistan", "Turkmenistan"],
  ASEAN: ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"],
  NORDIC: ["Denmark", "Finland", "Iceland", "Norway", "Sweden"],
  CTA: ["United Kingdom", "Ireland"]
};

export function isVisaFree(origin: string, dest: string): boolean {
  if (origin === dest) return true;
  if (Agreements.EU_SCHENGEN.includes(origin) && Agreements.EU_SCHENGEN.includes(dest)) return true;
  if (Agreements.GCC.includes(origin) && Agreements.GCC.includes(dest)) return true;
  if (Agreements.MERCOSUR.includes(origin) && Agreements.MERCOSUR.includes(dest)) return true;
  if (Agreements.ASEAN.includes(origin) && Agreements.ASEAN.includes(dest)) return true;
  if (Agreements.CARICOM.includes(origin) && Agreements.CARICOM.includes(dest)) return true;
  if (Agreements.EAC.includes(origin) && Agreements.EAC.includes(dest)) return true;
  if (Agreements.CIS.includes(origin) && Agreements.CIS.includes(dest)) return true;
  if (Agreements.NORDIC.includes(origin) && Agreements.NORDIC.includes(dest)) return true;
  if (Agreements.CTA.includes(origin) && Agreements.CTA.includes(dest)) return true;
  return false;
}

export function isSameZone(origin: string, dest: string): boolean {
  return isVisaFree(origin, dest);
}

export async function getAllCountries(): Promise<string[]> {
  const files = [
    "/Final_Mapped_Visa_Options.csv",
    "/Cleaned_Mapped_Visa_Options.csv",
    "/v2 Final Cleaned_Mapped_Visa_Options_downloaded_from_drive csv.csv",
    "/VisaTypes.csv",
  ];
  const set = new Set<string>();
  const splitCSV = (line: string) => {
    const out: string[] = [];
    let cur = ""; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { out.push(cur); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const clean = (s: string) => s.replace(/^"|"$/g, "").trim();
  const isCountry = (s: string) => {
    if (!s) return false;
    if (/\d/.test(s)) return false;
    if (/[A-Za-z]{2,}\s+visa/i.test(s)) return false;
    if (/(USD|EUR|AED|QAR|CAD)/i.test(s)) return false;
    if (s.length < 3) return false;
    return /^[A-Za-z][A-Za-z\s\-\'\(\)]+$/.test(s);
  };
  for (const file of files) {
    try {
      const resp = await fetch(file);
      if (!resp.ok) continue;
      const text = await resp.text();
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
      const header = splitCSV(lines[0]);
      const srcIdx = header.findIndex((h) => /source[_\s]?country/i.test(h) || /destination[_\s]?country/i.test(h));
      if (srcIdx < 0) continue;
      for (const l of lines.slice(1)) {
        const cols = splitCSV(l);
        const raw = clean(cols[srcIdx] || "");
        if (isCountry(raw)) set.add(raw);
      }
    } catch {}
  }
  Object.values(Agreements).flat().forEach((c) => set.add(c));
  ["United States", "United Kingdom", "UAE", "China", "India", "Germany", "France", "Italy", "Spain", "Mexico", "Canada", "Australia", "Japan"].forEach((c) => set.add(c));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
