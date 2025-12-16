import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
  caches.keys().then((names) => {
    for (const name of names) {
      caches.delete(name);
    }
  });
}

const container = document.getElementById("root");
if (!container) throw new Error("Missing root element");

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
