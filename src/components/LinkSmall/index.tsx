import React from "react";
import { Button } from "./style";

type LinkSmallProps = {
    name: string,
    link: string
}

const LinkSmall = ({name, link}: LinkSmallProps) => {
    return (
        <Button href={link}>{name}</Button>
    )
}

export default LinkSmall;