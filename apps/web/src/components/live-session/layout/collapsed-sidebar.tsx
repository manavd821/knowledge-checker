
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { 
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';

export function CollapsedSidebar({
    side = "left"
} : {
    side? : "left" | "right",
}) {
    const { toggleSidebar } = useSidebar();
    return (
        <div
        className="flex h-full items-center justify-center hover:bg-muted"
        onClick={toggleSidebar}
        >
            <SidebarTrigger
            icon={side === "left" ? ChevronRight : ChevronLeft}
            />
        </div>
    )
}