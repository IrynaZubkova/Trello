import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../api/request';
import EditableBoardTitle from './EditableBoardTitle';
import './board.scss';

// Інтерфейси
interface BoardData {
  id: number;
  title: string;
}

interface BoardsResponse {
  boards: BoardData[];
}

const Board: React.FC = () => {
  const { board_id } = useParams<{ board_id: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Функція для завантаження конкретної дошки
  const fetchBoard = async (): Promise<void> => {
    try {
      const response = await api.get<BoardsResponse>('/board');
      const foundBoard = response.data.boards.find(
        (board: BoardData) => board.id.toString() === board_id
      );
      setBoard(foundBoard || null);
    } catch (err) {
      setError('Не вдалося завантажити дошку');
    }
  };

  // Обробник для видалення дошки
  const handleDeleteBoard = async (): Promise<void> => {
    if (board) {
      const confirmDelete = window.confirm(`Ви дійсно хочете видалити дошку "${board.title}"?`);
      if (confirmDelete) {
        try {
          await api.delete(`/board/${board.id}`); // Видалення дошки за її ID
          navigate('/'); // Перенаправлення на головну сторінку після видалення
        } catch (err) {
          setError('Не вдалося видалити дошку');
        }
      }
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [board_id]);

  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      {board ? (
        <div className="board">
          <EditableBoardTitle board={board} fetchBoards={fetchBoard} />
          {/* Кнопка для видалення дошки, прив'язана до board.id */}
          <button
            className="delete-board-button"
            onClick={handleDeleteBoard}
          >
            Видалити дошку
          </button>
        </div>
      ) : (
        <p className="loading-text">Завантаження...</p>
      )}
    </div>
  );
};

export default Board;
