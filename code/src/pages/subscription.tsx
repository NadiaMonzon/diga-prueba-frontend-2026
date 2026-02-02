import { useEffect, useState } from "react";
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const res = await fetch("/api/v1/billing/subscription", {
            method: "GET",
            headers: {
                // TODO: move to .env variable
                Authorization: "Bearer sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d",
            },
        });
        const data = await res.json();
        setSubscription(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const daysLeft = Math.round((new Date(subscription?.period_end).getTime() - new Date().getTime()) / (10 * 3600 * 24)) / 100;

    if (!subscription) return null;

    return (
        <div style={{ padding: "32px" }} className="flex flex-1 flex-col gap-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Suscripción</h1>
                <p className="text-body-sm text-neutral-900">Consulta tu plan actual, los minutos disponibles y la próxima fecha de facturación.</p>
            </div>

            <div className="rounded-xl border border-tertiary-500 bg-tertiary-200">
                <div className="text-brand-aditional-500 p-4 text-body-md font-semibold" onClick={() => console.log(subscription.id)}>
                    {subscription.name}
                </div>
                <div className="rounded-xl bg-white p-4 ring ring-tertiary-500">
                    <div className="flex gap-6">
                        <ProgressBarCircle value={subscription.minutes_count} size="xs" max={subscription.included_minutes} />
                        <div className="grid flex-1 grid-cols-2 items-center gap-x-6">
                            <div className="flex h-max items-end gap-1">
                                <h4 className="text-header-4 font-semibold text-brand-additional-500">{subscription.price}€</h4>
                                <p className="text-body-md text-neutral-colors-700">/{subscription.period}</p>
                            </div>
                            <div className="flex h-max flex-col">
                                <p className="text-body-sm text-brand-additional-500">Días restantes para el próximo pago</p>
                                <p className="text-body-sm text-neutral-colors-600">{daysLeft} días</p>
                            </div>
                            <div className="flex h-max flex-col">
                                <p className="text-body-sm text-brand-additional-500">Minutos restantes</p>
                                <p className="text-body-sm text-neutral-colors-600">{subscription.included_minutes - subscription.minutes_count}</p>
                            </div>
                            <div className="flex h-max flex-col">
                                <p className="text-body-sm text-brand-additional-500">Minutos acumulados</p>
                                <p className="text-body-sm text-neutral-colors-600">{subscription.rollover_minutes_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && <p>Cargando...</p>}
        </div>
    );
}
