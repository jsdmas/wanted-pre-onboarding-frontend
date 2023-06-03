import { Link } from "react-router-dom";
import { Wrapper } from "../styles/register";
import styled from "styled-components";

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

function Home() {
    return (
        <Wrapper>
            <h1>지원자 장진호</h1>
            <MyLink to="signup">signup Page &rarr;</MyLink>
            <MyLink to="signin">signup Page &rarr;</MyLink>
            <MyLink to="todo">todo Page &rarr;</MyLink>
        </Wrapper>
    );
};

export default Home;