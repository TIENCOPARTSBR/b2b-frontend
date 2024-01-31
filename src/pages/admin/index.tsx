import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Main from "@/src/components/Admin/Main";

const DashboardAdmin = () => {
  return (
      <Main>
          <h2 className="font-normal text-black text-14px font-inter">
              - Dashboard to be defined - Admin
          </h2>
      </Main>
  )
}

export default DashboardAdmin;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['adminAuth.token']: token} = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}
