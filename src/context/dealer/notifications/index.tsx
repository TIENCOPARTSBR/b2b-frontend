import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getApiDealer } from '@/src/api/dealer/axios';
import { useAuthDealer } from '@/src/hooks/dealer/auth';

export interface NotificationsContextProps {
    notifications: any[] | null; // Você pode ajustar o tipo de notificações conforme necessário
    setHideNotification: (id: number) => void;
    setHideAllNotification: (id: number|undefined) => void;
}

export const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

interface NotificationsProviderProps {
    children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
    const { user } = useAuthDealer('');
    const [notifications, setNotifications] = useState<any[] | null>(null); // Você pode ajustar o tipo de notificações conforme necessário

    const getNotifications = async () => {
        const api = getApiDealer('');
        const response = await api.post('/notifications/all', {
            id_dealer: user?.dealer_id
        });
        setNotifications(response?.data?.data);
    };

    useEffect(() => {

        if (user?.dealer_id) {
            // Busca inicial de notificações ao montar o componente
            getNotifications();

            // Define o intervalo de busca de notificações a cada 5 segundos
            const intervalId = setInterval(() => {
                getNotifications();
            }, 15000);

            // Limpeza do intervalo ao desmontar o componente
            return () => clearInterval(intervalId);
        }
    }, [user?.dealer_id]); // Certifique-se de incluir user?.dealer_id como dependência do efeito para que ele seja executado quando o ID do revendedor mudar

    const setHideNotification = (id: number) => {
        const api = getApiDealer('');
        const response = api.post('/notifications/viewed', {
            id_dealer: user?.dealer_id,
            id: id
        });
        setTimeout(() => {
            getNotifications();
        }, 450)
    };

    const setHideAllNotification = (id: number|undefined) => {
        const api = getApiDealer('');
        const response = api.post('/notifications/hideAll', {
            id_dealer: user?.dealer_id
        });
        setTimeout(() => {
            getNotifications();
        }, 450)
    };

    return (
        <NotificationsContext.Provider value={{ notifications, setHideNotification, setHideAllNotification }}>
            {children}
        </NotificationsContext.Provider>
    );
};