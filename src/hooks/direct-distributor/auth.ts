import { useContext } from "react";
import { AuthContext } from "@/context/direct-distributor/auth";

export const useAuth = (ctx?: any) => useContext(AuthContext);