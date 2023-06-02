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
    return response;
};

export const signInApi = async (values: IinitalValues) => {
    const response = await (await fetch(`${API_ADDRESS}/${API_SIGNIN_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })).json();
    return response;
};