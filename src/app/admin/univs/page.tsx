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
            <DataTable columns={columns} data={data} />
        </div>
    )
}

