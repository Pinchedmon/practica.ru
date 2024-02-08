import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"

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


];
async function getData(): Promise<Task[]> {
    return [
        {
            id: '1',
            Name: 'Задание 1',
            Univ: 'ИСПО',
            Spec: 'Программист',
        },
    ]
}

export default async function TasksPage() {
    const data = await getData();
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Задания
            </p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

