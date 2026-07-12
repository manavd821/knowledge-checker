import { DOMAIN } from "@/db/enums";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  DOMAIN_META,
  type DomainField,
  FormFieldProps,
} from "@/modules";

type Props = FormFieldProps<DomainField["value"]>;



export function DomainSection({
  value,
  onChange,
}: Props){
    return (
            <Combobox 
            items={DOMAIN}
            value={value}
            onValueChange={onChange}
            itemToStringLabel={(domain) => DOMAIN_META[domain].label}
            >
                <ComboboxInput placeholder="Search domains..."/>
                <ComboboxContent>
                    <ComboboxEmpty>No domain found.</ComboboxEmpty>
                    <ComboboxList>
                        { (domain : typeof DOMAIN[number]) => {
                            const { label } = DOMAIN_META[domain]
                            return (
                            <ComboboxItem key={domain} value={domain}>
                                {label}
                            </ComboboxItem>
                        )}}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
    )
}