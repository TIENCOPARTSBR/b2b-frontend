import { useContext } from "react";
import { MessageErrorContext, MessageErrorContextProps } from "@/src/context/message/error";

export const useMessageError = (): MessageErrorContextProps => {
    const context = useContext(MessageErrorContext);

    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }

    return context;
};