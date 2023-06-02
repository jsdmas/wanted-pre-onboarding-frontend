import { useCallback, useEffect, useState } from "react";
import { IinitalValues } from "../types/user";

interface IuseForm {
    initalValues: IinitalValues,
    onSubmit: Function
};

function useForm({ initalValues, onSubmit }: IuseForm) {
    const [values, setValues] = useState(initalValues);
    const [errorsMessage, setErrorsMessage] = useState(initalValues);
    const [isBlur, setIsBlur] = useState<{ [key: string]: any }>({});
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        onSubmit(values);
    };

    const vaildate = useCallback(() => {
        const errors = { ...initalValues };

        if (!values.email.includes("@")) {
            setDisabled(true);
            errors.email = "'@'를 포함해주세요.";
        }
        if (!(values.password.length >= 8)) {
            setDisabled(true);
            errors.password = "비밀번호는 8자 이상 입력해주세요.";
        }

        if (!Object.values(errors).some(value => value)) {
            setDisabled(false)
        };

        return errors;
    }, [values]);

    // 포커스 아웃
    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsBlur(
            Object.keys(values).reduce((isBlur, field) => {
                isBlur[field] = true;
                return isBlur
            }, {} as { [key: string]: any })
        );
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        const errors = vaildate();
        setErrorsMessage(errors);
    }, [values, vaildate]);

    return { values, errorsMessage, isBlur, disabled, onBlur, onChange, handleSubmit };
};
export default useForm;