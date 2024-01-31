import { useContext } from "react";
import { AuthContext } from "@/src/context/dealer/auth";

export const useAuthDealer = (ctx?: any) => useContext(AuthContext);