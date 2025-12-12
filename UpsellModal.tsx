import React, { useEffect } from "react";

export default function UpsellModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center" onClick={onClose}>
      <div className="card w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-lg font-semibold">Special Offers</div>
        <div className="text-sm text-slate-600">Tailored recommendations based on your trip.</div>
        <ul className="mt-3 space-y-2 text-sm">
          <li>City tours bundle</li>
          <li>Rail pass and car rental</li>
          <li>Restaurant deals</li>
        </ul>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary">Add Bundle</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

