import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ApiKeyProvider } from "@/providers/api-key-provider";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import NavigationSidebar from "./components/layout/NavigationSidebar";
import CallLogPage from "./pages/call-log";
import SubscriptionPage from "./pages/subscription";
import WelcomePage from "./pages/welcome";
import EnWelcomePage from "./pages/welcome.en";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <ApiKeyProvider>
                <BrowserRouter>
                    <RouteProvider>
                        <Routes>
                            <Route path="/" element={<WelcomePage />} />
                            <Route path="/en" element={<EnWelcomePage />} />
                            <Route
                                path="/subscription"
                                element={
                                    <NavigationSidebar>
                                        <SubscriptionPage />
                                    </NavigationSidebar>
                                }
                            />
                            <Route
                                path="/call-log"
                                element={
                                    <NavigationSidebar>
                                        <CallLogPage />
                                    </NavigationSidebar>
                                }
                            />
                        </Routes>
                    </RouteProvider>
                </BrowserRouter>
            </ApiKeyProvider>
        </ThemeProvider>
    </StrictMode>,
);
