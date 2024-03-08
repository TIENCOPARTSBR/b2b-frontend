import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Main from "@/src/components/Dealer/Main";

const Home = () => {
  return (
      <Main>
          <h2 className="font-normal text-black text-13px font-inter">
              - Dashboard to be defined -
          </h2>
      </Main>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['dealerAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}
