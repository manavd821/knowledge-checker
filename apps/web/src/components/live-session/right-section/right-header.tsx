import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function RightHeader({side = "left"} : {
    side: "left" | "right",
}){
    return (
        <SidebarHeader>
            <SidebarTrigger
            icon={side === "right" ? ChevronRight : ChevronLeft}
            />
        </SidebarHeader>
    )
}