'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
import { Combobox } from './Combobox/Combobox';


const AddTaskWindow = () => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const dataUniv = [
        {
            value: "1",
            label: "Политех",
        },
        {
            value: "2",
            label: "Итмо",
        },
    ]
    const dataSpec = [
        {
            value: "1",
            label: "Программист",
        },
    ]
    return (
        <>
            <div className="mb-4">
                <Button className='' onClick={() => setIsAddingTask(!isAddingTask)}>Добавить</Button>
            </div>
            {isAddingTask &&
                <div className='mb-4 z-10 w-full border p-4 rounded-lg flex flex-col'>
                    <p className='text-lg font-semibold mb-2'>Добавить задание</p>
                    <div className="flex flex-col md:flex-row gap-4 mb-2">
                        <Combobox data={dataUniv} label={'Вуз'} />
                        <Combobox data={dataSpec} label={'Специальность'} />
                    </div>
                    <Textarea className='mb-2' placeholder="Напишите задание" />
                    <Button className='w-[100px]'>Отправить</Button>
                </div>
            }
        </>
    )
}

export default AddTaskWindow