import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    type SessionDocumentsField, 
    FormFieldProps,
    MIME_TO_FILE_TYPE,
} from "@/modules";
import { UploadIcon } from "lucide-react";
import React, { useId, useState } from "react";
import { UploadedDocumentItem } from "@/components/new-session/DocumentUpload/UploadedDocumentItem";
import { useWatch } from "react-hook-form";

type Props = FormFieldProps<SessionDocumentsField["value"]>;

export function DocumentUploadSection({
    value,
    onChange,
} : Props){
    // const fs = useWatch(props)
    const [files, setFiles] = useState<File[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isError, setIsError] = useState(false);
    const fileId = useId();

    const handleFileSelect = (file_list : FileList | null) => {
        
        const selectedFiles = Array.from(file_list ?? []);
        for(const file of selectedFiles){
            
            if(!(file.type in MIME_TO_FILE_TYPE)){
                setIsError(true);
                setErrorMsg(`Invalid file type ${file.type}. Only PDF, DOCX, TXT, and Markdown (.md) files are supported`);
                return;
            }

            const exists = files.some(f => f.name === file.name);
            if(exists){
                setIsError(true);
                setErrorMsg(`File ${file.name} already exists`);
                return;
            }
            
            if(files.length >= 2){
                setIsError(true);
                setErrorMsg(`Max 2 files are allowed`);
                return;
            }
            setIsError(false);
            setErrorMsg("");
            setFiles(prev => [file, ...prev]);
            onChange([...(value ?? []), file]);
            // console.log({value})
        }
        if(!files) return;  
    }
    const handleRemoveFile = (file : File) => {
        setIsError(false);
        setErrorMsg("");
        setFiles(prev => prev.filter(f => f !== file));
        onChange(
            (value ?? []).filter(doc => doc.name !== file.name)
        );
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
                {isError && <FieldError>{errorMsg}</FieldError>}
                {
                    files.length === 0
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
                            <p>{files.length} file{files.length !== 1 ? "s" : ""} attached</p>
                            {
                                files.map(file => (
                                    <UploadedDocumentItem
                                    file={file}
                                    handleRemoveFile={handleRemoveFile}
                                    key={file.name}
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