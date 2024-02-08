// contants
import { LogoEnco, HomePage, Nav } from "@/src/utils/constants/Dealer/Header/util";
// hook
import { useMessageSuccess } from "@/src/hooks/message/success";
import { useMessageError } from "@/src/hooks/message/error";

// component
import AlertSuccess from "@/src/components/AlertSuccess";
import Header from "@/src/components/Header";
import AlertError from "@/src/components/AlertError";

const Main = ({children}: {
    children: React.ReactNode
}) => {
    const { message : messageSuccess } = useMessageSuccess()
    const { messageError } = useMessageError()

    return (
        <>
            <Header
                list={ Nav() }
                logoEnco={ LogoEnco }
                homepage={ HomePage } />

            { messageSuccess &&
                <AlertSuccess text={ messageSuccess } />
            }

            { messageError &&
                <AlertError text={ messageError } />
            }

            <main className="px-25px md:px-45px h-auto bg-white py-25px md:py-45px mt-96px">
                {children}
            </main>
        </>
    )
}

export default Main;