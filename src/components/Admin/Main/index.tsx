import Header from "@/src/components/Admin/Header";

import AlertSuccess from "@/src/components/AlertSuccess";

import { Nav, HomePage, LogoEnco  } from "@/src/utils/constants/Admin/Header/util";
import { useMessageSuccess } from "@/src/hooks/message/success";
const Main = ({children}: {
    children: React.ReactNode
}) => {
    const { message : messageSuccess} = useMessageSuccess()

    return (
        <>
            <Header list={Nav()} logoEnco={LogoEnco} homepage={HomePage} />

            { messageSuccess && <AlertSuccess text={ messageSuccess } /> }

            <main className="px-25px md:px-45px h-auto bg-white py-25px md:py-45px">
                {children}
            </main>
        </>
    )
}

export default Main;