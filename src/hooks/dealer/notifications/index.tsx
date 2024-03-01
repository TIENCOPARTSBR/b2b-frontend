import { useContext } from "react";
import { NotificationsContext, NotificationsContextProps } from "@/src/context/dealer/notifications";

export const useNotifications = (): NotificationsContextProps => {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }

    return context;
};