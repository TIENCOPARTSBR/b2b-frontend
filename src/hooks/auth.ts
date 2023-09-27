import { useContext } from "react";
import { AuthContext } from "@/context/admin/auth/index";

export const useAuth = (ctx?: any) => useContext(AuthContext);