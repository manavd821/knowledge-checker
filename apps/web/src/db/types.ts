import { db } from "@/db/client";

type Transaction = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];

export type DB = typeof db | Transaction;

export type Weak_Area = {
    topic : string
    score : number
    severity : "low" | "medium" | "high"
    evidence : string
}
export type Strong_Area = {
    topic : string
    score : number
    evidence : string
}
export type Recommendation = {
    topic : string
    priority : "low" | "medium" | "high"
    reason : string
    action_items : Array<string>
}