import { useId } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { 
    type ScheduledAtField, 
    FormFieldProps,
} from "@/modules";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input";
import { 
    Field, 
    FieldLabel, 
} from "@/components/ui/field";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";

type Props = FormFieldProps<ScheduledAtField["value"]>;

export function ScheduleSection({
    value,
    onChange,
} :Props){
    const time_id = useId();
    const calender_id = useId();

    const handleSelect = (date : Date) => {
        if(!date) return;

        const updated = new Date(date);
        if(value){
            updated.setHours(value?.getHours());
            updated.setMinutes(value?.getMinutes());
        }

        onChange(updated);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!value) return;

        const [hours, minutes] = e.target.value.split(":");
        const updated = new Date(value);

        updated.setHours(Number(hours));
        updated.setMinutes(Number(minutes));

        onChange(updated);

    }
    return (
        <div
        className="flex flex-col sm:flex-row gap-2"
        >
            <Field>
                <FieldLabel 
                className="text-muted-foreground"
                htmlFor={calender_id}>Date</FieldLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        id={calender_id}
                        className="w-32 justify-between font-normal"
                        >{
                            value ? format(value, "PPP") : "Pick a date"
                        }
                        <ChevronDownIcon/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleSelect}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <Field>
                <FieldLabel 
                className="text-muted-foreground"
                htmlFor="time-picker-optional">Time</FieldLabel>
                <Input
                type="time"
                value={value ? format(value, "HH:mm") : ""}
                onChange={handleChange}
                id={time_id}
                />
            </Field>
        </div>

    )
}