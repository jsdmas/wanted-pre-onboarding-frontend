const API_ADDRESS = "https://www.pre-onboarding-selection-task.shop";
const API_ADDRESS_TODO = "todos";

export const createToDoAPI = async (todo: string, token: string) => {
    const response = await fetch(`${API_ADDRESS}/${API_ADDRESS_TODO}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo })
    });
    if (!response.ok) {
        throw new Error("toDo생성 실패!");
    }
    const responseData = await response.json();
    return responseData;
};

export const getToDosAPI = async (token: string) => {
    const response = await fetch(`${API_ADDRESS}/${API_ADDRESS_TODO}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("toDo데이터 가져오기 실패!");
    }
    const responseData = await response.json();
    return responseData
};

export const deleteToDoAPI = async (token: string, toDoid: number) => {
    const response = await fetch(`${API_ADDRESS}/${API_ADDRESS_TODO}/${toDoid}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("toDo삭제 실패!");
    }

    return response;
};