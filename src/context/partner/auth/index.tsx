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
    const { ['partnerAuth.token']: token } = parseCookies();

    useEffect(() => {
        if (token) {
            recoverInformationUser(token);
        }
    }, [token]);  // Alterado para observar apenas mudanças em token

    async function recoverInformationUser(token: any) {
        try {
            const api = getApiPartner(``);
            const response = await api.get('/profile', token);

            setUser({
                id: response?.data?.id,
                id_partner: response?.data?.id_partner,
                name: response?.data?.name,
                email: response?.data?.email,
                type: response?.data?.type,
            });

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
            const api = getApiPartner(``);
            const response = await api.post('/login', data);

            // Set
            setCookie(undefined, 'partnerAuth.token', response?.data?.token, {
                maxAge: 3600,
                path: '/',
            });

            const user = await recoverInformationUser(response?.data?.token);

            if (user?.id_partner != undefined) {
                setCookie(undefined, 'partnerAuth.id_partner', user?.id_partner as string, {
                    maxAge: 3600,
                    path: '/',
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
        destroyCookie(null, 'partnerAuth.token', { expires: expireDate, path: '/' });
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