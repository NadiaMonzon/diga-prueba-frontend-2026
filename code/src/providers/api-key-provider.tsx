import { ReactNode, createContext, useContext, useState } from "react";

interface ApiKeyContextType {
    apiKey: string;
    setApiKey: (key: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

interface ApiKeyProviderProps {
    children: ReactNode;
}

export function ApiKeyProvider({ children }: ApiKeyProviderProps) {
    const [apiKey, setApiKey] = useState<string>("sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d");

    return <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>{children}</ApiKeyContext.Provider>;
}

export function useApiKey() {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error("useApiKey must be used within an ApiKeyProvider");
    }
    return context;
}
