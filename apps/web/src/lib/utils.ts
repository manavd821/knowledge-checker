import { AVATAR_STYLES } from "@/shared/enums";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function check_session_id_is_uuid(session_id: string) : boolean{
    return z.uuid().safeParse(session_id).success;
}
export function getAvatarColor(name: string){
    let hash = 0;

    for(let c of name){
      hash = c.charCodeAt(0) + ((hash << 5) - hash);
    }

    return AVATAR_STYLES[Math.abs(hash) % AVATAR_STYLES.length];
}
export function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word[0]?.toUpperCase())
        .join("");
}