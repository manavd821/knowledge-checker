"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const makeQueryClient = () => new QueryClient({
    defaultOptions : {
        queries: {
            staleTime: 60 * 1000,
        }
    }
})

let browserClient : QueryClient | undefined;

const getQueryClient = () => {
    if(typeof window === undefined){
        return makeQueryClient();
    }
    if(!browserClient) browserClient =makeQueryClient();
    return browserClient;
}

export function QueryProvider({ children }: {
    children : React.ReactNode,
}){
    const [client] = useState(getQueryClient);
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}