"use client"


import Button from "@/lib/Button";
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { fetcher } from "@/lib/fetcher";


export default function TasksList(props: { getId: (id: string) => void }) {
    const [isOpened, setIsOpened] = useState(false)
    const session = useSession()
    const { data, isLoading, error } = useSWR(`/api/tasks?id=${session.data?.user.id}`, fetcher)
    console.log(data)

    return (
        <div className="grow-1">
            <Button className={"text-[22px] font-medium py-[8px] gap-[10px]"} onClick={() => setIsOpened(prev => !prev)}>
                Задания
                <Image className={(isOpened ? 'rotate-180 ' : "") + "dark:invert"} src={"/arrowDown.svg"} alt={"arrow down"} width={15} height={10} />
            </Button>
            {
                isOpened && (
                    <ul className={"flex flex-col gap-[10px] text-[18px] font-light mt-[20px] px-[10px] "}>
                        {data.data.map((el: any) => <li onClick={() => props.getId(el.id)} className={"truncate max-w-[170px]"} key={el.id}>{el.title}</li>)}
                    </ul>
                )
            }
        </div>
    );
}
