import React from "react";
import { Nav, Link } from "./style"

type BreadcrumbItem = {
    name: string;
    link: string;
};
  
type BreadcrumbProps = {
    breadcump: BreadcrumbItem[];
};

const Breadcump: React.FC<BreadcrumbProps> = ({ breadcump }) => {
    return (
        <>  
            <Nav>
                {breadcump.map((item: any, key: number) => (
                    <Link key={key} href={item.link}>{item.name}</Link>
                ))}
            </Nav>
        </>
    )
}

export default Breadcump;