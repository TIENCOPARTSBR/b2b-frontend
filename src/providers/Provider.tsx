"use client";

import React from "react";
import { AuthProviderDealer } from '../context/dealer/auth';
import { MessageSuccessProvider } from "@/src/context/message/success";
import {AuthProviderPartner} from "@/src/context/partner/auth";
import {AuthProviderAdmin} from "@/src/context/adm/auth";
import {MessageErrorProvider} from "@/src/context/message/error";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return  (
        <AuthProviderDealer>
            <AuthProviderPartner>
                <AuthProviderAdmin>
                    <MessageSuccessProvider>
                        <MessageErrorProvider>
                        {children}
                        </MessageErrorProvider>
                    </MessageSuccessProvider>
                </AuthProviderAdmin>
            </AuthProviderPartner>
        </AuthProviderDealer>
    )
};