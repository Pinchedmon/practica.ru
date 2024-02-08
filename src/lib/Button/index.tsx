import { clsx } from "clsx";

interface Props {
    className?: string;
    children: React.ReactNode
}

const Button = ({ className, children }: Props) => {
    return (
        <div className={clsx("cursor-pointer px-[34px] py-[17px] bg-bgButton text-black dark:text-white dark:bg-bgButtonDark rounded-[20px] flex items-center justify-center", {}, [className])}>
            {children}
        </div>
    );
};

export default Button;
