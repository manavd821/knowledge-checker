import { Button } from "@/components/ui/button";
import { 
    FileText,
    X,
} from "lucide-react";

export function UploadedDocumentItem({
    file,
    handleRemoveFile,
} : {
    file : File,
    handleRemoveFile: (file : File) => void
}){
    const convertFileSize = (bytes : number) : string => {
        if(bytes === 0) return "0 B";

        const units = ["B", "KB", "MB"];
        let size = bytes;
        let unitIdx = 0;
        while(size > 1024 && unitIdx < units.length-1){
            size /= 1024;
            unitIdx++;
        }
        return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unitIdx]}`;
    }
    return (
        <div 
        className="flex gap-2 items-center justify-start border w-full p-2 rounded-xl"
        >
            <div
            className="flex gap-2 items-center justify-start w-full"
            >
                <FileText/>
                <div>
                    <p
                    >{file.name}</p>
                    <p
                    className="text-muted-foreground"
                    >{convertFileSize(file.size)}</p>
                </div>
            </div>
            <Button
            variant="ghost"
            onClick={_ => handleRemoveFile(file)}
            >
                <X/>
            </Button>
        </div>
    )
}