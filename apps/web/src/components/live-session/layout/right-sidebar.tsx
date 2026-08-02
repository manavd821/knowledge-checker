import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { CollapsedSidebar } from "./collapsed-sidebar";
import { RightContent } from "@/components/live-session/right-section/right-content";
import { RightHeader } from "../right-section/right-header";

export function RightSidebar(){
    const { state } = useSidebar();
    return (
            <Sidebar
            side="right"
            collapsible="icon"
            >
                {
                    state === "collapsed"
                    ? (
                        <CollapsedSidebar side="right"/>
                    )
                    : (
                        <>
                        <RightHeader
                        side="right"
                        />
                        <RightContent/>
                        </>
                    )
                }
            </Sidebar>
    )
}