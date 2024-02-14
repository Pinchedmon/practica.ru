'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTable } from "@/lib/DataTable/DataTable"
import { fetcher } from "@/lib/fetcher";
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";


type Student = {
    id: string
    name: string,
    email: string,
    accepted: boolean,
    fio: string,
    phone: string,
    startDate: string,
    endDate: string,
    file: string,
    university: string,
    spec: string,

};



function StudentsPage() {
    const { mutate } = useSWRConfig()
    const { data, error, isLoading } = useSWR('/api/students', fetcher)
    const columns: ColumnDef<Student>[] = [
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
            accessorKey: "university",
        },
        {
            header: "Специальность",
            accessorKey: "spec",
        },
        {
            header: "Разрешение",
            accessorKey: "accepted",
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const deleteStudent = async () => {
                    await axios.delete(`/api/student?id=${row.original.id}`)
                        .then(res => res.status == 200 && mutate('/api/students'))
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
                            <DropdownMenuItem onClick={deleteStudent}>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];

    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>

    return (
        <div className="overflow-hidden">
            <p className="font-mono text-xl mb-4">
                Студенты
            </p>
            <div className="overflow-auto ">
                <DataTable columns={columns} data={data.data} />
            </div>


        </div>
    )
}



export default StudentsPage;