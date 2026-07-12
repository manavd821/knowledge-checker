
export const OBJECT_STORAGE_PROVIDER = [
    "appwrite",
    "minio",
] as const;

export type ObjectStorageProvider = typeof OBJECT_STORAGE_PROVIDER[number];