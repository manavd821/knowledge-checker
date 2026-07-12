import { 
    type RoleLevelField,
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { RoleLevelSection } from "@/components/new-session/RoleLevel/RoleLevelSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";

type Props = FormFieldProps<RoleLevelField["value"]>;


export function RoleLevelField({
  value,
  onChange,
  errors,
}: Props){
    return (
        <Field>
            <SectionHeading>Role Level</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <RoleLevelSection
            value = {value}
            onChange = {onChange}
            />
        </Field>
    )
}