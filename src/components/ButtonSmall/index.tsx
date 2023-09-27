import React from "react";
import { Button } from "./style";

type LinkSmallProps = {
    name: string,
}

const ButtonSmall = ({name}: LinkSmallProps) => {
    return (
        <Button type="submit">{name}</Button>
    )
}

export default ButtonSmall;