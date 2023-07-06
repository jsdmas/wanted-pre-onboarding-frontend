import { Link } from "react-router-dom";
import { Wrapper } from "../styles/register";
import styled from "styled-components";

function Home() {
    return (
        <Wrapper>
            <h1>지원자 장진호 🥳</h1>
            <span>기본 도메인 url : https://jsdmas.github.io/wanted-pre-onboarding-frontend/</span>
            <MyLink to="signup">signup Page &rarr;</MyLink>
            <MyLink to="signin">signin Page &rarr;</MyLink>
            <MyLink to="todo">todo Page &rarr;</MyLink>
        </Wrapper>
    );
};

const MyLink = styled(Link)`
    text-decoration: none;
    margin: 10px auto;
    padding: 20px;
    transition: 0.2s ease-in-out;
    border: 1px solid rgba(0,0,0,0.2);
    width: 100px;
    &:hover{
        background-color: orange;
        color: white;
    }
`;

export default Home;