import { useContext } from "react";
import { MessageSuccessContext, MessageSuccessContextProps } from "@/src/context/message/success";

export const useMessageSuccess = (): MessageSuccessContextProps => {
    const context = useContext(MessageSuccessContext);

    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }

    return context;
};