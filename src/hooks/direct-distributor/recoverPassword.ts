import { useContext } from "react";
import { RecoverPasswordContext } from "@/context/direct-distributor/recover-password";

export const useRecoverPassword = () => useContext(RecoverPasswordContext);