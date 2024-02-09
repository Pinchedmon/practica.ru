import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import AddTaskWindow from "@/widgets/admin/AddTaskWindow";
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

