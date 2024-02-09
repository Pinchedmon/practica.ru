'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

type Univ = {
    id: string | number;
    Univ: string;
};
const columns: ColumnDef<Univ>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ВУЗ",
        accessorKey: "Univ",
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
async function getData(): Promise<Univ[]> {
    return [
        {
            id: '1',
            Univ: 'ИСПО',
        },
    ]
}

export default async function UnivsPage() {
    const data = await getData();
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                ВУЗЫ
            </p>
            <div className="mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="univ" className="mb-1">Название        </Label>
                            <Input id="univ" placeholder="Добавить вуз" type="text" />
                        </div>
                        <Button>Добавить</Button>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

