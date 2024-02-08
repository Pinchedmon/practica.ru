import { ButtonHTMLAttributes } from 'react'
import Image from 'next/image'
interface svgProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width: number;
    className: string
    height: number;
    fill: string;
}
const SunIcon = (props: svgProps) => {
    const { width, height, fill, className, onClick } = props
    return (
        <button className={className} onClick={onClick}>
            <Image src={"/sun.svg"} alt={""} width={width} height={height} />
        </button>
    )
}

export default SunIcon