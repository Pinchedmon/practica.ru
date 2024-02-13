'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/lib/DataTable/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
import useModal from "@/lib/useModal";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import WithAuth from "@/lib/RequireAuth";

type Spec = {
    id: string;
    name: string;
};


function SpecsPage() {

    // mutate - для того чтобы сделать refresh в получении data по запросу
    const { mutate } = useSWRConfig();

    // мой кастомный хук для работы с модалкой
    const { isModalOpen, openModal, closeModal } = useModal();

    // input для добавления вуза
    const [inputValue, setInputValue] = useState('')

    // это по сути input в модалке
    const [newValue, setNewValue] = useState('')

    // получаю вузы
    const { data, error, isLoading } = useSWR('/api/specs', fetcher)

    // использую для получения айдишника чтобы можно было сделать edit fetch
    const [dataId, setDataId] = useState('');

    if (error) return <div>ошибка загрузки</div>
    if (isLoading) return <div>загрузка...</div>

    const addSpecialization = async () => {
        try {
            await axios.post('/api/spec', { name: inputValue });

            // Тот самый mutate для того чтобы обновить данные
            await mutate('/api/specs', fetcher('/api/specs'));

        } catch (error) {
            console.error(error);
        }
    };

    const deleteSpecialization = async (id: string) => {
        try {
            await axios.delete(`/api/spec?id=${id}`);
            await mutate('/api/specs', fetcher('/api/specs'));
        } catch (error) {
            console.error(error);
        }
    };

    const editSpecialization = async (id: string) => {
        try {
            await axios.put('/api/spec', { id, name: newValue });
            await mutate('/api/specs', fetcher('/api/specs'));
        } catch (error) {
            console.error(error);
        }
    };


    const columns: ColumnDef<Spec>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Специальность",
            accessorKey: "name",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const spec = row.original
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
                                openModal();
                                setNewValue(spec.name);
                                setDataId(spec.id);
                            }}>Изменить</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                deleteSpecialization(spec.id);
                            }}>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Card>
                    <CardHeader>
                        <CardTitle>Изменение специальности</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Имя" type="text" />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => {
                            editSpecialization(dataId)
                            closeModal();
                        }}>Изменить</Button>
                    </CardFooter>
                </Card>
            </Modal>
            <p className="font-mono text-xl mb-4">
                Специальности
            </p>
            <div className="mb-4">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex gap-2 items-end mb-2" >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="spec" className="mb-1">Название</Label>
                            <Input id="spec" placeholder="Добавить специальность" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </div>
                        <Button onClick={addSpecialization}>Добавить</Button>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={data.data} />
        </div>
    )
}

export default SpecsPage