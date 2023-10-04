"use client";

import React from "react";
import { RecoverPasswordProvider } from "@/context/RecoverPasswordContext";
import { AuthProvider } from "@/context/admin/auth";
import { AuthProviderDirectDistributor } from "@/context/direct-distributor/auth";
import { RecoverPasswordDirectDistributorProvider } from "@/context/direct-distributor/recover-password";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return  (
        <AuthProvider>
            <AuthProviderDirectDistributor>
                <RecoverPasswordDirectDistributorProvider>
                    <RecoverPasswordProvider>
                        {children}
                    </RecoverPasswordProvider>
                </RecoverPasswordDirectDistributorProvider>
            </AuthProviderDirectDistributor>
        </AuthProvider>
    )
};