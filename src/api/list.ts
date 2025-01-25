import api from './request';
import { CREATE_LIST, DELETE_LIST} from './routes';

export const apiAddList = async (boardId: number, listTitle: string, position: number) => {
  const url = `${CREATE_LIST}/${boardId}/list`; // Динамічний шлях із ID дошки
  const response = await api.post(url, { 
    title: listTitle, 
    position: position // Вказуємо позицію, як це потрібно у специфікації
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