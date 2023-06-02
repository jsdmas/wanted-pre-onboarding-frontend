import { useEffect, useRef, useState } from "react";
import useTokenCheck from "../hooks/useTokenCheck";
import { createToDo, getToDos } from "../api/todoApi";

interface IToDo {
    id: number,
    todo: string,
    isCompleted: boolean,
    userId: number
};

function ToDo() {
    const { notIncludeToken } = useTokenCheck();
    const toDoInput = useRef<HTMLInputElement>(null);
    const [toDos, setToDos] = useState<IToDo[]>([]);

    const addToDo = async (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (toDoInput.current) {
            const { current: { value } } = toDoInput;
            const token = localStorage.getItem("access_token") ?? "";
            const newToDo = await createToDo(value, token).catch(error => alert(error));
            setToDos(prevToDos => [...prevToDos, newToDo]);
            toDoInput.current.value = "";
        }

    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addToDo();
            toDoInput.current?.focus();
        }
    };

    const onFinish = (event: React.MouseEvent<HTMLInputElement>) => {
        const { currentTarget: { dataset: { todoid } } } = event;
        if (todoid) {
            toDos.forEach(toDoObj => {
                if (toDoObj.id === +todoid) {
                    toDoObj.isCompleted = !toDoObj.isCompleted;
                };
            });
        }
    };

    useEffect(() => {
        notIncludeToken();
        const token = localStorage.getItem("access_token") ?? "";
        const fetchToDos = async () => {
            const myToDos = await getToDos(token).catch(error => alert(error));
            setToDos(myToDos);
        }
        fetchToDos();
    }, []);

    return (
        <>
            <input data-testid="new-todo-input" ref={toDoInput} onKeyDown={handleKeyDown} placeholder="toDos..." />
            <button data-testid="new-todo-add-button" onClick={addToDo} type="button">추가</button>
            <ul>
                {toDos.map((toDoObject) => {
                    return (
                        <li key={toDoObject.id}>
                            <label>
                                <input type="checkbox" onClick={onFinish} data-todoid={toDoObject.id} />
                                <span>{toDoObject.todo}</span>
                                <button data-testid="modify-button">수정</button>
                                <button data-testid="delete-button">삭제</button>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
export default ToDo;