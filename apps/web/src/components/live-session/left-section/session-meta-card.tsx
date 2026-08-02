import { cn } from "@/lib/utils";

export function SessionMetaCard({
    title,
    label,
} : {
    title: string,
    label: string,
}){
    return (
        <div
        className={cn(
            "border p-2 rounded-xl flex-1",
        )}
        >
            <p
            className="text-xs text-muted-foreground"
            >{title.toUpperCase()}</p>
            <p
            className="text-sm"
            >{label}</p>
        </div>
    )
}