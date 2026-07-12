import { FileType } from "@/modules";

export type StoredObject = {
    key: string;
    size: number;
    contentType : FileType;
    name : string;
};
