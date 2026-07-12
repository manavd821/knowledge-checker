

export function ReviewDetailRow({
    label,
    value,
} : {
    label? : string;
    value? : string;
}){
    return (
        <div
        className="flex items-center justify-between py-4"
        >
            <span
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >{label}</span>
            <span
            className="text-sm font-medium"
            >{value}</span>
        </div>
    );
}