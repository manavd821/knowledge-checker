import {  StoreType } from "@/store/types";

export class ObservableStore<T = unknown>{
    private listeners = new Set<() => void>();

    constructor(
        private state: T,
        readonly type: StoreType,
    ) {}

    getSnapShot = () : T => this.state;

    set(update: T | ((prev: T) => T)) : void{
        this.state = typeof update === "function" 
                    ? (update as (prev: T) => T)(this.state)
                    : update;
        this.notify();
    }
    notify(): void{
        this.listeners.forEach(listener => listener());
    }
    subscribe(listener: () => void) : (() => void) {
        this.listeners.add(listener);

        return () => this.listeners.delete(listener);
    }
}