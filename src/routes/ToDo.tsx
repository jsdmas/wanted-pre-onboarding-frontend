import { memo, useEffect, useRef, useState } from "react";
import useTokenCheck from "../hooks/useTokenCheck";
import { createToDoAPI, deleteToDoAPI, getToDosAPI, updateToDoAPI } from "../api/todoApi";
import styled from "styled-components";

interface IToDo {
    id: number,
    todo: string,
    isCompleted: boolean,
    userId: number
};

function ToDo() {
    const { notIncludeToken } = useTokenCheck();
    const token = localStorage.getItem("access_token") ?? "";
    const [toDos, setToDos] = useState<IToDo[]>([]);
    const [edit, setEdit] = useState<null | number>(null);
    const toDoInput = useRef<HTMLInputElement>(null);
    const editToDoValue = useRef<HTMLInputElement>(null);

    useEffect(() => {
        notIncludeToken();
        const fetchToDos = async () => {
            const myToDos = await getToDosAPI(token).catch(error => alert(error));
            setToDos(myToDos);
        }
        fetchToDos();
    }, []);

    const renderToDo = (id: number, response: IToDo) => {
        const renewalToDos = [...toDos];
        const replaceIndex = renewalToDos.findIndex(toDoObj => toDoObj.id === id);
        renewalToDos.splice(replaceIndex, 1, response);
        setToDos([...renewalToDos]);
    };

    const addToDo = async (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (toDoInput.current) {
            const { current: { value } } = toDoInput;
            const newToDo = await createToDoAPI(value, token).catch(error => alert(error));
            setToDos(prevToDos => [...prevToDos, newToDo]);
            toDoInput.current.value = "";
        }
    };

    const onFinish = async ({ id, todo, isCompleted }: IToDo) => {
        const response = await updateToDoAPI(token, id, todo, !isCompleted).catch(error => alert(error));
        renderToDo(id, response);
    };

    const editToDo = async ({ id, todo, isCompleted }: IToDo) => {
        const value = editToDoValue.current?.value ?? todo;
        const response = await updateToDoAPI(token, id, value, isCompleted).catch(error => alert(error));
        renderToDo(id, response);
        setEdit(null);
    };

    const deleteToDo = async (todoId: number) => {
        await deleteToDoAPI(token, todoId).catch(error => alert(error));
        const renewalToDos = [...toDos];
        const deletedToDo = renewalToDos.findIndex(toDoObj => toDoObj.id === todoId);
        renewalToDos.splice(deletedToDo, 1);
        setToDos([...renewalToDos]);
    };


    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const isComposing = event.nativeEvent.isComposing || false;
            if (isComposing) {
                event.preventDefault();
            } else {
                addToDo();
                toDoInput.current?.focus();
            }
        }
    };

    return (
        <Wrapper>
            <h1>📖 ToDo</h1>
            <WriteToDo>
                <input data-testid="new-todo-input" ref={toDoInput} onKeyDown={handleKeydown} placeholder="toDos..." />
                <button data-testid="new-todo-add-button" onClick={addToDo} type="button">추가</button>
            </WriteToDo>
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
        </Wrapper>
    );
};

const Wrapper = styled.main`
    display: flex;
    margin: auto;
    width: 250px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WriteToDo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

export default memo(ToDo);