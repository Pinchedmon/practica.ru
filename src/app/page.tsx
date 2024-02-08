
import Button from "@/lib/Button";
import ThemeChanger from "@/lib/ThemeChanger";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg dark:bg-bgDark ">
      <header
        className="z-10 max-w-[1320px] w-full items-center justify-between text-sm flex pt-[20px] px-[30px] max-[600px]:flex-col max-[600px]:bg-bgButtonDark">
        <Button className="text-[26px] font-semibold max-[600px]:w-full">
          Практика.ру
        </Button>
        <div className={"flex gap-[20px]"}>
          <ThemeChanger className={" cursor-pointer px-[34px] py-[17px] bg-bgButton  text-black dark:text-white dark:bg-bgButtonDark rounded-[20px] flex  items-center justify-center !h-[54px]"} />
          <Link href={"/auth"}>
            <Button className={"text-[22px] gap-[10px]"}>
              Войти
              <span className={"text-accentViolet"}>
                <Image src={"/login.svg"} alt={""} width={17} height={17} />
              </span>
            </Button>
          </Link>
        </div>
      </header>
      <section
        className={"flex gap-[77px] max-w-[1100px] px-[30px] items-center mt-[100px] max-[1000px]:flex-col mb-[88px]"}>
        <p className={"font-light text-[28px]  max-[600px]:text-[20px]  max-[400px]:text-[16px]"}>
          <span className={"text-accentViolet"}>{`Практика.ру`}</span> – это место, где вы сможете
          найти задания, соответствующие вашим интересам и
          направлению обучения. Независимо от того, посвящена ли ваша специализация программированию,
          маркетингу, инженерии или любой другой области, у нас вы найдете полезные и актуальные
          задачи,
          которые помогут вам почувствовать себя профессионалом уже сейчас.
        </p>
        <Button className={"!bg-accentViolet font-bold text-nowrap !text-white"}>
          Получить задание
        </Button>
      </section>

      <div className={"overflow-hidden mb-[100px] p-[30px]"}>
        <Image src={"/people.png"} alt={"people"} width={1380} height={289} />
      </div>
    </main>
  );
}
