import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"

type Report = {
    id: string | number;
    Student: string;
    Date: string;
    Univ: string;
    Order: string;
};
const columns: ColumnDef<Report>[] = [
    {
        header: "Студент",
        accessorKey: "Student",
    },
    {
        header: "Дата",
        accessorKey: "Date",
    },
    {
        header: "ВУЗ",
        accessorKey: "Univ",
    },
    {
        header: "Отчёт",
        accessorKey: "Order",
    },

];
async function getData(): Promise<Report[]> {
    // Fetch data from your API here.
    return [
        {
            id: '1',
            Student: 'Фамилия Имя Отчество',
            Date: '02/02/24',
            Univ: 'Политех',
            Order: 'ya.ru'
        },
        // ...
    ]
}

export default async function ReportsPage() {
    const data = await getData();
    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Отчёты
            </p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

