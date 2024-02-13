'use client'
import { useState } from "react";
import Sidebar from "../../widgets/Sidebar"
import RequireAuth from "@/lib/RequireAuth";

const AdminLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-white bg-accentViolet p-2 "
            >
                {isSidebarOpen ? 'Закрыть меню' : 'Отправить меню'}
            </button>
            <div className={` top-[15px] ${!isSidebarOpen && "hidden md:block"}`}>
                <Sidebar setSidebarFalse={() => setIsSidebarOpen(false)} />
            </div>
            <main className={`md:ml-[250px] ${isSidebarOpen && 'hidden'} w-full p-2 md:p-16`}>
                <RequireAuth>
                    {children}
                </RequireAuth>

            </main>
        </div>
    )
}

export default AdminLayout