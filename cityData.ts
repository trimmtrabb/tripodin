export type City = { name: string; airport?: { name: string; code: string }; lat?: number; lng?: number };

const DATA: Record<string, City[]> = {
  "United States": [
    { name: "New York", airport: { name: "John F. Kennedy International", code: "JFK" }, lat: 40.6413, lng: -73.7781 },
    { name: "Los Angeles", airport: { name: "Los Angeles International", code: "LAX" }, lat: 33.9416, lng: -118.4085 },
    { name: "Chicago", airport: { name: "O'Hare International", code: "ORD" }, lat: 41.9742, lng: -87.9073 },
    { name: "Houston", airport: { name: "George Bush Intercontinental", code: "IAH" }, lat: 29.9902, lng: -95.3368 },
    { name: "Boston", airport: { name: "Logan International", code: "BOS" }, lat: 42.3656, lng: -71.0096 },
    { name: "San Francisco", airport: { name: "San Francisco International", code: "SFO" }, lat: 37.6213, lng: -122.3790 },
    { name: "Seattle", airport: { name: "Seattle–Tacoma International", code: "SEA" }, lat: 47.4502, lng: -122.3088 },
    { name: "Atlanta", airport: { name: "Hartsfield–Jackson Atlanta International", code: "ATL" }, lat: 33.6407, lng: -84.4277 },
    { name: "Miami", airport: { name: "Miami International", code: "MIA" }, lat: 25.7959, lng: -80.2870 },
    { name: "Las Vegas", airport: { name: "Harry Reid International", code: "LAS" }, lat: 36.0840, lng: -115.1537 },
    { name: "San Diego", airport: { name: "San Diego International", code: "SAN" }, lat: 32.7338, lng: -117.1933 },
    { name: "Phoenix", airport: { name: "Phoenix Sky Harbor International", code: "PHX" }, lat: 33.4343, lng: -112.0116 },
    { name: "Philadelphia", airport: { name: "Philadelphia International", code: "PHL" }, lat: 39.8729, lng: -75.2437 },
    { name: "Washington, D.C.", airport: { name: "Washington Dulles International", code: "IAD" }, lat: 38.9531, lng: -77.4565 },
    { name: "Dallas", airport: { name: "Dallas/Fort Worth International", code: "DFW" }, lat: 32.8998, lng: -97.0403 },
    { name: "Denver", airport: { name: "Denver International", code: "DEN" }, lat: 39.8561, lng: -104.6737 },
    { name: "Orlando", airport: { name: "Orlando International", code: "MCO" }, lat: 28.4312, lng: -81.3081 },
    { name: "Austin", airport: { name: "Austin–Bergstrom International", code: "AUS" }, lat: 30.2026, lng: -97.6671 },
    { name: "San Jose", airport: { name: "San Jose International", code: "SJC" }, lat: 37.3639, lng: -121.9289 },
    { name: "Charlotte", airport: { name: "Charlotte Douglas International", code: "CLT" }, lat: 35.2140, lng: -80.9431 },
    { name: "Detroit", airport: { name: "Detroit Metropolitan", code: "DTW" }, lat: 42.2124, lng: -83.3534 },
    { name: "Minneapolis", airport: { name: "Minneapolis–Saint Paul International", code: "MSP" }, lat: 44.8831, lng: -93.2223 },
    { name: "Salt Lake City", airport: { name: "Salt Lake City International", code: "SLC" }, lat: 40.7899, lng: -111.9791 },
    { name: "New Orleans", airport: { name: "Louis Armstrong New Orleans International", code: "MSY" }, lat: 29.9934, lng: -90.2580 },
    { name: "Tampa", airport: { name: "Tampa International", code: "TPA" }, lat: 27.9755, lng: -82.5332 },
    { name: "Portland", airport: { name: "Portland International", code: "PDX" }, lat: 45.5887, lng: -122.5975 },
    { name: "Raleigh", airport: { name: "Raleigh–Durham International", code: "RDU" }, lat: 35.8776, lng: -78.7875 },
    { name: "Nashville", airport: { name: "Nashville International", code: "BNA" }, lat: 36.1263, lng: -86.6774 },
  ],
  "United Kingdom": [
    { name: "London", airport: { name: "Heathrow", code: "LHR" }, lat: 51.4700, lng: -0.4543 },
    { name: "Manchester", airport: { name: "Manchester", code: "MAN" }, lat: 53.3537, lng: -2.2749 },
    { name: "Edinburgh", airport: { name: "Edinburgh", code: "EDI" }, lat: 55.9508, lng: -3.3723 },
    { name: "Birmingham", airport: { name: "Birmingham", code: "BHX" }, lat: 52.4530, lng: -1.7480 },
    { name: "Glasgow", airport: { name: "Glasgow", code: "GLA" }, lat: 55.8719, lng: -4.4331 },
    { name: "Bristol", airport: { name: "Bristol", code: "BRS" }, lat: 51.3827, lng: -2.7191 },
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
    { name: "Hannover", airport: { name: "Hanover", code: "HAJ" }, lat: 52.4603, lng: 9.6837 },
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
    { name: "Montpellier", airport: { name: "Montpellier–Méditerranée", code: "MPL" }, lat: 43.5762, lng: 3.9632 },
    { name: "Rennes", airport: { name: "Rennes–Saint-Jacques", code: "RNS" }, lat: 48.0695, lng: -1.7345 },
  ],
  Spain: [
    { name: "Madrid", airport: { name: "Adolfo Suárez Madrid–Barajas", code: "MAD" }, lat: 40.4722, lng: -3.5608 },
    { name: "Barcelona", airport: { name: "Barcelona–El Prat", code: "BCN" }, lat: 41.2974, lng: 2.0833 },
    { name: "Valencia", airport: { name: "Valencia", code: "VLC" }, lat: 39.4893, lng: -0.4816 },
    { name: "Málaga", airport: { name: "Málaga–Costa del Sol", code: "AGP" }, lat: 36.6749, lng: -4.4991 },
    { name: "Seville", airport: { name: "Seville", code: "SVQ" }, lat: 37.4170, lng: -6.1495 },
    { name: "Bilbao", airport: { name: "Bilbao", code: "BIO" }, lat: 43.3011, lng: -2.9106 },
    { name: "Palma de Mallorca", airport: { name: "Palma de Mallorca", code: "PMI" }, lat: 39.5517, lng: 2.7333 },
    { name: "Alicante", airport: { name: "Alicante–Elche", code: "ALC" }, lat: 38.2822, lng: -0.5582 },
  ],
  Italy: [
    { name: "Rome", airport: { name: "Leonardo da Vinci–Fiumicino", code: "FCO" }, lat: 41.8003, lng: 12.2389 },
    { name: "Milan", airport: { name: "Malpensa", code: "MXP" }, lat: 45.6301, lng: 8.7281 },
    { name: "Naples", airport: { name: "Naples International", code: "NAP" }, lat: 40.8860, lng: 14.2906 },
    { name: "Turin", airport: { name: "Turin", code: "TRN" }, lat: 45.2008, lng: 7.6497 },
    { name: "Venice", airport: { name: "Venice Marco Polo", code: "VCE" }, lat: 45.5053, lng: 12.3519 },
    { name: "Florence", airport: { name: "Florence Peretola", code: "FLR" }, lat: 43.8099, lng: 11.2051 },
    { name: "Bologna", airport: { name: "Bologna Guglielmo Marconi", code: "BLQ" }, lat: 44.5342, lng: 11.2891 },
  ],
  Netherlands: [
    { name: "Amsterdam", airport: { name: "Schiphol", code: "AMS" }, lat: 52.3105, lng: 4.7683 },
    { name: "Rotterdam", airport: { name: "Rotterdam The Hague", code: "RTM" }, lat: 51.9569, lng: 4.4372 },
    { name: "Eindhoven", airport: { name: "Eindhoven", code: "EIN" }, lat: 51.4501, lng: 5.3745 },
    { name: "The Hague", lat: 52.0705, lng: 4.3007 },
  ],
  Belgium: [
    { name: "Brussels", airport: { name: "Brussels", code: "BRU" }, lat: 50.9010, lng: 4.4846 },
    { name: "Antwerp", airport: { name: "Antwerp", code: "ANR" }, lat: 51.1900, lng: 4.4600 },
    { name: "Charleroi", airport: { name: "Brussels South Charleroi", code: "CRL" }, lat: 50.4592, lng: 4.4539 },
    { name: "Bruges", airport: { name: "Ostend–Bruges", code: "OST" }, lat: 51.1989, lng: 2.8622 },
    { name: "Liège", airport: { name: "Liège", code: "LGG" }, lat: 50.6374, lng: 5.4432 },
    { name: "Ghent", lat: 51.0543, lng: 3.7174 },
  ],
  Switzerland: [
    { name: "Zurich", airport: { name: "Zurich", code: "ZRH" }, lat: 47.4647, lng: 8.5492 },
    { name: "Geneva", airport: { name: "Geneva", code: "GVA" }, lat: 46.2380, lng: 6.1090 },
    { name: "Basel", airport: { name: "EuroAirport Basel–Mulhouse–Freiburg", code: "BSL" }, lat: 47.5900, lng: 7.5290 },
    { name: "Bern", airport: { name: "Bern", code: "BRN" }, lat: 46.9141, lng: 7.4972 },
  ],
  Austria: [
    { name: "Vienna", airport: { name: "Vienna International", code: "VIE" }, lat: 48.1103, lng: 16.5697 },
    { name: "Salzburg", airport: { name: "Salzburg", code: "SZG" }, lat: 47.7933, lng: 13.0043 },
    { name: "Innsbruck", airport: { name: "Innsbruck", code: "INN" }, lat: 47.2602, lng: 11.3439 },
    { name: "Graz", airport: { name: "Graz", code: "GRZ" }, lat: 46.9910, lng: 15.4396 },
  ],
  Portugal: [
    { name: "Lisbon", airport: { name: "Lisbon", code: "LIS" }, lat: 38.7742, lng: -9.1342 },
    { name: "Porto", airport: { name: "Porto", code: "OPO" }, lat: 41.2376, lng: -8.6697 },
    { name: "Faro", airport: { name: "Faro", code: "FAO" }, lat: 37.0176, lng: -7.9709 },
    { name: "Funchal", airport: { name: "Madeira", code: "FNC" }, lat: 32.6979, lng: -16.7745 },
  ],
  Poland: [
    { name: "Warsaw", airport: { name: "Warsaw Chopin", code: "WAW" }, lat: 52.1657, lng: 20.9671 },
    { name: "Krakow", airport: { name: "John Paul II Kraków–Balice", code: "KRK" }, lat: 50.0777, lng: 19.7848 },
    { name: "Gdansk", airport: { name: "Gdańsk Lech Wałęsa", code: "GDN" }, lat: 54.3776, lng: 18.4662 },
    { name: "Wroclaw", airport: { name: "Wrocław Copernicus", code: "WRO" }, lat: 51.1027, lng: 16.8858 },
    { name: "Poznan", airport: { name: "Poznań–Ławica", code: "POZ" }, lat: 52.4210, lng: 16.8263 },
  ],
  Greece: [
    { name: "Athens", airport: { name: "Athens International", code: "ATH" }, lat: 37.9364, lng: 23.9445 },
    { name: "Thessaloniki", airport: { name: "Thessaloniki", code: "SKG" }, lat: 40.5197, lng: 22.9717 },
    { name: "Heraklion", airport: { name: "Heraklion", code: "HER" }, lat: 35.3394, lng: 25.1801 },
    { name: "Rhodes", airport: { name: "Rhodes", code: "RHO" }, lat: 36.4054, lng: 28.0862 },
  ],
  "Czech Republic": [
    { name: "Prague", airport: { name: "Václav Havel Airport Prague", code: "PRG" }, lat: 50.1008, lng: 14.26 },
    { name: "Brno", airport: { name: "Brno–Tuřany", code: "BRQ" }, lat: 49.1513, lng: 16.6944 },
    { name: "Ostrava", airport: { name: "Ostrava", code: "OSR" }, lat: 49.6963, lng: 18.1111 },
  ],
  Hungary: [
    { name: "Budapest", airport: { name: "Budapest Ferenc Liszt", code: "BUD" }, lat: 47.4399, lng: 19.2611 },
    { name: "Debrecen", airport: { name: "Debrecen", code: "DEB" }, lat: 47.4889, lng: 21.6019 },
  ],
  Sweden: [
    { name: "Stockholm", airport: { name: "Stockholm Arlanda", code: "ARN" }, lat: 59.6519, lng: 17.9186 },
    { name: "Gothenburg", airport: { name: "Göteborg Landvetter", code: "GOT" }, lat: 57.6628, lng: 12.2790 },
    { name: "Malmö", airport: { name: "Malmö", code: "MMX" }, lat: 55.5363, lng: 13.3762 },
  ],
  Norway: [
    { name: "Oslo", airport: { name: "Oslo Gardermoen", code: "OSL" }, lat: 60.1939, lng: 11.1004 },
    { name: "Bergen", airport: { name: "Bergen Flesland", code: "BGO" }, lat: 60.2934, lng: 5.2181 },
    { name: "Stavanger", airport: { name: "Stavanger Sola", code: "SVG" }, lat: 58.8767, lng: 5.6378 },
  ],
  Denmark: [
    { name: "Copenhagen", airport: { name: "Copenhagen", code: "CPH" }, lat: 55.6181, lng: 12.6561 },
    { name: "Aarhus", airport: { name: "Aarhus", code: "AAR" }, lat: 56.3087, lng: 10.6204 },
    { name: "Billund", airport: { name: "Billund", code: "BLL" }, lat: 55.7403, lng: 9.1479 },
  ],
  Finland: [
    { name: "Helsinki", airport: { name: "Helsinki", code: "HEL" }, lat: 60.3172, lng: 24.9633 },
    { name: "Turku", airport: { name: "Turku", code: "TKU" }, lat: 60.5140, lng: 22.2627 },
    { name: "Tampere", airport: { name: "Tampere–Pirkkala", code: "TMP" }, lat: 61.4141, lng: 23.6044 },
  ],
  Ireland: [
    { name: "Dublin", airport: { name: "Dublin", code: "DUB" }, lat: 53.4272, lng: -6.2436 },
    { name: "Cork", airport: { name: "Cork", code: "ORK" }, lat: 51.8413, lng: -8.4911 },
    { name: "Shannon", airport: { name: "Shannon", code: "SNN" }, lat: 52.7019, lng: -8.9248 },
  ],
  Romania: [
    { name: "Bucharest", airport: { name: "Henri Coandă International", code: "OTP" }, lat: 44.5711, lng: 26.0850 },
    { name: "Cluj-Napoca", airport: { name: "Cluj", code: "CLJ" }, lat: 46.7852, lng: 23.6862 },
    { name: "Timișoara", airport: { name: "Timișoara Traian Vuia", code: "TSR" }, lat: 45.8099, lng: 21.3379 },
  ],
  Bulgaria: [
    { name: "Sofia", airport: { name: "Sofia", code: "SOF" }, lat: 42.6906, lng: 23.4327 },
    { name: "Varna", airport: { name: "Varna", code: "VAR" }, lat: 43.2321, lng: 27.8028 },
    { name: "Burgas", airport: { name: "Burgas", code: "BOJ" }, lat: 42.5696, lng: 27.5152 },
  ],
  Croatia: [
    { name: "Zagreb", airport: { name: "Zagreb", code: "ZAG" }, lat: 45.7380, lng: 16.0610 },
    { name: "Split", airport: { name: "Split", code: "SPU" }, lat: 43.5389, lng: 16.2979 },
    { name: "Dubrovnik", airport: { name: "Dubrovnik", code: "DBV" }, lat: 42.5614, lng: 18.2682 },
  ],
  Slovenia: [
    { name: "Ljubljana", airport: { name: "Ljubljana Jože Pučnik", code: "LJU" }, lat: 46.2246, lng: 14.4560 },
  ],
  Slovakia: [
    { name: "Bratislava", airport: { name: "Bratislava", code: "BTS" }, lat: 48.1702, lng: 17.2126 },
    { name: "Košice", airport: { name: "Košice", code: "KSC" }, lat: 48.6631, lng: 21.2411 },
  ],
  Iceland: [
    { name: "Reykjavik", airport: { name: "Keflavík", code: "KEF" }, lat: 63.9850, lng: -22.6056 },
  ],
  Latvia: [
    { name: "Riga", airport: { name: "Riga", code: "RIX" }, lat: 56.9236, lng: 23.9718 },
  ],
  Lithuania: [
    { name: "Vilnius", airport: { name: "Vilnius", code: "VNO" }, lat: 54.6359, lng: 25.2858 },
    { name: "Kaunas", airport: { name: "Kaunas", code: "KUN" }, lat: 54.9639, lng: 24.0849 },
  ],
  Estonia: [
    { name: "Tallinn", airport: { name: "Tallinn", code: "TLL" }, lat: 59.4133, lng: 24.8328 },
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
