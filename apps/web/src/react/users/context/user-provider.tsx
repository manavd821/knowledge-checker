"use client";
import { GetUser } from "@/shared/dto/users/get-user.dto";
import { createContext, ReactNode } from "react";


export const UserContext = createContext<GetUser | null>(null);

export const UserProvider = ({
    user,
    children,
} : {
    user: GetUser | null,
    children: ReactNode,
}) => {
    return (
        <UserContext value={user}>
            {children}
        </UserContext>
    )
}