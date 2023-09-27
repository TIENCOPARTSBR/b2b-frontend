import { useContext } from "react";
import { RecoverPasswordContext } from "@/context/RecoverPasswordContext";

export const useRecoverPassword = () => useContext(RecoverPasswordContext);