"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect, useState} from "react";



type Tdata = {
    value: string,
    label: string
}

interface Props {
    data: Tdata[],
    label: string,
    selected?: string;
    onSelect: (value: string) => void
}


export function Combobox(props: Props) {
    const { data, label, onSelect , selected} = props
    const [open, setOpen] = useState(   false)
    const [value, setValue] = useState(selected || "")

    useEffect(() => {
        if (value)
        onSelect(value);
    }, [value]);

    console.log(open)

    console.log(data)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                >
                    {value
                        ? data.find((data) => data.value === value)?.label
                        : `Выберите ${label}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 !z-[1000]">
                <Command>
                    <CommandInput placeholder={`Поиск`} />
                    <CommandEmpty>{label} не найден.</CommandEmpty>
                    <CommandGroup>
                        {data.map((data) => (
                            <CommandItem
                                key={data.value}
                                value={data.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    // setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === data.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {data.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
