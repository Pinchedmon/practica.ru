import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Combobox} from "@/widgets/admin/AddTaskWindow/Combobox/Combobox";
type DictionaryRecord = {
    id: string;
    name: string;
}

interface Props {
    univs: DictionaryRecord[];
    specs: DictionaryRecord[];
    onSearch: (data: {univId?: string, specId?: string}) => void;
}

const SearchTaskForm = ({ onSearch , univs, specs}: Props) => {
    const [univId, setUnivId] = useState('');
    const [specId, setSpecId] = useState('');

    const dataUniv = univs.map(el => ({value: el.id, label: el.name}));
    const dataSpec = specs.map(el => ({value: el.id, label: el.name}));

    function handleSearch() {
        console.log(univId, specId);
        onSearch({univId, specId});
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="w-full md:w-1/2">
                <div className="w-full flex gap-2 items-end mb-2">
                    <div className="grid  items-center gap-1.5">
                        <Label htmlFor="univ" className="mb-1">Поиск по вузу</Label>
                        {/*<Input id="univ" placeholder="Название вуза" type="text"/>*/}
                        <Combobox data={dataUniv} label={'Вуз'} onSelect={setUnivId} />
                    </div>
                    <Button onClick={handleSearch}>Поиск</Button>
                </div>
                <div className="w-full flex gap-2 items-end">
                    <div className="grid   items-center gap-1.5">
                        <Label htmlFor="fio" className="mb-1">Поиск по Специальности</Label>
                        {/*<Input id="fio" placeholder="ФИО" type="text"/>*/}
                        <Combobox data={dataSpec} label={'Специальность'} onSelect={setSpecId} />

                    </div>
                    <Button onClick={handleSearch}>Поиск</Button>
                </div>
            </div>
        </div>
    )
};

export default SearchTaskForm;

