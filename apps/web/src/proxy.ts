import { 
    clerkMiddleware,
    createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Logger } from "@/lib/logging/logger";


const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
]);

export default clerkMiddleware(async (auth, req) => {
    const logger = new Logger();
        const { 
            isAuthenticated, 
            redirectToSignIn,
            userId,
        } = await auth();
    
        // if not public route and not authenticated
        if(!isPublicRoute(req) && !isAuthenticated){
            logger.warn("Unauthenticated access attempt");
            return redirectToSignIn();
        }
    
        // if public route and authenticated
        if(isPublicRoute(req) && req.nextUrl.pathname !== '/' && isAuthenticated){
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        const reqHeaders = new Headers(req.headers);
        reqHeaders.set('X-User-ID', userId ?? "");
    
        return NextResponse.next({
            request : {
                headers : reqHeaders,
            }
        });
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}
