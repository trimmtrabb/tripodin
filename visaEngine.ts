import { GENERATED_VISA_DATA } from "./visaDataGenerated";

export type VisaOption = {
  name: string;
  fee: string;
  processing: string;
  validity: string;
  mappedCategories: string[];
  documents: Record<string, string[]>;
  sourceCountry?: string;
  country?: string; // Destination country
  description?: string;
};

export type VisaDB = VisaOption[];

export async function loadVisaData(): Promise<VisaDB> {
  // Use the generated data from the 26 files
  return GENERATED_VISA_DATA as VisaDB;
}

export function recommendVisas(db: VisaDB, purposes: string[], destCountry: string): VisaOption[] {
  const normalize = (c: string) => {
    const lower = c.toLowerCase().trim();
    if (lower === "uk" || lower === "united kingdom") return "united kingdom";
    if (lower === "usa" || lower === "us" || lower === "united states") return "united states";
    if (lower === "uae" || lower === "united arab emirates") return "united arab emirates";
    return lower;
  };

  const target = normalize(destCountry);

  const filtered = db.filter((v) => {
    // If the visa entry has a specific destination country (from our new data source)
    if (v.country) {
        const vTarget = normalize(v.country);
        if (vTarget === target) return true;
        // If strict match fails, we exclude it because this DB is partitioned by country.
        return false;
    }
    
    // Fallback for legacy data without country field (if any mixed in)
    // Quick fix: If the visa name contains "Schengen" but destination is NOT a Schengen country, filter it out.
    const isDestSchengen = Agreements.EU_SCHENGEN.map(normalize).includes(target);
    if (/schengen/i.test(v.name) && !isDestSchengen) return false;

    if (target === "united states") {
         if (/schengen/i.test(v.name)) return false;
    }

    return true;
  });

  // If no purposes selected, show all available visas for this country
  if (purposes.length === 0) return filtered;

  const PURPOSE_KEYWORDS: Record<string, string[]> = {
    "Leisure & Tourism": ["touris", "visit", "holiday", "vacation", "leisure", "sightseeing", "b-2", "b-1/b-2", "travel"],
    "Business Travel": ["business", "conference", "meeting", "commercial", "trade", "b-1", "investor", "entrepreneur", "corporate"],
    "Educational & Study": ["student", "study", "education", "academic", "vocational", "f-1", "m-1", "j-1", "research", "intern", "training", "exchange"],
    "Medical & Wellness": ["medical", "treatment", "health", "patient"],
    "Family & Friends": ["family", "spouse", "child", "relative", "reunion", "marriage", "fiancé", "partner", "dependant"],
    "Religious & Spiritual": ["religious", "missionary", "pilgrimage", "r-1"],
    "Adventure & Sports": ["sport", "athlete", "competition", "p-1", "adventure"],
    "Culture & History": ["cultur", "art", "perform", "o-1", "p-1", "history"],
    // Default fallbacks for generic tourism
    "Food & Dining": ["touris", "visit", "holiday"],
    "Shopping & Markets": ["touris", "visit", "shopping"],
  };

  const score = (v: VisaOption) => {
    // Collect keywords per purpose to enforce AND logic
    const purposeKeywordSets = purposes.map(p => PURPOSE_KEYWORDS[p] || []);
    
    if (purposeKeywordSets.length === 0) return 0;

    const searchableText = [
      v.name,
      ...(v.mappedCategories || []),
      v.description || "",
      v.country || ""
    ].join(" ").toLowerCase();

    // AND Logic: The visa must have at least one match for EVERY selected purpose
    const matchesAllPurposes = purposeKeywordSets.every(keywords => 
      keywords.some(k => searchableText.includes(k.toLowerCase()))
    );
    
    if (!matchesAllPurposes) return 0; // If it fails even one purpose, it's out.

    // If it matches all purposes, calculate a relevance score
    let matchCount = 100; // Base high score for matching all
    
    // Add bonus points for total keyword density
    purposeKeywordSets.flat().forEach(k => {
       if (searchableText.includes(k.toLowerCase())) matchCount++;
    });

    return matchCount;
  };
  
  // Filter out options with 0 score (no relevance to selected purposes)
  const relevant = filtered.filter(v => score(v) > 0);
  
  return relevant.sort((a, b) => score(b) - score(a));
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
  GENERATED_VISA_DATA.forEach((v: any) => { if (v.country) set.add(v.country); });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
