import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../api/request';
import EditableBoardTitle from './EditableBoardTitle';
import EditableBoardBackground from './EditableBoardBackground';
import './board.scss';


// Інтерфейси
interface BoardProps {
  board: {
    id: number;
    title: string;
    background: string;
  };
  fetchBoards: () => void;
}

interface BoardProps {
  board: {
    id: number;
    title: string;
    background: string;
  };
  fetchBoards: () => void;
}

const Board: React.FC <BoardProps> = ({board, fetchBoards}) => {
  const { board_id } = useParams<{ board_id: string }>();
  const [background, setBackground] = useState<string>(board.background);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBackgroundChange = (newColor: string) => {
    setBackground(newColor); // Оновлюємо локальний стан
    console.log(`Колір дошки ${board.id} змінено на:`, newColor);
  };

  // Обробник для видалення дошки
  const handleDeleteBoard = async (): Promise<void> => {
    if (board) {
      const confirmDelete = window.confirm(`Ви дійсно хочете видалити дошку "${board.title}"?`);
      if (confirmDelete) {
        try {
          await api.delete(`/board/${board.id}`);
        fetchBoards();
        } catch (err) {
          setError('Не вдалося видалити дошку');
        }
      }
    }
  };
  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      {board ? (
        <div className="board">
          <EditableBoardTitle board={board} fetchBoards={fetchBoards} />
          
          <EditableBoardBackground
          boardId={board.id}
          initialBackground={background}
          onBackgroundChange={handleBackgroundChange} // Передаємо функцію
          fetchBoards={fetchBoards}
        />
          
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
