import { CREATE_BOARD, DELETE_BOARD, EDIT_BOARD, GET_BOARD } from './routes';
import api from './request';
import { BoardData, IList } from '../common/interfaces/BoardProps';

export const apiGetBoardById = async (id: string): Promise<BoardData> => {
  try {
    return await api.get(`${GET_BOARD}/${id}`);
  } catch (error) {
    console.error('Помилка при отриманні дошrb:', error);
    throw error; // кидаємо помилку, якщо щось пішло не так
  }
};



const apiCreateBoard = async (
  title: string,
  custom?: { backgroundColor: string }
): Promise<{ result: string; id: number }> => {
  try {
    return await api.post<{ result: string; id: number }, any >(CREATE_BOARD, { title, custom });
  } catch (error) {
    console.error('Помилка при створенні дошки:', error);
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

// Видалення дошки
const apiDeleteBoard = async (id: number): Promise<void> => {
  try {
    await api.delete(`${DELETE_BOARD}/${id}`);
  } catch (error) {
    console.error('Помилка при видаленні дошки:', error);
    throw error;
  }
};

// Зміна кольору фону дошки

const apiUpdateBoardBackground = async (id: number, backgroundColor: string) => {
  try {
    return await api.put(`${EDIT_BOARD}/${id}`, { custom: { backgroundColor } });
  } catch (error) {
    console.error('Помилка при зміні кольору фону дошки:', error);
    throw error;
  }
};



export { apiCreateBoard, apiEditBoard, apiDeleteBoard, apiUpdateBoardBackground };
