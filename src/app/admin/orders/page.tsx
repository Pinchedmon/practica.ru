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


type Order = {
    id: string;
    FIO: string;
    Phone: number;
    Begin: string;
    End: string;
    File: string;
    Univ: string;
    Spec: string;
};
const columns: ColumnDef<Order>[] = [

    {
        header: "ФИО",
        accessorKey: "FIO",
    },
    {
        header: "Телефон",
        accessorKey: "Phone",
    },
    {
        header: "Начало",
        accessorKey: "Begin",
    },
    {
        header: "Конец",
        accessorKey: "End",
    },
    {
        header: "Направление",
        accessorKey: "File",
    },
    {
        header: "ВУЗ",
        accessorKey: "Univ",
    },
    {
        header: "Специальность",
        accessorKey: "Spec",
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
    const data = [
        {
            id: '1',
            FIO: 'Фамилия Имя Отчество',
            Phone: 8923434334343,
            Begin: '02/02/24',
            End: '02/02/25',
            File: 'ya.ru',
            Univ: 'Политех',
            Spec: 'Информационная безопасност',
        },
    ]
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Заявки
            </p>
            <DataTable columns={columns} data={data} />

        </div>
    )
}

export default OrdersPage;