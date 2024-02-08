import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
interface svgProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width: number;
    height: number;
    fill: string;
    className?: string;
}
const MoonIcon = (props: svgProps) => {
    const { width, height, fill, className, onClick } = props
    return (
        <button className={className} onClick={onClick}>
            <Image src={"/moon.svg"} alt={""} width={width} height={height} />
        </button>


    )
}

export default MoonIcon
