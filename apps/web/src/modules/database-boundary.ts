import { DatabaseError } from "@/exceptions/DatabaseError";
import get_logger from "@/lib/logging/logger-factory";

export function DatabaseBoundary(operation: string) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const logger = get_logger();
        const originalMethod = descriptor.value;
        descriptor.value = async function (this: unknown, ...args: any[]) {
        try {
            logger.info(`Executing database operation: ${operation}`, {args});
            return await originalMethod.apply(this, args);
        } catch (error) {
            const serialized =
                    error instanceof Error
                        ? { name: error.name, message: error.message, stack: error.stack }
                        : error;

            throw new DatabaseError(
            `Database operation ${operation} failed.`,
            operation,
            {error : serialized}
            );
        }
        };

    return descriptor;

    }
}