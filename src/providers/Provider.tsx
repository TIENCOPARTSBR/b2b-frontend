"use client";

import React from "react";
import { AuthProviderDealer } from '../context/dealer/auth';
import { MessageSuccessProvider } from "@/src/context/message/success";
import {AuthProviderPartner} from "@/src/context/partner/auth";
import {AuthProviderAdmin} from "@/src/context/adm/auth";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return  (
        <AuthProviderDealer>
            <AuthProviderPartner>
                <AuthProviderAdmin>
                    <MessageSuccessProvider>
                        {children}
                    </MessageSuccessProvider>
                </AuthProviderAdmin>
            </AuthProviderPartner>
        </AuthProviderDealer>
    )
};