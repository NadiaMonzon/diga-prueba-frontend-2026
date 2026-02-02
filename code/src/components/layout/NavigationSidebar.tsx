import { ReactNode } from "react";
import { SidebarNavigationSimple } from "../application/app-navigation/sidebar-navigation/sidebar-simple";

interface NavigationSidebarProps {
    children: ReactNode;
}

export default function NavigationSidebar({ children }: NavigationSidebarProps) {
    return (
        <>
            <SidebarNavigationSimple
                items={[
                    { label: "Subscripción", href: "/subscription" },
                    { label: "Registro de llamadas", href: "/call-log" },
                ]}
            />
            {children}
        </>
    );
}
