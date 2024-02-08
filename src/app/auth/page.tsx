import AuthForm from "./AuthForm";

export default function AuthPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-accentViolet">
            <div className="max-w-[1000px] flex gap-[150px]">
                <div className={"flex flex-col gap-[20px] items-center"}>
                <div className={"text-[60px] text-black font-semibold px-[40px] py-[35px] bg-white rounded-[20px]"} >
                    Практика.ру
                </div>
                <p className={"text-white text-[48px] font-semibold "}>Задания здесь!</p>
                </div>
                <AuthForm/>
            </div>
        </main>
    );
}
