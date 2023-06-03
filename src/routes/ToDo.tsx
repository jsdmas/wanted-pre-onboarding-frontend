import { memo, useEffect, useRef, useState } from "react";
import useTokenCheck from "../hooks/useTokenCheck";
import { createToDoAPI, deleteToDoAPI, getToDosAPI, updateToDoAPI } from "../api/todoApi";

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
    const [edit, setEdit] = useState<null | number>(null);
    const editToDoValue = useRef<HTMLInputElement>(null);

    const addToDo = async (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (toDoInput.current) {
            const { current: { value } } = toDoInput;
            const token = localStorage.getItem("access_token") ?? "";
            const newToDo = await createToDoAPI(value, token).catch(error => alert(error));
            setToDos(prevToDos => [...prevToDos, newToDo]);
            toDoInput.current.value = "";
        }
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && event.nativeEvent.isComposing) {
            addToDo();
            toDoInput.current?.focus();
        }
    };

    const onFinish = async ({ id, todo, isCompleted }: IToDo) => {
        const token = localStorage.getItem("access_token") ?? "";
        const renewalToDos = [...toDos];
        const response = await updateToDoAPI(token, id, todo, !isCompleted).catch(error => alert(error));
        console.log(response);
        const replaceIndex = renewalToDos.findIndex(toDoObj => toDoObj.id === id);
        renewalToDos.splice(replaceIndex, 1, response);
        setToDos([...renewalToDos]);
    };

    const deleteToDo = async (todoId: number) => {
        const token = localStorage.getItem("access_token") ?? "";
        const renewalToDos = [...toDos];
        await deleteToDoAPI(token, todoId).catch(error => alert(error));
        const deletedToDo = renewalToDos.findIndex(toDoObj => toDoObj.id === todoId);
        renewalToDos.splice(deletedToDo, 1);
        setToDos([...renewalToDos]);
    };

    const editToDo = async ({ id, todo, isCompleted }: IToDo) => {
        const value = editToDoValue.current?.value ?? todo;
        const token = localStorage.getItem("access_token") ?? "";
        const renewalToDos = [...toDos];
        const response = await updateToDoAPI(token, id, value, isCompleted).catch(error => alert(error));
        const replaceIndex = renewalToDos.findIndex(toDoObj => toDoObj.id === id);
        renewalToDos.splice(replaceIndex, 1, response);
        setToDos([...renewalToDos]);
        setEdit(null);
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
            <input data-testid="new-todo-input" ref={toDoInput} onKeyDown={handleKeydown} placeholder="toDos..." />
            <button data-testid="new-todo-add-button" onClick={addToDo} type="button">추가</button>
            <ul>
                {toDos.map((toDoObject) => {
                    return (
                        <li key={toDoObject.id}>
                            <label>
                                <input type="checkbox" onClick={() => onFinish(toDoObject)} defaultChecked={toDoObject.isCompleted} />
                                {edit !== toDoObject.id ? <span>{toDoObject.todo}</span> : <input data-testid="modify-input" defaultValue={toDoObject.todo} ref={editToDoValue} />}
                            </label>
                            {edit !== toDoObject.id ? (
                                <>
                                    <button data-testid="modify-button" onClick={() => setEdit(toDoObject.id)}>수정</button>
                                    <button data-testid="delete-button" onClick={() => deleteToDo(toDoObject.id)}>삭제</button>
                                </>
                            ) : null}
                            {edit === toDoObject.id ? (
                                <>
                                    <button data-testid="submit-button" onClick={() => editToDo(toDoObject)}>제출</button>
                                    <button data-testid="cancel-button" onClick={() => setEdit(null)}>취소</button>
                                </>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
export default memo(ToDo);