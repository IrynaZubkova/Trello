import api from './request';
import { CREATE_LIST, DELETE_LIST, UPDATE_LIST} from './routes';

export const apiAddList = async (boardId: number, listTitle: string, position: number) => {
  const url = `${CREATE_LIST}/${boardId}/list`; 
  const response = await api.post(url, { 
    title: listTitle, 
    position: position 
  });
  return response.data;
};

export const apiDeleteList = async (boardId: number, listId: number): Promise<void> => {
  try {
    await api.delete(`${DELETE_LIST}/${boardId}/list/${listId}`);
  } catch (error) {
    console.error('Помилка при видаленні списку:', error);
    throw error;
  }
};

export const apiUpdateListTitle = async (boardId: number, listId: number, newTitle: string) => {
  const url = `${UPDATE_LIST}/${boardId}/list/${listId}`;
  const response = await api.put(url, { title: newTitle });
  return response.data;
};
