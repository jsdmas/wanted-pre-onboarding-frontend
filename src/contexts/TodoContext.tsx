import { ToDo } from '@/types/todo';
import { Dispatch, PropsWithChildren, Reducer, createContext, useReducer } from 'react';

type ToDoType = 'GET' | 'CREATE' | 'UPDATE' | 'DELETE';

interface TodoAction {
  type: ToDoType;
  init: ToDo[];
  toDo: ToDo;
}

interface ToDoContext {
  toDos: ToDo[];
  dispatch: Dispatch<TodoAction>;
}

const initalToDos: ToDo[] = [];

const reducer: Reducer<ToDo[], TodoAction> = (state, action) => {
  switch (action.type) {
    case 'GET':
      return action.init;
    case 'CREATE':
      return [...state, action.toDo];
    case 'DELETE':
      return state.filter((data) => data.id !== action.toDo.id);
    case 'UPDATE':
      return state.map((data) => (data.id === action.toDo.id ? { ...action.toDo } : data));
    default:
      throw new Error('다시 시도하세요');
  }
};

const toDoContext = createContext<ToDoContext>({
  toDos: [],
  dispatch: () => [],
});

function ToDoContextProvider(props: PropsWithChildren) {
  const [toDos, dispatch] = useReducer(reducer, initalToDos);
  return <toDoContext.Provider value={{ toDos, dispatch }}>{props.children}</toDoContext.Provider>;
}

export default ToDoContextProvider;
