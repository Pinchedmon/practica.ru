import Button from "@/lib/Button";
import ThemeChanger from "@/lib/ThemeChanger";
import Link from "next/link";
import Image from "next/image";
import TasksList from "@/app/my/TasksList/TasksList";

const selectedTask = {
    topic: "Тема 1",
    text: `Дорогие студенты!
        
        Добро пожаловать на сайт "Практика.ру" – вашего надежного партнера в обеспечении практического опыта от предприятий!
        
        Мы рады приветствовать вас, поскольку понимаем, что практика – неотъемлемая часть вашей учебы. Здесь, на нашем сайте, вы найдете множество заданий и возможностей для того, чтобы попробовать свои силы, применить теоретические знания на практике и развить свои профессиональные навыки.
        
        Мы сотрудничаем с различными предприятиями, которые предоставляют интересные проекты и задания для студентов. Наши партнеры готовы делиться своим опытом и знаниями, помогая вам раскрыть свой потенциал и получить ценный практический опыт.
        
        "Практика.ру" – это место, где вы сможете найти задания, соответствующие вашим интересам и направлению обучения. Независимо от того, посвящена ли ваша специализация программированию, маркетингу, инженерии или любой другой области, у нас вы найдете полезные и актуальные задачи, которые помогут вам почувствовать себя профессионалом уже сейчас.
        
        Мы признаем, что студенты – будущее нашей страны, и поэтому наша задача состоит в том, чтобы помочь вам максимально эффективно использовать время обучения, получая практический опыт, который станет вашим преимуществом в будущей карьере.
        
        Не упускайте возможность приобрести ценный опыт, пройдя практику на "Практика.ру". Регистрируйтесь у нас, выбирайте интересующие вас задания и начинайте свое учебное и профессиональное путешествие уже сегодня!
        
        С наилучшими пожеланиями,
        Команда "Практика.ру"`,
    id: 1,
}


export default function MyPage() {
    const nameTestLong = "hello hello hello hello";

    return (
        <main className="min-h-screen bg-bg dark:bg-bgDark  flex flex-col items-center">
            <header
                className="px-[30px] !bg-opacity-0 z-10 max-w-[1320px] w-full items-center justify-between text-sm flex pt-[20px] max-[730px]:flex-col max-[730px]:!bg-opacity-100  max-[730px]:pt-[5px] bg-white dark:bg-bgButtonDark ">
                <Button className="text-[26px] font-semibold max-[600px]:w-full">
                    Практика.ру
                </Button>
                <div className={"flex gap-[20px]"}>
                    <ThemeChanger
                        className={" cursor-pointer px-[34px] py-[17px] bg-bgButton  text-black dark:text-white dark:bg-bgButtonDark rounded-[20px] flex  items-center justify-center !h-[54px]"}/>
                    <Link href={"/auth"}>
                        <Button className={"text-[22px] gap-[10px]"}>
                            <Image className={"dark:invert"} src={"/profile.svg"} alt={""} width={17} height={17}/>
                            <span className={"truncate max-w-[200px]"}>
                                {nameTestLong}
                            </span>
                        </Button>
                    </Link>
                </div>
            </header>

            <div className={" px-[30px] flex gap-[30px] mt-[20px] grow basis-full shrink-0 pb-[20px] max-w-[1320px] w-full max-[730px]:px-[10px] max-[600px]:flex-col"}>
                <div className={"flex flex-col gap-[20px] px-[20px] basis-[232px] grow-0 justify-between max-[730px]:px-[0px] "}>
                    <div className={"flex flex-col gap-[20px]"}>
                        <Button className={"text-[22px] font-medium py-[8px]"}>
                            Контакты
                        </Button>
                        <TasksList/>
                    </div>

                    <Button className={"!bg-accentViolet !text-white text-[22px] font-medium text-center mt-auto"}>
                        Отправить отчет
                    </Button>
                </div>

                <div className={"flex flex-col gap-[20px] grow basis-full"}>
                    <div className={"rounded-[20px] bg-white dark:bg-bgButtonDark text-[26px] py-[10px] px-[30px] mb-[20px] text-black dark:text-white"}>
                        <span className={"font-medium inline-block mr-[10px] "}>Тема:</span>
                        <span className={"font-light truncate"}>{selectedTask.topic}</span>
                    </div>
                    <p className={"whitespace-pre-line px-[20px]"}>
                        {selectedTask.text}
                    </p>
                </div>
            </div>
        </main>
    );
}
