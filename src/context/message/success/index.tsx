// contexts/MessageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MessageSuccessContextProps {
    message: string | null;
    showMessage: (message: string) => void;
}

export const MessageSuccessContext = createContext<MessageSuccessContextProps | undefined>(undefined);

interface MessageProviderProps {
    children: ReactNode;
}

export const MessageSuccessProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage(null);
        }, 3500);

        return () => clearTimeout(timeout);
    }, [message]);

    const showMessage = (message: string) => {
        setMessage(message);
    };

    return (

        <MessageSuccessContext.Provider value={{ message, showMessage }}>
            {children}
        </MessageSuccessContext.Provider>
    );
};