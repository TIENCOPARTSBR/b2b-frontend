import Main from "@/src/components/Dealer/Main";
import Breadcrumb from "@/src/components/Breadcrumb";
import Title from "@/src/components/Title";
import Image from "next/image";
import LinkSmall from "@/src/components/LinkSmall";
import ButtonSmall from "@/src/components/ButtonSmall";
import ModalRetrieveFromQuotation from "@/src/components/Dealer/ModalRetrieveFromQuotation";
import {useState} from "react";

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
                <button onClick={() => HandleModalNewPOFromQuotation()} className="py-12px px-18px bg-grey_seven text-14px text-black font-semibold  font-inter rounded-60px flex items-center justify-center bg-yellow_one" >
                    Retrieve from quotation
                </button>
            </div>

            { modalVisible && <ModalRetrieveFromQuotation handleOnVisible={HandleModalNewPOFromQuotation} /> }
        </Main>
    )
}

export default ChoicePO;