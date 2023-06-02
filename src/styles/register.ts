import styled from "styled-components";

export const Wrapper = styled.main`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const RegisterForm = styled.form`
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
