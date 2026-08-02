import { 
    Field, 
    FieldContent, 
    FieldDescription, 
    FieldTitle, 
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useId } from "react";

type Props = {
    title : string;
    description : string;
    checked : boolean;
    onCheckedChange: (checked : boolean) => void;
};

export function SettingRow({
    title,
    description,
    checked,
    onCheckedChange,
} : Props){
    const toggleID = useId();
    return (
        <Field>
            <Label htmlFor={toggleID}>
                <FieldContent>
                    <FieldTitle>{title}</FieldTitle>
                    <FieldDescription>{description}</FieldDescription>
                </FieldContent>
                <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                id={toggleID}/>
            </Label>
        </Field>
    )
}