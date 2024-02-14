'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import WithAuth from "@/lib/RequireAuth";
import { fetcher } from "@/lib/fetcher";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

type Report = {
    id: string | number;
    studentId: string;
    studentName: string;
    url: string
};
const columns: ColumnDef<Report>[] = [
    {
        header: "id",
        accessorKey: "id",
    },
    {
        header: "Студентid",
        accessorKey: "studentName",
    },
    {
        header: "Ссылка",
        accessorKey: "url",
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
                        <DropdownMenuItem>Открыть отчёт</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

];


function ReportsPage() {
    const { data, error, isLoading } = useSWR('/api/reports', fetcher)


    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>
    console.log(data)

    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Отчёты
            </p>


            {data.data && <DataTable columns={columns} data={data.data} />}
        </div>
    )
}


export default ReportsPage