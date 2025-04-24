import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import { apiCreateBoard } from '../../api/boards';
import './home.scss';
import Board from './components/Board/Board';
import { apiUpdateBoardBackground } from '../../api/boards';
import { AxiosProgressEvent } from 'axios';
import api from '../../api/request';
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import { BoardData } from '../../common/interfaces/BoardData';

interface BoardResponse {
  boards?: BoardData[];
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [board, setBoards] = useState<BoardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const update = async (): Promise<void> => {
    try {
      setLoading(true);
      setProgress(10);
      const response = await api.get<BoardResponse>('/board', {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });
      if ('boards' in response && Array.isArray(response.boards)) {
        setBoards(response.boards);
        console.log('response.boards', response.boards);
      }

      setProgress(100);
    } catch {
      setError('Не вдалося завантажити дошки');
      toast.error('Не вдалося завантажити дошки', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    setBoards(board);
  }, [board]);

  const handleBoardCreated = async (newBoardTitle: string, newBoardColor: string) => {
    try {
      console.log('Створюємо дошку з назвою:', newBoardTitle, 'та кольором:', newBoardColor);
      const newBoard = await apiCreateBoard(newBoardTitle, { backgroundColor: newBoardColor });
      console.log('Створена дошка:', newBoard);

      const updatedBoards = [
        ...board,
        {
          id: newBoard.id,
          title: newBoardTitle,
          custom: {
            backgroundColor: newBoardColor,
            backgroundImage: '',
          },
          lists: [],
        },
      ];
      setBoards(updatedBoards);
      update();
      setIsModalOpen(false);
      toast.success('Дошку успішно створено');
    } catch (error) {
      console.error('Помилка при створенні дошки:', error);
      toast.error('Не вдалося створити дошку');
    }
  };

  useEffect(() => {
    update();
  }, [location]);

  const handleBackgroundChange = async (boardId: number, newBackground: string) => {
    try {
      await apiUpdateBoardBackground(boardId, newBackground);
      const updatedBoards = board.map((board) =>
        board.id === boardId ? { ...board, custom: { backgroundColor: newBackground } } : board
      );
      setBoards(updatedBoards);
      update();
      toast.success('Колір дошки оновлено');
    } catch (error) {
      console.error('Не вдалося оновити колір дошки:', error);
      toast.error('Не вдалося оновити колір дошки');
    }
  };

  const handleBoardDelete = (boardId: number) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    update();
    toast.success('Дошку видалено');
  };

  return (
    <div>
      <div className="progress-container">
        {loading && <ProgressBar completed={progress} bgColor="blue" height="10px" />}
      </div>
      {error && <div>{error}</div>}
      <h1 className="board-list-title">Список Дошок</h1>
      <button className="add-board-button" onClick={() => setIsModalOpen(true)}>
        Додати дошку
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleBoardCreated} />

      <div className="Content">
        {board.length > 0 ? (
          board.map((boardItem) => (
            <div key={boardItem.id}>
              <Board
                onBoardDelete={handleBoardDelete}
                board={boardItem}
                fetchBoards={() => update()}
                onBackgroundChange={handleBackgroundChange}
              />
            </div>
          ))
        ) : (
          <p>Завантажується...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
