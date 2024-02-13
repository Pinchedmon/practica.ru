'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
import { Combobox } from './Combobox/Combobox';

interface Props {
    univs: any[];
    specs: any[];
    onAdd: (data: any) => void;
}


const AddTaskWindow = ({univs, specs, onAdd}:Props) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [univId, setUnivId] = useState('');
    const [specId, setSpecId] = useState('');

    const dataUniv = univs.map(el => ({value: el.id, label: el.name}));
    const dataSpec = specs.map(el => ({value: el.id, label: el.name}));

    async function handleAddTask() {
        if (!title || !text || !univId || !specId) {
            alert('Заполните все поля!')
            return
        }
        onAdd({univId, specId, title, text})
        setIsAddingTask(false);
    }

    return (
        <>
            <div className="mb-4">
                <Button className='' onClick={() => setIsAddingTask(!isAddingTask)}>Добавить</Button>
            </div>
            {isAddingTask &&
                <div className='mb-4 z-10 w-full border p-4 rounded-lg flex flex-col'>
                    <p className='text-lg font-semibold mb-2'>Добавить задание</p>
                    <div className="flex flex-col md:flex-row gap-4 mb-2">
                        <Combobox data={dataUniv} label={'Вуз'} onSelect={setUnivId} />
                        <Combobox data={dataSpec} label={'Специальность'} onSelect={setSpecId} />
                    </div>
                    <Input className='mb-2' placeholder="Название задания" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea className='mb-2' placeholder="Напишите задание" value={text} onChange={(e) => setText(e.target.value)} />
                    <Button className='w-[100px]' onClick={handleAddTask}>Отправить</Button>
                </div>
            }
        </>
    )
}

export default AddTaskWindow
