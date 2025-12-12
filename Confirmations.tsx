import React from "react";

export function RoundTripConfirmation({ from, to, dep, ret, pax }: { from: string; to: string; dep: string; ret: string; pax: number }) {
  const ref = `RT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return (
    <div className="bp-card">
      <div className="bp-header-blue"><div className="bp-code">{ref}</div><div className="uppercase tracking-wide">Tripodin</div></div>
      <div className="bp-grid">
        <div>
          <div className="font-semibold">Outbound</div>
          <div className="text-sm">{from} → {to}</div>
          <div className="text-sm">{dep}</div>
        </div>
        <div>
          <div className="font-semibold">Return</div>
          <div className="text-sm">{to} → {from}</div>
          <div className="text-sm">{ret}</div>
        </div>
        <div className="md:col-span-2 text-sm">Passengers {pax}</div>
        <div className="md:col-span-2 mt-2 border-t pt-2">
          <div className="text-sm">Total Fare</div>
          <div className="text-2xl font-bold text-green-600">$1076</div>
        </div>
      </div>
    </div>
  );
}

export function OpenJawConfirmation({ from, arrive, returnFrom, dep, ret, pax }: { from: string; arrive: string; returnFrom: string; dep: string; ret: string; pax: number }) {
  const ref = `OJ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return (
    <div className="bp-card">
      <div className="bp-header-purple"><div className="bp-code">{ref}</div><div className="uppercase tracking-wide">Tripodin</div></div>
      <div className="bp-grid">
        <div>
          <div className="font-semibold">Outbound</div>
          <div className="text-sm">{from} → {arrive}</div>
          <div className="text-sm">{dep}</div>
        </div>
        <div>
          <div className="font-semibold">Return</div>
          <div className="text-sm">{returnFrom} → {from}</div>
          <div className="text-sm">{ret}</div>
        </div>
        <div className="md:col-span-2 text-sm text-amber-600">Transport not included between {arrive} and {returnFrom}</div>
        <div className="md:col-span-2 text-sm">Passengers {pax}</div>
      </div>
    </div>
  );
}

export function HotelConfirmation({ hotel, city, checkIn, checkOut, rooms, guests }: { hotel: string; city: string; checkIn: string; checkOut: string; rooms: number; guests: number }) {
  const ref = `HTL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return (
    <div className="bp-card">
      <div className="bp-header-green"><div className="bp-code">{ref}</div><div>🏨</div></div>
      <div className="bp-grid">
        <div>
          <div className="font-semibold">Property</div>
          <div className="text-sm">{hotel}</div>
          <div className="text-sm">{city}</div>
        </div>
        <div>
          <div className="font-semibold">Stay</div>
          <div className="text-sm">Check-in {checkIn}</div>
          <div className="text-sm">Check-out {checkOut}</div>
        </div>
        <div className="md:col-span-2 text-sm">Rooms {rooms} · Guests {guests}</div>
      </div>
    </div>
  );
}
