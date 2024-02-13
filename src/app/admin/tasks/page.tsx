'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import AddTaskWindow from "@/widgets/admin/AddTaskWindow";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import useSWR, {useSWRConfig} from "swr";
import useModal from "@/lib/useModal";
import {useState} from "react";
import {fetcher} from "@/lib/fetcher";
import axios from "axios";
import EditTaskModal from "@/app/admin/tasks/components/EditTaskModal";


type Task = {
    id: string;
    title: string;
    text: string;
    univId: string;
    specId: string;
};

export type TaskFormatted = {
    id: string;
    title: string;
    text: string;
    univId: string;
    specId: string;
    univName: string;
    specName: string;
};



function TasksPage() {

    const { mutate } = useSWRConfig();

    // мой кастомный хук для работы с модалкой
    const { isModalOpen, openModal, closeModal } = useModal();


    // получаю вузы
    const { data: univs, error, isLoading } = useSWR('/api/univs', fetcher)

    const { data: specs } = useSWR('/api/specs', fetcher)

    const {data: tasks} = useSWR('/api/tasks', fetcher)

    // использую для получения айдишника чтобы можно было сделать edit fetch
    const [dataId, setDataId] = useState('');

    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>


    async function onAddTask(data: any) {
        // const {univId, specId, title, text} = data;

        console.log(data);

            try {
                await axios.post('/api/task', data);
                await mutate('/api/tasks', fetcher('/api/tasks'));

            } catch (error) {
                console.error(error);
            }

    }

    const columns: ColumnDef<TaskFormatted>[] = [
        {
            header: "Название",
            accessorKey: "title",
        },
        {
            header: "ВУЗ",
            accessorKey: "univName",
        },
        {
            header: "Специальность",
            accessorKey: "specName",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const task = row.original
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
                            <DropdownMenuItem onClick={() => {
                                setDataId(task.id);
                                openModal();
                            }}>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTask(task.id)}>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },

    ];

    function formatTask(task: Task): TaskFormatted { // форматирую данные

        const univ = univs?.data?.find((univ: any) => univ.id === task.univId);
        const spec = specs?.data?.find((spec: any) => spec.id === task.specId);

        // console.log()
        return {
            id: task.id,
            title: task.title,
            text: task.text,
            univId: task.univId,
            specId: task.specId,
            univName: univ?.name || '',
            specName: spec?.name || '',
        };
    }

    const tasksFormatted = tasks?.data?.map((task: Task) => formatTask(task)) // форматирую данные в нужный моментd

    async function editTask(task: Task) {
        try {
            await axios.put('/api/task', task);
            await mutate('/api/tasks', fetcher('/api/tasks'));
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`/api/task?id=${id}`);
            mutate('/api/tasks', fetcher('/api/tasks'));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p className="font-mono text-xl mb-4">
                Задания
            </p>
            {dataId && <EditTaskModal prevData={formatTask(tasks?.data?.find((el: Task) => el.id === dataId))}
                                      univs={univs?.data || []} specs={specs?.data || []} isModalOpen={isModalOpen}
                                      closeModal={closeModal} onSubmit={editTask}/>}
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
            <AddTaskWindow onAdd={onAddTask} specs={specs?.data || []} univs={univs?.data || []} />
            <DataTable columns={columns} data={tasksFormatted || []} />
        </div>
    )
}
export default TasksPage
