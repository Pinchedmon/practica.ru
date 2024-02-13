"use client"
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";


interface IFormInput {
    fio: string
    phone: string,
    startDate: string,
    endDate: string,
    file: string,
    university: string,
    spec: string,
}



export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 30),
    })

    return (
        <div className={cn("grid gap-2 w-full", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        className={cn(
                            " text-left bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px] hover:bg-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd.MM.y")}
                                    {" - "}
                                    {format(date.to, "dd.MM.y")}
                                </>
                            ) : (
                                format(date.from, "dd.MM.y")
                            )
                        ) : (
                            <span>Выберите даты</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        ISOWeek
                        showOutsideDays={false}
                        initialFocus
                        mode="range"
                        classNames={{
                            table: "bg-white",
                            root: "bg-white border-none",
                            caption: "text-black text-center",
                            day: "text-placeholderGray w-full h-full background-none",
                            day_selected: "!bg-accentViolet !text-white w-full h-full",
                            day_today: "text-accentViolet outline-1 border-accentViolet border-2 border-solid",
                        }}

                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


const AuthForm = (props: { onCreate: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        await axios.post('/api/order', {
            fio: data.fio,
            phone: data.phone,
            endDate: data.endDate,
            startDate: data.startDate,
            file: data.file,
            university: data.university,
            spec: data.spec,

        }).then(res => res.status === 200 && props.onCreate())
    }

    return (
        <div className={"flex flex-col"}>
            <div className={"mb-[20px] px-[40px] py-[10px] text-[24px] font-bold bg-white rounded-[10px] text-black"}>Заполнение формы</div>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-[10px] mb-[50px]"}>
                <div className='flex flex-col '>
                    <label htmlFor={"fio"} className={"pl-[20px] text-[16px] mb-[5px]"}>ФИО</label>
                    <input
                        placeholder="Фамилия Имя Отчество"
                        id='fio'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('fio', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
                        })}
                    />
                    {errors.fio && <p className='my-1 text-red-800 text-sm'>{errors.fio.message}</p>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor={"phone"} className={"pl-[20px] text-[16px] mb-[5px]"}>Номер телефона</label>
                    <input
                        placeholder="пример: 89215332323"
                        id='phone'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('phone', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 15, message: 'Максимальная длина 15 символов' },
                        })}
                    />
                    {errors.phone && <p className='my-1 text-red-800 text-sm'>{errors.phone.message}</p>}
                </div>
                <div className={"flex flex-col gap-[5px]"}>
                    <label htmlFor={"fio"} className={"pl-[20px] text-[16px]"}> Даты практики</label>
                    <DatePickerWithRange />
                </div>
                <div className={"flex justify-between items-center"}>
                    <label htmlFor="file" className={"pl-[20px]  text-[16px]"}>
                        Направление
                    </label>
                    <input
                        id="file"
                        type="file"
                        className="hidden"
                        {...register('file', {
                            required: 'Не заполнено',
                        })}
                    />
                    <div
                        className={"border-4 border-solid border-white text-[16px] font-bold px-[20px] py-[7px] rounded-[15px]"}>Выбрать
                    </div>
                </div>
                <div className='flex flex-col '>
                    <label htmlFor={"university"} className={"pl-[20px] text-[16px] mb-[5px]"}>Наименование учебного учреждения</label>
                    <input
                        placeholder="Политех"
                        id='university'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('university', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
                        })}
                    />
                    {errors.university && <p className='my-1 text-red-800 text-sm'>{errors.university.message}</p>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor={"spec"} className={"pl-[20px] text-[16px] mb-[5px]"}>Специальность</label>
                    <input
                        placeholder="Прогер"
                        id='spec'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('spec', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
                        })}
                    />
                    {errors.spec && <p className='my-1 text-red-800 text-sm'>{errors.spec.message}</p>}
                </div>


                <button
                    className="text-center text-[20px] mt-[20px] text-black bg-white rounded-[15px] py-[5px] font-semibold"
                >
                    Отправить
                </button>

            </form>
        </div>
    );
};

export default AuthForm;
