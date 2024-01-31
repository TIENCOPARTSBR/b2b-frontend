// contants
import { LogoEnco, HomePage, Nav } from "@/src/utils/constants/Dealer/Header/util";
// hook
import { useMessageSuccess } from "@/src/hooks/message/success";
// component
import AlertSuccess from "@/src/components/AlertSuccess";
import Header from "@/src/components/Header";

const Main = ({children}: {
    children: React.ReactNode
}) => {
    const { message : messageSuccess } = useMessageSuccess()

    return (
        <>
            <Header
                list={ Nav() }
                logoEnco={ LogoEnco }
                homepage={ HomePage } />

            { messageSuccess &&
                <AlertSuccess text={ messageSuccess } />
            }

            <main className="px-25px md:px-45px h-auto bg-white py-25px md:py-45px mt-96px">
                {children}
            </main>
        </>
    )
}

export default Main;