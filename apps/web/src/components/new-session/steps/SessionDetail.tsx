
import { 
    useForm,
    Controller,
    useWatch,
    type UseFormSetValue,
} from "react-hook-form";
import {
    StepFormData,
} from "@/modules";
import { SessionTypeField } from "@/components/new-session/SessionType/SessionTypeField";
import { TopicTypeField } from "@/components/new-session/TopicType/TopicTypeField";
import { DomainField } from "@/components/new-session/Domain/DomainField";
import { RoleLevelField } from "@/components/new-session/RoleLevel/RoleLevelField";
import { DifficultyField } from "@/components/new-session/Difficulty/DifficultyField";
import { CustomDomainField } from "@/components/new-session/CustomDomain/CustomDomainField";
import { useEffect } from "react";


export function SessionDetail({ 
    control,
    setValue,
} : {
    control : ReturnType<typeof useForm<StepFormData>>["control"];
    setValue : UseFormSetValue<StepFormData>
}){
    const domain = useWatch({
        control,
        name: "domain"
    });

    useEffect(() => {
        if(domain !== "custom"){
            setValue("custom_domain", undefined);
        }
    },[domain, setValue]);
    return (
        <>
            <Controller
            name={"session_type"}
            control={control}
            render={({field, fieldState}) => (
                <SessionTypeField 
                    value = {field.value}
                    onChange={field.onChange}
                    errors={fieldState.error}
                />
            )}
            />
            <Controller
            name={"topic_type"}
            control={control}
            render={({field, fieldState}) => (
                <TopicTypeField 
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
            )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                    <Controller
                    name={"domain"}
                    control={control}
                    render={({field, fieldState}) => (
                        <DomainField 
                        value={field.value}
                        onChange={field.onChange}
                        errors={fieldState.error}
                        />
                    )}
                    />
                    <Controller
                    name={"role_level"}
                    control={control}
                    render={({field, fieldState}) => (
                        <RoleLevelField 
                        value={field.value}
                        onChange={field.onChange}
                        errors={fieldState.error}
                        />
                    )}
                    />
            </div>
            {
                domain === "custom" && (
                    <Controller
                    control={control}
                    name="custom_domain"
                    render={({field,fieldState}) => (
                        <CustomDomainField
                        field={field}
                        fieldState={fieldState}
                        />
                    )}
                    />
                )
            }
            <Controller
            name="difficulty"
            control={control}
            render={({field, fieldState}) => (
                <DifficultyField 
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
            )}
            />
        </>
    )
}