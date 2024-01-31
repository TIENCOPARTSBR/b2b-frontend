import { useContext } from "react";
import { AuthContext } from "@/src/context/adm/auth";
export const useAuthAdmin = (ctx?: any) => useContext(AuthContext);