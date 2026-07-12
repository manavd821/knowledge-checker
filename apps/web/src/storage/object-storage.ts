import { StoredObject } from "@/storage/types/stored-object";

export interface IObjectStorage{
    store(file: File) : Promise<StoredObject>;
    get(key: string) : Promise<ArrayBuffer>;
    delete(key: string): void;
}