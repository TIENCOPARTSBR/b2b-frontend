"use client";

import React from "react";
import { RecoverPasswordProvider } from "@/context/RecoverPasswordContext";
import { AuthProvider } from "@/context/admin/auth";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider><RecoverPasswordProvider>{children}</RecoverPasswordProvider></AuthProvider>
};