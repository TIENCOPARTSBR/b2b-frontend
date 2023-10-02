import { SUCCESS, H2, P, Image } from "./style";

type SuccessProps = {
    success: string;
}

const Success = ({success}: SuccessProps) => {
    return (
        <SUCCESS>
            <Image
                src="/icons/alert-success.svg"
                width="21"
                height="21"
                alt="icon success"
            />
            <div>
                <H2>Success</H2>
                <P>{success}</P>
            </div>
        </SUCCESS>
    )
}

export default Success;