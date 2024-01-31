import Link from "next/link";

type LinkProps = {
    href: string,
    name: string,
    bgColor: string,
}

const LinkSmall = (props: LinkProps) => {
    return (
        <Link href={props.href} className={`flex py-9px px-15px rounded-60px text-black font-medium font-inter text-14px ${props.bgColor}`}>{props.name}</Link>
    )
}

export default LinkSmall;