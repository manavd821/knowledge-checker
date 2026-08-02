import { Input } from "@/components/ui/input";
import { UploadIcon } from "lucide-react";
import React, { useId } from "react";
import { UploadedDocumentItem } from "@/components/new-session/DocumentUpload/UploadedDocumentItem";
import { useAdditionalContext } from "@/react/session-form/hooks/use-additional-context";

export function DocumentUploadSection(){
    const fileId = useId();
    const {
        sessionDocuments,
        addSessionDocument,
    } = useAdditionalContext();
    
    const handleFileSelect = (file_list : FileList | null) => {        
        const selectedFiles = Array.from(file_list ?? []);

        selectedFiles.forEach(file => addSessionDocument(file));
    }
    const handleDragOver = (e : React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    }
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files)
    }
    return (
        <>
            <div
            className=""
            >   
                <Input
                type="file"
                onChange={e => handleFileSelect(e.target.files)}
                id={fileId}
                className="hidden"
                /> 
                <label
                    htmlFor={fileId}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted"
                >
                    <UploadIcon className="mb-2 h-6 w-6" />
                    <p className="font-medium">Upload documents</p>
                    <p className="text-sm text-muted-foreground">
                        Drag & drop or click to browse
                    </p>
                </label>
                {
                    sessionDocuments.length === 0
                    ? (
                        <p
                        className="text-muted-foreground"
                        >No files selected
                        </p>
                    )
                    : (
                        <div
                        className="flex flex-col gap-2 items-start justify-center w-full mt-2"
                        >
                            <p>{sessionDocuments.length} file{sessionDocuments.length !== 1 ? "s" : ""} attached</p>
                            {
                                sessionDocuments.map((file, idx) => (
                                    <UploadedDocumentItem
                                    file={file}
                                    key={`${file.name}-${idx}`}
                                    index={idx}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}