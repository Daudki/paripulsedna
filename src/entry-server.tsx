import { renderToString } from "react-dom/server";
import App from "./App.tsx";
import PromoPage from "./PromoPage.tsx";

export const renderHome = () => renderToString(<App />);
export const renderPromo = () => renderToString(<PromoPage />);
