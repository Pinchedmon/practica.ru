import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"

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

