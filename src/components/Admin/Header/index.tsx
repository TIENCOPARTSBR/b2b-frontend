"use client";

import React, {
    useEffect,
    useState
} from "react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/src/components/Admin/Profile";

type NavItem = {
    icon: string;
    name: string;
    link: string;
    width: number;
    height: number;
    subMenu?: subMenu[]
};

type subMenu = {
    name: string;
    link: string;
}

interface NavProps {
    list: NavItem[]
    logoEnco: string
    homepage: string
}

const Header: React.FC<NavProps> = ({ list, logoEnco, homepage}) => {
    const [ isOpen, setIsOpen] = useState(false);
    const [ pageWidth, setPageWidth] = useState(1000);
    const [ subMenuOpen, setSubMenuOpen] = useState<number>(9999);

    //Handles the opening and closing of our nav
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickMenu = (index: number) => {
        // Verifica se o item clicado possui subitens
        if (list[index].subMenu) {
            // Abre ou fecha o submenu correspondente
            setSubMenuOpen(index);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setPageWidth(window.innerWidth);
        };

        // Adiciona um event listener para lidar com o redimensionamento da janela
        window.addEventListener("resize", handleResize);

        // Chama o handleResize uma vez para obter a largura inicial da página
        handleResize();

        // Remove o event listener quando o componente é desmontado
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // A dependência vazia garante que o efeito só seja executado uma vez após a montagem inicial

    return (
        <header className="z-10 relative">
            { pageWidth <= 992 ? (
                <nav className="w-auto h-24 bg-white flex items-center justify-between lg:px-45px px-25px border-b-1 border-grey_one">
                    <Link href={homepage}>
                        <Image
                            src={logoEnco}
                            alt="Icon Encoparts"
                            width="114"
                            height="28"
                            className="mr-45px"
                        />
                    </Link>

                    <button
                        className="font-black text-black z-10"
                        onClick={() => {handleClick()}}>
                        { !isOpen ? (
                            <Image
                                src="/icon/icon-hamburger.svg"
                                alt="Icon user"
                                width="44"
                                height="45"
                            />
                        ) : (
                            <Image
                                src="/icon/icon-close-hamburger.svg"
                                alt="Icon user"
                                width="44"
                                height="45"
                            />
                        )}
                    </button>

                    <ul className={`w-screen h-screen bg-white absolute top-0 left-200%n p-25px flex flex-col flex-wrap z-0  transition-all duration-300 ${ isOpen ? "left-0px" : ""}`}>
                        {list.map((index: any, key: number) => (
                            <li className="h-auto mb-6" key={key}>
                                <Link href={index.link} className="text-grey_for flex flex-nowrap font-normal font-inter text-14px">
                                    <Image
                                        src={index.icon}
                                        alt="Icon de usuário"
                                        width={index.width}
                                        height={index.height}
                                        className="mr-3"
                                    />
                                    {index.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : (
                <nav className="w-auto h-24 bg-white flex items-center justify-between lg:px-45px border-b-1 border-grey_one">
                    <ul className="w-auto flex items-center">
                        <li>
                            <Link href={homepage}>
                                <Image
                                    src={logoEnco}
                                    alt="Icon Encoparts"
                                    width="114"
                                    height="28"
                                    className="mr-45px"
                                />
                            </Link>
                        </li>

                        {list.map((index: any, key: number) => (
                            <li className="h-auto lg:mr-35px" key={key}>
                                { index.subMenu ? (
                                    <button className={`text-grey_for flex flex-nowrap font-normal font-inter text-14px relative`}
                                            onClick={() => handleClickMenu(key)} >
                                        <Image
                                            src={index.icon}
                                            alt="Icon de usuário"
                                            width={index.width}
                                            height={index.height}
                                            className="mr-3"
                                        />

                                        {index.name}

                                        <ul className={`w-200px bg-white flex flex-col top-40px shadow-submenu absolute ${subMenuOpen === key ? "" : "hidden"}`}
                                            onMouseLeave={() => {setSubMenuOpen(9999)}}>
                                            {index.subMenu.map((subIndex: any, subKey: number) => (
                                                <li className="w-100% h-100%" key={subKey}>
                                                    <Link href={subIndex.link}
                                                          className="w-100% p-4 flex hover:bg-grey_six">{subIndex.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ) : (
                                    <Link href={index.link} className="text-grey_for flex flex-nowrap font-normal font-inter text-14px">
                                        <Image
                                            src={index.icon}
                                            alt="Icon de usuário"
                                            width={index.width}
                                            height={index.height}
                                            className="mr-3"
                                        />
                                        {index.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <Profile/>
                </nav>
            )}
        </header>
    )
}

export default Header;