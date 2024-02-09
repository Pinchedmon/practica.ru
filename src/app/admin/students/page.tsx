'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";


type Student = {
    id: string | number;
    FIO: string;
    Phone: number;
    Begin: string;
    End: string;
    File: string;
    Univ: string;
    Spec: string;
};
const columns: ColumnDef<Student>[] = [
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
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];


export default function StudentsPage() {
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
                Студенты
            </p>
            <DataTable columns={columns} data={data} />

        </div>
    )
}
