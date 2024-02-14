"use client"
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Combobox } from "@/widgets/admin/AddTaskWindow/Combobox/Combobox";


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
    className, updateDate
}: { className?: string, updateDate: (date: DateRange) => void }) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 30),
    })

    useEffect(() => {
        updateDate(date as DateRange)
    }, [date]);


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
                        onSelect={(e) => {
                            setDate({ from: e?.from, to: e?.to })
                            // getDate({ from: e?.from, to: e?.to })
                        }}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


const AuthForm = (props: { id: string, onCreate: () => void }) => {
    const session = useSession();
    const { data: univs } = useSWR('/api/univs', fetcher)
    const { data: specs } = useSWR('/api/specs', fetcher)
    const [univId, setUnivId] = useState('');
    const [specId, setSpecId] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [date, setDate] = useState<DateRange | undefined>()
    const updateDate = (date: DateRange) => {
        setDate(date)
    }
    const onSubmit = async (data: IFormInput) => {
        console.log(data);
        console.log(date)

        if (!univId || !specId) {
            return window.alert('заполните вуз и специальность')
        }
        await axios.post('/api/order', {
            // studentId: session.data?.user.id || "1",
            id: props.id,
            fio: data.fio,
            phone: data.phone,
            endDate: date?.from,
            startDate: date?.to,
            file: data.file,
            university: univId,
            spec: specId,
        }).then(res => res.status === 200 && props.onCreate())
    }
    const dataUniv = univs?.data.map((el: any) => ({ value: el.id, label: el.name }));
    const dataSpec = specs?.data.map((el: any) => ({ value: el.id, label: el.name }));


    // const dataUniv = univs.map(el => ({value: el.id, label: el.name}));
    // const dataSpec = specs.map(el => ({value: el.id, label: el.name}));
    console.log(univs)
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
                    <DatePickerWithRange updateDate={updateDate} />
                </div>
                <div className={"flex justify-between items-center"}>
                    <label htmlFor="file" className={"pl-[20px]  text-[16px]"}>
                        Направление
                    </label>
                    <input
                        placeholder="yandex disk"
                        id="text"
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('file', {
                            required: 'Не заполнено',
                        })}
                    />

                </div>
                <div className='flex flex-col '>
                    <label htmlFor={"university"} className={"pl-[20px] text-[16px] mb-[5px]"}>Наименование учебного учреждения</label>
                    {univs?.data && <Combobox data={dataUniv} label={'Вуз'} onSelect={setUnivId} />}
                    {/* <input
                        placeholder="Политех"
                        id='university'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('university', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
                        })}
                    /> */}
                    {/* {errors.university && <p className='my-1 text-red-800 text-sm'>{errors.university.message}</p>} */}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor={"spec"} className={"pl-[20px] text-[16px] mb-[5px]"}>Специальность</label>
                    {specs?.data && <Combobox data={dataSpec} label={'Специальность'} onSelect={setSpecId} />}
                    {/* <input
                        placeholder="Прогер"
                        id='spec'
                        type="text"
                        className={"bg-white text-black border-0 rounded-[15px] px-[15px] py-[7px] placeholder:text-placeholderGray text-[16px]"}
                        {...register('spec', {
                            required: 'Не заполнено',
                            minLength: { value: 6, message: 'Минимальная длина 6 символов' },
                            maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
                        })}
                    /> */}
                    {/* {errors.spec && <p className='my-1 text-red-800 text-sm'>{errors.spec.message}</p>} */}
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
