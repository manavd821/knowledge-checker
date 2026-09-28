import { check_session_id_is_uuid } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ManagerProvider } from "@/react/live-session/context/interview-session-provider";
import { SessionTimerProvider } from "@/react/live-session/context/session-timer-provider";

export default async function SessionLayout({
  params,
  children,
}: {
  params : Promise<{ session_id : string }>,
  children: React.ReactNode
}) {
    const { session_id } = await params;
    if(!check_session_id_is_uuid(session_id)){
        console.error(`session_id:${session_id} must be uuid`);
        notFound();
    }

    return (
      <ManagerProvider session_id={session_id}>
          <SessionTimerProvider>
              {children}
          </SessionTimerProvider>
      </ManagerProvider>
      )
}