import { CREATE_BOARD } from './routes';
import api from './request';

const apiCreateBoard = async function(title:string) {
  try {
    return await api.post(CREATE_BOARD, { title });
  } catch (error) {
    throw error;
  }
};
//тут можна добавляти нові функції

export {apiCreateBoard}