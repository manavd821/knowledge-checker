import { validateEnv } from "@/config/env";
import { Logger } from "@/lib/logging/logger";

const logger = new Logger();
export function register() {
    logger.info("Initializing the application...");
    validateEnv();
}
