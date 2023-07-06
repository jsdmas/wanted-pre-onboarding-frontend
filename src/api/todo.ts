import { instance } from './instance';

export const getToDos = async () => {
  return instance.get('/todos').catch((error) => {
    throw new Error(error);
  });
};
