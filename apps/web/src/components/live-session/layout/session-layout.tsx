"use client";
import { LeftSidebar } from "@/components/live-session/layout/left-sidebar";
import { RightSidebar } from "@/components/live-session/layout/right-sidebar";
import { WorkSpace } from "@/components/live-session/layout/workspace";
import { SidebarProvider } from "@/components/ui/sidebar";

export function SessionLayout() {

    return (
        <div
        className="flex h-screen"
        >
            <SidebarProvider defaultOpen>
                <LeftSidebar/>
            </SidebarProvider>
            <main
            className="flex-1 min-h-0"
            >
                <WorkSpace/>
            </main>

            <SidebarProvider defaultOpen>
                <RightSidebar/>
            </SidebarProvider>
        </div>
    )
}