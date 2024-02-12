"use client"


import Button from "@/lib/Button";
import {useState} from "react";
import Image from "next/image";

const data = [
    {
        name: "task 1 long long long long" ,
        id: 1,
    },
    {
        name: "task 2",
        id: 2,
    },
    {
        name: "task 3",
        id: 3,
    },
]

export default function TasksList() {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="grow-1">
            <Button className={"text-[22px] font-medium py-[8px] gap-[10px]"} onClick={() => setIsOpened(prev => !prev)}>
                Задания
                <Image className={(isOpened ? 'rotate-180 ' : "") + "dark:invert"} src={"/arrowDown.svg"} alt={"arrow down"} width={15} height={10}/>
            </Button>
            {
                isOpened && (
                    <ul className={"flex flex-col gap-[10px] text-[18px] font-light mt-[20px] px-[10px] "}>
                        {data.map(el => <li className={"truncate max-w-[170px]"} key={el.id}>{el.name}</li>)}
                    </ul>
                )
            }
        </div>
    );
}
