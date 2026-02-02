import { ReactNode, useState } from "react";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { useApiKey } from "@/providers/api-key-provider";
import { SidebarNavigationSimple } from "../application/app-navigation/sidebar-navigation/sidebar-simple";

interface NavigationSidebarProps {
    children: ReactNode;
}

const selectorItems = [
    { id: "sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d", label: "sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d" },
    { id: "sk-f0d89d3b2924ea11f47db647e9090bec96e4c13db9b9094d9032c31910842a61", label: "sk-f0d89d3b2924ea11f47db647e9090bec96e4c13db9b9094d9032c31910842a61" },
    { id: "sk-7ae237700e65605e400e32e42811130acf34a7aefbc8eb42c10107faba758e91", label: "sk-7ae237700e65605e400e32e42811130acf34a7aefbc8eb42c10107faba758e91" },
];

export default function NavigationSidebar({ children }: NavigationSidebarProps) {
    const [selectedOption, setSelectedOption] = useState<string>("sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d");
    const { setApiKey } = useApiKey();

    const handleSelectionChange = (key: string | null) => {
        if (key) {
            setSelectedOption(key);
            setApiKey(key);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-col">
                <div className="border-b border-tertiary-500 p-4">
                    <Select
                        defaultSelectedKey={selectedOption}
                        onChange={(key) => {
                            if (key) {
                                setSelectedOption(key.toString());
                                setApiKey(key.toString());
                            }
                        }}
                        placeholder="Selecciona una API Key"
                        size="sm"
                    >
                        {selectorItems.map((item) => (
                            <SelectItem key={item.id} id={item.id}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <SidebarNavigationSimple
                    items={[
                        { label: "Subscripción", href: "/subscription" },
                        { label: "Registro de llamadas", href: "/call-log" },
                    ]}
                />
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
        </div>
    );
}
