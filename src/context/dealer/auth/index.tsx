import { destroyCookie, setCookie } from "nookies";
import React, { createContext, useState, ReactNode } from "react";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    dealer_id: number|undefined;
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

    if (!user) {
        recoverInformationUser().then();
    }

    async function recoverInformationUser() {
        try {
            if(user?.id) {
                const api = getApiDealer('');
                const response = await api.post('/user/profile', {});

                if (response?.data?.id) {
                    const userData = {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        type: response.data.type,
                        dealer_id: response.data.id_dealer,
                    };
                    setUser(userData);
                }
            }
        } catch (error) {
            //console.error("Erro ao recuperar informações do usuário:", error);
        }
    }

    async function signIn({ email, password }: SignInData) {
        const data = {
            email: email,
            password: password
        }

        try {
            const api = getApiDealer(``);
            const response = await api.post('/login', data);

            setCookie(undefined, 'dealerAuth.token', response?.data?.data?.token, {
                maxAge: 3600,
                path: '/',
            });

            if (response?.data?.data?.user) {
                setCookie(undefined, 'dealerAuth.id_dealer', response?.data?.data?.user?.id_dealer as any, {
                    maxAge: 3600,
                    path: '/',
                });

                setUser({
                    id: response?.data?.data?.user?.id,
                    dealer_id: response?.data?.data?.user?.id_dealer,
                    name: response?.data?.data?.user?.name,
                    email: response?.data?.data?.user?.email,
                    type: response?.data?.data?.user?.type,
                });

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