import api from './request';
import { CREATE_CARD, DELETE_CARD } from './routes';

export const apiAddCard = async (
  boardId: number,
  listId: number,
  title: string,
  position: number,
  description: string,
  custom: any
) => {
  const url = `${CREATE_CARD}/${boardId}/card`;

  const response = await api.post(url, {
    title: title,
    list_id: listId,
    position: position,
    description: description,
    custom: custom,
  });
  return response.data;
};

export const apiDeleteCard = async (boardId: number, cardId: number) => {
  const url = `${DELETE_CARD}/${boardId}/card/${cardId}`;
  const response = await api.delete(url);
  return response.data;
};
