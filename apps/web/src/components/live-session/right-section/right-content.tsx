import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/ui/sidebar";
import { useLiveSessionInfo } from "@/react/live-session/hooks/use-live-session-info";
import { useSessionID } from "@/react/live-session/hooks/use-session-id";
import { useSessionManager } from "@/react/live-session/hooks/use-session-manager";
import { useRouter } from "next/navigation";

export function RightContent(){
    const manager = useSessionManager();
    const session_id = useSessionID();
    const {
        status
    } = useLiveSessionInfo();
    const router = useRouter();
    const handlePause = async () => {
        try {
            await manager.pause(session_id);
            router.replace('/dashboard');
        } catch (error) {
            console.error("Failed to pause session:", error);
        }
    }
    return (
        <SidebarContent>
            <Button
            onClick={handlePause}
            disabled={status !== "active"}
            >Pause</Button>
            
            <div>Sidebar header</div>
            <div>Sidebar content</div>
        </SidebarContent>
    )
}