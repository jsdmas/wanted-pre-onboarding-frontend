import { IinitalValues } from "../types/user";

const API_ADDRESS = "https://www.pre-onboarding-selection-task.shop";
const API_SIGNUP_URL = "auth/signup";
const API_SIGNIN_URL = "auth/signin";

export const signUpApi = async (values: IinitalValues) => {
    const response = await fetch(`${API_ADDRESS}/${API_SIGNUP_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new Error("회원가입 실패!");
    }
    return response;
};

export const signInApi = async (values: IinitalValues) => {
    const response = await fetch(`${API_ADDRESS}/${API_SIGNIN_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new Error("로그인 실패!");
    }
    const responseData = await response.json();
    return responseData;
};