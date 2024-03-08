import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import ModalRetrieveFromQuotation from "@/src/components/Dealer/ModalRetrieveFromQuotation";

const ChoicePO = () => {
    const breadcrumb: [{ name: string; link: string }, { name: string; link: string }, {
        name: string;
        link: string
    }] = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Orders",
            link: "/sales-order",
        },
        {
            name: "Place P.O.",
            link: "/sales-order/choice",
        },
    ]

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const HandleModalNewPOFromQuotation = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <Main>
            <Breadcrumb
                list={breadcrumb}/>
            <Title
                title="Place a Purchase Order"/>

            <div className="flex p-35px mt-35px rounded-8px border-1 border-grey_six mb-35px">
                <button onClick={() => HandleModalNewPOFromQuotation()} className="py-12px px-18px bg-grey_seven text-13px text-black font-semibold  font-inter rounded-60px flex items-center justify-center bg-yellow_one shadow-shadow_btn_small mr-5">
                    Retrieve from quotation
                </button>

                <a href="/sales-order/new" className="py-12px px-18px bg-grey_seven text-13px text-black font-semibold  font-inter rounded-60px flex items-center justify-center bg-yellow_one shadow-shadow_btn_small">
                    Place a new P.O.
                </a>
            </div>

            {modalVisible && <ModalRetrieveFromQuotation handleOnVisible={HandleModalNewPOFromQuotation}/>}
        </Main>
    )
}

export default ChoicePO;

export const getServerSidePros: GetServerSideProps = async (ctx) => {
    const { ["dealerAuth.token"] : token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}