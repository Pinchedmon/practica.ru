import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"

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
];
async function getData(): Promise<Student[]> {
    return [
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
}

export default async function StudentsPage() {
    const data = await getData();
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Студенты
            </p>
            <DataTable columns={columns} data={data} />

        </div>
    )
}