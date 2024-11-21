import { CREATE_BOARD, DELETE_BOARD, EDIT_BOARD } from './routes';
import api from './request';

const apiCreateBoard = async function(title:string) {
  try {
    return await api.post(CREATE_BOARD, { title });
  } catch (error) {
    throw error;
  }
};

const apiEditBoard = async function(id: number, title: string) {
  try {
    return await api.put(`${EDIT_BOARD}/${id}`, { title });
  } catch (error) {
    throw error;
  }
};

const apiDeleteBoard = async function (id: number) {
  try {
    return await api.delete(`${DELETE_BOARD}/${id}`);
  } catch (error) {
    throw error;
  }
};



export {apiCreateBoard, apiEditBoard}