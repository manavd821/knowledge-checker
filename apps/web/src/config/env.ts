import { z } from 'zod';
import { Logger } from '@/lib/logging/logger';


const logger = new Logger();
const envSchema = z.object({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY : z.string().min(1),
    CLERK_SECRET_KEY : z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL : z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL :  z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL :  z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL :  z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET :  z.string().min(1),

    DATABASE_URL :  z.url().nonempty(),
    
    NEXT_PUBLIC_LIVEKIT_URL: z.url().nonempty(),
    LIVEKIT_URL: z.url().nonempty(),
    LIVEKIT_API_KEY: z.string().nonempty(),
    LIVEKIT_API_SECRET: z.string().nonempty(),

    LOG_LEVEL : z.string().min(1).nonempty(),
});

let env = envSchema.parse(process.env);

export const validateEnv = () => {
    logger.info("verifying env variables...");

    const result = envSchema.safeParse(process.env);
    
    if(!result.success){
        logger.error("❌ Environment validation failed", result.error.issues);
        throw new Error("Environment validation failed");
    }
    logger.info("env variables succesfully loaded.");
    env = result.data;
}

export { env };
