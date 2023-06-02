import useForm, { IinitalValues } from "../hooks/useForm";
import { RegisterForm, Wrapper } from "../styles/register";

function Signin() {
    const { isBlur, onBlur, onChange, disabled, errors, handleSubmit } = useForm({
        initalValues: { email: "", password: "" },
        onSubmit: (values: IinitalValues) => {
            console.log("hi");
            console.log(values);
        }
    });
    return (
        <Wrapper>
            <h1>📝 sign In</h1>
            <RegisterForm onSubmit={handleSubmit}>
                <input data-testid="email-input" name="email" onBlur={onBlur} onChange={onChange} placeholder="email" />
                <span>{isBlur.email && errors.email ? errors.email : null}</span>
                <input data-testid="password-input" name="password" onBlur={onBlur} onChange={onChange} placeholder="비밀번호는 8자 이상입니다." />
                <span>{isBlur.password && errors.password ? errors.password : null}</span>
                <button data-testid="signup-button" type="submit" disabled={disabled}>회원가입</button>
            </RegisterForm>
        </Wrapper>
    );
};
export default Signin;