// assets
import { Main } from "./style";
import { GetServerSideProps } from 'next';
import { parseCookies } from "nookies";

// components
import Header from "@/components/DirectDistributor/Header";
import HeaderMobile from "@/components/DirectDistributor/HeaderMobile";
import Title from "@/components/Title";

const Constructions = () => {
    return (
        <>
            <Header/>
            <HeaderMobile/>
            <Main>
                <Title>Distributor module</Title>
            </Main>
        </>
    )   
}

export default Constructions;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['directDistributorAuth.token']: token } = parseCookies(ctx);

    if(!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            }
        }
    }

    return {
        props: {
            data: {}
        }
    }
}