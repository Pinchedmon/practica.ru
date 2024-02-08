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
            <DataTable columns={columns} data={data} />
        </div>
    )
}

