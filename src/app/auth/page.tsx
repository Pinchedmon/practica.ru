'use client'
import { useSession } from "next-auth/react";
import AuthForm from "./AuthForm";
import SignInButton from "./AuthTelegram";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const session = useSession();
    const router = useRouter();

    const [order, setOrder] = useState<boolean>(false)
    const sendOrCheckUser = async () => {
        await axios.post('/api/student', {
            id: session.data?.user.id,
            name: session.data?.user.name,
            email: session.data?.user.email
        }).then((res: any) => {
            if (res.data.data.accepted) {
                router.push('/my')
            }
        }
        )
        console.log(session.data?.user.id);
        await axios.get(`/api/order?id=${session.data?.user.id}`)
            .then((res: any) => res.data.data && setOrder(true))
    }
    useEffect(() => {
        session.status == 'authenticated' && sendOrCheckUser()
    }, [session.status])


    return (
        <main className="flex min-h-screen items-center justify-center bg-accentViolet">
            <div className="max-w-[1000px] flex gap-[150px] items-center max-[1000px]:flex-col max-[1000px]:gap-[30px]">
                <div className={"flex flex-col gap-[20px] items-center"}>
                    <div className={"text-[60px] text-black font-semibold px-[40px] py-[35px] bg-white rounded-[20px] max-[1000px]:text-[36px] max-[1000px]:px-[20px] max-[1000px]:py-[10px]"} >
                        Практика.ру
                    </div>
                    <p className={"text-white text-[48px] font-semibold max-[1000px]:text-[24px] "}>Задания здесь!</p>
                </div>
                {session.status !== 'authenticated' && <SignInButton botUsername={`${process.env.BOT_USERNAME}`} />}
                {
                    (session.status == 'authenticated' && !order) ?
                        <AuthForm id={session.data.user.id} onCreate={() => setOrder(true)} /> : 'Вы отправили заявку, подождите пока её обработают'
                }
            </div>
        </main>
    );
}

