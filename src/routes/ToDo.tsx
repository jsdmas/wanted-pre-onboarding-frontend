import { useEffect, useRef, useState } from "react";
import useTokenCheck from "../hooks/useTokenCheck";

function ToDo() {
    const { notIncludeToken } = useTokenCheck();
    const toDoInput = useRef<HTMLInputElement>(null);
    const [toDos, setToDos] = useState<{ id: number, todo: string }[]>(() => {
        const myToDos = localStorage.getItem("myToDos");
        return myToDos ? JSON.parse(myToDos) : [];
    });

    const addToDo = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (toDoInput.current) {
            const { current: { value } } = toDoInput;
            const toDoId = new Date().getTime();
            const newToDo = { id: toDoId, todo: value };
            setToDos([...toDos, newToDo]);
            toDoInput.current.value = "";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addToDo();
            toDoInput.current?.focus();
        }
    };

    useEffect(() => {
        notIncludeToken();
        localStorage.setItem("myToDos", JSON.stringify(toDos));
    }, [notIncludeToken, toDos]);

    return (
        <>
            <input data-testid="new-todo-input" ref={toDoInput} onKeyDown={handleKeyDown} placeholder="toDos..." />
            <button data-testid="new-todo-add-button" onClick={addToDo} type="button">추가</button>
            {toDos.map((toDoObject, index) => {
                return (
                    <li key={index}>
                        <label>
                            <input type="checkbox" />
                            <span>{toDoObject.todo}</span>
                        </label>
                    </li>
                );
            })}
        </>
    );
};
export default ToDo;