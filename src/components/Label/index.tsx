'use client';
import React from "react";

const Index = ({
   children,
}: {
    children: React.ReactNode
})  => {
    return <label className="text-13px font-normal text-black font-inter mb-3 block">{children}</label>
}

export default Index;