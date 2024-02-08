import React, {
    createContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

export interface MessageErrorContextProps {
    messageError: string | null;
    setMessageError: (message: string) => void;
}

export const MessageErrorContext = createContext<MessageErrorContextProps | undefined>(undefined);

interface MessageProviderProps {
    children: ReactNode;
}

export const MessageErrorProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [messageError, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage(null);
        }, 10000);

        return () => clearTimeout(timeout);
    }, [messageError]);

    const setMessageError = (messageError: string) => {
        setMessage(messageError);
    };

    return (

        <MessageErrorContext.Provider value={{ messageError, setMessageError }}>
            {children}
        </MessageErrorContext.Provider>
    );
};