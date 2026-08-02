import { z } from "zod";

export const ConnectionStateSchema = z.object({
    session_id: z.string(),
    participant_id: z.string().nullable(),
    connection_id: z.string().nullable(),
    token: z.string().nullable(),
    room_name: z.string().nullable(),
    ws_url: z.string().nullable(),
})

