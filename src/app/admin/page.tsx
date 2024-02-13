'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
    password: string
    login: string
}

export default function AdminPage() {
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/admin/orders')
        }
    }, [session.status])
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit = async (data: IFormInput) => {
        await signIn('credentials', { redirect: false, name: data.login, password: data.password }).then(res => console.log(res))

    }
    return (
        <div className="flex h-full w-full justify-center self-center align-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl mb-4 font-mono">Вход в Админ панель</p>
                {errors.login && <p className='mb-2 text-red-500 text-sm'>Необходим логин</p>}
                <Input className='mb-2' type="text" placeholder="Логин"  {...register('login', {
                    required: 'Не заполнено',
                })} />
                {errors.password && <p className='mb-2 text-red-500 text-sm'>Необходим пароль</p>}
                <Input className='mb-2' type="password" placeholder="Пароль"  {...register('password', {
                    required: 'Не заполнено',
                })} />
                <Button>Вход</Button>
            </form>
        </div>
    );
}
