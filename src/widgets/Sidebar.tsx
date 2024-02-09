import Link from "next/link"


const Sidebar = (props: { setSidebarFalse: () => void }) => {
    const { setSidebarFalse } = props
    return (
        <section className="static w-full md:w-[250px] md:fixed  align-center items-center bg-accentViolet h-full md:flex flex-col text-white p-6 ">
            <h1 className="text-2xl font-bold mb-4">  Практика.ру</h1>
            <hr className="mb-4" />
            <nav className="flex flex-col">
                <Link href='/admin/orders' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Заявки
                </Link>
                <Link href='/admin/reports' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Отчёты
                </Link>
                <Link href='/admin/tasks' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Задания
                </Link>
                <Link href='/admin/univs' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Вузы
                </Link>
                <Link href='/admin/specs' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Специальности
                </Link>
                <Link href='/admin/students' onClick={setSidebarFalse} className="font-semibold mb-4">
                    Студенты
                </Link>
            </nav>
            <Link href="/admin" onClick={setSidebarFalse} className="mt-auto flex bottom-0 gap-[28px] justify-center mb-[20px]">
                Выйти
            </Link>
        </section >


    )
}

export default Sidebar