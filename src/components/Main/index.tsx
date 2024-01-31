import Header from "@/src/components/Header";

import AlertSuccess from "@/src/components/AlertSuccess";

import { LogoEnco, HomePage, Nav } from "@/src/utils/constants/Dealer/Header/util";
import { useMessageSuccess } from "@/src/hooks/message/success";

const MainDirectDistributor = ({children}: {
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

export default MainDirectDistributor;