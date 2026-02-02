import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import SubscriptionPage from "./pages/subscription";
import WelcomePage from "./pages/welcome";
import EnWelcomePage from "./pages/welcome.en";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/en" element={<EnWelcomePage />} />
                        <Route path="/subscription" element={<SubscriptionPage />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
