import api from './request';
import { CREATE_CARD } from './routes'; 


export const apiAddCard = async (boardId: number, listId: number, title: string, position: number, description: string, custom: any) => {
  const url = `${CREATE_CARD}/${boardId}/card`; 
  console.log('URL:', url); 
  console.log('boardId:', boardId);
console.log('listId:', listId);
console.log('title:', title);
console.log('position:', position);
console.log('description:', description);
console.log('custom:', custom);
  const response = await api.post(url, {
    title: title,
    list_id: listId, 
    position: position,
    description: description, 
    custom: custom 
  });
  return response.data; 
};
