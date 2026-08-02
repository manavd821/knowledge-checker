"use client";
import { 
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarTrigger,
    useSidebar, 
} from "@/components/ui/sidebar";
import { CollapsedSidebar } from "@/components/live-session//layout/collapsed-sidebar";
import { cn } from "@/lib/utils";
import { LeftContent } from "@/components/live-session/left-section/left-content";
import { LeftHeader } from "@/components/live-session/left-section/left-header";

export function LeftSidebar(){
    const { state }  = useSidebar();
    return (
        <Sidebar
        side="left"
        collapsible="icon"
        variant="sidebar"
        className={
            cn()
        }
        >
            {
                state === "collapsed"
                ? (
                    <CollapsedSidebar
                        side="left"
                        />
                )
                : (
                    <>
                        <LeftHeader/>
                        <LeftContent/>
                    </>

                )
            }
            
        </Sidebar>
    )
}