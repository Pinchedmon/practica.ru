import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"

type Spec = {
    id: string | number;
    Spec: string;
};
const columns: ColumnDef<Spec>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Специальность",
        accessorKey: "Spec",
    },

];
async function getData(): Promise<Spec[]> {
    return [
        {
            id: '1',
            Spec: 'Программист',
        },
    ]
}

export default async function SpecsPage() {
    const data = await getData();
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Специальности
            </p>
            <div className="mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="spec" className="mb-1">Название</Label>
                            <Input id="spec" placeholder="Добавить специальность" type="text" />
                        </div>
                        <Button>Добавить</Button>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

