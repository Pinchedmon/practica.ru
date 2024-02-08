"use client"
import {useForm} from "react-hook-form";


interface IFormInput {
    password: string
    tag: string
}

const AuthForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {

    }

    return (
        <div className={"flex flex-col"}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                {errors.tag && <p className='mb-2 text-red-500 text-sm'>{errors.tag.message}</p>}
                <input
                    placeholder="Тэг"
                    id='tag'
                    className="border-[2px]  border-[#b5b5b5] mb-[20px] pl-3 p-2 rounded-xl"
                    {...register('tag', {
                        required: 'Не заполнено',
                    })}
                />
                {errors.password && <p className='mb-2 text-red-500 text-sm'>{errors.password.message}</p>}
                <input
                    placeholder="Пароль"
                    id='password'
                    type="password"
                    autoComplete="on"
                    className="border-[2px]  border-[#b5b5b5] pl-3 p-2 rounded-xl"
                    {...register('password', {
                        required: 'Не заполнено',
                    })}
                />

                <button
                    className="flex self-center text-sm border-[2px] border-[#37B34A] mt-[20px]  pl-14 pr-14 pt-1 pb-1 font-bold rounded-xl"
                >
                    Войти
                </button>

            </form>
        </div>
    );
};

export default AuthForm;
