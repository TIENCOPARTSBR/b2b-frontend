import React from "react";

type ButtonProps = {
    children: React.ReactNode,
    bgColor?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const Index = ({children, bgColor, ...props}: ButtonProps)  => {
    return <button
                className={`${bgColor} py-9px px-15px bg-grey_seven text-13px text-white font-medium font-inter rounded-60px flex items-center justify-center`}
                {...props}>{children}</button>
}

export default Index;