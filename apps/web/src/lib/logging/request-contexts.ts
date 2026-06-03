import { AsyncLocalStorage } from "node:async_hooks";

type RequestContext = {
    req_id: string;
    user_id?: string;

    route: string;
    method: string;
}

export const request_context = new AsyncLocalStorage<RequestContext>();

export const getRequestContext = () => request_context.getStore();