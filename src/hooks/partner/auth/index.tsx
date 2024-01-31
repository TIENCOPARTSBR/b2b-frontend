import { useContext } from "react";
import { AuthContext } from "@/src/context/partner/auth";

export const useAuthPartner = (ctx?: any) => useContext(AuthContext);