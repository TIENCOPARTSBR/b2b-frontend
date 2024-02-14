import {
    destroyCookie,
    parseCookies,
    setCookie
} from "nookies";
import React, {
    createContext,
    useState,
    ReactNode,
    useEffect
} from "react";
import { useRouter } from "next/navigation";

import { getApiPartner } from "@/src/api/partner/axios";
import {getApiDealer} from "@/src/api/dealer/axios";

type User = {
    id: string;
    id_partner: string;
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

export const AuthProviderPartner: React.FC<RecoverPasswordProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    if (!user) {
        recoverInformationUser();
    }

    async function recoverInformationUser() {
        try {
            if(!user?.id) {
                const api = getApiPartner('');
                const response = await api.post('/user/profile', {});

                if (response?.data?.id) {
                    const userData = {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        type: response.data.type,
                        id_partner: response.data.id_partner,
                    };
                    setUser(userData);
                }
            }
            return user;
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
            const api = getApiPartner(``);
            const response = await api.post('/login', data);

            setCookie(undefined, 'partnerAuth.token', response?.data?.data?.token, {
                maxAge: 3600,
                path: '/',
            });

            if (response?.data?.data?.user) {
                setCookie(undefined, 'partnerAuth.id_partner', response?.data?.data?.user?.id_partner as any, {
                    maxAge: 3600,
                    path: '/',
                })

                setUser({
                    id: response?.data?.data?.user?.id,
                    id_partner: response?.data?.data?.user?.id_partner,
                    name: response?.data?.data?.user?.name,
                    email: response?.data?.data?.user?.email,
                    type: response?.data?.data?.user?.type,
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
        destroyCookie(null, 'partnerAuth.token', { expires: expireDate, path: '/' });
        destroyCookie(null, 'partnerAuth.id_partner', { expires: expireDate, path: '/' });
        router.push('/partner/login');
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