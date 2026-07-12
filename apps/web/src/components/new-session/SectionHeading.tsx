import React from "react"
import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
    children : React.ReactNode;
    optional? : boolean;
}
export function SectionHeading( {children, optional}: SectionHeadingProps ){
    return (
        <div
        className="flex justify-between items-center"
        >
            <p className="text-base font-medium tracking-tight">
                { children }
            </p>
            {optional && <Badge>optional</Badge>}
        </div>
    )
}