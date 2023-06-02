import { useNavigate } from "react-router-dom";
import { RegisterForm, Wrapper } from "../styles/register";
import useForm from "../hooks/useForm";
import { IinitalValues } from "../types/user";
import { signUpApi } from "../api/signApi";
import useTokenCheck from "../hooks/useTokenCheck";
import { useEffect } from "react";

function SignUp() {
    const navigate = useNavigate();
    const { includeToken } = useTokenCheck();
    useEffect(() => { includeToken() }, []);
    const { isBlur, onBlur, onChange, disabled, errorsMessage, handleSubmit } = useForm({
        initalValues: { email: "", password: "" },
        onSubmit: (values: IinitalValues) => {
            signUpApi(values).then((response) => {
                console.log(response);
                if (response.status === 201) {
                    navigate("/signin");
                } else {
                    alert("회원가입 실패!");
                }
            });
        }
    });

    return (
        <Wrapper>
            <h1>📄 Sign Up</h1>
            <RegisterForm onSubmit={handleSubmit} name="register">
                <input data-testid="email-input" name="email" onBlur={onBlur} onChange={onChange} placeholder="email" />
                <span>{isBlur.email && errorsMessage.email ? errorsMessage.email : null}</span>
                <input data-testid="password-input" name="password" onBlur={onBlur} onChange={onChange} placeholder="비밀번호는 8자 이상입니다." />
                <span>{isBlur.password && errorsMessage.password ? errorsMessage.password : null}</span>
                <button data-testid="signup-button" type="submit" disabled={disabled}>회원가입</button>
            </RegisterForm>
        </Wrapper>
    );
};
export default SignUp;