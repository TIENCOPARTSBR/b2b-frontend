"use client";

import React from "react";
import { AuthProviderDealer } from '../context/dealer/auth';
import { MessageSuccessProvider } from "@/src/context/message/success";
import { AuthProviderPartner } from "@/src/context/partner/auth";
import { AuthProviderAdmin } from "@/src/context/adm/auth";
import { MessageErrorProvider } from "@/src/context/message/error";
import { NotificationsProvider } from "@/src/context/dealer/notifications";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return  (
        <AuthProviderDealer>
            <AuthProviderPartner>
                <AuthProviderAdmin>
                    <MessageSuccessProvider>
                        <NotificationsProvider>
                            <MessageErrorProvider>
                            {children}
                            </MessageErrorProvider>
                        </NotificationsProvider>
                    </MessageSuccessProvider>
                </AuthProviderAdmin>
            </AuthProviderPartner>
        </AuthProviderDealer>
    )
};