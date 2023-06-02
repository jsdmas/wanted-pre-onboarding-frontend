import styled from "styled-components";

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100px;
    justify-content: space-between;
`;

function SignUp() {
    const onSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();

    };
    return (
        <>
            <h1>회원가입</h1>
            <RegisterForm onSubmit={onSubmit} name="register">
                <input data-testid="email-input" type="email" />
                <input data-testid="password-input" type="password" />
                <button data-testid="signup-button" type="submit">회원가입</button>
            </RegisterForm>
        </>
    );
};
export default SignUp;