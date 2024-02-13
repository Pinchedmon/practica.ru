'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import WithAuth from "@/lib/RequireAuth";
import AddTaskWindow from "@/widgets/admin/AddTaskWindow";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";


type Task = {
    id: string | number;
    Name: string;
    Univ: string;
    Spec: string;
};
const columns: ColumnDef<Task>[] = [
    {
        header: "Название",
        accessorKey: "Name",
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
                        <DropdownMenuItem>Открыть</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

];


function TasksPage() {

    const data = [
        {
            id: '1',
            Name: 'Задание 1',
            Univ: 'ИСПО',
            Spec: 'Программист',
        },
    ]
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Задания
            </p>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="univ" className="mb-1">Поиск по вузу</Label>
                            <Input id="univ" placeholder="Название вуза" type="text" />
                        </div>
                        <Button>Поиск</Button>
                    </div>
                    <div className="w-full flex gap-2 items-end" >
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="fio" className="mb-1">Поиск по Специальности</Label>
                            <Input id="fio" placeholder="ФИО" type="text" />
                        </div>
                        <Button>Поиск</Button>
                    </div>
                </div>

            </div>
            <AddTaskWindow />
            <DataTable columns={columns} data={data} />
        </div>
    )
}
export default TasksPage
