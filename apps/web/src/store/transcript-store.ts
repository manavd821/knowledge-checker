import { ObservableStore } from "@/store/observable-store";
import { TranscriptEntry } from "@/store/types";

export class TranscriptStore extends ObservableStore<TranscriptEntry[]>{
    
    constructor() {
        super([], "transcript");
    }
    append(entry: TranscriptEntry) : void {
        this.set((prev) => [...prev, entry]);
    }
}