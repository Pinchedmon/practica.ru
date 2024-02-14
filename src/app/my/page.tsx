'use client'
import Button from "@/lib/Button";
import { Button as ShadButton } from "@/components/ui/button";
import ThemeChanger from "@/lib/ThemeChanger";
import Image from "next/image";
import TasksList from "@/app/my/TasksList/TasksList";
import useModal from "@/lib/useModal";
import Modal from "@/components/ui/modal";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";


export default function MyPage() {
    const { isModalOpen, openModal, closeModal } = useModal()
    const session = useSession()
    const [taskId, setTaskId] = useState('')
    const [report, setReport] = useState('')
    const { data, isLoading, error } = useSWR(`/api/task?id=${taskId}`, fetcher)
    return (
        <main className="min-h-screen bg-bg dark:bg-bgDark  flex flex-col items-center">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Card>
                    <CardHeader>
                        <CardTitle>Отправка отчёта</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input value={report} onChange={(e) => setReport(e.target.value)} placeholder="URL yandex disc" type="text" />
                    </CardContent>
                    <CardFooter>e
                        <ShadButton onClick={async () => {
                            //TODO: send REPORT
                            await axios.post('/api/report', { url: report, studentId: session?.data?.user.id })
                            closeModal();
                        }}>Отправить</ShadButton>
                    </CardFooter>
                </Card>
            </Modal>
            <header
                className="px-[30px] !bg-opacity-0 z-10 max-w-[1320px] w-full items-center justify-between text-sm flex pt-[20px] max-[730px]:flex-col max-[730px]:!bg-opacity-100  max-[730px]:pt-[5px] bg-white dark:bg-bgButtonDark ">
                <Button className="text-[26px] font-semibold max-[600px]:w-full">
                    Практика.ру
                </Button>
                <div className={"flex gap-[20px]"}>
                    <ThemeChanger
                        className={" cursor-pointer px-[34px] py-[17px] bg-bgButton  text-black dark:text-white dark:bg-bgButtonDark rounded-[20px] flex  items-center justify-center !h-[54px]"} />
                    <Button className={"cursor-default text-[22px] gap-[10px]"}>
                        <Image className={"dark:invert"} src={!session.data?.user.image ? "/profile.svg" : session.data?.user.image} alt={""} width={17} height={17} />
                        <span className={"truncate max-w-[200px]"}>
                            {session.data?.user.name}
                        </span>
                    </Button>
                    <Button onClick={() => signOut()}>Выйти</Button>

                </div>
            </header>

            <div className={" px-[30px] flex gap-[30px] mt-[20px] grow basis-full shrink-0 pb-[20px] max-w-[1320px] w-full max-[730px]:px-[10px] max-[600px]:flex-col"}>
                <div className={"flex flex-col gap-[20px] px-[20px] basis-[232px] grow-0 justify-between max-[730px]:px-[0px] "}>
                    <div className={"flex flex-col gap-[20px]"}>
                        {/* <Button className={"text-[22px] font-medium py-[8px]"}>
                            Контакты
                        </Button> */}
                        <TasksList getId={setTaskId} />
                    </div>

                    <Button onClick={() => isModalOpen ? closeModal() : openModal()} className={"!bg-accentViolet !text-white text-[22px] font-medium text-center mt-auto"}>
                        Отправить отчет
                    </Button>
                </div>

                <div className={"flex flex-col gap-[20px] grow basis-full"}>
                    {taskId ? <><div className={"rounded-[20px] bg-white dark:bg-bgButtonDark text-[26px] py-[10px] px-[30px] mb-[20px] text-black dark:text-white"}>
                        <span className={"font-medium inline-block mr-[10px] "}>Тема:</span>
                        <span className={"font-light truncate"}>{data?.data && data.data.title}</span>
                    </div>
                        <p className={"whitespace-pre-line px-[20px]"}>
                            {data?.data && data.data.text}
                        </p></> : 'выберете задание'}
                </div>
            </div>
        </main>
    );
}
