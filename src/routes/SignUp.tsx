import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isBlur, setIsBlur] = useState({ email: false, password: false });
    const [disabled, setDisabled] = useState(true);

    const onSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        navigate("/signin");
        alert(JSON.stringify(values));
    };

    const vaildate = useCallback(() => {
        const errors = {
            email: "",
            password: ""
        };

        if (!values.email.includes("@")) {
            setDisabled(true);
            errors.email = "'@'를 포함해주세요.";
        }
        if (!(values.password.length >= 8)) {
            setDisabled(true);
            errors.password = "비밀번호는 8자 이상 입력해주세요.";
        }

        if (!Object.values(errors).some(value => value)) setDisabled(false);

        return errors;
    }, [values]);

    // 포커스 아웃
    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsBlur({
            ...isBlur,
            [event.target.name]: true
        });
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        const errors = vaildate();
        setErrors(errors);
    }, [values, vaildate]);

    return (
        <Wrapper>
            <h1>회원가입</h1>
            <RegisterForm onSubmit={onSubmit} name="register">
                <input data-testid="email-input" name="email" onBlur={onBlur} onChange={onChange} placeholder="email" />
                <span>{isBlur.email && errors.email ? errors.email : null}</span>
                <input data-testid="password-input" name="password" onBlur={onBlur} onChange={onChange} placeholder="비밀번호는 8자 이상입니다." />
                <span>{isBlur.password && errors.password ? errors.password : null}</span>
                <button data-testid="signup-button" type="submit" disabled={disabled}>회원가입</button>
            </RegisterForm>
        </Wrapper>
    );
};

const Wrapper = styled.main`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 150px;
    justify-content: space-around;
    input{
        height: 30px;
    }
    span{
        height: 15px;
    }
`;

export default SignUp;