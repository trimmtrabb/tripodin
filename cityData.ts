export type City = { name: string; airport?: { name: string; code: string }; lat?: number; lng?: number };

const DATA: Record<string, City[]> = {
  "United States": [
    { name: "New York", airport: { name: "John F. Kennedy International", code: "JFK" }, lat: 40.6413, lng: -73.7781 },
    { name: "Los Angeles", airport: { name: "Los Angeles International", code: "LAX" }, lat: 33.9416, lng: -118.4085 },
    { name: "Chicago", airport: { name: "O'Hare International", code: "ORD" }, lat: 41.9742, lng: -87.9073 },
    { name: "Houston", airport: { name: "George Bush Intercontinental", code: "IAH" }, lat: 29.9902, lng: -95.3368 },
    { name: "Boston", airport: { name: "Logan International", code: "BOS" }, lat: 42.3656, lng: -71.0096 },
  ],
  "United Kingdom": [
    { name: "London", airport: { name: "Heathrow", code: "LHR" }, lat: 51.4700, lng: -0.4543 },
    { name: "Manchester", airport: { name: "Manchester", code: "MAN" }, lat: 53.3537, lng: -2.2749 },
  ],
  Germany: [
    { name: "Berlin", airport: { name: "Berlin Brandenburg", code: "BER" }, lat: 52.3667, lng: 13.5033 },
    { name: "Munich", airport: { name: "Munich", code: "MUC" }, lat: 48.3538, lng: 11.7861 },
    { name: "Frankfurt", airport: { name: "Frankfurt", code: "FRA" }, lat: 50.0379, lng: 8.5622 },
    { name: "Stuttgart", airport: { name: "Stuttgart", code: "STR" }, lat: 48.6900, lng: 9.2219 },
    { name: "Hamburg", airport: { name: "Hamburg", code: "HAM" }, lat: 53.6336, lng: 9.9956 },
    { name: "Düsseldorf", airport: { name: "Düsseldorf", code: "DUS" }, lat: 51.2895, lng: 6.7668 },
    { name: "Cologne", airport: { name: "Cologne/Bonn", code: "CGN" }, lat: 50.8659, lng: 7.1427 },
    { name: "Nuremberg", airport: { name: "Nuremberg", code: "NUE" }, lat: 49.4987, lng: 11.0669 },
  ],
  France: [
    { name: "Paris", airport: { name: "Charles de Gaulle", code: "CDG" }, lat: 49.0097, lng: 2.5479 },
    { name: "Lyon", airport: { name: "Lyon–Saint-Exupéry", code: "LYS" }, lat: 45.7219, lng: 5.0811 },
    { name: "Nice", airport: { name: "Nice Côte d'Azur", code: "NCE" }, lat: 43.6653, lng: 7.2150 },
    { name: "Strasbourg", airport: { name: "Strasbourg", code: "SXB" }, lat: 48.5443, lng: 7.6282 },
    { name: "Lille", airport: { name: "Lille", code: "LIL" }, lat: 50.5619, lng: 3.0890 },
    { name: "Marseille", airport: { name: "Marseille Provence", code: "MRS" }, lat: 43.4393, lng: 5.2215 },
    { name: "Toulouse", airport: { name: "Toulouse-Blagnac", code: "TLS" }, lat: 43.6293, lng: 1.3630 },
    { name: "Bordeaux", airport: { name: "Bordeaux–Mérignac", code: "BOD" }, lat: 44.8283, lng: -0.7156 },
    { name: "Nantes", airport: { name: "Nantes Atlantique", code: "NTE" }, lat: 47.1532, lng: -1.6107 },
  ],
  Spain: [
    { name: "Madrid", airport: { name: "Adolfo Suárez Madrid–Barajas", code: "MAD" }, lat: 40.4722, lng: -3.5608 },
    { name: "Barcelona", airport: { name: "Barcelona–El Prat", code: "BCN" }, lat: 41.2974, lng: 2.0833 },
    { name: "Valencia", airport: { name: "Valencia", code: "VLC" }, lat: 39.4893, lng: -0.4816 },
    { name: "Málaga", airport: { name: "Málaga–Costa del Sol", code: "AGP" }, lat: 36.6749, lng: -4.4991 },
  ],
  Italy: [
    { name: "Rome", airport: { name: "Leonardo da Vinci–Fiumicino", code: "FCO" }, lat: 41.8003, lng: 12.2389 },
    { name: "Milan", airport: { name: "Malpensa", code: "MXP" }, lat: 45.6301, lng: 8.7281 },
    { name: "Naples", airport: { name: "Naples International", code: "NAP" }, lat: 40.8860, lng: 14.2906 },
    { name: "Turin", airport: { name: "Turin", code: "TRN" }, lat: 45.2008, lng: 7.6497 },
  ],
  Canada: [
    { name: "Toronto", airport: { name: "Pearson", code: "YYZ" }, lat: 43.6777, lng: -79.6248 },
    { name: "Vancouver", airport: { name: "Vancouver", code: "YVR" }, lat: 49.1947, lng: -123.1792 },
    { name: "Montreal", airport: { name: "Montréal–Trudeau", code: "YUL" }, lat: 45.4706, lng: -73.7408 },
  ],
  Australia: [
    { name: "Sydney", airport: { name: "Sydney", code: "SYD" }, lat: -33.9399, lng: 151.1753 },
    { name: "Melbourne", airport: { name: "Melbourne", code: "MEL" }, lat: -37.6690, lng: 144.8430 },
    { name: "Brisbane", airport: { name: "Brisbane", code: "BNE" }, lat: -27.3942, lng: 153.1215 },
  ],
  Singapore: [
    { name: "Singapore", airport: { name: "Changi", code: "SIN" }, lat: 1.3644, lng: 103.9915 },
  ],
  UAE: [
    { name: "Dubai", airport: { name: "Dubai International", code: "DXB" }, lat: 25.2532, lng: 55.3657 },
    { name: "Abu Dhabi", airport: { name: "Zayed International", code: "AUH" }, lat: 24.4329, lng: 54.6511 },
    { name: "Sharjah", airport: { name: "Sharjah", code: "SHJ" }, lat: 25.3286, lng: 55.5170 },
  ],
};

export function getCities(country: string): City[] {
  return DATA[country] || [];
}

export function listCountries(): string[] {
  return Object.keys(DATA);
}

export function distanceKm(a: City, b: City): number {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}
