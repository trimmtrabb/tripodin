import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

const container = document.getElementById("root");
if (!container) throw new Error("Missing root element");

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
