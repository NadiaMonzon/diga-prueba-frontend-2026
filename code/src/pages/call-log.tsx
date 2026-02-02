import { useEffect, useState } from "react";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";

interface CallLogContact {
    id: string;
    created_date: string;
    identifier: string;
    contact_type: string;
}

interface CallLogItem {
    id: string;
    agent_id: string;
    agent_version_id: string;
    status: "dialing" | "in_progress" | "completed" | "failed" | "transferred" | "no_answer";
    type: "inbound" | "outbound";
    contact: CallLogContact;
    phone_register_id: string;
    created_date: string;
    recording_url: string;
    start_time: string;
    end_time: string;
    duration: number;
    end_reason: string;
}

interface CallLogResponse {
    data: CallLogItem[];
    has_more: boolean;
    first_id: string;
    last_id: string;
    current_page: number;
    total_pages: number;
}

const getStatusColor = (status: CallLogItem["status"]) => {
    switch (status) {
        case "completed":
            return "success";
        case "failed":
        case "no_answer":
            return "error";
        case "in_progress":
        case "dialing":
            return "brand";
        case "transferred":
            return "gray";
        default:
            return "gray";
    }
};

const getStatusLabel = (status: CallLogItem["status"]) => {
    switch (status) {
        case "completed":
            return "Completada";
        case "failed":
            return "Fallida";
        case "no_answer":
            return "Sin respuesta";
        case "in_progress":
            return "En progreso";
        case "dialing":
            return "Marcando";
        case "transferred":
            return "Transferida";
        default:
            return status;
    }
};

const getCallTypeLabel = (type: CallLogItem["type"]) => {
    switch (type) {
        case "inbound":
            return "Entrante";
        case "outbound":
            return "Saliente";
        default:
            return type;
    }
};

export default function CallLogPage() {
    const [callData, setCallData] = useState<CallLogResponse["data"]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const res = await fetch("/api/v1/call", {
            method: "GET",
            headers: {
                // TODO: move to .env variable
                Authorization: "Bearer sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d",
            },
        });
        const data = await res.json();
        setCallData(data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div style={{ padding: "32px" }} className="flex flex-1 flex-col gap-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Registro de llamadas</h1>
                <p className="text-body-sm text-neutral-900">Revisa el historial de llamadas realizadas, con fechas, duraciones y detalles de cada registro.</p>
            </div>

            <TableCard.Root>
                <TableCard.Header title="Llamadas" badge={callData.length} />
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <Table>
                        <Table.Header
                            columns={[
                                { id: "id", name: "Identificador" },
                                { id: "type", name: "Tipo" },
                                { id: "phone", name: "Teléfono" },
                                { id: "status", name: "Estado" },
                                { id: "duration", name: "Duración" },
                                { id: "date", name: "Fecha" },
                            ]}
                        >
                            {(column) => <Table.Head label={column.name} isRowHeader={column.id === "id"} />}
                        </Table.Header>
                        <Table.Body items={callData}>
                            {(item) => (
                                <Table.Row
                                    columns={[
                                        { id: "id", name: "Identificador" },
                                        { id: "type", name: "Tipo" },
                                        { id: "phone", name: "Teléfono" },
                                        { id: "status", name: "Estado" },
                                        { id: "duration", name: "Duración" },
                                        { id: "date", name: "Fecha" },
                                    ]}
                                >
                                    {(column) => (
                                        <Table.Cell>
                                            {column.id === "id" && item.contact.identifier}
                                            {column.id === "type" && getCallTypeLabel(item.type)}
                                            {column.id === "phone" && item.contact.identifier}
                                            {column.id === "status" && (
                                                <Badge color={getStatusColor(item.status)} size="sm">
                                                    {getStatusLabel(item.status)}
                                                </Badge>
                                            )}
                                            {column.id === "duration" && `${item.duration}s`}
                                            {column.id === "date" && item.created_date}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                )}
            </TableCard.Root>
        </div>
    );
}
