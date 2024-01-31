import Link from "next/link";

type itemList = {
    name: string,
    link: string,
}

interface listType {
    list: itemList[]
}

const Breadcrumb = (props: listType) => {
    return (
        <ul className="w-100% flex items-center mb-2">
            {props.list.map((item, key) => (
                <li className="text-grey_two relative text-14px font-normal font-inter after:content-['/'] after:absolute after:right-m15px last:after:content-none last:text-black mr-6" key={key}>
                    <Link href={item.link}><span dangerouslySetInnerHTML={{ __html: item.name }}></span></Link>
                </li>
            ))}
        </ul>
    )
}

export default Breadcrumb;
