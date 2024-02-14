'use client'
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"


type Order = {
    id: string;
    fio: string;
    phone: number;
    startDate: string;
    endDate: string;
    file: string;
    univ: string;
    spec: string;
};
const columns: ColumnDef<Order>[] = [

    {
        header: "id",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        accessorKey: "fio",
    },
    {
        header: "Телефон",
        accessorKey: "phone",
    },
    {
        header: "Начало",
        accessorKey: "startDate",
    },
    {
        header: "Конец",
        accessorKey: "endDate",
    },
    {
        header: "Направление",
        accessorKey: "file",
    },
    {
        header: "ВУЗ",
        accessorKey: "univ",
    },
    {
        header: "Специальность",
        accessorKey: "spec",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Добавить</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

function OrdersPage() {
    const { data, error, isLoading } = useSWR('/api/orders', fetcher)
    console.log(data);
    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>

    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Заявки
            </p>
            <DataTable columns={columns} data={data.data} />

        </div>
    )
}

export default OrdersPage;