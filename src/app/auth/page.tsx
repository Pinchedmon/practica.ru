'use client'
import { useSession } from "next-auth/react";
import AuthForm from "./AuthForm";
import SignInButton from "./AuthTelegram";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthPage() {
    const session = useSession();
    const [data, setData] = useState()
    const sendOrCheckUser = async () => {
        await axios.post('/api/order', {
            id: session.data?.user.id,
            name: session.data?.user.name,
            email: session.data?.user.email
        }).then((res: any) => setData(res))
    }
    useEffect(() => {
        session.status == 'authenticated' && sendOrCheckUser()
    }, [session.status])

    if (session.status)
        if (session)
            return (
                <main className="flex min-h-screen items-center justify-center bg-accentViolet">
                    <div className="max-w-[1000px] flex gap-[150px] items-center max-[1000px]:flex-col max-[1000px]:gap-[30px]">
                        <div className={"flex flex-col gap-[20px] items-center"}>
                            <div className={"text-[60px] text-black font-semibold px-[40px] py-[35px] bg-white rounded-[20px] max-[1000px]:text-[36px] max-[1000px]:px-[20px] max-[1000px]:py-[10px]"} >
                                Практика.ру
                            </div>
                            <p className={"text-white text-[48px] font-semibold max-[1000px]:text-[24px] "}>Задания здесь!</p>
                        </div>
                        <div>
                            {JSON.stringify(data)}
                        </div>
                        {/* {session.} */}
                        {/* <AuthForm /> */}
                        <SignInButton botUsername={`${process.env.BOT_USERNAME}`} />
                    </div>
                </main>
            );
}

