import { ToDo } from '@/types/todo';
import { instance } from './instance';

export const getToDo = async () => {
  return instance.get('/todos').catch((error) => {
    throw new Error(error);
  });
};

export const createToDo = async (body: Pick<ToDo, 'todo'>) => {
  return instance.post('/todos', { ...body }).catch((error) => {
    throw new Error(error);
  });
};

export const updateToDo = async (id: number, body: Pick<ToDo, 'isCompleted' | 'todo'>) => {
  return instance.put(`/todos/${id}`, body).catch((error) => {
    throw new Error(error);
  });
};

export const deleteTodo = async (id: number) => {
  return instance.delete(`/todos/${id}`).catch((error) => {
    throw new Error(error);
  });
};
