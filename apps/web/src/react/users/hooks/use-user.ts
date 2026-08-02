import { useContext } from "react";
import { GetUser } from "@/shared/dto/users/get-user.dto";
import { UserContext } from "@/react/users/context/user-provider";

export const useUser = () : GetUser => {
    const user = useContext(UserContext);
    if(!user){
        throw new Error("useUser must be used inside UserProvider");
    }
    return user;
}