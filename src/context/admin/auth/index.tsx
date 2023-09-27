import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getApiClient } from "@/api/axios";
import Router from "next/router";

type User = {
    name: string;
    email: string;
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

export const AuthProvider: React.FC<RecoverPasswordProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const { ['adminAuth.token']: token } = parseCookies()
    
        if (token) {
            user: {
                name: 'Daniel';
                email: 'Daniel@encoparts.com';
            }
        }
    }, [])
    
    async function signIn({ email, password }: SignInData) {
        const data = {
            email: email,
            password: password
        }

        try {
            const api = getApiClient(``);
            const response = await api.post('/admin/login', data);
            
            const token = response?.data?.token;
        
            // Set
            setCookie(undefined, 'adminAuth.token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        
            return true;
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        const expireDate = new Date(0); // Define a data de expiração para o Unix epoch (01/01/1970)
        destroyCookie(null, 'adminAuth.token', { expires: expireDate, path: '/' });
        Router.push('/admin/auth/login');
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