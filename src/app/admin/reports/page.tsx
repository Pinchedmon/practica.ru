'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import WithAuth from "@/lib/RequireAuth";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

type Report = {
    id: string | number;
    Student: string;
    Date: string;
    Univ: string;
    Order: string;
};
const columns: ColumnDef<Report>[] = [
    {
        header: "Студент",
        accessorKey: "Student",
    },
    {
        header: "Дата",
        accessorKey: "Date",
    },
    {
        header: "ВУЗ",
        accessorKey: "Univ",
    },
    {
        header: "Отчёт",
        accessorKey: "Order",
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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.Order)}
                        >
                            Копировать ссылку на отчёт
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Открыть отчёт</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

];


function ReportsPage() {
    const data = [
        {
            id: '1',
            Student: 'Фамилия Имя Отчество',
            Date: '02/02/24',
            Univ: 'Политех',
            Order: 'ya.ru'
        },
    ]
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Отчёты
            </p>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="univ" className="mb-1">Поиск по вузу         </Label>
                            <Input id="univ" placeholder="Название вуза" type="text" />
                        </div>
                        <Button>Поиск</Button>
                    </div>
                    <div className="w-full flex gap-2 items-end" >
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="fio" className="mb-1">Поиск по фио</Label>
                            <Input id="fio" placeholder="ФИО" type="text" />
                        </div>
                        <Button>Поиск</Button>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end" >
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="date" className="mb-1">Поиск по дате</Label>
                            <Input id="date" placeholder="01.01.2020 - 12.12.2025" type="text" />
                        </div>
                        <Button>Поиск</Button>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}


export default ReportsPage