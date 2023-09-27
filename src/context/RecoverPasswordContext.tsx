import React, { createContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

// Defina o tipo de contexto
interface ContextProps {
    userId: string;
    setUserId: (userId: string) => void;
  }

// Crie o contexto com um valor inicial
export const RecoverPasswordContext = createContext<ContextProps>({
  userId: '',
  setUserId: () => ''
});

// Crie um provedor de contexto que fornece os valores do contexto
interface RecoverPasswordProviderProps {
  children: ReactNode;
}

export const RecoverPasswordProvider: React.FC<RecoverPasswordProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState('');

    return (
        <RecoverPasswordContext.Provider 
            value={{
                userId, 
                setUserId
            }}>
            {children}
        </RecoverPasswordContext.Provider>
    )
}