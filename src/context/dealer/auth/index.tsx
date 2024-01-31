import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    dealer_id: string;
    name: string;
    email: string;
    type: string;
}

type AuthContextType = {
    user: User | null;
    signIn: (data: SignInData) => Promise<boolean>
    logout: () => void
}

type SignInData = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType);

interface RecoverPasswordProviderProps {
    children: ReactNode;
}

export const AuthProviderDealer: React.FC<RecoverPasswordProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const { ['dealerAuth.token']: token } = parseCookies();

    useEffect(() => {
        if (token) {
            recoverInformationUser(token);
        }
    }, [token]);  // Alterado para observar apenas mudanças em token

    async function recoverInformationUser(token: any) {
        try {
            return user;
        } catch (error) {
            console.error("Erro ao recuperar informações do usuário:", error);
        }
    }

    async function signIn({ email, password }: SignInData) {
        const data = {
            email: email,
            password: password
        }

        try {
            const api = getApiDealer(``);
            const response = await api.post('login', data);

            setCookie(undefined, 'dealerAuth.token', response?.data?.token, {
                maxAge: 3600,
                path: '/',
            });

            if (response?.data?.user) {
                setCookie(undefined, 'dealerAuth.id_dealer', response?.data?.user?.id_dealer as any, {
                    maxAge: 3600,
                    path: '/',
                })
                
                setUser({
                    id: response?.data?.user?.id,
                    dealer_id: response?.data?.user?.id_dealer,
                    name: response?.data?.user?.name,
                    email: response?.data?.user?.email,
                    type: response?.data?.user?.type,
                })

                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        const expireDate = new Date(0); // Define a data de expiração para o Unix epoch (01/01/1970)
        destroyCookie(null, 'dealerAuth.token', { expires: expireDate, path: '/' });
        destroyCookie(null, 'dealerAuth.id_dealer', { expires: expireDate, path: '/' });
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}