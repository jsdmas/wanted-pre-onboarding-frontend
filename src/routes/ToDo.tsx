import { memo, useEffect, useRef, useState } from "react";
import useTokenCheck from "../hooks/useTokenCheck";
import { createToDoAPI, deleteToDoAPI, getToDosAPI } from "../api/todoApi";

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
            const newToDo = await createToDoAPI(value, token).catch(error => alert(error));
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

    const onFinish = (todoId: number) => {
        toDos.forEach(toDoObj => {
            if (toDoObj.id === todoId) {
                toDoObj.isCompleted = !toDoObj.isCompleted;
            };
        });
        console.log(toDos);
    };

    const deleteToDo = async (todoId: number) => {
        const token = localStorage.getItem("access_token") ?? "";
        await deleteToDoAPI(token, todoId).catch(error => alert(error));
        const renewalToDos = [...toDos];
        const deletedToDo = renewalToDos.findIndex(toDoObj => toDoObj.id === todoId);
        renewalToDos.splice(deletedToDo, 1);
        setToDos([...renewalToDos]);
    };

    useEffect(() => {
        notIncludeToken();
        const token = localStorage.getItem("access_token") ?? "";
        const fetchToDos = async () => {
            const myToDos = await getToDosAPI(token).catch(error => alert(error));
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
                                <input type="checkbox" onClick={() => onFinish(toDoObject.id)} />
                                <span>{toDoObject.todo}</span>
                                <button data-testid="modify-button">수정</button>
                                <button data-testid="delete-button" onClick={() => deleteToDo(toDoObject.id)}>삭제</button>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
export default memo(ToDo);