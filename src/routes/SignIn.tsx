import { useNavigate } from "react-router-dom";
import { signInApi } from "../api/signApi";
import useForm from "../hooks/useForm";
import { RegisterForm, Wrapper } from "../styles/register";
import { IinitalValues } from "../types/user";

function Signin() {
    const navigate = useNavigate();
    const { isBlur, onBlur, onChange, disabled, errorsMessage, handleSubmit } = useForm({
        initalValues: { email: "", password: "" },
        onSubmit: (values: IinitalValues) => {
            signInApi(values).then((response) => {
                if (Object.hasOwn(response, "access_token")) {
                    for (const [key, value] of Object.entries(response)) {
                        if (typeof value === "string") localStorage.setItem(key, value);
                    };
                    navigate("/todo");
                } else {
                    return alert("로그인 실패!");
                }
            });
        }
    });
    return (
        <Wrapper>
            <h1>📝 sign In</h1>
            <RegisterForm onSubmit={handleSubmit}>
                <input data-testid="email-input" name="email" onBlur={onBlur} onChange={onChange} placeholder="email" />
                <span>{isBlur.email && errorsMessage.email ? errorsMessage.email : null}</span>
                <input data-testid="password-input" name="password" onBlur={onBlur} onChange={onChange} placeholder="password" />
                <span>{isBlur.password && errorsMessage.password ? errorsMessage.password : null}</span>
                <button data-testid="signin-button" type="submit" disabled={disabled}>로그인</button>
            </RegisterForm>
        </Wrapper>
    );
};
export default Signin;