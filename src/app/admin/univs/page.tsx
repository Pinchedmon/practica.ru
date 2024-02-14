'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import axios from 'axios';
import Modal from "@/components/ui/modal";
import useModal from "@/lib/useModal";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from "@/lib/fetcher";
import WithAuth from "@/lib/RequireAuth";

type Univ = {
    id: string;
    name: string;
};

function UnivsPage() {
    //TODO: refactor code, ибо выглядит ну не оч всё, много useState, всё в одной компоненте. Карточку с изменением думаю, лучше будет перенести в отдельнуую папку.

    // mutate - для того чтобы сделать refresh в получении data по запросу
    const { mutate } = useSWRConfig();

    // мой кастомный хук для работы с модалкой
    const { isModalOpen, openModal, closeModal } = useModal();

    // input для добавления вуза
    const [inputValue, setInputValue] = useState('')

    // это по сути input в модалке
    const [newValue, setNewValue] = useState('')

    // получаю вузы 
    const { data, error, isLoading } = useSWR('/api/univs', fetcher)
    // использую для получения айдишника чтобы можно было сделать edit fetch
    const [dataId, setDataId] = useState('');

    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>


    const addUniversity = async () => {
        try {
            await axios.post('/api/univ', { name: inputValue });

            // Тот самый mutate для того чтобы обновить данные 
            mutate('/api/univs', fetcher('/api/univs'));

        } catch (error) {
            console.error(error);
        }
    };

    const deleteUniversity = async (id: string) => {
        try {
            await axios.delete(`/api/univ?id=${id}`);
            mutate('/api/univs', fetcher('/api/univs'));
        } catch (error) {
            console.error(error);
        }
    };

    const editUniversity = async (id: string) => {
        try {
            await axios.put('/api/univ', { id, name: newValue });
            mutate('/api/univs', fetcher('/api/univs'));
        } catch (error) {
            console.error(error);
        }
    };

    // колонки для таблицы
    const columns: ColumnDef<Univ>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "ВУЗ",
            accessorKey: "name",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const univ = row.original
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
                                openModal()
                                setNewValue(univ.name)
                                setDataId(univ.id)
                            }}>Изменить</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteUniversity(univ.id)}>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];

    return (
        <div>
            {/* Модалка */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Card>
                    <CardHeader>
                        <CardTitle>Изменение вуза</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Имя" type="text" />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => {
                            editUniversity(dataId)
                            closeModal();
                        }}>Изменить</Button>
                    </CardFooter>
                </Card>
            </Modal>

            {/* Заголовок */}
            <p className="font-mono text-xl mb-4">
                ВУЗЫ
            </p>

            {/* Зона добавление вуза */}
            <div className="mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="univ" className="mb-1">Название</Label>
                            <Input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} id="univ" placeholder="Добавить вуз" type="text" />
                        </div>
                        <Button onClick={addUniversity}>Добавить</Button>
                    </div>
                </div>
            </div>

            {/* Таблица */}
            {data.data &&
                <DataTable columns={columns} data={data.data} />}
        </div>
    )
}


export default UnivsPage;