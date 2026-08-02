import { ObjectStorageProvider } from "@/storage/types/provider";
import { AppWriteStorage } from "./appwrite/appwrite";
import { storage } from "./appwrite/client";

export function get_object_storage(type : ObjectStorageProvider){
    switch(type){
        case "appwrite":
            return new AppWriteStorage(storage);
    }
    throw Error(`invalid object storage provider: ${type}`);
}