import api from './request';
import { CREATE_LIST, GET_LISTS} from './routes';

export const apiAddList = async (boardId: number, listTitle: string, position: number) => {
  const url = `${CREATE_LIST}/${boardId}/list`; // Динамічний шлях із ID дошки
  const response = await api.post(url, { 
    title: listTitle, 
    position: position // Вказуємо позицію, як це потрібно у специфікації
  });
  return response.data;
};

// export const apiGetLists = async (boardId: number) => {
//   const response = await api.get(`${GET_LISTS}/${boardId}/list`);
//   //тут ймовірно шось не так (`${GET_LISTS}/${boardId}/list`)
//   return response.data; 
// };