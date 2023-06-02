import { useNavigate } from "react-router-dom";
import { RegisterForm, Wrapper } from "../styles/register";
import useForm, { IinitalValues } from "../hooks/useForm";

function SignUp() {
    const navigate = useNavigate();
    const { isBlur, onBlur, onChange, disabled, errors, handleSubmit } = useForm({
        initalValues: { email: "", password: "" },
        onSubmit: (values: IinitalValues) => {
            navigate("/signin");
            console.log(values);
        }
    });

    return (
        <Wrapper>
            <h1>📄 Sign Up</h1>
            <RegisterForm onSubmit={handleSubmit} name="register">
                <input data-testid="email-input" name="email" onBlur={onBlur} onChange={onChange} placeholder="email" />
                <span>{isBlur.email && errors.email ? errors.email : null}</span>
                <input data-testid="password-input" name="password" onBlur={onBlur} onChange={onChange} placeholder="비밀번호는 8자 이상입니다." />
                <span>{isBlur.password && errors.password ? errors.password : null}</span>
                <button data-testid="signup-button" type="submit" disabled={disabled}>회원가입</button>
            </RegisterForm>
        </Wrapper>
    );
};
export default SignUp;