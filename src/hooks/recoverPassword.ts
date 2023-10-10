import { useContext } from "react";
import { RecoverPasswordContext } from "@/context/admin/recover-password";

export const useRecoverPassword = () => useContext(RecoverPasswordContext);