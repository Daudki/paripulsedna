import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import PromoPage from "./PromoPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PromoPage />
    <Analytics />
  </StrictMode>
);
