import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {TaskFormatted} from "@/app/admin/tasks/page";
import React, {useState} from "react";
import {Combobox} from "@/widgets/admin/AddTaskWindow/Combobox/Combobox";
import {Textarea} from "@/components/ui/textarea";

type DictionaryRecord = {
    id: string;
    name: string;
}

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
    onSubmit: (data: any) => void;
    prevData: TaskFormatted;
    univs: DictionaryRecord[],
    specs: DictionaryRecord[],
}

const EditTaskModal = ({isModalOpen, closeModal, onSubmit, prevData, specs, univs}: Props) => {
    const [newData, setNewData] = useState(prevData);

    function onChange(key: keyof TaskFormatted, val: any) {
        setNewData({...newData, [key]: val});
    }

    const dataUniv = univs.map(el => ({value: el.id, label: el.name}));
    const dataSpec = specs.map(el => ({value: el.id, label: el.name}));

    function editTask() {
        onSubmit(newData);
        closeModal();
    }

    console.log(dataUniv, dataSpec)
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Card>
                <CardHeader>
                    <CardTitle>Изменение задания</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='mb-4 z-[10000] w-full border p-4 rounded-lg flex flex-col'>
                        <p className='text-lg font-semibold mb-2'>Добавить задание</p>
                        <div className="flex flex-col md:flex-row gap-4 mb-2">
                            <Combobox selected={prevData.univId} data={dataUniv} label={'Вуз'} onSelect={val => onChange("univId", val) }/>
                            <Combobox selected={prevData.specId} data={dataSpec} label={'Специальность'} onSelect={val => onChange("specId", val)}/>
                        </div>
                        <Input className='mb-2' placeholder="Название задания" value={newData.title}
                               onChange={(e) => onChange("title", e.target.value)}/>
                        <Textarea className='mb-2' placeholder="Напишите задание" value={newData.text}
                                  onChange={(e) => onChange("text", e.target.value)}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={editTask}>Изменить</Button>
                </CardFooter>
            </Card>
        </Modal>
    )
}

export default EditTaskModal;
