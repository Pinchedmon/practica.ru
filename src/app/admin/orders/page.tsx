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
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "@/lib/fetcher"
import axios from "axios"


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


function OrdersPage() {
    const { mutate } = useSWRConfig()
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

                const sendUser = async () => {
                    await axios.put('/api/order', { data: row.original })
                        .then(res => res.status == 200 && mutate('/api/order', fetcher('/api/order')))
                }
                const deleteOrder = async () => {
                    await axios.delete(`/api/order?fio=${row.original.fio}`)
                        .then(res => res.status == 200 && mutate('/api/order', fetcher('/api/order')))
                }

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
                            <DropdownMenuItem onClick={() => sendUser()}>Добавить</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteOrder()}>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];
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