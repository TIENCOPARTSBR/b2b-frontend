import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import MainDirectDistributor from "@/src/components/Main";

const Home = () => {
  return (
      <MainDirectDistributor>
          <h2 className="font-normal text-black text-14px font-inter">
              - Dashboard to be defined -
          </h2>
      </MainDirectDistributor>
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
