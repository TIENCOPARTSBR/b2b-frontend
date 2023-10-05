// assets
import {
    GroupForm,
    Row,
    CardProduct,
    PartNumber,
    List,
    Item,
    Flag,
    Warning,
    Icon
} from '../../Styles/DirectDistributor/Product/style'

// components
import Header from "@/components/DirectDistributor/Header";
import Main from "@/components/Main";
import Title from "@/components/Title";
import HeaderMobile from "@/components/DirectDistributor/HeaderMobile";
import Input from "@/components/Input";
import ButtonSmall from '@/components/ButtonSmall';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from "nookies"

const Product = () => {
    const [card, setCard] = useState<boolean>(false)
    const [pn, setPn] = useState<string>(``)

    useEffect(() => {
        if (pn?.length > 4) {
            setCard(true);
        } else {
            setCard(false);
        }
    }, [pn])

    return (
        <>
            <Header/> {/* desktop */}
            <HeaderMobile/> {/* mobile */}
            <Main>
                <Title>Search product</Title>
                <GroupForm>
                    <Input placeholder="Enter part number" onChange={(e) => setPn(e.target.value)}/>
                </GroupForm>

                {card && (
                    <Row>
                        <CardProduct>
                            <PartNumber>1u3252 - TIP</PartNumber>

                            <List>
                                <Item><strong>Price:</strong> 22.50</Item>
                                <Item><strong>Weight:</strong> 2.81 kg</Item>
                                <Item><strong>NCM:</strong> 84314929</Item>
                                <Item><strong>HS Code:</strong> 8431491990</Item>
                                <Item><strong>General notes:</strong></Item>
                                <Item>
                                    <strong>Place of supply:</strong>
                                    <Flag 
                                        src="/icons/eua.svg"
                                        width="20"
                                        height="20"
                                        alt="Flag eua"
                                    />
                                </Item>
                                <Item className="space-in-left"><strong>Quantity in stock:</strong> 0</Item>
                                <Item className="space-in-left"><strong>Lead time:</strong> 90</Item>
                            </List>

                            <ButtonSmall name="View image"/>
                        </CardProduct>

                        <CardProduct className="warning">
                            <PartNumber>1u3252 - TIP</PartNumber>

                            <List>
                                <Item><strong>Price:</strong> 22.50</Item>
                                <Item><strong>Weight:</strong> 2.81 kg</Item>
                                <Item><strong>NCM:</strong> 84314929</Item>
                                <Item><strong>HS Code:</strong> 8431491990</Item>
                                <Item><strong>General notes:</strong></Item>
                                <Item>
                                    <strong>Place of supply:</strong>
                                    <Flag 
                                        src="/icons/eua.svg"
                                        width="20"
                                        height="20"
                                        alt="Flag eua"
                                    />
                                </Item>
                                <Item className="space-in-left"><strong>Quantity in stock:</strong> 0</Item>
                                <Item className="space-in-left"><strong>Lead time:</strong> 90</Item>
                            </List>

                            <ButtonSmall name="View image"/>

                            <Warning>
                                <Icon 
                                    src="/icons/warning-outline.svg"
                                    width="20"
                                    height="20"
                                    alt="Flag eua"
                                />
                                Contact the dealer
                            </Warning>
                        </CardProduct>
                    </Row>
                )}
            </Main>
        </>
    )
}

export default Product;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'directDistributorAuth.token': token } = parseCookies(ctx)
    
    if (!token) { // If the token does not exist, redirect the client to the login page
        return {
           redirect: {
              destination: "/auth/login",
              permanent: false,
           }
        }
     }

    return {
        props: {}
    }
}