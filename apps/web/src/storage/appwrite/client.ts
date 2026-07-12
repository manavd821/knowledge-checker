import { env } from "@/config/env";
import { 
    Client,
    Storage,
} from "node-appwrite";

export const client = new Client()
    .setEndpoint(env.APPWRITE_API_ENDPOINT)
    .setKey(env.APPWRITE_API_SECRET)
    .setProject(env.APPWRITE_PROJECT_ID)
    ;

export const storage = new Storage(client);