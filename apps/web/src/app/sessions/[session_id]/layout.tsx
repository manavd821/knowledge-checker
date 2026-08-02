import { check_session_id_is_uuid } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ClientSessionLayout } from "./client-layout";
import { ManagerProvider } from "@/react/live-session/context/interview-session-provider";

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
          <ClientSessionLayout session_id={session_id}>
              {children}
          </ClientSessionLayout>
      </ManagerProvider>
      )
}