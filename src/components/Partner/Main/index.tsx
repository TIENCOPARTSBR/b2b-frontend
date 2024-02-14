import Header from "@/src/components/Partner/Header";

import AlertSuccess from "@/src/components/AlertSuccess";

import { Nav, HomePage, LogoEnco  } from "@/src/utils/constants/Partner/Header/util";
import { useMessageSuccess } from "@/src/hooks/message/success";
import {useMessageError} from "@/src/hooks/message/error";
import AlertError from "@/src/components/AlertError";
const Main = ({children}: {
    children: React.ReactNode
}) => {
    const { message : messageSuccess} = useMessageSuccess()
    const { messageError} = useMessageError()

    return (
        <>
            <Header list={Nav()} logoEnco={LogoEnco} homepage={HomePage} />

            { messageSuccess && <AlertSuccess text={ messageSuccess } /> }
            { messageError && <AlertError text={ messageError } /> }

            <main className="px-25px md:px-45px h-auto bg-white py-25px md:py-45px">
                {children}
            </main>
        </>
    )
}

export default Main;