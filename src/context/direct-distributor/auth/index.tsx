import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import Router from "next/router";
import { getApiDirectDistributor } from "@/api/direct-distributor/axios";

type User = {
    id: string;
    direct_distributor_id: string;
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

export const AuthProviderDirectDistributor: React.FC<RecoverPasswordProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(()  => {
        const { ['directDistributorAuth.token']: token } = parseCookies();
        if (token) {
            recoverInformationUser(token);
        }
    })

    async function recoverInformationUser( token: any ) {
        const api = getApiDirectDistributor(``);
        const response = await api.get('/profile', token);

        setUser({
            id: response?.data?.id,
            direct_distributor_id: response?.data?.direct_distributor_id,
            name: response?.data?.name,
            email: response?.data?.email,
            type: response?.data?.type,
        })
    }

    async function signIn({ email, password }: SignInData) {
        const data = {
            email: email,
            password: password
        }

        try {
            const api = getApiDirectDistributor(``);
            const response = await api.post('/login', data);
            
            // Set
            setCookie(undefined, 'directDistributorAuth.token', response?.data?.token, {
                maxAge: 3600,
                path: '/',
            });
        
            return true;
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        const expireDate = new Date(0); // Define a data de expiração para o Unix epoch (01/01/1970)
        destroyCookie(null, 'directDistributorAuth.token', { expires: expireDate, path: '/' });
        Router.push('/auth/login');
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