import { env } from "@/config/env";
import { IObjectStorage } from "@/storage/object-storage";
import { 
    Storage,
    ID,
} from "node-appwrite";
import { StoredObject } from "@/storage/types/stored-object";
import { FileType } from "@/modules";

export class AppWrite implements IObjectStorage{
    bucket_id: string;

    constructor(private readonly storage: Storage){
        this.bucket_id = env.APPWRITE_BUCKET_ID;
    }

    async store(file: File) : Promise<StoredObject>{
        const stored = await this.storage.createFile({
            bucketId: this.bucket_id,
            fileId: ID.unique(),
            file,
            permissions: [],
        })
        return {
            key: stored.$id,
            size: stored.sizeOriginal,
            contentType: stored.mimeType as FileType,
            name: stored.name,
        }
    }
    async get(key: string) : Promise<ArrayBuffer>{
        const buffer =  await this.storage.getFileDownload({
            bucketId: this.bucket_id,
            fileId: key
        })
        return buffer;
    }
    async delete(key: string): Promise<void>{
        await this.storage.deleteFile({
            bucketId: this.bucket_id,
            fileId: key,
        })
    }
}