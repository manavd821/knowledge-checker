import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest, NextResponse } from "next/server";
import { 
    CreateSessionSchema,
} from "@/modules";
import get_logger from "@/lib/logging/logger-factory";
import { ValidationError } from "@/exceptions/ValidationError";
import { createServices } from "@/modules/factory";
import { db } from "@/db/client";

const logger = get_logger();

export const POST = withRequestContextAndErrorHandling(async (req : NextRequest) => {
    const user_id = req.headers.get("X-User-ID")!;
    
    const formData = await req.formData();
    const data : Record<string , FormDataEntryValue | FormDataEntryValue[]> = {};
    for(const key of new Set(formData.keys())){
        const val = formData.getAll(key);
        if(key === "session_documents"){
            data[key] = val;
        }
        else{
            data[key] = val.length === 1 ? val[0] : val;
        }
    }
    
    const result = CreateSessionSchema.safeParse(data);

    if(!result.success){
        logger.warn(
            "Session creation request validation failed",
            result.error.issues,
        );
        throw new ValidationError(
            "request payload Validation failed",
            result.error.issues,
            422,
        );
    }
    let session_id;
    db.transaction(async tx => {
        const session_service = createServices(tx).sessions;
        session_id = await session_service.createSession(
            user_id, 
            result.data
        );
    });
    
    return NextResponse.json(
        {
        success: true,
        data : {
            session_id,
            status : "ready",
        }
    }, 
    {
        status : 201,
    })
})