
export interface Airport {
  name: string;
  code: string;
}

export interface City {
  name: string;
  airport?: Airport;
  lat: number;
  lng: number;
}

export const DATA: Record<string, City[]> = {
  "United States": [
    {
      "name": "New York",
      "airport": {
        "name": "John F. Kennedy International",
        "code": "JFK"
      },
      "lat": 40.6413,
      "lng": -73.7781
    },
    {
      "name": "Los Angeles",
      "airport": {
        "name": "Los Angeles International",
        "code": "LAX"
      },
      "lat": 33.9416,
      "lng": -118.4085
    },
    {
      "name": "Chicago",
      "airport": {
        "name": "O'Hare International",
        "code": "ORD"
      },
      "lat": 41.9742,
      "lng": -87.9073
    },
    {
      "name": "Houston",
      "airport": {
        "name": "George Bush Intercontinental",
        "code": "IAH"
      },
      "lat": 29.9902,
      "lng": -95.3368
    },
    {
      "name": "Boston",
      "airport": {
        "name": "Logan International",
        "code": "BOS"
      },
      "lat": 42.3656,
      "lng": -71.0096
    },
    {
      "name": "San Francisco",
      "airport": {
        "name": "San Francisco International",
        "code": "SFO"
      },
      "lat": 37.6213,
      "lng": -122.379
    },
    {
      "name": "Seattle",
      "airport": {
        "name": "Seattle–Tacoma International",
        "code": "SEA"
      },
      "lat": 47.4502,
      "lng": -122.3088
    },
    {
      "name": "Atlanta",
      "airport": {
        "name": "Hartsfield–Jackson Atlanta International",
        "code": "ATL"
      },
      "lat": 33.6407,
      "lng": -84.4277
    },
    {
      "name": "Miami",
      "airport": {
        "name": "Miami International",
        "code": "MIA"
      },
      "lat": 25.7959,
      "lng": -80.287
    },
    {
      "name": "Las Vegas",
      "airport": {
        "name": "Harry Reid International",
        "code": "LAS"
      },
      "lat": 36.084,
      "lng": -115.1537
    },
    {
      "name": "San Diego",
      "airport": {
        "name": "San Diego International",
        "code": "SAN"
      },
      "lat": 32.7338,
      "lng": -117.1933
    },
    {
      "name": "Phoenix",
      "airport": {
        "name": "Phoenix Sky Harbor International",
        "code": "PHX"
      },
      "lat": 33.4343,
      "lng": -112.0116
    },
    {
      "name": "Philadelphia",
      "airport": {
        "name": "Philadelphia International",
        "code": "PHL"
      },
      "lat": 39.8729,
      "lng": -75.2437
    },
    {
      "name": "Washington, D.C.",
      "airport": {
        "name": "Washington Dulles International",
        "code": "IAD"
      },
      "lat": 38.9531,
      "lng": -77.4565
    },
    {
      "name": "Dallas",
      "airport": {
        "name": "Dallas/Fort Worth International",
        "code": "DFW"
      },
      "lat": 32.8998,
      "lng": -97.0403
    },
    {
      "name": "Denver",
      "airport": {
        "name": "Denver International",
        "code": "DEN"
      },
      "lat": 39.8561,
      "lng": -104.6737
    },
    {
      "name": "Orlando",
      "airport": {
        "name": "Orlando International",
        "code": "MCO"
      },
      "lat": 28.4312,
      "lng": -81.3081
    },
    {
      "name": "Austin",
      "airport": {
        "name": "Austin–Bergstrom International",
        "code": "AUS"
      },
      "lat": 30.2026,
      "lng": -97.6671
    },
    {
      "name": "San Jose",
      "airport": {
        "name": "San Jose International",
        "code": "SJC"
      },
      "lat": 37.3639,
      "lng": -121.9289
    },
    {
      "name": "Charlotte",
      "airport": {
        "name": "Charlotte Douglas International",
        "code": "CLT"
      },
      "lat": 35.214,
      "lng": -80.9431
    },
    {
      "name": "Detroit",
      "airport": {
        "name": "Detroit Metropolitan",
        "code": "DTW"
      },
      "lat": 42.2124,
      "lng": -83.3534
    },
    {
      "name": "Minneapolis",
      "airport": {
        "name": "Minneapolis–Saint Paul International",
        "code": "MSP"
      },
      "lat": 44.8831,
      "lng": -93.2223
    },
    {
      "name": "Salt Lake City",
      "airport": {
        "name": "Salt Lake City International",
        "code": "SLC"
      },
      "lat": 40.7899,
      "lng": -111.9791
    },
    {
      "name": "New Orleans",
      "airport": {
        "name": "Louis Armstrong New Orleans International",
        "code": "MSY"
      },
      "lat": 29.9934,
      "lng": -90.258
    },
    {
      "name": "Tampa",
      "airport": {
        "name": "Tampa International",
        "code": "TPA"
      },
      "lat": 27.9755,
      "lng": -82.5332
    },
    {
      "name": "Portland",
      "airport": {
        "name": "Portland International",
        "code": "PDX"
      },
      "lat": 45.5887,
      "lng": -122.5975
    },
    {
      "name": "Raleigh",
      "airport": {
        "name": "Raleigh–Durham International",
        "code": "RDU"
      },
      "lat": 35.8776,
      "lng": -78.7875
    },
    {
      "name": "Nashville",
      "airport": {
        "name": "Nashville International",
        "code": "BNA"
      },
      "lat": 36.1263,
      "lng": -86.6774
    }
  ],
  "United Kingdom": [
    {
      "name": "London",
      "airport": {
        "name": "Heathrow",
        "code": "LHR"
      },
      "lat": 51.47,
      "lng": -0.4543
    },
    {
      "name": "Manchester",
      "airport": {
        "name": "Manchester",
        "code": "MAN"
      },
      "lat": 53.3537,
      "lng": -2.2749
    },
    {
      "name": "Edinburgh",
      "airport": {
        "name": "Edinburgh",
        "code": "EDI"
      },
      "lat": 55.9508,
      "lng": -3.3723
    },
    {
      "name": "Birmingham",
      "airport": {
        "name": "Birmingham",
        "code": "BHX"
      },
      "lat": 52.453,
      "lng": -1.748
    },
    {
      "name": "Glasgow",
      "airport": {
        "name": "Glasgow",
        "code": "GLA"
      },
      "lat": 55.8719,
      "lng": -4.4331
    },
    {
      "name": "Bristol",
      "airport": {
        "name": "Bristol",
        "code": "BRS"
      },
      "lat": 51.3827,
      "lng": -2.7191
    },
    {
      "name": "Liverpool",
      "airport": {
        "name": "Liverpool John Lennon",
        "code": "LPL"
      },
      "lat": 53.3336,
      "lng": -2.8497
    },
    {
      "name": "Leeds",
      "airport": {
        "name": "Leeds Bradford",
        "code": "LBA"
      },
      "lat": 53.8659,
      "lng": -1.6606
    },
    {
      "name": "Newcastle",
      "airport": {
        "name": "Newcastle",
        "code": "NCL"
      },
      "lat": 55.0375,
      "lng": -1.6917
    },
    {
      "name": "Belfast",
      "airport": {
        "name": "Belfast International",
        "code": "BFS"
      },
      "lat": 54.6575,
      "lng": -6.2158
    },
    {
      "name": "Aberdeen",
      "airport": {
        "name": "Aberdeen",
        "code": "ABZ"
      },
      "lat": 57.2019,
      "lng": -2.1978
    }
  ],
  "Germany": [
    {
      "name": "Berlin",
      "airport": {
        "name": "Berlin Brandenburg",
        "code": "BER"
      },
      "lat": 52.3667,
      "lng": 13.5033
    },
    {
      "name": "Munich",
      "airport": {
        "name": "Munich",
        "code": "MUC"
      },
      "lat": 48.3538,
      "lng": 11.7861
    },
    {
      "name": "Frankfurt",
      "airport": {
        "name": "Frankfurt",
        "code": "FRA"
      },
      "lat": 50.0379,
      "lng": 8.5622
    },
    {
      "name": "Hamburg",
      "airport": {
        "name": "Hamburg",
        "code": "HAM"
      },
      "lat": 53.6336,
      "lng": 9.9956
    },
    {
      "name": "Düsseldorf",
      "airport": {
        "name": "Düsseldorf",
        "code": "DUS"
      },
      "lat": 51.2895,
      "lng": 6.7668
    },
    {
      "name": "Stuttgart",
      "airport": {
        "name": "Stuttgart",
        "code": "STR"
      },
      "lat": 48.69,
      "lng": 9.2219
    },
    {
      "name": "Cologne",
      "airport": {
        "name": "Cologne/Bonn",
        "code": "CGN"
      },
      "lat": 50.8659,
      "lng": 7.1427
    },
    {
      "name": "Leipzig",
      "airport": {
        "name": "Leipzig/Halle",
        "code": "LEJ"
      },
      "lat": 51.4239,
      "lng": 12.2364
    },
    {
      "name": "Dresden",
      "airport": {
        "name": "Dresden",
        "code": "DRS"
      },
      "lat": 51.1328,
      "lng": 13.7672
    },
    {
      "name": "Nuremberg",
      "airport": {
        "name": "Nuremberg",
        "code": "NUE"
      },
      "lat": 49.4987,
      "lng": 11.0669
    },
    {
      "name": "Hannover",
      "airport": {
        "name": "Hanover",
        "code": "HAJ"
      },
      "lat": 52.4603,
      "lng": 9.6837
    },
    {
      "name": "Bremen",
      "airport": {
        "name": "Bremen",
        "code": "BRE"
      },
      "lat": 53.0475,
      "lng": 8.7867
    }
  ],
  "France": [
    {
      "name": "Paris",
      "airport": {
        "name": "Charles de Gaulle",
        "code": "CDG"
      },
      "lat": 49.0097,
      "lng": 2.5479
    },
    {
      "name": "Nice",
      "airport": {
        "name": "Nice Côte d'Azur",
        "code": "NCE"
      },
      "lat": 43.6653,
      "lng": 7.215
    },
    {
      "name": "Lyon",
      "airport": {
        "name": "Lyon–Saint-Exupéry",
        "code": "LYS"
      },
      "lat": 45.7219,
      "lng": 5.0811
    },
    {
      "name": "Marseille",
      "airport": {
        "name": "Marseille Provence",
        "code": "MRS"
      },
      "lat": 43.4393,
      "lng": 5.2215
    },
    {
      "name": "Toulouse",
      "airport": {
        "name": "Toulouse-Blagnac",
        "code": "TLS"
      },
      "lat": 43.6293,
      "lng": 1.363
    },
    {
      "name": "Bordeaux",
      "airport": {
        "name": "Bordeaux–Mérignac",
        "code": "BOD"
      },
      "lat": 44.8283,
      "lng": -0.7156
    },
    {
      "name": "Nantes",
      "airport": {
        "name": "Nantes Atlantique",
        "code": "NTE"
      },
      "lat": 47.1532,
      "lng": -1.6107
    },
    {
      "name": "Strasbourg",
      "airport": {
        "name": "Strasbourg",
        "code": "SXB"
      },
      "lat": 48.5443,
      "lng": 7.6282
    },
    {
      "name": "Lille",
      "airport": {
        "name": "Lille",
        "code": "LIL"
      },
      "lat": 50.5619,
      "lng": 3.089
    },
    {
      "name": "Montpellier",
      "airport": {
        "name": "Montpellier–Méditerranée",
        "code": "MPL"
      },
      "lat": 43.5762,
      "lng": 3.9632
    },
    {
      "name": "Rennes",
      "airport": {
        "name": "Rennes–Saint-Jacques",
        "code": "RNS"
      },
      "lat": 48.0695,
      "lng": -1.7345
    },
    {
      "name": "Biarritz",
      "airport": {
        "name": "Biarritz Pays Basque",
        "code": "BIQ"
      },
      "lat": 43.4684,
      "lng": -1.5233
    }
  ],
  "Spain": [
    {
      "name": "Madrid",
      "airport": {
        "name": "Adolfo Suárez Madrid–Barajas",
        "code": "MAD"
      },
      "lat": 40.4722,
      "lng": -3.5608
    },
    {
      "name": "Barcelona",
      "airport": {
        "name": "Barcelona–El Prat",
        "code": "BCN"
      },
      "lat": 41.2974,
      "lng": 2.0833
    },
    {
      "name": "Palma de Mallorca",
      "airport": {
        "name": "Palma de Mallorca",
        "code": "PMI"
      },
      "lat": 39.5517,
      "lng": 2.7333
    },
    {
      "name": "Málaga",
      "airport": {
        "name": "Málaga–Costa del Sol",
        "code": "AGP"
      },
      "lat": 36.6749,
      "lng": -4.4991
    },
    {
      "name": "Alicante",
      "airport": {
        "name": "Alicante–Elche",
        "code": "ALC"
      },
      "lat": 38.2822,
      "lng": -0.5582
    },
    {
      "name": "Valencia",
      "airport": {
        "name": "Valencia",
        "code": "VLC"
      },
      "lat": 39.4893,
      "lng": -0.4816
    },
    {
      "name": "Seville",
      "airport": {
        "name": "Seville",
        "code": "SVQ"
      },
      "lat": 37.417,
      "lng": -6.1495
    },
    {
      "name": "Bilbao",
      "airport": {
        "name": "Bilbao",
        "code": "BIO"
      },
      "lat": 43.3011,
      "lng": -2.9106
    },
    {
      "name": "Ibiza",
      "airport": {
        "name": "Ibiza",
        "code": "IBZ"
      },
      "lat": 38.8729,
      "lng": 1.3731
    },
    {
      "name": "Gran Canaria",
      "airport": {
        "name": "Gran Canaria",
        "code": "LPA"
      },
      "lat": 27.9319,
      "lng": -15.3866
    },
    {
      "name": "Tenerife South",
      "airport": {
        "name": "Tenerife South",
        "code": "TFS"
      },
      "lat": 28.0445,
      "lng": -16.5725
    }
  ],
  "Italy": [
    {
      "name": "Rome",
      "airport": {
        "name": "Leonardo da Vinci–Fiumicino",
        "code": "FCO"
      },
      "lat": 41.8003,
      "lng": 12.2389
    },
    {
      "name": "Milan",
      "airport": {
        "name": "Malpensa",
        "code": "MXP"
      },
      "lat": 45.6301,
      "lng": 8.7281
    },
    {
      "name": "Venice",
      "airport": {
        "name": "Venice Marco Polo",
        "code": "VCE"
      },
      "lat": 45.5053,
      "lng": 12.3519
    },
    {
      "name": "Naples",
      "airport": {
        "name": "Naples International",
        "code": "NAP"
      },
      "lat": 40.886,
      "lng": 14.2906
    },
    {
      "name": "Catania",
      "airport": {
        "name": "Catania–Fontanarossa",
        "code": "CTA"
      },
      "lat": 37.4668,
      "lng": 15.0664
    },
    {
      "name": "Bologna",
      "airport": {
        "name": "Bologna Guglielmo Marconi",
        "code": "BLQ"
      },
      "lat": 44.5342,
      "lng": 11.2891
    },
    {
      "name": "Palermo",
      "airport": {
        "name": "Falcone Borsellino",
        "code": "PMO"
      },
      "lat": 38.176,
      "lng": 13.091
    },
    {
      "name": "Pisa",
      "airport": {
        "name": "Pisa International",
        "code": "PSA"
      },
      "lat": 43.6839,
      "lng": 10.3984
    },
    {
      "name": "Florence",
      "airport": {
        "name": "Florence Peretola",
        "code": "FLR"
      },
      "lat": 43.8099,
      "lng": 11.2051
    },
    {
      "name": "Turin",
      "airport": {
        "name": "Turin",
        "code": "TRN"
      },
      "lat": 45.2008,
      "lng": 7.6497
    },
    {
      "name": "Verona",
      "airport": {
        "name": "Verona Villafranca",
        "code": "VRN"
      },
      "lat": 45.3957,
      "lng": 10.8885
    }
  ],
  "Netherlands": [
    {
      "name": "Amsterdam",
      "airport": {
        "name": "Schiphol",
        "code": "AMS"
      },
      "lat": 52.3105,
      "lng": 4.7683
    },
    {
      "name": "Eindhoven",
      "airport": {
        "name": "Eindhoven",
        "code": "EIN"
      },
      "lat": 51.4501,
      "lng": 5.3745
    },
    {
      "name": "Rotterdam",
      "airport": {
        "name": "Rotterdam The Hague",
        "code": "RTM"
      },
      "lat": 51.9569,
      "lng": 4.4372
    },
    {
      "name": "The Hague",
      "lat": 52.0705,
      "lng": 4.3007
    },
    {
      "name": "Utrecht",
      "lat": 52.0907,
      "lng": 5.1214
    },
    {
      "name": "Maastricht",
      "airport": {
        "name": "Maastricht Aachen",
        "code": "MST"
      },
      "lat": 50.9116,
      "lng": 5.7701
    },
    {
      "name": "Groningen",
      "airport": {
        "name": "Groningen Eelde",
        "code": "GRQ"
      },
      "lat": 53.1197,
      "lng": 6.5794
    },
    {
      "name": "Leiden",
      "lat": 52.1601,
      "lng": 4.497
    },
    {
      "name": "Haarlem",
      "lat": 52.3874,
      "lng": 4.6462
    },
    {
      "name": "Delft",
      "lat": 52.0116,
      "lng": 4.3571
    },
    {
      "name": "Arnhem",
      "lat": 51.9851,
      "lng": 5.8987
    }
  ],
  "Belgium": [
    {
      "name": "Brussels",
      "airport": {
        "name": "Brussels",
        "code": "BRU"
      },
      "lat": 50.901,
      "lng": 4.4846
    },
    {
      "name": "Charleroi",
      "airport": {
        "name": "Brussels South Charleroi",
        "code": "CRL"
      },
      "lat": 50.4592,
      "lng": 4.4539
    },
    {
      "name": "Antwerp",
      "airport": {
        "name": "Antwerp",
        "code": "ANR"
      },
      "lat": 51.19,
      "lng": 4.46
    },
    {
      "name": "Bruges",
      "airport": {
        "name": "Ostend–Bruges",
        "code": "OST"
      },
      "lat": 51.1989,
      "lng": 2.8622
    },
    {
      "name": "Liège",
      "airport": {
        "name": "Liège",
        "code": "LGG"
      },
      "lat": 50.6374,
      "lng": 5.4432
    },
    {
      "name": "Ghent",
      "lat": 51.0543,
      "lng": 3.7174
    },
    {
      "name": "Leuven",
      "lat": 50.8798,
      "lng": 4.7005
    },
    {
      "name": "Mechelen",
      "lat": 51.0259,
      "lng": 4.4776
    },
    {
      "name": "Namur",
      "lat": 50.4674,
      "lng": 4.8719
    },
    {
      "name": "Mons",
      "lat": 50.4542,
      "lng": 3.9567
    },
    {
      "name": "Hasselt",
      "lat": 50.9307,
      "lng": 5.3325
    }
  ],
  "Switzerland": [
    {
      "name": "Bern",
      "airport": {
        "name": "Bern",
        "code": "BRN"
      },
      "lat": 46.9141,
      "lng": 7.4972
    },
    {
      "name": "Zurich",
      "airport": {
        "name": "Zurich",
        "code": "ZRH"
      },
      "lat": 47.4647,
      "lng": 8.5492
    },
    {
      "name": "Geneva",
      "airport": {
        "name": "Geneva",
        "code": "GVA"
      },
      "lat": 46.238,
      "lng": 6.109
    },
    {
      "name": "Basel",
      "airport": {
        "name": "EuroAirport Basel–Mulhouse–Freiburg",
        "code": "BSL"
      },
      "lat": 47.59,
      "lng": 7.529
    },
    {
      "name": "Lausanne",
      "lat": 46.5197,
      "lng": 6.6323
    },
    {
      "name": "Lucerne",
      "lat": 47.0502,
      "lng": 8.3093
    },
    {
      "name": "Lugano",
      "airport": {
        "name": "Lugano",
        "code": "LUG"
      },
      "lat": 46.0037,
      "lng": 8.9511
    },
    {
      "name": "St. Gallen",
      "airport": {
        "name": "St. Gallen-Altenrhein",
        "code": "ACH"
      },
      "lat": 47.4245,
      "lng": 9.3767
    },
    {
      "name": "Winterthur",
      "lat": 47.4999,
      "lng": 8.7287
    },
    {
      "name": "Sion",
      "airport": {
        "name": "Sion",
        "code": "SIR"
      },
      "lat": 46.2196,
      "lng": 7.3267
    }
  ],
  "Austria": [
    {
      "name": "Vienna",
      "airport": {
        "name": "Vienna International",
        "code": "VIE"
      },
      "lat": 48.1103,
      "lng": 16.5697
    },
    {
      "name": "Salzburg",
      "airport": {
        "name": "Salzburg",
        "code": "SZG"
      },
      "lat": 47.7933,
      "lng": 13.0043
    },
    {
      "name": "Innsbruck",
      "airport": {
        "name": "Innsbruck",
        "code": "INN"
      },
      "lat": 47.2602,
      "lng": 11.3439
    },
    {
      "name": "Graz",
      "airport": {
        "name": "Graz",
        "code": "GRZ"
      },
      "lat": 46.991,
      "lng": 15.4396
    },
    {
      "name": "Linz",
      "airport": {
        "name": "Linz",
        "code": "LNZ"
      },
      "lat": 48.2332,
      "lng": 14.1875
    },
    {
      "name": "Klagenfurt",
      "airport": {
        "name": "Klagenfurt",
        "code": "KLU"
      },
      "lat": 46.6425,
      "lng": 14.3377
    },
    {
      "name": "Villach",
      "lat": 46.6111,
      "lng": 13.8558
    },
    {
      "name": "Wels",
      "lat": 48.1575,
      "lng": 14.0289
    },
    {
      "name": "St. Pölten",
      "lat": 48.2047,
      "lng": 15.6267
    },
    {
      "name": "Bregenz",
      "lat": 47.5031,
      "lng": 9.7471
    }
  ],
  "Portugal": [
    {
      "name": "Lisbon",
      "airport": {
        "name": "Lisbon",
        "code": "LIS"
      },
      "lat": 38.7742,
      "lng": -9.1342
    },
    {
      "name": "Porto",
      "airport": {
        "name": "Porto",
        "code": "OPO"
      },
      "lat": 41.2376,
      "lng": -8.6697
    },
    {
      "name": "Faro",
      "airport": {
        "name": "Faro",
        "code": "FAO"
      },
      "lat": 37.0176,
      "lng": -7.9709
    },
    {
      "name": "Funchal",
      "airport": {
        "name": "Madeira",
        "code": "FNC"
      },
      "lat": 32.6979,
      "lng": -16.7745
    },
    {
      "name": "Ponta Delgada",
      "airport": {
        "name": "João Paulo II",
        "code": "PDL"
      },
      "lat": 37.7412,
      "lng": -25.6979
    },
    {
      "name": "Coimbra",
      "lat": 40.2033,
      "lng": -8.4103
    },
    {
      "name": "Braga",
      "lat": 41.5454,
      "lng": -8.4265
    },
    {
      "name": "Setúbal",
      "lat": 38.5244,
      "lng": -8.8882
    },
    {
      "name": "Aveiro",
      "lat": 40.6405,
      "lng": -8.6538
    },
    {
      "name": "Évora",
      "lat": 38.5714,
      "lng": -7.9135
    }
  ],
  "Poland": [
    {
      "name": "Warsaw",
      "airport": {
        "name": "Warsaw Chopin",
        "code": "WAW"
      },
      "lat": 52.1657,
      "lng": 20.9671
    },
    {
      "name": "Krakow",
      "airport": {
        "name": "John Paul II Kraków–Balice",
        "code": "KRK"
      },
      "lat": 50.0777,
      "lng": 19.7848
    },
    {
      "name": "Gdansk",
      "airport": {
        "name": "Gdańsk Lech Wałęsa",
        "code": "GDN"
      },
      "lat": 54.3776,
      "lng": 18.4662
    },
    {
      "name": "Katowice",
      "airport": {
        "name": "Katowice",
        "code": "KTW"
      },
      "lat": 50.4743,
      "lng": 19.08
    },
    {
      "name": "Wroclaw",
      "airport": {
        "name": "Wrocław Copernicus",
        "code": "WRO"
      },
      "lat": 51.1027,
      "lng": 16.8858
    },
    {
      "name": "Poznan",
      "airport": {
        "name": "Poznań–Ławica",
        "code": "POZ"
      },
      "lat": 52.421,
      "lng": 16.8263
    },
    {
      "name": "Rzeszów",
      "airport": {
        "name": "Rzeszów–Jasionka",
        "code": "RZE"
      },
      "lat": 50.11,
      "lng": 22.019
    },
    {
      "name": "Szczecin",
      "airport": {
        "name": "Solidarity Szczecin–Goleniów",
        "code": "SZZ"
      },
      "lat": 53.5847,
      "lng": 14.9022
    },
    {
      "name": "Lublin",
      "airport": {
        "name": "Lublin",
        "code": "LUZ"
      },
      "lat": 51.2403,
      "lng": 22.7136
    },
    {
      "name": "Lodz",
      "airport": {
        "name": "Łódź Władysław Reymont",
        "code": "LCJ"
      },
      "lat": 51.7219,
      "lng": 19.3981
    }
  ],
  "Greece": [
    {
      "name": "Athens",
      "airport": {
        "name": "Athens International",
        "code": "ATH"
      },
      "lat": 37.9364,
      "lng": 23.9445
    },
    {
      "name": "Heraklion",
      "airport": {
        "name": "Heraklion",
        "code": "HER"
      },
      "lat": 35.3394,
      "lng": 25.1801
    },
    {
      "name": "Thessaloniki",
      "airport": {
        "name": "Thessaloniki",
        "code": "SKG"
      },
      "lat": 40.5197,
      "lng": 22.9717
    },
    {
      "name": "Rhodes",
      "airport": {
        "name": "Rhodes",
        "code": "RHO"
      },
      "lat": 36.4054,
      "lng": 28.0862
    },
    {
      "name": "Corfu",
      "airport": {
        "name": "Corfu",
        "code": "CFU"
      },
      "lat": 39.6019,
      "lng": 19.9117
    },
    {
      "name": "Chania",
      "airport": {
        "name": "Chania",
        "code": "CHQ"
      },
      "lat": 35.5317,
      "lng": 24.1497
    },
    {
      "name": "Kos",
      "airport": {
        "name": "Kos",
        "code": "KGS"
      },
      "lat": 36.7933,
      "lng": 27.0917
    },
    {
      "name": "Santorini",
      "airport": {
        "name": "Santorini",
        "code": "JTR"
      },
      "lat": 36.3992,
      "lng": 25.4793
    },
    {
      "name": "Zakynthos",
      "airport": {
        "name": "Zakynthos",
        "code": "ZTH"
      },
      "lat": 37.7508,
      "lng": 20.8843
    },
    {
      "name": "Mykonos",
      "airport": {
        "name": "Mykonos",
        "code": "JMK"
      },
      "lat": 37.435,
      "lng": 25.3481
    }
  ],
  "Czech Republic": [
    {
      "name": "Prague",
      "airport": {
        "name": "Václav Havel Airport Prague",
        "code": "PRG"
      },
      "lat": 50.1008,
      "lng": 14.26
    },
    {
      "name": "Brno",
      "airport": {
        "name": "Brno–Tuřany",
        "code": "BRQ"
      },
      "lat": 49.1513,
      "lng": 16.6944
    },
    {
      "name": "Ostrava",
      "airport": {
        "name": "Ostrava",
        "code": "OSR"
      },
      "lat": 49.6963,
      "lng": 18.1111
    },
    {
      "name": "Pardubice",
      "airport": {
        "name": "Pardubice",
        "code": "PED"
      },
      "lat": 50.0134,
      "lng": 15.7386
    },
    {
      "name": "Karlovy Vary",
      "airport": {
        "name": "Karlovy Vary",
        "code": "KLV"
      },
      "lat": 50.203,
      "lng": 12.915
    },
    {
      "name": "Plzeň",
      "lat": 49.7475,
      "lng": 13.3776
    },
    {
      "name": "Liberec",
      "lat": 50.7663,
      "lng": 15.0543
    },
    {
      "name": "Olomouc",
      "lat": 49.5938,
      "lng": 17.2509
    },
    {
      "name": "České Budějovice",
      "lat": 48.9757,
      "lng": 14.4803
    },
    {
      "name": "Hradec Králové",
      "lat": 50.2104,
      "lng": 15.8252
    }
  ],
  "Hungary": [
    {
      "name": "Budapest",
      "airport": {
        "name": "Budapest Ferenc Liszt",
        "code": "BUD"
      },
      "lat": 47.4399,
      "lng": 19.2611
    },
    {
      "name": "Debrecen",
      "airport": {
        "name": "Debrecen",
        "code": "DEB"
      },
      "lat": 47.4889,
      "lng": 21.6019
    },
    {
      "name": "Sármellék",
      "airport": {
        "name": "Hévíz–Balaton",
        "code": "SOB"
      },
      "lat": 46.6864,
      "lng": 17.1592
    },
    {
      "name": "Szeged",
      "lat": 46.253,
      "lng": 20.1414
    },
    {
      "name": "Miskolc",
      "lat": 48.1035,
      "lng": 20.7784
    },
    {
      "name": "Pécs",
      "lat": 46.0727,
      "lng": 18.2323
    },
    {
      "name": "Győr",
      "lat": 47.6875,
      "lng": 17.6504
    },
    {
      "name": "Nyíregyháza",
      "lat": 47.9554,
      "lng": 21.7168
    },
    {
      "name": "Kecskemét",
      "lat": 46.9075,
      "lng": 19.6917
    },
    {
      "name": "Székesfehérvár",
      "lat": 47.1899,
      "lng": 18.4103
    }
  ],
  "Sweden": [
    {
      "name": "Stockholm",
      "airport": {
        "name": "Stockholm Arlanda",
        "code": "ARN"
      },
      "lat": 59.6519,
      "lng": 17.9186
    },
    {
      "name": "Gothenburg",
      "airport": {
        "name": "Göteborg Landvetter",
        "code": "GOT"
      },
      "lat": 57.6628,
      "lng": 12.279
    },
    {
      "name": "Malmö",
      "airport": {
        "name": "Malmö",
        "code": "MMX"
      },
      "lat": 55.5363,
      "lng": 13.3762
    },
    {
      "name": "Luleå",
      "airport": {
        "name": "Luleå",
        "code": "LLA"
      },
      "lat": 65.5438,
      "lng": 22.122
    },
    {
      "name": "Umeå",
      "airport": {
        "name": "Umeå",
        "code": "UME"
      },
      "lat": 63.793,
      "lng": 20.2889
    },
    {
      "name": "Visby",
      "airport": {
        "name": "Visby",
        "code": "VBY"
      },
      "lat": 57.6628,
      "lng": 18.3447
    },
    {
      "name": "Uppsala",
      "lat": 59.8586,
      "lng": 17.6389
    },
    {
      "name": "Västerås",
      "lat": 59.611,
      "lng": 16.5448
    },
    {
      "name": "Örebro",
      "lat": 59.2753,
      "lng": 15.2134
    },
    {
      "name": "Linköping",
      "lat": 58.4108,
      "lng": 15.6214
    }
  ],
  "Norway": [
    {
      "name": "Oslo",
      "airport": {
        "name": "Oslo Gardermoen",
        "code": "OSL"
      },
      "lat": 60.1939,
      "lng": 11.1004
    },
    {
      "name": "Bergen",
      "airport": {
        "name": "Bergen Flesland",
        "code": "BGO"
      },
      "lat": 60.2934,
      "lng": 5.2181
    },
    {
      "name": "Stavanger",
      "airport": {
        "name": "Stavanger Sola",
        "code": "SVG"
      },
      "lat": 58.8767,
      "lng": 5.6378
    },
    {
      "name": "Trondheim",
      "airport": {
        "name": "Trondheim Værnes",
        "code": "TRD"
      },
      "lat": 63.4578,
      "lng": 10.9241
    },
    {
      "name": "Tromsø",
      "airport": {
        "name": "Tromsø",
        "code": "TOS"
      },
      "lat": 69.6833,
      "lng": 18.9167
    },
    {
      "name": "Bodø",
      "airport": {
        "name": "Bodø",
        "code": "BOO"
      },
      "lat": 67.2692,
      "lng": 14.3653
    },
    {
      "name": "Ålesund",
      "airport": {
        "name": "Ålesund",
        "code": "AES"
      },
      "lat": 62.5625,
      "lng": 6.1197
    },
    {
      "name": "Kristiansand",
      "airport": {
        "name": "Kristiansand Kjevik",
        "code": "KRS"
      },
      "lat": 58.2028,
      "lng": 8.0839
    },
    {
      "name": "Drammen",
      "lat": 59.7441,
      "lng": 10.2045
    },
    {
      "name": "Fredrikstad",
      "lat": 59.2205,
      "lng": 10.9347
    }
  ],
  "Denmark": [
    {
      "name": "Copenhagen",
      "airport": {
        "name": "Copenhagen",
        "code": "CPH"
      },
      "lat": 55.6181,
      "lng": 12.6561
    },
    {
      "name": "Billund",
      "airport": {
        "name": "Billund",
        "code": "BLL"
      },
      "lat": 55.7403,
      "lng": 9.1479
    },
    {
      "name": "Aarhus",
      "airport": {
        "name": "Aarhus",
        "code": "AAR"
      },
      "lat": 56.3087,
      "lng": 10.6204
    },
    {
      "name": "Aalborg",
      "airport": {
        "name": "Aalborg",
        "code": "AAL"
      },
      "lat": 57.0928,
      "lng": 9.8561
    },
    {
      "name": "Odense",
      "lat": 55.4038,
      "lng": 10.4024
    },
    {
      "name": "Esbjerg",
      "airport": {
        "name": "Esbjerg",
        "code": "EBJ"
      },
      "lat": 55.5258,
      "lng": 8.5534
    },
    {
      "name": "Randers",
      "lat": 56.4605,
      "lng": 10.0365
    },
    {
      "name": "Kolding",
      "lat": 55.4959,
      "lng": 9.4731
    },
    {
      "name": "Horsens",
      "lat": 55.8581,
      "lng": 9.8476
    },
    {
      "name": "Vejle",
      "lat": 55.7093,
      "lng": 9.5357
    }
  ],
  "Finland": [
    {
      "name": "Helsinki",
      "airport": {
        "name": "Helsinki",
        "code": "HEL"
      },
      "lat": 60.3172,
      "lng": 24.9633
    },
    {
      "name": "Rovaniemi",
      "airport": {
        "name": "Rovaniemi",
        "code": "RVN"
      },
      "lat": 66.5648,
      "lng": 25.8304
    },
    {
      "name": "Turku",
      "airport": {
        "name": "Turku",
        "code": "TKU"
      },
      "lat": 60.514,
      "lng": 22.2627
    },
    {
      "name": "Tampere",
      "airport": {
        "name": "Tampere–Pirkkala",
        "code": "TMP"
      },
      "lat": 61.4141,
      "lng": 23.6044
    },
    {
      "name": "Oulu",
      "airport": {
        "name": "Oulu",
        "code": "OUL"
      },
      "lat": 64.9301,
      "lng": 25.3546
    },
    {
      "name": "Vaasa",
      "airport": {
        "name": "Vaasa",
        "code": "VAA"
      },
      "lat": 63.0503,
      "lng": 21.7622
    },
    {
      "name": "Kittilä",
      "airport": {
        "name": "Kittilä",
        "code": "KTT"
      },
      "lat": 67.701,
      "lng": 24.8468
    },
    {
      "name": "Kuopio",
      "airport": {
        "name": "Kuopio",
        "code": "KUO"
      },
      "lat": 63.0071,
      "lng": 27.7978
    },
    {
      "name": "Espoo",
      "lat": 60.2055,
      "lng": 24.6559
    },
    {
      "name": "Vantaa",
      "lat": 60.2934,
      "lng": 25.0378
    }
  ],
  "Ireland": [
    {
      "name": "Dublin",
      "airport": {
        "name": "Dublin",
        "code": "DUB"
      },
      "lat": 53.4272,
      "lng": -6.2436
    },
    {
      "name": "Cork",
      "airport": {
        "name": "Cork",
        "code": "ORK"
      },
      "lat": 51.8413,
      "lng": -8.4911
    },
    {
      "name": "Shannon",
      "airport": {
        "name": "Shannon",
        "code": "SNN"
      },
      "lat": 52.7019,
      "lng": -8.9248
    },
    {
      "name": "Knock",
      "airport": {
        "name": "Ireland West Knock",
        "code": "NOC"
      },
      "lat": 53.9103,
      "lng": -8.8185
    },
    {
      "name": "Kerry",
      "airport": {
        "name": "Kerry",
        "code": "KIR"
      },
      "lat": 52.1809,
      "lng": -9.5238
    },
    {
      "name": "Limerick",
      "lat": 52.668,
      "lng": -8.6305
    },
    {
      "name": "Galway",
      "lat": 53.2707,
      "lng": -9.0568
    },
    {
      "name": "Waterford",
      "lat": 52.2593,
      "lng": -7.1101
    },
    {
      "name": "Drogheda",
      "lat": 53.7155,
      "lng": -6.356
    },
    {
      "name": "Dundalk",
      "lat": 54.0051,
      "lng": -6.4046
    }
  ],
  "Romania": [
    {
      "name": "Bucharest",
      "airport": {
        "name": "Henri Coandă International",
        "code": "OTP"
      },
      "lat": 44.5711,
      "lng": 26.085
    },
    {
      "name": "Cluj-Napoca",
      "airport": {
        "name": "Cluj",
        "code": "CLJ"
      },
      "lat": 46.7852,
      "lng": 23.6862
    },
    {
      "name": "Timișoara",
      "airport": {
        "name": "Timișoara Traian Vuia",
        "code": "TSR"
      },
      "lat": 45.8099,
      "lng": 21.3379
    },
    {
      "name": "Iași",
      "airport": {
        "name": "Iași",
        "code": "IAS"
      },
      "lat": 47.1785,
      "lng": 27.6206
    },
    {
      "name": "Sibiu",
      "airport": {
        "name": "Sibiu",
        "code": "SBZ"
      },
      "lat": 45.7856,
      "lng": 24.0913
    },
    {
      "name": "Craiova",
      "airport": {
        "name": "Craiova",
        "code": "CRA"
      },
      "lat": 44.3182,
      "lng": 23.8886
    },
    {
      "name": "Suceava",
      "airport": {
        "name": "Suceava",
        "code": "SCV"
      },
      "lat": 47.6875,
      "lng": 26.3541
    },
    {
      "name": "Constanța",
      "airport": {
        "name": "Mihail Kogălniceanu",
        "code": "CND"
      },
      "lat": 44.3622,
      "lng": 28.4883
    },
    {
      "name": "Brașov",
      "lat": 45.6579,
      "lng": 25.6012
    },
    {
      "name": "Oradea",
      "airport": {
        "name": "Oradea",
        "code": "OMR"
      },
      "lat": 47.0253,
      "lng": 21.9025
    }
  ],
  "Bulgaria": [
    {
      "name": "Sofia",
      "airport": {
        "name": "Sofia",
        "code": "SOF"
      },
      "lat": 42.6906,
      "lng": 23.4327
    },
    {
      "name": "Varna",
      "airport": {
        "name": "Varna",
        "code": "VAR"
      },
      "lat": 43.2321,
      "lng": 27.8028
    },
    {
      "name": "Burgas",
      "airport": {
        "name": "Burgas",
        "code": "BOJ"
      },
      "lat": 42.5696,
      "lng": 27.5152
    },
    {
      "name": "Plovdiv",
      "airport": {
        "name": "Plovdiv",
        "code": "PDV"
      },
      "lat": 42.0678,
      "lng": 24.8508
    },
    {
      "name": "Ruse",
      "lat": 43.8356,
      "lng": 25.9657
    },
    {
      "name": "Stara Zagora",
      "lat": 42.4258,
      "lng": 25.6345
    },
    {
      "name": "Pleven",
      "lat": 43.417,
      "lng": 24.6067
    },
    {
      "name": "Sliven",
      "lat": 42.6817,
      "lng": 26.3229
    },
    {
      "name": "Dobrich",
      "lat": 43.5726,
      "lng": 27.8273
    },
    {
      "name": "Shumen",
      "lat": 43.2712,
      "lng": 26.9361
    }
  ],
  "Croatia": [
    {
      "name": "Zagreb",
      "airport": {
        "name": "Zagreb",
        "code": "ZAG"
      },
      "lat": 45.738,
      "lng": 16.061
    },
    {
      "name": "Split",
      "airport": {
        "name": "Split",
        "code": "SPU"
      },
      "lat": 43.5389,
      "lng": 16.2979
    },
    {
      "name": "Dubrovnik",
      "airport": {
        "name": "Dubrovnik",
        "code": "DBV"
      },
      "lat": 42.5614,
      "lng": 18.2682
    },
    {
      "name": "Zadar",
      "airport": {
        "name": "Zadar",
        "code": "ZAD"
      },
      "lat": 44.1083,
      "lng": 15.3467
    },
    {
      "name": "Pula",
      "airport": {
        "name": "Pula",
        "code": "PUY"
      },
      "lat": 44.8936,
      "lng": 13.9222
    },
    {
      "name": "Rijeka",
      "airport": {
        "name": "Rijeka",
        "code": "RJK"
      },
      "lat": 45.2169,
      "lng": 14.5703
    },
    {
      "name": "Osijek",
      "airport": {
        "name": "Osijek",
        "code": "OSI"
      },
      "lat": 45.4602,
      "lng": 18.8078
    },
    {
      "name": "Slavonski Brod",
      "lat": 45.1631,
      "lng": 18.0116
    },
    {
      "name": "Karlovac",
      "lat": 45.4929,
      "lng": 15.5553
    },
    {
      "name": "Varaždin",
      "lat": 46.3044,
      "lng": 16.3378
    }
  ],
  "Slovenia": [
    {
      "name": "Ljubljana",
      "airport": {
        "name": "Ljubljana Jože Pučnik",
        "code": "LJU"
      },
      "lat": 46.2246,
      "lng": 14.456
    },
    {
      "name": "Maribor",
      "airport": {
        "name": "Maribor Edvard Rusjan",
        "code": "MBX"
      },
      "lat": 46.48,
      "lng": 15.6867
    },
    {
      "name": "Portorož",
      "airport": {
        "name": "Portorož",
        "code": "POW"
      },
      "lat": 45.4729,
      "lng": 13.6146
    },
    {
      "name": "Celje",
      "lat": 46.236,
      "lng": 15.2677
    },
    {
      "name": "Kranj",
      "lat": 46.2389,
      "lng": 14.3556
    },
    {
      "name": "Velenje",
      "lat": 46.3636,
      "lng": 15.114
    },
    {
      "name": "Koper",
      "lat": 45.5481,
      "lng": 13.7302
    },
    {
      "name": "Novo Mesto",
      "lat": 45.8031,
      "lng": 15.1655
    },
    {
      "name": "Ptuj",
      "lat": 46.42,
      "lng": 15.87
    },
    {
      "name": "Trbovlje",
      "lat": 46.155,
      "lng": 15.0522
    }
  ],
  "Slovakia": [
    {
      "name": "Bratislava",
      "airport": {
        "name": "Bratislava",
        "code": "BTS"
      },
      "lat": 48.1702,
      "lng": 17.2126
    },
    {
      "name": "Košice",
      "airport": {
        "name": "Košice",
        "code": "KSC"
      },
      "lat": 48.6631,
      "lng": 21.2411
    },
    {
      "name": "Poprad",
      "airport": {
        "name": "Poprad–Tatry",
        "code": "TAT"
      },
      "lat": 49.0736,
      "lng": 20.2411
    },
    {
      "name": "Prešov",
      "lat": 48.9984,
      "lng": 21.2407
    },
    {
      "name": "Žilina",
      "lat": 49.2232,
      "lng": 18.7394
    },
    {
      "name": "Nitra",
      "lat": 48.3061,
      "lng": 18.0764
    },
    {
      "name": "Banská Bystrica",
      "lat": 48.7363,
      "lng": 19.1462
    },
    {
      "name": "Trnava",
      "lat": 48.3774,
      "lng": 17.5872
    },
    {
      "name": "Martin",
      "lat": 49.0665,
      "lng": 18.9239
    },
    {
      "name": "Trenčín",
      "lat": 48.8945,
      "lng": 18.0444
    }
  ],
  "Iceland": [
    {
      "name": "Reykjavik",
      "airport": {
        "name": "Keflavík",
        "code": "KEF"
      },
      "lat": 63.985,
      "lng": -22.6056
    },
    {
      "name": "Akureyri",
      "airport": {
        "name": "Akureyri",
        "code": "AEY"
      },
      "lat": 65.66,
      "lng": -18.0727
    },
    {
      "name": "Egilsstaðir",
      "airport": {
        "name": "Egilsstaðir",
        "code": "EGS"
      },
      "lat": 65.2833,
      "lng": -14.4014
    },
    {
      "name": "Ísafjörður",
      "airport": {
        "name": "Ísafjörður",
        "code": "IFJ"
      },
      "lat": 66.0581,
      "lng": -23.1353
    },
    {
      "name": "Kópavogur",
      "lat": 64.1111,
      "lng": -21.9056
    },
    {
      "name": "Hafnarfjörður",
      "lat": 64.0678,
      "lng": -21.9547
    },
    {
      "name": "Reykjanesbær",
      "lat": 64.0011,
      "lng": -22.5622
    },
    {
      "name": "Garðabær",
      "lat": 64.0881,
      "lng": -21.9378
    },
    {
      "name": "Mosfellsbær",
      "lat": 64.1686,
      "lng": -21.6961
    },
    {
      "name": "Árborg",
      "lat": 63.9369,
      "lng": -20.9936
    }
  ],
  "Latvia": [
    {
      "name": "Riga",
      "airport": {
        "name": "Riga",
        "code": "RIX"
      },
      "lat": 56.9236,
      "lng": 23.9718
    },
    {
      "name": "Liepāja",
      "airport": {
        "name": "Liepāja",
        "code": "LPX"
      },
      "lat": 56.5175,
      "lng": 21.0961
    },
    {
      "name": "Ventspils",
      "airport": {
        "name": "Ventspils",
        "code": "VNT"
      },
      "lat": 57.3575,
      "lng": 21.5422
    },
    {
      "name": "Daugavpils",
      "lat": 55.8747,
      "lng": 26.5362
    },
    {
      "name": "Jelgava",
      "lat": 56.6511,
      "lng": 23.7214
    },
    {
      "name": "Jūrmala",
      "lat": 56.968,
      "lng": 23.7704
    },
    {
      "name": "Rēzekne",
      "lat": 56.5099,
      "lng": 27.3312
    },
    {
      "name": "Ogre",
      "lat": 56.8166,
      "lng": 24.6158
    },
    {
      "name": "Valmiera",
      "lat": 57.5411,
      "lng": 25.4275
    },
    {
      "name": "Jēkabpils",
      "lat": 56.4975,
      "lng": 25.8644
    }
  ],
  "Lithuania": [
    {
      "name": "Vilnius",
      "airport": {
        "name": "Vilnius",
        "code": "VNO"
      },
      "lat": 54.6359,
      "lng": 25.2858
    },
    {
      "name": "Kaunas",
      "airport": {
        "name": "Kaunas",
        "code": "KUN"
      },
      "lat": 54.9639,
      "lng": 24.0849
    },
    {
      "name": "Palanga",
      "airport": {
        "name": "Palanga",
        "code": "PLQ"
      },
      "lat": 55.9733,
      "lng": 21.0939
    },
    {
      "name": "Klaipėda",
      "lat": 55.7033,
      "lng": 21.1443
    },
    {
      "name": "Šiauliai",
      "lat": 55.9349,
      "lng": 23.3137
    },
    {
      "name": "Panevėžys",
      "lat": 55.7348,
      "lng": 24.3575
    },
    {
      "name": "Alytus",
      "lat": 54.3963,
      "lng": 24.0459
    },
    {
      "name": "Marijampolė",
      "lat": 54.5599,
      "lng": 23.3541
    },
    {
      "name": "Mažeikiai",
      "lat": 56.3135,
      "lng": 22.3384
    },
    {
      "name": "Jonava",
      "lat": 55.0747,
      "lng": 24.2789
    }
  ],
  "Estonia": [
    {
      "name": "Tallinn",
      "airport": {
        "name": "Tallinn",
        "code": "TLL"
      },
      "lat": 59.4133,
      "lng": 24.8328
    },
    {
      "name": "Tartu",
      "airport": {
        "name": "Tartu",
        "code": "TAY"
      },
      "lat": 58.3075,
      "lng": 26.6904
    },
    {
      "name": "Kuressaare",
      "airport": {
        "name": "Kuressaare",
        "code": "URE"
      },
      "lat": 58.2299,
      "lng": 22.5095
    },
    {
      "name": "Kärdla",
      "airport": {
        "name": "Kärdla",
        "code": "KDL"
      },
      "lat": 58.9908,
      "lng": 22.8307
    },
    {
      "name": "Pärnu",
      "airport": {
        "name": "Pärnu",
        "code": "EPU"
      },
      "lat": 58.419,
      "lng": 24.4729
    },
    {
      "name": "Narva",
      "lat": 59.3797,
      "lng": 28.1791
    },
    {
      "name": "Kohtla-Järve",
      "lat": 59.398,
      "lng": 27.2736
    },
    {
      "name": "Viljandi",
      "lat": 58.3639,
      "lng": 25.59
    },
    {
      "name": "Rakvere",
      "lat": 59.3469,
      "lng": 26.3558
    },
    {
      "name": "Maardu",
      "lat": 59.4767,
      "lng": 25.0256
    }
  ],
  "Canada": [
    {
      "name": "Ottawa",
      "airport": {
        "name": "Ottawa Macdonald–Cartier",
        "code": "YOW"
      },
      "lat": 45.3225,
      "lng": -75.6692
    },
    {
      "name": "Toronto",
      "airport": {
        "name": "Pearson",
        "code": "YYZ"
      },
      "lat": 43.6777,
      "lng": -79.6248
    },
    {
      "name": "Vancouver",
      "airport": {
        "name": "Vancouver",
        "code": "YVR"
      },
      "lat": 49.1947,
      "lng": -123.1792
    },
    {
      "name": "Montreal",
      "airport": {
        "name": "Montréal–Trudeau",
        "code": "YUL"
      },
      "lat": 45.4706,
      "lng": -73.7408
    },
    {
      "name": "Calgary",
      "airport": {
        "name": "Calgary",
        "code": "YYC"
      },
      "lat": 51.1215,
      "lng": -114.0076
    },
    {
      "name": "Edmonton",
      "airport": {
        "name": "Edmonton",
        "code": "YEG"
      },
      "lat": 53.3097,
      "lng": -113.5797
    },
    {
      "name": "Winnipeg",
      "airport": {
        "name": "Winnipeg James Armstrong Richardson",
        "code": "YWG"
      },
      "lat": 49.91,
      "lng": -97.2399
    },
    {
      "name": "Halifax",
      "airport": {
        "name": "Halifax Stanfield",
        "code": "YHZ"
      },
      "lat": 44.8808,
      "lng": -63.5086
    },
    {
      "name": "Quebec City",
      "airport": {
        "name": "Québec City Jean Lesage",
        "code": "YQB"
      },
      "lat": 46.7911,
      "lng": -71.3933
    },
    {
      "name": "Victoria",
      "airport": {
        "name": "Victoria",
        "code": "YYJ"
      },
      "lat": 48.6469,
      "lng": -123.4258
    }
  ],
  "Australia": [
    {
      "name": "Canberra",
      "airport": {
        "name": "Canberra",
        "code": "CBR"
      },
      "lat": -35.3069,
      "lng": 149.195
    },
    {
      "name": "Sydney",
      "airport": {
        "name": "Sydney",
        "code": "SYD"
      },
      "lat": -33.9399,
      "lng": 151.1753
    },
    {
      "name": "Melbourne",
      "airport": {
        "name": "Melbourne",
        "code": "MEL"
      },
      "lat": -37.669,
      "lng": 144.843
    },
    {
      "name": "Brisbane",
      "airport": {
        "name": "Brisbane",
        "code": "BNE"
      },
      "lat": -27.3942,
      "lng": 153.1215
    },
    {
      "name": "Perth",
      "airport": {
        "name": "Perth",
        "code": "PER"
      },
      "lat": -31.9385,
      "lng": 115.9672
    },
    {
      "name": "Adelaide",
      "airport": {
        "name": "Adelaide",
        "code": "ADL"
      },
      "lat": -34.945,
      "lng": 138.5306
    },
    {
      "name": "Gold Coast",
      "airport": {
        "name": "Gold Coast",
        "code": "OOL"
      },
      "lat": -28.1649,
      "lng": 153.5045
    },
    {
      "name": "Cairns",
      "airport": {
        "name": "Cairns",
        "code": "CNS"
      },
      "lat": -16.8858,
      "lng": 145.7554
    },
    {
      "name": "Hobart",
      "airport": {
        "name": "Hobart",
        "code": "HBA"
      },
      "lat": -42.8361,
      "lng": 147.5087
    },
    {
      "name": "Darwin",
      "airport": {
        "name": "Darwin",
        "code": "DRW"
      },
      "lat": -12.4147,
      "lng": 130.8767
    }
  ],
  "Singapore": [
    {
      "name": "Singapore",
      "airport": {
        "name": "Changi",
        "code": "SIN"
      },
      "lat": 1.3644,
      "lng": 103.9915
    },
    {
      "name": "Sentosa Island",
      "lat": 1.2494,
      "lng": 103.8303
    },
    {
      "name": "Jurong East",
      "lat": 1.3329,
      "lng": 103.7436
    },
    {
      "name": "Woodlands",
      "lat": 1.4382,
      "lng": 103.789
    },
    {
      "name": "Tampines",
      "lat": 1.3521,
      "lng": 103.9295
    },
    {
      "name": "Bedok",
      "lat": 1.3236,
      "lng": 103.9273
    },
    {
      "name": "Yishun",
      "lat": 1.4304,
      "lng": 103.8354
    },
    {
      "name": "Ang Mo Kio",
      "lat": 1.3691,
      "lng": 103.8454
    },
    {
      "name": "Clementi",
      "lat": 1.3162,
      "lng": 103.7649
    },
    {
      "name": "Serangoon",
      "lat": 1.3554,
      "lng": 103.8679
    }
  ],
  "UAE": [
    {
      "name": "Abu Dhabi",
      "airport": {
        "name": "Zayed International",
        "code": "AUH"
      },
      "lat": 24.4329,
      "lng": 54.6511
    },
    {
      "name": "Dubai",
      "airport": {
        "name": "Dubai International",
        "code": "DXB"
      },
      "lat": 25.2532,
      "lng": 55.3657
    },
    {
      "name": "Sharjah",
      "airport": {
        "name": "Sharjah",
        "code": "SHJ"
      },
      "lat": 25.3286,
      "lng": 55.517
    },
    {
      "name": "Ras Al Khaimah",
      "airport": {
        "name": "Ras Al Khaimah",
        "code": "RKT"
      },
      "lat": 25.6135,
      "lng": 55.9388
    },
    {
      "name": "Fujairah",
      "airport": {
        "name": "Fujairah",
        "code": "FJR"
      },
      "lat": 25.1122,
      "lng": 56.324
    },
    {
      "name": "Al Ain",
      "airport": {
        "name": "Al Ain",
        "code": "AAN"
      },
      "lat": 24.2617,
      "lng": 55.6092
    },
    {
      "name": "Ajman",
      "lat": 25.4052,
      "lng": 55.5136
    },
    {
      "name": "Umm Al Quwain",
      "lat": 25.5653,
      "lng": 55.5533
    },
    {
      "name": "Khor Fakkan",
      "lat": 25.3313,
      "lng": 56.342
    },
    {
      "name": "Kalba",
      "lat": 25.0445,
      "lng": 56.3558
    }
  ],
  "China": [
    {
      "name": "Beijing",
      "airport": {
        "name": "Beijing Capital",
        "code": "PEK"
      },
      "lat": 40.0799,
      "lng": 116.6031
    },
    {
      "name": "Shanghai",
      "airport": {
        "name": "Shanghai Pudong",
        "code": "PVG"
      },
      "lat": 31.1443,
      "lng": 121.8083
    },
    {
      "name": "Guangzhou",
      "airport": {
        "name": "Guangzhou Baiyun",
        "code": "CAN"
      },
      "lat": 23.3959,
      "lng": 113.2988
    },
    {
      "name": "Shenzhen",
      "airport": {
        "name": "Shenzhen Bao'an",
        "code": "SZX"
      },
      "lat": 22.6393,
      "lng": 113.8107
    },
    {
      "name": "Chengdu",
      "airport": {
        "name": "Chengdu Shuangliu",
        "code": "CTU"
      },
      "lat": 30.5785,
      "lng": 103.9471
    },
    {
      "name": "Xi'an",
      "airport": {
        "name": "Xi'an Xianyang",
        "code": "XIY"
      },
      "lat": 34.4272,
      "lng": 108.7575
    },
    {
      "name": "Kunming",
      "airport": {
        "name": "Kunming Changshui",
        "code": "KMG"
      },
      "lat": 25.1019,
      "lng": 102.9303
    },
    {
      "name": "Hangzhou",
      "airport": {
        "name": "Hangzhou Xiaoshan",
        "code": "HGH"
      },
      "lat": 30.2289,
      "lng": 120.4344
    },
    {
      "name": "Chongqing",
      "airport": {
        "name": "Chongqing Jiangbei",
        "code": "CKG"
      },
      "lat": 29.7192,
      "lng": 106.6417
    },
    {
      "name": "Nanjing",
      "airport": {
        "name": "Nanjing Lukou",
        "code": "NKG"
      },
      "lat": 31.742,
      "lng": 118.8619
    }
  ],
  "India": [
    {
      "name": "New Delhi",
      "airport": {
        "name": "Indira Gandhi International",
        "code": "DEL"
      },
      "lat": 28.5562,
      "lng": 77.1
    },
    {
      "name": "Mumbai",
      "airport": {
        "name": "Chhatrapati Shivaji Maharaj",
        "code": "BOM"
      },
      "lat": 19.0896,
      "lng": 72.8656
    },
    {
      "name": "Bengaluru",
      "airport": {
        "name": "Kempegowda International",
        "code": "BLR"
      },
      "lat": 13.1986,
      "lng": 77.7066
    },
    {
      "name": "Chennai",
      "airport": {
        "name": "Chennai International",
        "code": "MAA"
      },
      "lat": 12.9941,
      "lng": 80.1709
    },
    {
      "name": "Kolkata",
      "airport": {
        "name": "Netaji Subhas Chandra Bose",
        "code": "CCU"
      },
      "lat": 22.6547,
      "lng": 88.4467
    },
    {
      "name": "Hyderabad",
      "airport": {
        "name": "Rajiv Gandhi International",
        "code": "HYD"
      },
      "lat": 17.2403,
      "lng": 78.4294
    },
    {
      "name": "Ahmedabad",
      "airport": {
        "name": "Sardar Vallabhbhai Patel",
        "code": "AMD"
      },
      "lat": 23.0732,
      "lng": 72.6347
    },
    {
      "name": "Cochin",
      "airport": {
        "name": "Cochin International",
        "code": "COK"
      },
      "lat": 10.1518,
      "lng": 76.393
    },
    {
      "name": "Goa",
      "airport": {
        "name": "Dabolim",
        "code": "GOI"
      },
      "lat": 15.38,
      "lng": 73.8314
    },
    {
      "name": "Jaipur",
      "airport": {
        "name": "Jaipur",
        "code": "JAI"
      },
      "lat": 26.8242,
      "lng": 75.8122
    }
  ],
  "Japan": [
    {
      "name": "Tokyo",
      "airport": {
        "name": "Narita International",
        "code": "NRT"
      },
      "lat": 35.772,
      "lng": 140.3929
    },
    {
      "name": "Osaka",
      "airport": {
        "name": "Kansai International",
        "code": "KIX"
      },
      "lat": 34.432,
      "lng": 135.2304
    },
    {
      "name": "Fukuoka",
      "airport": {
        "name": "Fukuoka",
        "code": "FUK"
      },
      "lat": 33.5859,
      "lng": 130.4507
    },
    {
      "name": "Sapporo",
      "airport": {
        "name": "New Chitose",
        "code": "CTS"
      },
      "lat": 42.7752,
      "lng": 141.6923
    },
    {
      "name": "Nagoya",
      "airport": {
        "name": "Chubu Centrair",
        "code": "NGO"
      },
      "lat": 34.8584,
      "lng": 136.8053
    },
    {
      "name": "Okinawa",
      "airport": {
        "name": "Naha",
        "code": "OKA"
      },
      "lat": 26.1958,
      "lng": 127.6459
    },
    {
      "name": "Hiroshima",
      "airport": {
        "name": "Hiroshima",
        "code": "HIJ"
      },
      "lat": 34.4361,
      "lng": 132.9194
    },
    {
      "name": "Sendai",
      "airport": {
        "name": "Sendai",
        "code": "SDJ"
      },
      "lat": 38.1397,
      "lng": 140.917
    },
    {
      "name": "Kagoshima",
      "airport": {
        "name": "Kagoshima",
        "code": "KOJ"
      },
      "lat": 31.8034,
      "lng": 130.7194
    },
    {
      "name": "Kumamoto",
      "airport": {
        "name": "Kumamoto",
        "code": "KMJ"
      },
      "lat": 32.8372,
      "lng": 130.8549
    }
  ],
  "Mexico": [
    {
      "name": "Mexico City",
      "airport": {
        "name": "Benito Juárez International",
        "code": "MEX"
      },
      "lat": 19.4361,
      "lng": -99.0719
    },
    {
      "name": "Cancún",
      "airport": {
        "name": "Cancún International",
        "code": "CUN"
      },
      "lat": 21.0367,
      "lng": -86.8771
    },
    {
      "name": "Guadalajara",
      "airport": {
        "name": "Guadalajara",
        "code": "GDL"
      },
      "lat": 20.5218,
      "lng": -103.311
    },
    {
      "name": "Monterrey",
      "airport": {
        "name": "Monterrey",
        "code": "MTY"
      },
      "lat": 25.7785,
      "lng": -100.107
    },
    {
      "name": "Tijuana",
      "airport": {
        "name": "Tijuana",
        "code": "TIJ"
      },
      "lat": 32.5411,
      "lng": -116.9702
    },
    {
      "name": "Puerto Vallarta",
      "airport": {
        "name": "Licenciado Gustavo Díaz Ordaz",
        "code": "PVR"
      },
      "lat": 20.68,
      "lng": -105.2542
    },
    {
      "name": "San José del Cabo",
      "airport": {
        "name": "Los Cabos",
        "code": "SJD"
      },
      "lat": 23.1518,
      "lng": -109.721
    },
    {
      "name": "Mérida",
      "airport": {
        "name": "Mérida",
        "code": "MID"
      },
      "lat": 20.937,
      "lng": -89.6577
    },
    {
      "name": "León",
      "airport": {
        "name": "Del Bajío",
        "code": "BJX"
      },
      "lat": 20.9935,
      "lng": -101.4808
    },
    {
      "name": "Puebla",
      "airport": {
        "name": "Puebla",
        "code": "PBC"
      },
      "lat": 19.1583,
      "lng": -98.3714
    }
  ],
  "Brazil": [
    {
      "name": "Brasília",
      "airport": {
        "name": "Pres. Juscelino Kubitschek",
        "code": "BSB"
      },
      "lat": -15.8267,
      "lng": -47.9218
    },
    {
      "name": "São Paulo",
      "airport": {
        "name": "Guarulhos",
        "code": "GRU"
      },
      "lat": -23.5505,
      "lng": -46.6333
    },
    {
      "name": "Rio de Janeiro",
      "airport": {
        "name": "Galeão",
        "code": "GIG"
      },
      "lat": -22.9068,
      "lng": -43.1729
    },
    {
      "name": "Salvador",
      "airport": {
        "name": "Deputado Luís Eduardo Magalhães",
        "code": "SSA"
      },
      "lat": -12.9777,
      "lng": -38.5016
    },
    {
      "name": "Fortaleza",
      "airport": {
        "name": "Pinto Martins",
        "code": "FOR"
      },
      "lat": -3.7319,
      "lng": -38.5267
    },
    {
      "name": "Belo Horizonte",
      "airport": {
        "name": "Confins",
        "code": "CNF"
      },
      "lat": -19.9167,
      "lng": -43.9345
    },
    {
      "name": "Manaus",
      "airport": {
        "name": "Eduardo Gomes",
        "code": "MAO"
      },
      "lat": -3.119,
      "lng": -60.0217
    },
    {
      "name": "Curitiba",
      "airport": {
        "name": "Afonso Pena",
        "code": "CWB"
      },
      "lat": -25.4284,
      "lng": -49.2733
    },
    {
      "name": "Recife",
      "airport": {
        "name": "Guararapes",
        "code": "REC"
      },
      "lat": -8.0476,
      "lng": -34.877
    },
    {
      "name": "Porto Alegre",
      "airport": {
        "name": "Salgado Filho",
        "code": "POA"
      },
      "lat": -30.0346,
      "lng": -51.2177
    }
  ],
  "Argentina": [
    {
      "name": "Buenos Aires",
      "airport": {
        "name": "Ezeiza",
        "code": "EZE"
      },
      "lat": -34.815,
      "lng": -58.5348
    },
    {
      "name": "Mendoza",
      "airport": {
        "name": "El Plumerillo",
        "code": "MDZ"
      },
      "lat": -32.8317,
      "lng": -68.7929
    },
    {
      "name": "Córdoba",
      "airport": {
        "name": "Ingeniero Aeronáutico Ambrosio L.V. Taravella",
        "code": "COR"
      },
      "lat": -31.31,
      "lng": -64.2083
    },
    {
      "name": "San Carlos de Bariloche",
      "airport": {
        "name": "Teniente Luis Candelaria",
        "code": "BRC"
      },
      "lat": -41.1512,
      "lng": -71.1578
    },
    {
      "name": "Puerto Iguazú",
      "airport": {
        "name": "Cataratas del Iguazú",
        "code": "IGR"
      },
      "lat": -25.7373,
      "lng": -54.4735
    },
    {
      "name": "Salta",
      "airport": {
        "name": "Martín Miguel de Güemes",
        "code": "SLA"
      },
      "lat": -24.8566,
      "lng": -65.4861
    },
    {
      "name": "Ushuaia",
      "airport": {
        "name": "Malvinas Argentinas",
        "code": "USH"
      },
      "lat": -54.8433,
      "lng": -68.2958
    },
    {
      "name": "Tucumán",
      "airport": {
        "name": "Teniente General Benjamín Matienzo",
        "code": "TUC"
      },
      "lat": -26.8409,
      "lng": -65.1054
    },
    {
      "name": "Mar del Plata",
      "airport": {
        "name": "Astor Piazzolla",
        "code": "MDQ"
      },
      "lat": -37.9342,
      "lng": -57.5733
    },
    {
      "name": "Neuquén",
      "airport": {
        "name": "Presidente Perón",
        "code": "NQN"
      },
      "lat": -38.949,
      "lng": -68.1557
    }
  ],
  "Chile": [
    {
      "name": "Santiago",
      "airport": {
        "name": "Arturo Merino Benítez",
        "code": "SCL"
      },
      "lat": -33.393,
      "lng": -70.7858
    },
    {
      "name": "Antofagasta",
      "airport": {
        "name": "Andrés Sabella",
        "code": "ANF"
      },
      "lat": -23.4444,
      "lng": -70.4451
    },
    {
      "name": "Calama",
      "airport": {
        "name": "El Loa",
        "code": "CJC"
      },
      "lat": -22.4982,
      "lng": -68.8976
    },
    {
      "name": "Iquique",
      "airport": {
        "name": "Diego Aracena",
        "code": "IQQ"
      },
      "lat": -20.5352,
      "lng": -70.1813
    },
    {
      "name": "Concepción",
      "airport": {
        "name": "Carriel Sur",
        "code": "CCP"
      },
      "lat": -36.7727,
      "lng": -73.0631
    },
    {
      "name": "Puerto Montt",
      "airport": {
        "name": "El Tepual",
        "code": "PMC"
      },
      "lat": -41.4389,
      "lng": -73.094
    },
    {
      "name": "Punta Arenas",
      "airport": {
        "name": "Presidente Carlos Ibáñez del Campo",
        "code": "PUQ"
      },
      "lat": -53.0026,
      "lng": -70.8546
    },
    {
      "name": "La Serena",
      "airport": {
        "name": "La Florida",
        "code": "LSC"
      },
      "lat": -29.9159,
      "lng": -71.1995
    },
    {
      "name": "Temuco",
      "airport": {
        "name": "La Araucanía",
        "code": "ZCO"
      },
      "lat": -38.925,
      "lng": -72.6517
    },
    {
      "name": "Arica",
      "airport": {
        "name": "Chacalluta",
        "code": "ARI"
      },
      "lat": -18.3485,
      "lng": -70.3387
    }
  ],
  "Colombia": [
    {
      "name": "Bogotá",
      "airport": {
        "name": "El Dorado",
        "code": "BOG"
      },
      "lat": 4.7016,
      "lng": -74.1469
    },
    {
      "name": "Medellín",
      "airport": {
        "name": "José María Córdova",
        "code": "MDE"
      },
      "lat": 6.1645,
      "lng": -75.4231
    },
    {
      "name": "Cali",
      "airport": {
        "name": "Alfonso Bonilla Aragón",
        "code": "CLO"
      },
      "lat": 3.5432,
      "lng": -76.3816
    },
    {
      "name": "Cartagena",
      "airport": {
        "name": "Rafael Núñez",
        "code": "CTG"
      },
      "lat": 10.4424,
      "lng": -75.5129
    },
    {
      "name": "Barranquilla",
      "airport": {
        "name": "Ernesto Cortissoz",
        "code": "BAQ"
      },
      "lat": 10.8896,
      "lng": -74.7808
    },
    {
      "name": "Santa Marta",
      "airport": {
        "name": "Simón Bolívar",
        "code": "SMR"
      },
      "lat": 11.1196,
      "lng": -74.2306
    },
    {
      "name": "San Andrés",
      "airport": {
        "name": "Gustavo Rojas Pinilla",
        "code": "ADZ"
      },
      "lat": 12.5833,
      "lng": -81.7107
    },
    {
      "name": "Pereira",
      "airport": {
        "name": "Matecaña",
        "code": "PEI"
      },
      "lat": 4.813,
      "lng": -75.741
    },
    {
      "name": "Bucaramanga",
      "airport": {
        "name": "Palonegro",
        "code": "BGA"
      },
      "lat": 7.1265,
      "lng": -73.1848
    },
    {
      "name": "Cúcuta",
      "airport": {
        "name": "Camilo Daza",
        "code": "CUC"
      },
      "lat": 7.9275,
      "lng": -72.5116
    }
  ],
  "Peru": [
    {
      "name": "Lima",
      "airport": {
        "name": "Jorge Chávez",
        "code": "LIM"
      },
      "lat": -12.0241,
      "lng": -77.112
    },
    {
      "name": "Cusco",
      "airport": {
        "name": "Alejandro Velasco Astete",
        "code": "CUZ"
      },
      "lat": -13.5357,
      "lng": -71.9388
    },
    {
      "name": "Arequipa",
      "airport": {
        "name": "Rodríguez Ballón",
        "code": "AQP"
      },
      "lat": -16.3411,
      "lng": -71.5658
    },
    {
      "name": "Iquitos",
      "airport": {
        "name": "Coronel FAP Francisco Secada Vignetta",
        "code": "IQT"
      },
      "lat": -3.7847,
      "lng": -73.3087
    },
    {
      "name": "Piura",
      "airport": {
        "name": "Capitán FAP Guillermo Concha Iberico",
        "code": "PIU"
      },
      "lat": -5.2057,
      "lng": -80.6164
    },
    {
      "name": "Tarapoto",
      "airport": {
        "name": "Cadete FAP Guillermo del Castillo Paredes",
        "code": "TPP"
      },
      "lat": -6.5087,
      "lng": -76.3732
    },
    {
      "name": "Trujillo",
      "airport": {
        "name": "Capitán FAP Carlos Martínez de Pinillos",
        "code": "TRU"
      },
      "lat": -8.08,
      "lng": -79.1089
    },
    {
      "name": "Chiclayo",
      "airport": {
        "name": "Capitán FAP José A. Quiñones González",
        "code": "CIX"
      },
      "lat": -6.7873,
      "lng": -79.8281
    },
    {
      "name": "Juliaca",
      "airport": {
        "name": "Inca Manco Cápac",
        "code": "JUL"
      },
      "lat": -15.4671,
      "lng": -70.1582
    },
    {
      "name": "Tacna",
      "airport": {
        "name": "Coronel FAP Carlos Ciriani Santa Rosa",
        "code": "TCQ"
      },
      "lat": -18.0531,
      "lng": -70.2764
    }
  ],
  "Thailand": [
    {
      "name": "Bangkok",
      "airport": {
        "name": "Suvarnabhumi",
        "code": "BKK"
      },
      "lat": 13.69,
      "lng": 100.7501
    },
    {
      "name": "Phuket",
      "airport": {
        "name": "Phuket",
        "code": "HKT"
      },
      "lat": 8.1132,
      "lng": 98.3169
    },
    {
      "name": "Chiang Mai",
      "airport": {
        "name": "Chiang Mai",
        "code": "CNX"
      },
      "lat": 18.7677,
      "lng": 98.9626
    },
    {
      "name": "Krabi",
      "airport": {
        "name": "Krabi",
        "code": "KBV"
      },
      "lat": 8.0991,
      "lng": 98.9863
    },
    {
      "name": "Koh Samui",
      "airport": {
        "name": "Samui",
        "code": "USM"
      },
      "lat": 9.5552,
      "lng": 100.0617
    },
    {
      "name": "Hat Yai",
      "airport": {
        "name": "Hat Yai",
        "code": "HDY"
      },
      "lat": 6.9333,
      "lng": 100.3933
    },
    {
      "name": "Chiang Rai",
      "airport": {
        "name": "Mae Fah Luang - Chiang Rai",
        "code": "CEI"
      },
      "lat": 19.9519,
      "lng": 99.8825
    },
    {
      "name": "Udon Thani",
      "airport": {
        "name": "Udon Thani",
        "code": "UTH"
      },
      "lat": 17.3864,
      "lng": 102.7881
    },
    {
      "name": "Surat Thani",
      "airport": {
        "name": "Surat Thani",
        "code": "URT"
      },
      "lat": 9.1325,
      "lng": 99.1433
    },
    {
      "name": "Khon Kaen",
      "airport": {
        "name": "Khon Kaen",
        "code": "KKC"
      },
      "lat": 16.4667,
      "lng": 102.7839
    }
  ],
  "Vietnam": [
    {
      "name": "Hanoi",
      "airport": {
        "name": "Noi Bai",
        "code": "HAN"
      },
      "lat": 21.213,
      "lng": 105.8035
    },
    {
      "name": "Ho Chi Minh City",
      "airport": {
        "name": "Tan Son Nhat",
        "code": "SGN"
      },
      "lat": 10.8185,
      "lng": 106.6588
    },
    {
      "name": "Da Nang",
      "airport": {
        "name": "Da Nang",
        "code": "DAD"
      },
      "lat": 16.0439,
      "lng": 108.1994
    },
    {
      "name": "Nha Trang",
      "airport": {
        "name": "Cam Ranh",
        "code": "CXR"
      },
      "lat": 11.998,
      "lng": 109.2194
    },
    {
      "name": "Phu Quoc",
      "airport": {
        "name": "Phu Quoc",
        "code": "PQC"
      },
      "lat": 10.1598,
      "lng": 103.9934
    },
    {
      "name": "Hai Phong",
      "airport": {
        "name": "Cat Bi",
        "code": "HPH"
      },
      "lat": 20.8193,
      "lng": 106.7246
    },
    {
      "name": "Da Lat",
      "airport": {
        "name": "Lien Khuong",
        "code": "DLI"
      },
      "lat": 11.7509,
      "lng": 108.3715
    },
    {
      "name": "Can Tho",
      "airport": {
        "name": "Can Tho",
        "code": "VCA"
      },
      "lat": 10.0851,
      "lng": 105.7119
    },
    {
      "name": "Hue",
      "airport": {
        "name": "Phu Bai",
        "code": "HUI"
      },
      "lat": 16.4019,
      "lng": 107.7025
    },
    {
      "name": "Vinh",
      "airport": {
        "name": "Vinh",
        "code": "VII"
      },
      "lat": 18.7299,
      "lng": 105.6703
    }
  ],
  "Saudi Arabia": [
    {
      "name": "Riyadh",
      "airport": {
        "name": "King Khalid",
        "code": "RUH"
      },
      "lat": 24.9576,
      "lng": 46.6988
    },
    {
      "name": "Jeddah",
      "airport": {
        "name": "King Abdulaziz",
        "code": "JED"
      },
      "lat": 21.6796,
      "lng": 39.1565
    },
    {
      "name": "Dammam",
      "airport": {
        "name": "King Fahd",
        "code": "DMM"
      },
      "lat": 26.4712,
      "lng": 49.7979
    },
    {
      "name": "Medina",
      "airport": {
        "name": "Prince Mohammad bin Abdulaziz",
        "code": "MED"
      },
      "lat": 24.5533,
      "lng": 39.7051
    },
    {
      "name": "Abha",
      "airport": {
        "name": "Abha",
        "code": "AHB"
      },
      "lat": 18.2404,
      "lng": 42.6566
    },
    {
      "name": "Tabuk",
      "airport": {
        "name": "Prince Sultan bin Abdulaziz",
        "code": "TUU"
      },
      "lat": 28.3734,
      "lng": 36.619
    },
    {
      "name": "Gizan",
      "airport": {
        "name": "King Abdullah bin Abdulaziz",
        "code": "GIZ"
      },
      "lat": 16.9011,
      "lng": 42.5841
    },
    {
      "name": "Qassim",
      "airport": {
        "name": "Prince Naif bin Abdulaziz",
        "code": "ELQ"
      },
      "lat": 26.3028,
      "lng": 43.7745
    },
    {
      "name": "Taif",
      "airport": {
        "name": "Taif",
        "code": "TIF"
      },
      "lat": 21.4828,
      "lng": 40.5431
    },
    {
      "name": "Hail",
      "airport": {
        "name": "Hail",
        "code": "HAS"
      },
      "lat": 27.4376,
      "lng": 41.6865
    }
  ],
  "Turkey": [
    {
      "name": "Ankara",
      "airport": {
        "name": "Esenboğa",
        "code": "ESB"
      },
      "lat": 40.1281,
      "lng": 32.9951
    },
    {
      "name": "Istanbul",
      "airport": {
        "name": "Istanbul",
        "code": "IST"
      },
      "lat": 41.2753,
      "lng": 28.7519
    },
    {
      "name": "Antalya",
      "airport": {
        "name": "Antalya",
        "code": "AYT"
      },
      "lat": 36.8987,
      "lng": 30.8005
    },
    {
      "name": "Izmir",
      "airport": {
        "name": "Adnan Menderes",
        "code": "ADB"
      },
      "lat": 38.2924,
      "lng": 27.157
    },
    {
      "name": "Dalaman",
      "airport": {
        "name": "Dalaman",
        "code": "DLM"
      },
      "lat": 36.7131,
      "lng": 28.7925
    },
    {
      "name": "Bodrum",
      "airport": {
        "name": "Milas–Bodrum",
        "code": "BJV"
      },
      "lat": 37.2506,
      "lng": 27.6644
    },
    {
      "name": "Adana",
      "airport": {
        "name": "Şakirpaşa",
        "code": "ADA"
      },
      "lat": 36.9822,
      "lng": 35.2803
    },
    {
      "name": "Trabzon",
      "airport": {
        "name": "Trabzon",
        "code": "TZX"
      },
      "lat": 40.9951,
      "lng": 39.7897
    },
    {
      "name": "Kayseri",
      "airport": {
        "name": "Erkilet",
        "code": "ASR"
      },
      "lat": 38.7706,
      "lng": 35.4956
    },
    {
      "name": "Gaziantep",
      "airport": {
        "name": "Gaziantep",
        "code": "GZT"
      },
      "lat": 36.9448,
      "lng": 37.4785
    }
  ],
  "South Korea": [
    {
      "name": "Seoul",
      "airport": {
        "name": "Incheon",
        "code": "ICN"
      },
      "lat": 37.4602,
      "lng": 126.4407
    },
    {
      "name": "Busan",
      "airport": {
        "name": "Gimhae",
        "code": "PUS"
      },
      "lat": 35.1795,
      "lng": 128.9382
    },
    {
      "name": "Jeju",
      "airport": {
        "name": "Jeju",
        "code": "CJU"
      },
      "lat": 33.5113,
      "lng": 126.493
    },
    {
      "name": "Daegu",
      "airport": {
        "name": "Daegu",
        "code": "TAE"
      },
      "lat": 35.8939,
      "lng": 128.6588
    },
    {
      "name": "Cheongju",
      "airport": {
        "name": "Cheongju",
        "code": "CJJ"
      },
      "lat": 36.7165,
      "lng": 127.499
    },
    {
      "name": "Muan",
      "airport": {
        "name": "Muan",
        "code": "MWX"
      },
      "lat": 34.9914,
      "lng": 126.3828
    },
    {
      "name": "Yangyang",
      "airport": {
        "name": "Yangyang",
        "code": "YNY"
      },
      "lat": 38.0613,
      "lng": 128.669
    },
    {
      "name": "Gwangju",
      "airport": {
        "name": "Gwangju",
        "code": "KWJ"
      },
      "lat": 35.1264,
      "lng": 126.8089
    },
    {
      "name": "Yeosu",
      "airport": {
        "name": "Yeosu",
        "code": "RSU"
      },
      "lat": 34.8423,
      "lng": 127.6173
    },
    {
      "name": "Ulsan",
      "airport": {
        "name": "Ulsan",
        "code": "USN"
      },
      "lat": 35.5935,
      "lng": 129.3517
    }
  ],
  "Egypt": [
    {
      "name": "Cairo",
      "airport": {
        "name": "Cairo Intl",
        "code": "CAI"
      },
      "lat": 30.0444,
      "lng": 31.2357
    },
    {
      "name": "Alexandria",
      "airport": {
        "name": "Borg El Arab",
        "code": "HBE"
      },
      "lat": 31.2001,
      "lng": 29.9187
    },
    {
      "name": "Luxor",
      "airport": {
        "name": "Luxor Intl",
        "code": "LXR"
      },
      "lat": 25.6872,
      "lng": 32.6396
    },
    {
      "name": "Aswan",
      "airport": {
        "name": "Aswan Intl",
        "code": "ASW"
      },
      "lat": 24.0889,
      "lng": 32.8998
    },
    {
      "name": "Giza",
      "lat": 30.0131,
      "lng": 31.2089
    },
    {
      "name": "Sharm El Sheikh",
      "airport": {
        "name": "Sharm El Sheikh Intl",
        "code": "SSH"
      },
      "lat": 27.9158,
      "lng": 34.3299
    },
    {
      "name": "Hurghada",
      "airport": {
        "name": "Hurghada Intl",
        "code": "HRG"
      },
      "lat": 27.2579,
      "lng": 33.8116
    },
    {
      "name": "Port Said",
      "lat": 31.2653,
      "lng": 32.3019
    },
    {
      "name": "Suez",
      "lat": 29.9668,
      "lng": 32.5498
    },
    {
      "name": "Mansoura",
      "lat": 31.0409,
      "lng": 31.3785
    }
  ],
  "South Africa": [
    {
      "name": "Pretoria",
      "lat": -25.7479,
      "lng": 28.2293
    },
    {
      "name": "Cape Town",
      "airport": {
        "name": "Cape Town Intl",
        "code": "CPT"
      },
      "lat": -33.9249,
      "lng": 18.4241
    },
    {
      "name": "Johannesburg",
      "airport": {
        "name": "O.R. Tambo Intl",
        "code": "JNB"
      },
      "lat": -26.2041,
      "lng": 28.0473
    },
    {
      "name": "Durban",
      "airport": {
        "name": "King Shaka Intl",
        "code": "DUR"
      },
      "lat": -29.8587,
      "lng": 31.0218
    },
    {
      "name": "Port Elizabeth",
      "airport": {
        "name": "Chief Dawid Stuurman",
        "code": "PLZ"
      },
      "lat": -33.9608,
      "lng": 25.6022
    },
    {
      "name": "Bloemfontein",
      "airport": {
        "name": "Bram Fischer",
        "code": "BFN"
      },
      "lat": -29.0852,
      "lng": 26.1596
    },
    {
      "name": "East London",
      "airport": {
        "name": "East London",
        "code": "ELS"
      },
      "lat": -33.0153,
      "lng": 27.9116
    },
    {
      "name": "Nelspruit",
      "airport": {
        "name": "Kruger Mpumalanga",
        "code": "MQP"
      },
      "lat": -25.4753,
      "lng": 30.9694
    },
    {
      "name": "Kimberley",
      "airport": {
        "name": "Kimberley",
        "code": "KIM"
      },
      "lat": -28.7282,
      "lng": 24.7499
    },
    {
      "name": "Polokwane",
      "airport": {
        "name": "Polokwane",
        "code": "PTG"
      },
      "lat": -23.9045,
      "lng": 29.4688
    }
  ],
  "Nigeria": [
    {
      "name": "Abuja",
      "airport": {
        "name": "Nnamdi Azikiwe Intl",
        "code": "ABV"
      },
      "lat": 9.0765,
      "lng": 7.3986
    },
    {
      "name": "Lagos",
      "airport": {
        "name": "Murtala Muhammed Intl",
        "code": "LOS"
      },
      "lat": 6.5244,
      "lng": 3.3792
    },
    {
      "name": "Kano",
      "airport": {
        "name": "Mallam Aminu Kano Intl",
        "code": "KAN"
      },
      "lat": 12.0022,
      "lng": 8.5919
    },
    {
      "name": "Ibadan",
      "airport": {
        "name": "Ibadan",
        "code": "IBA"
      },
      "lat": 7.3775,
      "lng": 3.947
    },
    {
      "name": "Port Harcourt",
      "airport": {
        "name": "Port Harcourt Intl",
        "code": "PHC"
      },
      "lat": 4.8156,
      "lng": 7.0498
    },
    {
      "name": "Benin City",
      "airport": {
        "name": "Benin",
        "code": "BNI"
      },
      "lat": 6.335,
      "lng": 5.6037
    },
    {
      "name": "Kaduna",
      "airport": {
        "name": "Kaduna",
        "code": "KAD"
      },
      "lat": 10.5105,
      "lng": 7.4165
    },
    {
      "name": "Enugu",
      "airport": {
        "name": "Akanu Ibiam Intl",
        "code": "ENU"
      },
      "lat": 6.4584,
      "lng": 7.5464
    },
    {
      "name": "Jos",
      "airport": {
        "name": "Yakubu Gowon",
        "code": "JOS"
      },
      "lat": 9.8965,
      "lng": 8.8583
    },
    {
      "name": "Ilorin",
      "airport": {
        "name": "Ilorin",
        "code": "ILR"
      },
      "lat": 8.4799,
      "lng": 4.5418
    }
  ],
  "Kenya": [
    {
      "name": "Nairobi",
      "airport": {
        "name": "Jomo Kenyatta Intl",
        "code": "NBO"
      },
      "lat": -1.2921,
      "lng": 36.8219
    },
    {
      "name": "Mombasa",
      "airport": {
        "name": "Moi Intl",
        "code": "MBA"
      },
      "lat": -4.0435,
      "lng": 39.6682
    },
    {
      "name": "Kisumu",
      "airport": {
        "name": "Kisumu Intl",
        "code": "KIS"
      },
      "lat": -0.0917,
      "lng": 34.768
    },
    {
      "name": "Nakuru",
      "lat": -0.3031,
      "lng": 36.08
    },
    {
      "name": "Eldoret",
      "airport": {
        "name": "Eldoret Intl",
        "code": "EDL"
      },
      "lat": 0.5143,
      "lng": 35.2698
    },
    {
      "name": "Malindi",
      "airport": {
        "name": "Malindi",
        "code": "MYD"
      },
      "lat": -3.2192,
      "lng": 40.1169
    },
    {
      "name": "Thika",
      "lat": -1.0388,
      "lng": 37.0834
    },
    {
      "name": "Nyeri",
      "lat": -0.4169,
      "lng": 36.951
    },
    {
      "name": "Kitale",
      "lat": 1.0191,
      "lng": 35.0023
    },
    {
      "name": "Garissa",
      "lat": -0.4532,
      "lng": 39.6461
    }
  ],
  "Morocco": [
    {
      "name": "Rabat",
      "airport": {
        "name": "Rabat-Salé",
        "code": "RBA"
      },
      "lat": 34.0209,
      "lng": -6.8416
    },
    {
      "name": "Casablanca",
      "airport": {
        "name": "Mohammed V Intl",
        "code": "CMN"
      },
      "lat": 33.5731,
      "lng": -7.5898
    },
    {
      "name": "Marrakech",
      "airport": {
        "name": "Menara",
        "code": "RAK"
      },
      "lat": 31.6295,
      "lng": -7.9811
    },
    {
      "name": "Fes",
      "airport": {
        "name": "Fès-Saïss",
        "code": "FEZ"
      },
      "lat": 34.0181,
      "lng": -5.0078
    },
    {
      "name": "Tangier",
      "airport": {
        "name": "Ibn Batouta",
        "code": "TNG"
      },
      "lat": 35.7595,
      "lng": -5.834
    },
    {
      "name": "Agadir",
      "airport": {
        "name": "Al Massira",
        "code": "AGA"
      },
      "lat": 30.4278,
      "lng": -9.5981
    },
    {
      "name": "Meknes",
      "lat": 33.8938,
      "lng": -5.5516
    },
    {
      "name": "Oujda",
      "airport": {
        "name": "Angads",
        "code": "OUD"
      },
      "lat": 34.6814,
      "lng": -1.9076
    },
    {
      "name": "Kenitra",
      "lat": 34.261,
      "lng": -6.5802
    },
    {
      "name": "Tetouan",
      "airport": {
        "name": "Sania Ramel",
        "code": "TTU"
      },
      "lat": 35.5785,
      "lng": -5.3684
    }
  ],
  "Russia": [
    {
      "name": "Moscow",
      "airport": {
        "name": "Sheremetyevo",
        "code": "SVO"
      },
      "lat": 55.7558,
      "lng": 37.6173
    },
    {
      "name": "Saint Petersburg",
      "airport": {
        "name": "Pulkovo",
        "code": "LED"
      },
      "lat": 59.9343,
      "lng": 30.3351
    },
    {
      "name": "Novosibirsk",
      "airport": {
        "name": "Tolmachevo",
        "code": "OVB"
      },
      "lat": 55.0084,
      "lng": 82.9357
    },
    {
      "name": "Yekaterinburg",
      "airport": {
        "name": "Koltsovo",
        "code": "SVX"
      },
      "lat": 56.8389,
      "lng": 60.6057
    },
    {
      "name": "Kazan",
      "airport": {
        "name": "Kazan",
        "code": "KZN"
      },
      "lat": 55.8304,
      "lng": 49.0661
    },
    {
      "name": "Nizhny Novgorod",
      "airport": {
        "name": "Strigino",
        "code": "GOJ"
      },
      "lat": 56.3269,
      "lng": 44.0059
    },
    {
      "name": "Chelyabinsk",
      "airport": {
        "name": "Balandino",
        "code": "CEK"
      },
      "lat": 55.1644,
      "lng": 61.4368
    },
    {
      "name": "Samara",
      "airport": {
        "name": "Kurumoch",
        "code": "KUF"
      },
      "lat": 53.2415,
      "lng": 50.2212
    },
    {
      "name": "Omsk",
      "airport": {
        "name": "Omsk",
        "code": "OMS"
      },
      "lat": 54.9885,
      "lng": 73.3242
    },
    {
      "name": "Rostov-on-Don",
      "airport": {
        "name": "Platov",
        "code": "ROV"
      },
      "lat": 47.2357,
      "lng": 39.7015
    }
  ],
  "Indonesia": [
    {
      "name": "Jakarta",
      "airport": {
        "name": "Soekarno-Hatta",
        "code": "CGK"
      },
      "lat": -6.2088,
      "lng": 106.8456
    },
    {
      "name": "Surabaya",
      "airport": {
        "name": "Juanda",
        "code": "SUB"
      },
      "lat": -7.2575,
      "lng": 112.7521
    },
    {
      "name": "Bandung",
      "airport": {
        "name": "Husein Sastranegara",
        "code": "BDO"
      },
      "lat": -6.9175,
      "lng": 107.6191
    },
    {
      "name": "Medan",
      "airport": {
        "name": "Kualanamu",
        "code": "KNO"
      },
      "lat": 3.5952,
      "lng": 98.6722
    },
    {
      "name": "Semarang",
      "airport": {
        "name": "Ahmad Yani",
        "code": "SRG"
      },
      "lat": -6.9667,
      "lng": 110.4167
    },
    {
      "name": "Palembang",
      "airport": {
        "name": "Sultan Mahmud Badaruddin II",
        "code": "PLM"
      },
      "lat": -2.9909,
      "lng": 104.7566
    },
    {
      "name": "Makassar",
      "airport": {
        "name": "Sultan Hasanuddin",
        "code": "UPG"
      },
      "lat": -5.1477,
      "lng": 119.4327
    },
    {
      "name": "Batam",
      "airport": {
        "name": "Hang Nadim",
        "code": "BTH"
      },
      "lat": 1.1455,
      "lng": 104.0574
    },
    {
      "name": "Denpasar",
      "airport": {
        "name": "Ngurah Rai",
        "code": "DPS"
      },
      "lat": -8.6705,
      "lng": 115.2126
    },
    {
      "name": "Yogyakarta",
      "airport": {
        "name": "Adisutjipto",
        "code": "JOG"
      },
      "lat": -7.7955,
      "lng": 110.3695
    }
  ],
  "Pakistan": [
    {
      "name": "Islamabad",
      "airport": {
        "name": "Islamabad Intl",
        "code": "ISB"
      },
      "lat": 33.6844,
      "lng": 73.0479
    },
    {
      "name": "Karachi",
      "airport": {
        "name": "Jinnah Intl",
        "code": "KHI"
      },
      "lat": 24.8607,
      "lng": 67.0011
    },
    {
      "name": "Lahore",
      "airport": {
        "name": "Allama Iqbal Intl",
        "code": "LHE"
      },
      "lat": 31.5204,
      "lng": 74.3587
    },
    {
      "name": "Faisalabad",
      "airport": {
        "name": "Faisalabad Intl",
        "code": "LYP"
      },
      "lat": 31.4504,
      "lng": 73.135
    },
    {
      "name": "Rawalpindi",
      "lat": 33.5651,
      "lng": 73.0169
    },
    {
      "name": "Multan",
      "airport": {
        "name": "Multan Intl",
        "code": "MUX"
      },
      "lat": 30.1575,
      "lng": 71.5249
    },
    {
      "name": "Gujranwala",
      "lat": 32.1603,
      "lng": 74.1883
    },
    {
      "name": "Hyderabad",
      "lat": 25.396,
      "lng": 68.3578
    },
    {
      "name": "Peshawar",
      "airport": {
        "name": "Bacha Khan Intl",
        "code": "PEW"
      },
      "lat": 34.0151,
      "lng": 71.5249
    },
    {
      "name": "Quetta",
      "airport": {
        "name": "Quetta Intl",
        "code": "UET"
      },
      "lat": 30.1798,
      "lng": 66.975
    }
  ],
  "Bangladesh": [
    {
      "name": "Dhaka",
      "airport": {
        "name": "Hazrat Shahjalal Intl",
        "code": "DAC"
      },
      "lat": 23.8103,
      "lng": 90.4125
    },
    {
      "name": "Chittagong",
      "airport": {
        "name": "Shah Amanat Intl",
        "code": "CGP"
      },
      "lat": 22.3569,
      "lng": 91.7832
    },
    {
      "name": "Khulna",
      "lat": 22.8456,
      "lng": 89.5403
    },
    {
      "name": "Rajshahi",
      "airport": {
        "name": "Shah Makhdum",
        "code": "RJH"
      },
      "lat": 24.3636,
      "lng": 88.6241
    },
    {
      "name": "Sylhet",
      "airport": {
        "name": "Osmani Intl",
        "code": "ZYL"
      },
      "lat": 24.8949,
      "lng": 91.8687
    },
    {
      "name": "Mymensingh",
      "lat": 24.7471,
      "lng": 90.4203
    },
    {
      "name": "Barisal",
      "airport": {
        "name": "Barisal",
        "code": "BZL"
      },
      "lat": 22.701,
      "lng": 90.3535
    },
    {
      "name": "Rangpur",
      "airport": {
        "name": "Saidpur",
        "code": "SPD"
      },
      "lat": 25.7439,
      "lng": 89.2752
    },
    {
      "name": "Comilla",
      "lat": 23.4607,
      "lng": 91.1809
    },
    {
      "name": "Narayanganj",
      "lat": 23.6238,
      "lng": 90.5
    }
  ],
  "Philippines": [
    {
      "name": "Manila",
      "airport": {
        "name": "Ninoy Aquino Intl",
        "code": "MNL"
      },
      "lat": 14.5995,
      "lng": 120.9842
    },
    {
      "name": "Quezon City",
      "lat": 14.676,
      "lng": 121.0437
    },
    {
      "name": "Davao City",
      "airport": {
        "name": "Francisco Bangoy Intl",
        "code": "DVO"
      },
      "lat": 7.1907,
      "lng": 125.4553
    },
    {
      "name": "Cebu City",
      "airport": {
        "name": "Mactan-Cebu Intl",
        "code": "CEB"
      },
      "lat": 10.3157,
      "lng": 123.8854
    },
    {
      "name": "Zamboanga City",
      "airport": {
        "name": "Zamboanga Intl",
        "code": "ZAM"
      },
      "lat": 6.9214,
      "lng": 122.079
    },
    {
      "name": "Taguig",
      "lat": 14.5176,
      "lng": 121.0509
    },
    {
      "name": "Pasig",
      "lat": 14.5764,
      "lng": 121.0851
    },
    {
      "name": "Cagayan de Oro",
      "airport": {
        "name": "Laguindingan",
        "code": "CGY"
      },
      "lat": 8.4542,
      "lng": 124.6319
    },
    {
      "name": "Parañaque",
      "lat": 14.4793,
      "lng": 121.0198
    },
    {
      "name": "Makati",
      "lat": 14.5547,
      "lng": 121.0244
    }
  ],
  "New Zealand": [
    {
      "name": "Wellington",
      "airport": {
        "name": "Wellington",
        "code": "WLG"
      },
      "lat": -41.2866,
      "lng": 174.7756
    },
    {
      "name": "Auckland",
      "airport": {
        "name": "Auckland",
        "code": "AKL"
      },
      "lat": -36.8485,
      "lng": 174.7633
    },
    {
      "name": "Christchurch",
      "airport": {
        "name": "Christchurch",
        "code": "CHC"
      },
      "lat": -43.5321,
      "lng": 172.6362
    },
    {
      "name": "Hamilton",
      "airport": {
        "name": "Hamilton",
        "code": "HLZ"
      },
      "lat": -37.787,
      "lng": 175.2793
    },
    {
      "name": "Tauranga",
      "airport": {
        "name": "Tauranga",
        "code": "TRG"
      },
      "lat": -37.6878,
      "lng": 176.1651
    },
    {
      "name": "Napier-Hastings",
      "airport": {
        "name": "Hawke's Bay",
        "code": "NPE"
      },
      "lat": -39.4928,
      "lng": 176.912
    },
    {
      "name": "Dunedin",
      "airport": {
        "name": "Dunedin",
        "code": "DUD"
      },
      "lat": -45.8788,
      "lng": 170.5028
    },
    {
      "name": "Palmerston North",
      "airport": {
        "name": "Palmerston North",
        "code": "PMR"
      },
      "lat": -40.3523,
      "lng": 175.6082
    },
    {
      "name": "Nelson",
      "airport": {
        "name": "Nelson",
        "code": "NSN"
      },
      "lat": -41.2706,
      "lng": 173.284
    },
    {
      "name": "Rotorua",
      "airport": {
        "name": "Rotorua",
        "code": "ROT"
      },
      "lat": -38.1368,
      "lng": 176.2497
    }
  ],
  "Israel": [
    {
      "name": "Jerusalem",
      "lat": 31.7683,
      "lng": 35.2137
    },
    {
      "name": "Tel Aviv",
      "airport": {
        "name": "Ben Gurion",
        "code": "TLV"
      },
      "lat": 32.0853,
      "lng": 34.7818
    },
    {
      "name": "Haifa",
      "airport": {
        "name": "Haifa",
        "code": "HFA"
      },
      "lat": 32.794,
      "lng": 34.9896
    },
    {
      "name": "Rishon LeZion",
      "lat": 31.973,
      "lng": 34.7925
    },
    {
      "name": "Petah Tikva",
      "lat": 32.084,
      "lng": 34.8878
    },
    {
      "name": "Ashdod",
      "lat": 31.8044,
      "lng": 34.6553
    },
    {
      "name": "Netanya",
      "lat": 32.3215,
      "lng": 34.8532
    },
    {
      "name": "Beersheba",
      "lat": 31.2518,
      "lng": 34.7913
    },
    {
      "name": "Holon",
      "lat": 32.0158,
      "lng": 34.7874
    },
    {
      "name": "Bnei Brak",
      "lat": 32.0849,
      "lng": 34.8352
    }
  ],
  "Ukraine": [
    {
      "name": "Kyiv",
      "airport": {
        "name": "Boryspil",
        "code": "KBP"
      },
      "lat": 50.4501,
      "lng": 30.5234
    },
    {
      "name": "Kharkiv",
      "airport": {
        "name": "Kharkiv",
        "code": "HRK"
      },
      "lat": 49.9935,
      "lng": 36.2304
    },
    {
      "name": "Odesa",
      "airport": {
        "name": "Odesa",
        "code": "ODS"
      },
      "lat": 46.4825,
      "lng": 30.7233
    },
    {
      "name": "Dnipro",
      "airport": {
        "name": "Dnipro",
        "code": "DNK"
      },
      "lat": 48.4647,
      "lng": 35.0462
    },
    {
      "name": "Donetsk",
      "airport": {
        "name": "Donetsk",
        "code": "DOK"
      },
      "lat": 48.0159,
      "lng": 37.8028
    },
    {
      "name": "Zaporizhzhia",
      "airport": {
        "name": "Zaporizhzhia",
        "code": "OZH"
      },
      "lat": 47.8388,
      "lng": 35.1396
    },
    {
      "name": "Lviv",
      "airport": {
        "name": "Lviv",
        "code": "LWO"
      },
      "lat": 49.8397,
      "lng": 24.0297
    },
    {
      "name": "Kryvyi Rih",
      "airport": {
        "name": "Kryvyi Rih",
        "code": "KWG"
      },
      "lat": 47.9105,
      "lng": 33.3918
    },
    {
      "name": "Mykolaiv",
      "airport": {
        "name": "Mykolaiv",
        "code": "NLV"
      },
      "lat": 46.975,
      "lng": 31.9946
    },
    {
      "name": "Mariupol",
      "lat": 47.0971,
      "lng": 37.5434
    }
  ],
  "Malaysia": [
    {
      "name": "Kuala Lumpur",
      "airport": {
        "name": "Kuala Lumpur Intl",
        "code": "KUL"
      },
      "lat": 3.139,
      "lng": 101.6869
    },
    {
      "name": "George Town",
      "airport": {
        "name": "Penang Intl",
        "code": "PEN"
      },
      "lat": 5.4141,
      "lng": 100.3288
    },
    {
      "name": "Ipoh",
      "airport": {
        "name": "Sultan Azlan Shah",
        "code": "IPH"
      },
      "lat": 4.5975,
      "lng": 101.0901
    },
    {
      "name": "Johor Bahru",
      "airport": {
        "name": "Senai Intl",
        "code": "JHB"
      },
      "lat": 1.4927,
      "lng": 103.7414
    },
    {
      "name": "Malacca City",
      "airport": {
        "name": "Malacca Intl",
        "code": "MKZ"
      },
      "lat": 2.1896,
      "lng": 102.2501
    },
    {
      "name": "Kota Kinabalu",
      "airport": {
        "name": "Kota Kinabalu Intl",
        "code": "BKI"
      },
      "lat": 5.9804,
      "lng": 116.0735
    },
    {
      "name": "Kuching",
      "airport": {
        "name": "Kuching Intl",
        "code": "KCH"
      },
      "lat": 1.5533,
      "lng": 110.3592
    },
    {
      "name": "Kuantan",
      "airport": {
        "name": "Sultan Haji Ahmad Shah",
        "code": "KUA"
      },
      "lat": 3.8077,
      "lng": 103.326
    },
    {
      "name": "Alor Setar",
      "airport": {
        "name": "Sultan Abdul Halim",
        "code": "AOR"
      },
      "lat": 6.1248,
      "lng": 100.3678
    },
    {
      "name": "Miri",
      "airport": {
        "name": "Miri",
        "code": "MYY"
      },
      "lat": 4.4148,
      "lng": 114.0089
    }
  ],
  "Taiwan": [
    {
      "name": "Taipei",
      "airport": {
        "name": "Taoyuan Intl",
        "code": "TPE"
      },
      "lat": 25.033,
      "lng": 121.5654
    },
    {
      "name": "Kaohsiung",
      "airport": {
        "name": "Kaohsiung Intl",
        "code": "KHH"
      },
      "lat": 22.6273,
      "lng": 120.3014
    },
    {
      "name": "Taichung",
      "airport": {
        "name": "Taichung Intl",
        "code": "RMQ"
      },
      "lat": 24.1477,
      "lng": 120.6736
    },
    {
      "name": "Tainan",
      "airport": {
        "name": "Tainan",
        "code": "TNN"
      },
      "lat": 22.9997,
      "lng": 120.227
    },
    {
      "name": "Taoyuan",
      "lat": 24.9936,
      "lng": 121.301
    },
    {
      "name": "New Taipei",
      "lat": 25.012,
      "lng": 121.4657
    },
    {
      "name": "Hsinchu",
      "lat": 24.8138,
      "lng": 120.9675
    },
    {
      "name": "Keelung",
      "lat": 25.1276,
      "lng": 121.7392
    },
    {
      "name": "Chiayi",
      "lat": 23.48,
      "lng": 120.4491
    },
    {
      "name": "Changhua",
      "lat": 24.0518,
      "lng": 120.546
    }
  ],
  "Iran": [
    {
      "name": "Tehran",
      "airport": {
        "name": "Imam Khomeini Intl",
        "code": "IKA"
      },
      "lat": 35.6892,
      "lng": 51.389
    },
    {
      "name": "Mashhad",
      "airport": {
        "name": "Mashhad Intl",
        "code": "MHD"
      },
      "lat": 36.2605,
      "lng": 59.6168
    },
    {
      "name": "Isfahan",
      "airport": {
        "name": "Isfahan Intl",
        "code": "IFN"
      },
      "lat": 32.6546,
      "lng": 51.668
    },
    {
      "name": "Karaj",
      "airport": {
        "name": "Payam Intl",
        "code": "PYK"
      },
      "lat": 35.8355,
      "lng": 50.9915
    },
    {
      "name": "Shiraz",
      "airport": {
        "name": "Shiraz Intl",
        "code": "SYZ"
      },
      "lat": 29.5926,
      "lng": 52.5836
    },
    {
      "name": "Tabriz",
      "airport": {
        "name": "Tabriz Intl",
        "code": "TBZ"
      },
      "lat": 38.0962,
      "lng": 46.2609
    },
    {
      "name": "Qom",
      "lat": 34.6399,
      "lng": 50.8759
    },
    {
      "name": "Ahvaz",
      "airport": {
        "name": "Ahvaz Intl",
        "code": "AWZ"
      },
      "lat": 31.3183,
      "lng": 48.6706
    },
    {
      "name": "Kermanshah",
      "airport": {
        "name": "Kermanshah",
        "code": "KSH"
      },
      "lat": 34.3142,
      "lng": 47.065
    },
    {
      "name": "Urmia",
      "airport": {
        "name": "Urmia",
        "code": "OMH"
      },
      "lat": 37.5498,
      "lng": 45.0786
    }
  ],
  "Iraq": [
    {
      "name": "Baghdad",
      "airport": {
        "name": "Baghdad Intl",
        "code": "BGW"
      },
      "lat": 33.3152,
      "lng": 44.3661
    },
    {
      "name": "Basra",
      "airport": {
        "name": "Basra Intl",
        "code": "BSR"
      },
      "lat": 30.5081,
      "lng": 47.7835
    },
    {
      "name": "Mosul",
      "lat": 36.34,
      "lng": 43.13
    },
    {
      "name": "Erbil",
      "airport": {
        "name": "Erbil Intl",
        "code": "EBL"
      },
      "lat": 36.1901,
      "lng": 44.0091
    },
    {
      "name": "Kirkuk",
      "airport": {
        "name": "Kirkuk",
        "code": "KIK"
      },
      "lat": 35.4677,
      "lng": 44.3917
    },
    {
      "name": "Najaf",
      "airport": {
        "name": "Al Najaf Intl",
        "code": "NJF"
      },
      "lat": 32.0016,
      "lng": 44.3403
    },
    {
      "name": "Karbala",
      "lat": 32.616,
      "lng": 44.025
    },
    {
      "name": "Sulaymaniyah",
      "airport": {
        "name": "Sulaimaniyah Intl",
        "code": "ISU"
      },
      "lat": 35.5669,
      "lng": 45.4329
    },
    {
      "name": "Nasiriyah",
      "lat": 31.0575,
      "lng": 46.2573
    },
    {
      "name": "Amarah",
      "lat": 31.8365,
      "lng": 47.1462
    }
  ],
  "Qatar": [
    {
      "name": "Doha",
      "airport": {
        "name": "Hamad Intl",
        "code": "DOH"
      },
      "lat": 25.2854,
      "lng": 51.531
    },
    {
      "name": "Al Rayyan",
      "lat": 25.2916,
      "lng": 51.4244
    },
    {
      "name": "Umm Salal",
      "lat": 25.4167,
      "lng": 51.4167
    },
    {
      "name": "Al Khor",
      "lat": 25.6839,
      "lng": 51.5058
    },
    {
      "name": "Al Wakrah",
      "lat": 25.1768,
      "lng": 51.6049
    },
    {
      "name": "Mesaieed",
      "lat": 24.9918,
      "lng": 51.5476
    },
    {
      "name": "Madinat ash Shamal",
      "lat": 26.1167,
      "lng": 51.2167
    },
    {
      "name": "Dukhan",
      "lat": 25.4272,
      "lng": 50.7858
    },
    {
      "name": "Al Shahaniya",
      "lat": 25.3711,
      "lng": 51.225
    },
    {
      "name": "Lusail",
      "lat": 25.419,
      "lng": 51.508
    }
  ],
  "Kuwait": [
    {
      "name": "Kuwait City",
      "airport": {
        "name": "Kuwait Intl",
        "code": "KWI"
      },
      "lat": 29.3759,
      "lng": 47.9774
    },
    {
      "name": "Al Ahmadi",
      "lat": 29.0769,
      "lng": 48.0722
    },
    {
      "name": "Hawalli",
      "lat": 29.3375,
      "lng": 48.0286
    },
    {
      "name": "As Salimiyah",
      "lat": 29.3347,
      "lng": 48.0772
    },
    {
      "name": "Sabah As Salim",
      "lat": 29.245,
      "lng": 48.0789
    },
    {
      "name": "Al Farwaniyah",
      "lat": 29.2783,
      "lng": 47.9619
    },
    {
      "name": "Al Fahahil",
      "lat": 29.0833,
      "lng": 48.1333
    },
    {
      "name": "Jahra",
      "lat": 29.3378,
      "lng": 47.6583
    },
    {
      "name": "Mangaf",
      "lat": 29.0911,
      "lng": 48.1278
    },
    {
      "name": "Mahboula",
      "lat": 29.1361,
      "lng": 48.1272
    }
  ],
  "Kazakhstan": [
    {
      "name": "Almaty",
      "airport": {
        "name": "Almaty Intl",
        "code": "ALA"
      },
      "lat": 43.222,
      "lng": 76.8512
    },
    {
      "name": "Astana",
      "airport": {
        "name": "Nursultan Nazarbayev",
        "code": "NQZ"
      },
      "lat": 51.1694,
      "lng": 71.4491
    },
    {
      "name": "Shymkent",
      "airport": {
        "name": "Shymkent Intl",
        "code": "CIT"
      },
      "lat": 42.3417,
      "lng": 69.5901
    },
    {
      "name": "Karaganda",
      "airport": {
        "name": "Sary-Arka",
        "code": "KGF"
      },
      "lat": 49.802,
      "lng": 73.1021
    },
    {
      "name": "Aktobe",
      "airport": {
        "name": "Aktobe Intl",
        "code": "AKX"
      },
      "lat": 50.2839,
      "lng": 57.167
    },
    {
      "name": "Taraz",
      "airport": {
        "name": "Aulie-Ata",
        "code": "DMB"
      },
      "lat": 42.9,
      "lng": 71.3667
    },
    {
      "name": "Pavlodar",
      "airport": {
        "name": "Pavlodar",
        "code": "PWQ"
      },
      "lat": 52.2873,
      "lng": 76.9674
    },
    {
      "name": "Ust-Kamenogorsk",
      "airport": {
        "name": "Oskemen",
        "code": "UKK"
      },
      "lat": 49.95,
      "lng": 82.6167
    },
    {
      "name": "Semey",
      "airport": {
        "name": "Semey",
        "code": "PLX"
      },
      "lat": 50.4111,
      "lng": 80.2275
    },
    {
      "name": "Atyrau",
      "airport": {
        "name": "Atyrau",
        "code": "GUW"
      },
      "lat": 47.1167,
      "lng": 51.8833
    }
  ],
  "Venezuela": [
    {
      "name": "Caracas",
      "airport": {
        "name": "Simón Bolívar",
        "code": "CCS"
      },
      "lat": 10.4806,
      "lng": -66.9036
    },
    {
      "name": "Maracaibo",
      "airport": {
        "name": "La Chinita",
        "code": "MAR"
      },
      "lat": 10.6427,
      "lng": -71.6125
    },
    {
      "name": "Valencia",
      "airport": {
        "name": "Arturo Michelena",
        "code": "VLN"
      },
      "lat": 10.162,
      "lng": -68.0077
    },
    {
      "name": "Barquisimeto",
      "airport": {
        "name": "Jacinto Lara",
        "code": "BRM"
      },
      "lat": 10.0647,
      "lng": -69.357
    },
    {
      "name": "Maracay",
      "airport": {
        "name": "Tacarigua",
        "code": "MYC"
      },
      "lat": 10.2353,
      "lng": -67.5911
    },
    {
      "name": "Ciudad Guayana",
      "airport": {
        "name": "Manuel Carlos Piar",
        "code": "PZO"
      },
      "lat": 8.2961,
      "lng": -62.7117
    },
    {
      "name": "Barcelona",
      "airport": {
        "name": "Gral. José Antonio Anzoátegui",
        "code": "BLA"
      },
      "lat": 10.136,
      "lng": -64.6866
    },
    {
      "name": "Maturín",
      "airport": {
        "name": "José Tadeo Monagas",
        "code": "MUN"
      },
      "lat": 9.7457,
      "lng": -63.1832
    },
    {
      "name": "San Cristóbal",
      "airport": {
        "name": "Mayor Buenaventura Vivas",
        "code": "STD"
      },
      "lat": 7.7669,
      "lng": -72.225
    },
    {
      "name": "Cumaná",
      "airport": {
        "name": "Antonio José de Sucre",
        "code": "CUM"
      },
      "lat": 10.4535,
      "lng": -64.1775
    }
  ],
  "Ecuador": [
    {
      "name": "Quito",
      "airport": {
        "name": "Mariscal Sucre Intl",
        "code": "UIO"
      },
      "lat": -0.1807,
      "lng": -78.4678
    },
    {
      "name": "Guayaquil",
      "airport": {
        "name": "José Joaquín de Olmedo",
        "code": "GYE"
      },
      "lat": -2.1894,
      "lng": -79.8891
    },
    {
      "name": "Cuenca",
      "airport": {
        "name": "Mariscal Lamar",
        "code": "CUE"
      },
      "lat": -2.9001,
      "lng": -79.0059
    },
    {
      "name": "Santo Domingo",
      "lat": -0.253,
      "lng": -79.1754
    },
    {
      "name": "Machala",
      "lat": -3.2581,
      "lng": -79.9605
    },
    {
      "name": "Manta",
      "airport": {
        "name": "Eloy Alfaro",
        "code": "MEC"
      },
      "lat": -0.9677,
      "lng": -80.7089
    },
    {
      "name": "Portoviejo",
      "lat": -1.0546,
      "lng": -80.4544
    },
    {
      "name": "Ambato",
      "lat": -1.2491,
      "lng": -78.6168
    },
    {
      "name": "Riobamba",
      "lat": -1.6635,
      "lng": -78.6546
    },
    {
      "name": "Esmeraldas",
      "airport": {
        "name": "Carlos Concha Torres",
        "code": "ESM"
      },
      "lat": 0.9639,
      "lng": -79.6517
    }
  ],
  "Cuba": [
    {
      "name": "Havana",
      "airport": {
        "name": "José Martí Intl",
        "code": "HAV"
      },
      "lat": 23.1136,
      "lng": -82.3666
    },
    {
      "name": "Santiago de Cuba",
      "airport": {
        "name": "Antonio Maceo",
        "code": "SCU"
      },
      "lat": 20.0169,
      "lng": -75.8302
    },
    {
      "name": "Camagüey",
      "airport": {
        "name": "Ignacio Agramonte",
        "code": "CMW"
      },
      "lat": 21.3808,
      "lng": -77.9169
    },
    {
      "name": "Holguín",
      "airport": {
        "name": "Frank País",
        "code": "HOG"
      },
      "lat": 20.8872,
      "lng": -76.2631
    },
    {
      "name": "Santa Clara",
      "airport": {
        "name": "Abel Santamaría",
        "code": "SNU"
      },
      "lat": 22.4069,
      "lng": -79.9647
    },
    {
      "name": "Guantánamo",
      "airport": {
        "name": "Mariana Grajales",
        "code": "GAO"
      },
      "lat": 20.1444,
      "lng": -75.2092
    },
    {
      "name": "Bayamo",
      "airport": {
        "name": "Carlos Manuel de Céspedes",
        "code": "BYM"
      },
      "lat": 20.3816,
      "lng": -76.6431
    },
    {
      "name": "Victoria de Las Tunas",
      "lat": 20.9617,
      "lng": -76.9511
    },
    {
      "name": "Cienfuegos",
      "airport": {
        "name": "Jaime González",
        "code": "CFG"
      },
      "lat": 22.1583,
      "lng": -80.4526
    },
    {
      "name": "Manzanillo",
      "airport": {
        "name": "Sierra Maestra",
        "code": "MZO"
      },
      "lat": 20.3397,
      "lng": -77.1086
    }
  ],
  "Serbia": [
    {
      "name": "Belgrade",
      "airport": {
        "name": "Nikola Tesla",
        "code": "BEG"
      },
      "lat": 44.7866,
      "lng": 20.4489
    },
    {
      "name": "Novi Sad",
      "lat": 45.2671,
      "lng": 19.8335
    },
    {
      "name": "Niš",
      "airport": {
        "name": "Constantine the Great",
        "code": "INI"
      },
      "lat": 43.3209,
      "lng": 21.8954
    },
    {
      "name": "Kragujevac",
      "lat": 44.0128,
      "lng": 20.9114
    },
    {
      "name": "Subotica",
      "lat": 46.1005,
      "lng": 19.6631
    },
    {
      "name": "Zrenjanin",
      "lat": 45.3783,
      "lng": 20.3878
    },
    {
      "name": "Pančevo",
      "lat": 44.8708,
      "lng": 20.6404
    },
    {
      "name": "Čačak",
      "lat": 43.8914,
      "lng": 20.3502
    },
    {
      "name": "Kruševac",
      "lat": 43.5833,
      "lng": 21.3267
    },
    {
      "name": "Kraljevo",
      "airport": {
        "name": "Morava",
        "code": "KVO"
      },
      "lat": 43.7254,
      "lng": 20.6894
    }
  ],
  "Belarus": [
    {
      "name": "Minsk",
      "airport": {
        "name": "Minsk National",
        "code": "MSQ"
      },
      "lat": 53.9006,
      "lng": 27.559
    },
    {
      "name": "Gomel",
      "airport": {
        "name": "Gomel",
        "code": "GME"
      },
      "lat": 52.4345,
      "lng": 30.9754
    },
    {
      "name": "Mogilev",
      "lat": 53.8981,
      "lng": 30.3325
    },
    {
      "name": "Vitebsk",
      "lat": 55.1927,
      "lng": 30.2064
    },
    {
      "name": "Grodno",
      "lat": 53.6884,
      "lng": 23.8258
    },
    {
      "name": "Brest",
      "airport": {
        "name": "Brest",
        "code": "BQT"
      },
      "lat": 52.0976,
      "lng": 23.7341
    },
    {
      "name": "Bobruisk",
      "lat": 53.1384,
      "lng": 29.2207
    },
    {
      "name": "Baranovichi",
      "lat": 53.1327,
      "lng": 26.0139
    },
    {
      "name": "Borisov",
      "lat": 54.2289,
      "lng": 28.5086
    },
    {
      "name": "Pinsk",
      "lat": 52.115,
      "lng": 26.1042
    }
  ],
  "Algeria": [
    {
      "name": "Algiers",
      "airport": {
        "name": "Houari Boumediene",
        "code": "ALG"
      },
      "lat": 36.7538,
      "lng": 3.0588
    },
    {
      "name": "Oran",
      "airport": {
        "name": "Ahmed Ben Bella",
        "code": "ORN"
      },
      "lat": 35.6971,
      "lng": -0.6308
    },
    {
      "name": "Constantine",
      "airport": {
        "name": "Mohamed Boudiaf",
        "code": "CZL"
      },
      "lat": 36.365,
      "lng": 6.6147
    },
    {
      "name": "Annaba",
      "airport": {
        "name": "Rabah Bitat",
        "code": "AAE"
      },
      "lat": 36.9009,
      "lng": 7.7669
    },
    {
      "name": "Blida",
      "lat": 36.47,
      "lng": 2.8292
    },
    {
      "name": "Batna",
      "airport": {
        "name": "Mostépha Ben Boulaïd",
        "code": "BLJ"
      },
      "lat": 35.555,
      "lng": 6.1736
    },
    {
      "name": "Djelfa",
      "lat": 34.6728,
      "lng": 3.263
    },
    {
      "name": "Sétif",
      "airport": {
        "name": "8 Mai 1945",
        "code": "QSF"
      },
      "lat": 36.1898,
      "lng": 5.4101
    },
    {
      "name": "Sidi Bel Abbès",
      "lat": 35.1899,
      "lng": -0.6309
    },
    {
      "name": "Biskra",
      "airport": {
        "name": "Mohamed Khider",
        "code": "BSK"
      },
      "lat": 34.8516,
      "lng": 5.7281
    }
  ],
  "Ethiopia": [
    {
      "name": "Addis Ababa",
      "airport": {
        "name": "Bole Intl",
        "code": "ADD"
      },
      "lat": 9.032,
      "lng": 38.7468
    },
    {
      "name": "Dire Dawa",
      "airport": {
        "name": "Aba Tenna Dejazmach Yilma",
        "code": "DIR"
      },
      "lat": 9.5931,
      "lng": 41.8661
    },
    {
      "name": "Mek'ele",
      "airport": {
        "name": "Alula Aba Nega",
        "code": "MQX"
      },
      "lat": 13.4969,
      "lng": 39.4767
    },
    {
      "name": "Gondar",
      "airport": {
        "name": "Atse Tewodros",
        "code": "GDQ"
      },
      "lat": 12.6,
      "lng": 37.4667
    },
    {
      "name": "Bahir Dar",
      "airport": {
        "name": "Bahir Dar",
        "code": "BJR"
      },
      "lat": 11.5936,
      "lng": 37.3908
    },
    {
      "name": "Hawassa",
      "lat": 7.0622,
      "lng": 38.4763
    },
    {
      "name": "Jimma",
      "airport": {
        "name": "Aba Segud",
        "code": "JIM"
      },
      "lat": 7.6674,
      "lng": 36.8369
    },
    {
      "name": "Jijiga",
      "airport": {
        "name": "Jijiga",
        "code": "JIJ"
      },
      "lat": 9.35,
      "lng": 42.8
    },
    {
      "name": "Dessie",
      "lat": 11.1272,
      "lng": 39.6367
    },
    {
      "name": "Shashamane",
      "lat": 7.2,
      "lng": 38.6
    }
  ],
  "Bolivia": [
    {
      "name": "La Paz",
      "airport": {
        "name": "El Alto Intl",
        "code": "LPB"
      },
      "lat": -16.5,
      "lng": -68.1193
    },
    {
      "name": "Santa Cruz de la Sierra",
      "airport": {
        "name": "Viru Viru Intl",
        "code": "VVI"
      },
      "lat": -17.7833,
      "lng": -63.1819
    },
    {
      "name": "Cochabamba",
      "airport": {
        "name": "Jorge Wilstermann",
        "code": "CBB"
      },
      "lat": -17.3895,
      "lng": -66.1568
    },
    {
      "name": "Sucre",
      "airport": {
        "name": "Alcantarí",
        "code": "SRE"
      },
      "lat": -19.0353,
      "lng": -65.2592
    },
    {
      "name": "Oruro",
      "airport": {
        "name": "Juan Mendoza",
        "code": "ORU"
      },
      "lat": -17.9667,
      "lng": -67.1167
    },
    {
      "name": "Tarija",
      "airport": {
        "name": "Capitán Oriel Lea Plaza",
        "code": "TJA"
      },
      "lat": -21.5355,
      "lng": -64.7296
    },
    {
      "name": "Potosí",
      "airport": {
        "name": "Capitán Nicolás Rojas",
        "code": "POI"
      },
      "lat": -19.5892,
      "lng": -65.7541
    },
    {
      "name": "Montero",
      "lat": -17.3387,
      "lng": -63.2505
    },
    {
      "name": "Trinidad",
      "airport": {
        "name": "Teniente Jorge Henrich Arauz",
        "code": "TDD"
      },
      "lat": -14.8333,
      "lng": -64.9
    },
    {
      "name": "Riberalta",
      "airport": {
        "name": "Riberalta",
        "code": "RIB"
      },
      "lat": -11.0065,
      "lng": -66.0631
    }
  ],
  "Paraguay": [
    {
      "name": "Asunción",
      "airport": {
        "name": "Silvio Pettirossi Intl",
        "code": "ASU"
      },
      "lat": -25.2637,
      "lng": -57.5759
    },
    {
      "name": "Ciudad del Este",
      "airport": {
        "name": "Guaraní Intl",
        "code": "AGT"
      },
      "lat": -25.51,
      "lng": -54.6106
    },
    {
      "name": "San Lorenzo",
      "lat": -25.3397,
      "lng": -57.5089
    },
    {
      "name": "Luque",
      "lat": -25.2667,
      "lng": -57.4833
    },
    {
      "name": "Capiatá",
      "lat": -25.35,
      "lng": -57.4167
    },
    {
      "name": "Lambaré",
      "lat": -25.3464,
      "lng": -57.6064
    },
    {
      "name": "Fernando de la Mora",
      "lat": -25.3167,
      "lng": -57.55
    },
    {
      "name": "Limpio",
      "lat": -25.1667,
      "lng": -57.4833
    },
    {
      "name": "Nemby",
      "lat": -25.3833,
      "lng": -57.5333
    },
    {
      "name": "Encarnación",
      "lat": -27.3306,
      "lng": -55.8667
    }
  ],
  "Uruguay": [
    {
      "name": "Montevideo",
      "airport": {
        "name": "Carrasco Intl",
        "code": "MVD"
      },
      "lat": -34.9011,
      "lng": -56.1645
    },
    {
      "name": "Salto",
      "airport": {
        "name": "Nueva Hespérides",
        "code": "STY"
      },
      "lat": -31.3833,
      "lng": -57.9667
    },
    {
      "name": "Ciudad de la Costa",
      "lat": -34.8183,
      "lng": -55.9553
    },
    {
      "name": "Paysandú",
      "lat": -32.3167,
      "lng": -58.0833
    },
    {
      "name": "Las Piedras",
      "lat": -34.7264,
      "lng": -56.2136
    },
    {
      "name": "Rivera",
      "lat": -30.9,
      "lng": -55.55
    },
    {
      "name": "Maldonado",
      "airport": {
        "name": "Capitán de Corbeta Carlos A. Curbelo",
        "code": "PDP"
      },
      "lat": -34.9,
      "lng": -54.95
    },
    {
      "name": "Tacuarembó",
      "lat": -31.7333,
      "lng": -55.9833
    },
    {
      "name": "Melo",
      "lat": -32.3667,
      "lng": -54.1833
    },
    {
      "name": "Mercedes",
      "lat": -33.25,
      "lng": -58.0333
    }
  ],
  "Dominican Republic": [
    {
      "name": "Santo Domingo",
      "airport": {
        "name": "Las Américas Intl",
        "code": "SDQ"
      },
      "lat": 18.4861,
      "lng": -69.9312
    },
    {
      "name": "Santiago de los Caballeros",
      "airport": {
        "name": "Cibao Intl",
        "code": "STI"
      },
      "lat": 19.4517,
      "lng": -70.697
    },
    {
      "name": "Santo Domingo Este",
      "lat": 18.4833,
      "lng": -69.8667
    },
    {
      "name": "Santo Domingo Norte",
      "lat": 18.55,
      "lng": -69.9
    },
    {
      "name": "Santo Domingo Oeste",
      "lat": 18.5,
      "lng": -70
    },
    {
      "name": "Punta Cana",
      "airport": {
        "name": "Punta Cana Intl",
        "code": "PUJ"
      },
      "lat": 18.5556,
      "lng": -68.351
    },
    {
      "name": "San Pedro de Macorís",
      "lat": 18.45,
      "lng": -69.3
    },
    {
      "name": "La Romana",
      "airport": {
        "name": "La Romana Intl",
        "code": "LRM"
      },
      "lat": 18.4273,
      "lng": -68.9728
    },
    {
      "name": "San Cristóbal",
      "lat": 18.4167,
      "lng": -70.1
    },
    {
      "name": "Puerto Plata",
      "airport": {
        "name": "Gregorio Luperón Intl",
        "code": "POP"
      },
      "lat": 19.7934,
      "lng": -70.6884
    }
  ],
  "Sri Lanka": [
    {
      "name": "Colombo",
      "airport": {
        "name": "Bandaranaike Intl",
        "code": "CMB"
      },
      "lat": 6.9271,
      "lng": 79.8612
    },
    {
      "name": "Dehiwala-Mount Lavinia",
      "lat": 6.845,
      "lng": 79.866
    },
    {
      "name": "Moratuwa",
      "lat": 6.773,
      "lng": 79.8816
    },
    {
      "name": "Sri Jayawardenepura Kotte",
      "lat": 6.9,
      "lng": 79.9164
    },
    {
      "name": "Negombo",
      "lat": 7.2083,
      "lng": 79.8358
    },
    {
      "name": "Kandy",
      "lat": 7.2906,
      "lng": 80.6337
    },
    {
      "name": "Kalmunai",
      "lat": 7.4167,
      "lng": 81.8333
    },
    {
      "name": "Vavuniya",
      "lat": 8.7514,
      "lng": 80.4971
    },
    {
      "name": "Galle",
      "lat": 6.0535,
      "lng": 80.221
    },
    {
      "name": "Trincomalee",
      "lat": 8.5711,
      "lng": 81.2335
    }
  ],
  "Myanmar": [
    {
      "name": "Yangon",
      "airport": {
        "name": "Yangon Intl",
        "code": "RGN"
      },
      "lat": 16.8409,
      "lng": 96.1735
    },
    {
      "name": "Mandalay",
      "airport": {
        "name": "Mandalay Intl",
        "code": "MDL"
      },
      "lat": 21.98,
      "lng": 96.08
    },
    {
      "name": "Naypyidaw",
      "airport": {
        "name": "Naypyidaw Intl",
        "code": "NYT"
      },
      "lat": 19.7633,
      "lng": 96.0785
    },
    {
      "name": "Mawlamyine",
      "lat": 16.4897,
      "lng": 97.6256
    },
    {
      "name": "Bago",
      "lat": 17.3221,
      "lng": 96.4667
    },
    {
      "name": "Pathein",
      "lat": 16.7808,
      "lng": 94.7381
    },
    {
      "name": "Monywa",
      "lat": 22.1083,
      "lng": 95.1333
    },
    {
      "name": "Sittwe",
      "airport": {
        "name": "Sittwe",
        "code": "AKY"
      },
      "lat": 20.15,
      "lng": 92.9
    },
    {
      "name": "Meiktila",
      "lat": 20.8753,
      "lng": 95.8603
    },
    {
      "name": "Taunggyi",
      "lat": 20.7753,
      "lng": 97.0328
    }
  ],
  "Cambodia": [
    {
      "name": "Phnom Penh",
      "airport": {
        "name": "Phnom Penh Intl",
        "code": "PNH"
      },
      "lat": 11.5564,
      "lng": 104.9282
    },
    {
      "name": "Siem Reap",
      "airport": {
        "name": "Siem Reap Intl",
        "code": "REP"
      },
      "lat": 13.3633,
      "lng": 103.8564
    },
    {
      "name": "Battambang",
      "lat": 13.0957,
      "lng": 103.2022
    },
    {
      "name": "Sihanoukville",
      "airport": {
        "name": "Sihanouk Intl",
        "code": "KOS"
      },
      "lat": 10.6093,
      "lng": 103.5296
    },
    {
      "name": "Poipet",
      "lat": 13.6561,
      "lng": 102.5625
    },
    {
      "name": "Kampong Cham",
      "lat": 11.9924,
      "lng": 105.4645
    },
    {
      "name": "Sisophon",
      "lat": 13.5859,
      "lng": 102.9737
    },
    {
      "name": "Pursat",
      "lat": 12.5388,
      "lng": 103.9192
    },
    {
      "name": "Kampot",
      "lat": 10.6104,
      "lng": 104.1815
    },
    {
      "name": "Kampong Speu",
      "lat": 11.4533,
      "lng": 104.5206
    }
  ],
  "Jordan": [
    {
      "name": "Amman",
      "airport": {
        "name": "Queen Alia Intl",
        "code": "AMM"
      },
      "lat": 31.9454,
      "lng": 35.9284
    },
    {
      "name": "Zarqa",
      "lat": 32.0643,
      "lng": 36.0858
    },
    {
      "name": "Irbid",
      "lat": 32.5568,
      "lng": 35.8469
    },
    {
      "name": "Russeifa",
      "lat": 32.0178,
      "lng": 36.0464
    },
    {
      "name": "Al-Quwaysimah",
      "lat": 31.9325,
      "lng": 35.9453
    },
    {
      "name": "Wadi as-Sir",
      "lat": 31.9542,
      "lng": 35.8194
    },
    {
      "name": "Tila al-Ali",
      "lat": 32.0006,
      "lng": 35.87
    },
    {
      "name": "Khuraybat as-Suq",
      "lat": 31.9167,
      "lng": 35.9333
    },
    {
      "name": "Aqaba",
      "airport": {
        "name": "King Hussein Intl",
        "code": "AQJ"
      },
      "lat": 29.5319,
      "lng": 35.0061
    },
    {
      "name": "As-Salt",
      "lat": 32.0392,
      "lng": 35.7272
    }
  ],
  "Uzbekistan": [
    {
      "name": "Tashkent",
      "airport": {
        "name": "Tashkent Intl",
        "code": "TAS"
      },
      "lat": 41.2995,
      "lng": 69.2401
    },
    {
      "name": "Samarkand",
      "airport": {
        "name": "Samarkand Intl",
        "code": "SKD"
      },
      "lat": 39.6542,
      "lng": 66.9597
    },
    {
      "name": "Namangan",
      "airport": {
        "name": "Namangan",
        "code": "NMA"
      },
      "lat": 40.9983,
      "lng": 71.6726
    },
    {
      "name": "Andijan",
      "airport": {
        "name": "Andizhan",
        "code": "AZN"
      },
      "lat": 40.7821,
      "lng": 72.3442
    },
    {
      "name": "Nukus",
      "airport": {
        "name": "Nukus",
        "code": "NCU"
      },
      "lat": 42.4602,
      "lng": 59.618
    },
    {
      "name": "Bukhara",
      "airport": {
        "name": "Bukhara Intl",
        "code": "BHK"
      },
      "lat": 39.7747,
      "lng": 64.4286
    },
    {
      "name": "Fergana",
      "airport": {
        "name": "Fergana Intl",
        "code": "FEG"
      },
      "lat": 40.3842,
      "lng": 71.7843
    },
    {
      "name": "Qarshi",
      "airport": {
        "name": "Karshi",
        "code": "KSQ"
      },
      "lat": 38.8667,
      "lng": 65.8
    },
    {
      "name": "Kokand",
      "lat": 40.5333,
      "lng": 70.9333
    },
    {
      "name": "Margilan",
      "lat": 40.4833,
      "lng": 71.7167
    }
  ],
  "Tanzania": [
    {
      "name": "Dar es Salaam",
      "airport": {
        "name": "Julius Nyerere Intl",
        "code": "DAR"
      },
      "lat": -6.7924,
      "lng": 39.2083
    },
    {
      "name": "Mwanza",
      "airport": {
        "name": "Mwanza",
        "code": "MWZ"
      },
      "lat": -2.5167,
      "lng": 32.9
    },
    {
      "name": "Arusha",
      "airport": {
        "name": "Arusha",
        "code": "ARK"
      },
      "lat": -3.3667,
      "lng": 36.6833
    },
    {
      "name": "Dodoma",
      "airport": {
        "name": "Dodoma",
        "code": "DOD"
      },
      "lat": -6.163,
      "lng": 35.7516
    },
    {
      "name": "Mbeya",
      "airport": {
        "name": "Songwe",
        "code": "MBI"
      },
      "lat": -8.9,
      "lng": 33.45
    },
    {
      "name": "Morogoro",
      "lat": -6.8278,
      "lng": 37.6667
    },
    {
      "name": "Tanga",
      "airport": {
        "name": "Tanga",
        "code": "TGT"
      },
      "lat": -5.0667,
      "lng": 39.1
    },
    {
      "name": "Kahama",
      "lat": -3.8375,
      "lng": 32.6
    },
    {
      "name": "Tabora",
      "airport": {
        "name": "Tabora",
        "code": "TBO"
      },
      "lat": -5.0167,
      "lng": 32.8
    },
    {
      "name": "Zanzibar City",
      "airport": {
        "name": "Abeid Amani Karume Intl",
        "code": "ZNZ"
      },
      "lat": -6.1659,
      "lng": 39.2026
    }
  ],
  "Ghana": [
    {
      "name": "Accra",
      "airport": {
        "name": "Kotoka Intl",
        "code": "ACC"
      },
      "lat": 5.6037,
      "lng": -0.187
    },
    {
      "name": "Kumasi",
      "airport": {
        "name": "Kumasi",
        "code": "KMS"
      },
      "lat": 6.6666,
      "lng": -1.6163
    },
    {
      "name": "Tamale",
      "airport": {
        "name": "Tamale",
        "code": "TML"
      },
      "lat": 9.4008,
      "lng": -0.8393
    },
    {
      "name": "Takoradi",
      "airport": {
        "name": "Takoradi",
        "code": "TKD"
      },
      "lat": 4.8845,
      "lng": -1.7554
    },
    {
      "name": "Ashaiman",
      "lat": 5.7,
      "lng": -0.0333
    },
    {
      "name": "Tema",
      "lat": 5.6667,
      "lng": 0
    },
    {
      "name": "Teshie",
      "lat": 5.5836,
      "lng": -0.1083
    },
    {
      "name": "Cape Coast",
      "lat": 5.1,
      "lng": -1.25
    },
    {
      "name": "Sekondi-Takoradi",
      "lat": 4.9333,
      "lng": -1.7167
    },
    {
      "name": "Obuasi",
      "lat": 6.2,
      "lng": -1.6833
    }
  ],
  "Lebanon": [
    {
      "name": "Beirut",
      "airport": {
        "name": "Rafic Hariri Intl",
        "code": "BEY"
      },
      "lat": 33.8938,
      "lng": 35.5018
    },
    {
      "name": "Tripoli",
      "lat": 34.4367,
      "lng": 35.8497
    },
    {
      "name": "Sidon",
      "lat": 33.5599,
      "lng": 35.3756
    },
    {
      "name": "Tyre",
      "lat": 33.2733,
      "lng": 35.1939
    },
    {
      "name": "Nabatieh",
      "lat": 33.3789,
      "lng": 35.4839
    },
    {
      "name": "Zahle",
      "lat": 33.8463,
      "lng": 35.902
    },
    {
      "name": "Jounieh",
      "lat": 33.9889,
      "lng": 35.6139
    },
    {
      "name": "Baalbek",
      "lat": 34.0058,
      "lng": 36.2181
    },
    {
      "name": "Byblos",
      "lat": 34.123,
      "lng": 35.6519
    },
    {
      "name": "Aley",
      "lat": 33.806,
      "lng": 35.602
    }
  ],
  "Tunisia": [
    {
      "name": "Tunis",
      "airport": {
        "name": "Tunis-Carthage",
        "code": "TUN"
      },
      "lat": 36.8065,
      "lng": 10.1815
    },
    {
      "name": "Sfax",
      "airport": {
        "name": "Sfax–Thyna",
        "code": "SFA"
      },
      "lat": 34.74,
      "lng": 10.76
    },
    {
      "name": "Sousse",
      "lat": 35.8256,
      "lng": 10.6084
    },
    {
      "name": "Kairouan",
      "lat": 35.6781,
      "lng": 10.0963
    },
    {
      "name": "Metouia",
      "lat": 33.96,
      "lng": 10
    },
    {
      "name": "Kebili",
      "lat": 33.7044,
      "lng": 8.969
    },
    {
      "name": "Bizerte",
      "lat": 37.2744,
      "lng": 9.8739
    },
    {
      "name": "Gabès",
      "airport": {
        "name": "Gabès-Matmata",
        "code": "GAE"
      },
      "lat": 33.8815,
      "lng": 10.0982
    },
    {
      "name": "Ariana",
      "lat": 36.8625,
      "lng": 10.1956
    },
    {
      "name": "Gafsa",
      "airport": {
        "name": "Gafsa-Ksar",
        "code": "GAF"
      },
      "lat": 34.425,
      "lng": 8.7842
    }
  ],
  "Azerbaijan": [
    {
      "name": "Baku",
      "airport": {
        "name": "Heydar Aliyev Intl",
        "code": "GYD"
      },
      "lat": 40.4093,
      "lng": 49.8671
    },
    {
      "name": "Ganja",
      "airport": {
        "name": "Ganja Intl",
        "code": "GNJ"
      },
      "lat": 40.6828,
      "lng": 46.3606
    },
    {
      "name": "Sumqayit",
      "lat": 40.5897,
      "lng": 49.6686
    },
    {
      "name": "Mingachevir",
      "lat": 40.7639,
      "lng": 47.0597
    },
    {
      "name": "Khirdalan",
      "lat": 40.4481,
      "lng": 49.755
    },
    {
      "name": "Shirvan",
      "lat": 39.9509,
      "lng": 48.9156
    },
    {
      "name": "Nakhchivan",
      "airport": {
        "name": "Nakhchivan Intl",
        "code": "NAJ"
      },
      "lat": 39.2089,
      "lng": 45.4122
    },
    {
      "name": "Shaki",
      "lat": 41.1919,
      "lng": 47.1706
    },
    {
      "name": "Yevlakh",
      "lat": 40.6197,
      "lng": 47.15
    },
    {
      "name": "Lankaran",
      "airport": {
        "name": "Lankaran Intl",
        "code": "LLK"
      },
      "lat": 38.7528,
      "lng": 48.8511
    }
  ],
  "Georgia": [
    {
      "name": "Tbilisi",
      "airport": {
        "name": "Tbilisi Intl",
        "code": "TBS"
      },
      "lat": 41.7151,
      "lng": 44.8271
    },
    {
      "name": "Batumi",
      "airport": {
        "name": "Batumi Intl",
        "code": "BUS"
      },
      "lat": 41.6168,
      "lng": 41.6367
    },
    {
      "name": "Kutaisi",
      "airport": {
        "name": "Kutaisi Intl",
        "code": "KUT"
      },
      "lat": 42.2662,
      "lng": 42.718
    },
    {
      "name": "Rustavi",
      "lat": 41.54,
      "lng": 45
    },
    {
      "name": "Gori",
      "lat": 41.9842,
      "lng": 44.1158
    },
    {
      "name": "Zugdidi",
      "lat": 42.5088,
      "lng": 41.8708
    },
    {
      "name": "Poti",
      "lat": 42.1462,
      "lng": 41.672
    },
    {
      "name": "Sokhumi",
      "airport": {
        "name": "Sukhumi Babushara",
        "code": "SUI"
      },
      "lat": 43.0016,
      "lng": 41.0234
    },
    {
      "name": "Khashuri",
      "lat": 41.9941,
      "lng": 43.5999
    },
    {
      "name": "Samtredia",
      "lat": 42.1626,
      "lng": 42.3417
    }
  ],
  "Afghanistan": [
    {
      "name": "Kabul",
      "airport": {
        "name": "Kabul Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kabul District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Albania": [
    {
      "name": "Tirana",
      "airport": {
        "name": "Tirana Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tirana District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Andorra": [
    {
      "name": "Andorra la Vella",
      "airport": {
        "name": "Andorra la Vella Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Andorra la Vella District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Angola": [
    {
      "name": "Luanda",
      "airport": {
        "name": "Luanda Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luanda District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Antigua and Barbuda": [
    {
      "name": "Saint John's",
      "airport": {
        "name": "Saint John's Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Saint John's District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Armenia": [
    {
      "name": "Yerevan",
      "airport": {
        "name": "Yerevan Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yerevan District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Bahamas": [
    {
      "name": "Nassau",
      "airport": {
        "name": "Nassau Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nassau District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Bahrain": [
    {
      "name": "Manama",
      "airport": {
        "name": "Manama Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Manama District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Barbados": [
    {
      "name": "Bridgetown",
      "airport": {
        "name": "Bridgetown Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bridgetown District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Belize": [
    {
      "name": "Belmopan",
      "airport": {
        "name": "Belmopan Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Belmopan District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Benin": [
    {
      "name": "Porto-Novo",
      "airport": {
        "name": "Porto-Novo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Porto-Novo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Bhutan": [
    {
      "name": "Thimphu",
      "airport": {
        "name": "Thimphu Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Thimphu District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Bosnia and Herzegovina": [
    {
      "name": "Sarajevo",
      "airport": {
        "name": "Sarajevo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sarajevo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Botswana": [
    {
      "name": "Gaborone",
      "airport": {
        "name": "Gaborone Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gaborone District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Brunei": [
    {
      "name": "Bandar Seri Begawan",
      "airport": {
        "name": "Bandar Seri Begawan Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bandar Seri Begawan District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Burkina Faso": [
    {
      "name": "Ouagadougou",
      "airport": {
        "name": "Ouagadougou Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ouagadougou District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Burundi": [
    {
      "name": "Gitega",
      "airport": {
        "name": "Gitega Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Gitega District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Cabo Verde": [
    {
      "name": "Praia",
      "airport": {
        "name": "Praia Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Praia District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Cameroon": [
    {
      "name": "Yaoundé",
      "airport": {
        "name": "Yaoundé Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaoundé District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Central African Republic": [
    {
      "name": "Bangui",
      "airport": {
        "name": "Bangui Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bangui District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Chad": [
    {
      "name": "N'Djamena",
      "airport": {
        "name": "N'Djamena Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "N'Djamena District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Comoros": [
    {
      "name": "Moroni",
      "airport": {
        "name": "Moroni Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Moroni District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Congo (Brazzaville)": [
    {
      "name": "Brazzaville",
      "airport": {
        "name": "Brazzaville Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Brazzaville District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Congo (Kinshasa)": [
    {
      "name": "Kinshasa",
      "airport": {
        "name": "Kinshasa Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kinshasa District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Costa Rica": [
    {
      "name": "San José",
      "airport": {
        "name": "San José Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San José District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Côte d'Ivoire": [
    {
      "name": "Yamoussoukro",
      "airport": {
        "name": "Yamoussoukro Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yamoussoukro District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Cyprus": [
    {
      "name": "Nicosia",
      "airport": {
        "name": "Nicosia Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nicosia District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Djibouti": [
    {
      "name": "Djibouti",
      "airport": {
        "name": "Djibouti Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Djibouti District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Dominica": [
    {
      "name": "Roseau",
      "airport": {
        "name": "Roseau Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Roseau District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "East Timor": [
    {
      "name": "Dili",
      "airport": {
        "name": "Dili Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dili District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "El Salvador": [
    {
      "name": "San Salvador",
      "airport": {
        "name": "San Salvador Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Salvador District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Equatorial Guinea": [
    {
      "name": "Malabo",
      "airport": {
        "name": "Malabo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malabo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Eritrea": [
    {
      "name": "Asmara",
      "airport": {
        "name": "Asmara Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Asmara District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Eswatini": [
    {
      "name": "Mbabane",
      "airport": {
        "name": "Mbabane Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mbabane District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Fiji": [
    {
      "name": "Suva",
      "airport": {
        "name": "Suva Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Suva District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Gabon": [
    {
      "name": "Libreville",
      "airport": {
        "name": "Libreville Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Libreville District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Gambia": [
    {
      "name": "Banjul",
      "airport": {
        "name": "Banjul Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Banjul District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Grenada": [
    {
      "name": "St. George's",
      "airport": {
        "name": "St. George's Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "St. George's District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Guatemala": [
    {
      "name": "Guatemala City",
      "airport": {
        "name": "Guatemala City Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Guatemala City District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Guinea": [
    {
      "name": "Conakry",
      "airport": {
        "name": "Conakry Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Conakry District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Guinea-Bissau": [
    {
      "name": "Bissau",
      "airport": {
        "name": "Bissau Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bissau District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Guyana": [
    {
      "name": "Georgetown",
      "airport": {
        "name": "Georgetown Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Georgetown District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Haiti": [
    {
      "name": "Port-au-Prince",
      "airport": {
        "name": "Port-au-Prince Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port-au-Prince District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Honduras": [
    {
      "name": "Tegucigalpa",
      "airport": {
        "name": "Tegucigalpa Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tegucigalpa District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Jamaica": [
    {
      "name": "Kingston",
      "airport": {
        "name": "Kingston Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingston District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Kiribati": [
    {
      "name": "South Tarawa",
      "airport": {
        "name": "South Tarawa Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "South Tarawa District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Kosovo": [
    {
      "name": "Pristina",
      "airport": {
        "name": "Pristina Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Pristina District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Kyrgyzstan": [
    {
      "name": "Bishkek",
      "airport": {
        "name": "Bishkek Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bishkek District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Laos": [
    {
      "name": "Vientiane",
      "airport": {
        "name": "Vientiane Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vientiane District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Lesotho": [
    {
      "name": "Maseru",
      "airport": {
        "name": "Maseru Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maseru District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Liberia": [
    {
      "name": "Monrovia",
      "airport": {
        "name": "Monrovia Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monrovia District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Libya": [
    {
      "name": "Tripoli",
      "airport": {
        "name": "Tripoli Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Tripoli District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Liechtenstein": [
    {
      "name": "Vaduz",
      "airport": {
        "name": "Vaduz Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vaduz District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Luxembourg": [
    {
      "name": "Luxembourg",
      "airport": {
        "name": "Luxembourg Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Luxembourg District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Madagascar": [
    {
      "name": "Antananarivo",
      "airport": {
        "name": "Antananarivo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Antananarivo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Malawi": [
    {
      "name": "Lilongwe",
      "airport": {
        "name": "Lilongwe Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lilongwe District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Maldives": [
    {
      "name": "Malé",
      "airport": {
        "name": "Malé Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Malé District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Mali": [
    {
      "name": "Bamako",
      "airport": {
        "name": "Bamako Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Bamako District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Malta": [
    {
      "name": "Valletta",
      "airport": {
        "name": "Valletta Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Valletta District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Marshall Islands": [
    {
      "name": "Majuro",
      "airport": {
        "name": "Majuro Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Majuro District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Mauritania": [
    {
      "name": "Nouakchott",
      "airport": {
        "name": "Nouakchott Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nouakchott District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Mauritius": [
    {
      "name": "Port Louis",
      "airport": {
        "name": "Port Louis Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Louis District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Micronesia": [
    {
      "name": "Palikir",
      "airport": {
        "name": "Palikir Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Palikir District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Moldova": [
    {
      "name": "Chisinau",
      "airport": {
        "name": "Chisinau Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Chisinau District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Monaco": [
    {
      "name": "Monaco",
      "airport": {
        "name": "Monaco Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Monaco District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Mongolia": [
    {
      "name": "Ulaanbaatar",
      "airport": {
        "name": "Ulaanbaatar Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ulaanbaatar District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Montenegro": [
    {
      "name": "Podgorica",
      "airport": {
        "name": "Podgorica Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Podgorica District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Mozambique": [
    {
      "name": "Maputo",
      "airport": {
        "name": "Maputo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Maputo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Namibia": [
    {
      "name": "Windhoek",
      "airport": {
        "name": "Windhoek Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Windhoek District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Nauru": [
    {
      "name": "Yaren",
      "airport": {
        "name": "Yaren Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Yaren District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Nepal": [
    {
      "name": "Kathmandu",
      "airport": {
        "name": "Kathmandu Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kathmandu District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Nicaragua": [
    {
      "name": "Managua",
      "airport": {
        "name": "Managua Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Managua District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Niger": [
    {
      "name": "Niamey",
      "airport": {
        "name": "Niamey Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Niamey District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "North Macedonia": [
    {
      "name": "Skopje",
      "airport": {
        "name": "Skopje Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Skopje District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Oman": [
    {
      "name": "Muscat",
      "airport": {
        "name": "Muscat Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Muscat District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Palau": [
    {
      "name": "Ngerulmud",
      "airport": {
        "name": "Ngerulmud Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ngerulmud District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Palestine": [
    {
      "name": "Ramallah",
      "airport": {
        "name": "Ramallah Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ramallah District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Panama": [
    {
      "name": "Panama City",
      "airport": {
        "name": "Panama City Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Panama City District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Papua New Guinea": [
    {
      "name": "Port Moresby",
      "airport": {
        "name": "Port Moresby Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Moresby District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Rwanda": [
    {
      "name": "Kigali",
      "airport": {
        "name": "Kigali Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kigali District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Saint Kitts and Nevis": [
    {
      "name": "Basseterre",
      "airport": {
        "name": "Basseterre Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Basseterre District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Saint Lucia": [
    {
      "name": "Castries",
      "airport": {
        "name": "Castries Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Castries District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Saint Vincent and the Grenadines": [
    {
      "name": "Kingstown",
      "airport": {
        "name": "Kingstown Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kingstown District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Samoa": [
    {
      "name": "Apia",
      "airport": {
        "name": "Apia Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Apia District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "San Marino": [
    {
      "name": "San Marino",
      "airport": {
        "name": "San Marino Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "San Marino District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Sao Tome and Principe": [
    {
      "name": "Sao Tome",
      "airport": {
        "name": "Sao Tome Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sao Tome District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Senegal": [
    {
      "name": "Dakar",
      "airport": {
        "name": "Dakar Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dakar District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Seychelles": [
    {
      "name": "Victoria",
      "airport": {
        "name": "Victoria Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Victoria District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Sierra Leone": [
    {
      "name": "Freetown",
      "airport": {
        "name": "Freetown Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Freetown District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Solomon Islands": [
    {
      "name": "Honiara",
      "airport": {
        "name": "Honiara Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Honiara District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Somalia": [
    {
      "name": "Mogadishu",
      "airport": {
        "name": "Mogadishu Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Mogadishu District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "South Sudan": [
    {
      "name": "Juba",
      "airport": {
        "name": "Juba Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Juba District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Sudan": [
    {
      "name": "Khartoum",
      "airport": {
        "name": "Khartoum Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Khartoum District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Suriname": [
    {
      "name": "Paramaribo",
      "airport": {
        "name": "Paramaribo Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Paramaribo District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Syria": [
    {
      "name": "Damascus",
      "airport": {
        "name": "Damascus Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Damascus District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Tajikistan": [
    {
      "name": "Dushanbe",
      "airport": {
        "name": "Dushanbe Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Dushanbe District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Togo": [
    {
      "name": "Lomé",
      "airport": {
        "name": "Lomé Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lomé District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Tonga": [
    {
      "name": "Nukuʻalofa",
      "airport": {
        "name": "Nukuʻalofa Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Nukuʻalofa District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Trinidad and Tobago": [
    {
      "name": "Port of Spain",
      "airport": {
        "name": "Port of Spain Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port of Spain District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Turkmenistan": [
    {
      "name": "Ashgabat",
      "airport": {
        "name": "Ashgabat Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Ashgabat District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Tuvalu": [
    {
      "name": "Funafuti",
      "airport": {
        "name": "Funafuti Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Funafuti District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Uganda": [
    {
      "name": "Kampala",
      "airport": {
        "name": "Kampala Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Kampala District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Vanuatu": [
    {
      "name": "Port Vila",
      "airport": {
        "name": "Port Vila Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Port Vila District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Vatican City": [
    {
      "name": "Vatican City",
      "airport": {
        "name": "Vatican City Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Vatican City District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Yemen": [
    {
      "name": "Sanaa",
      "airport": {
        "name": "Sanaa Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Sanaa District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Zambia": [
    {
      "name": "Lusaka",
      "airport": {
        "name": "Lusaka Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Lusaka District 10",
      "lat": 0,
      "lng": 0
    }
  ],
  "Zimbabwe": [
    {
      "name": "Harare",
      "airport": {
        "name": "Harare Intl",
        "code": "GEN"
      },
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 2",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 3",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 4",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 5",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 6",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 7",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 8",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 9",
      "lat": 0,
      "lng": 0
    },
    {
      "name": "Harare District 10",
      "lat": 0,
      "lng": 0
    }
  ]
};

export function getCities(country: string): City[] {
  let normalizedCountry = country;
  const lower = country.toLowerCase().trim();
  if (lower === "uk" || lower === "united kingdom") normalizedCountry = "United Kingdom";
  else if (lower === "usa" || lower === "us" || lower === "united states") normalizedCountry = "United States";
  else if (lower === "united arab emirates") normalizedCountry = "UAE";

  const rawCities = DATA[normalizedCountry] || [
    { name: `${country} City`, airport: { name: "International Airport", code: "GEN" }, lat: 0, lng: 0 }
  ];
  
  if (rawCities.length === 0) return [];

  // The first city in the list is the "primary" one (usually Capital or most popular)
  // We keep it at the top, and sort the rest alphabetically.
  const [primary, ...others] = rawCities;
  const sortedOthers = [...others].sort((a, b) => a.name.localeCompare(b.name));

  return [primary, ...sortedOthers];
}

export function listCountries(): string[] {
  return Object.keys(DATA).sort();
}

export function distanceKm(c1: City, c2: City): number {
  if (c1.lat === undefined || c1.lng === undefined || c2.lat === undefined || c2.lng === undefined) return 0;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(c2.lat - c1.lat);
  const dLon = deg2rad(c2.lng - c1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(c1.lat)) * Math.cos(deg2rad(c2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
