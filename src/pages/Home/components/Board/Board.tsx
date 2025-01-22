import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/request';
import { apiUpdateBoardBackground } from '../../../../api/boards';
import EditableBoardTitle from './EditableBoardTitle';
import EditableBoardBackground from './EditableBoardBackground';
import './board.scss';
import { BoardProps } from '../../../../common/interfaces/BoardProps';


const Board: React.FC<BoardProps> = ({ board, fetchBoards, onBackgroundChange }) => {
  if (!board) {
    return <div>Board not found</div>;
  }

  const navigate = useNavigate();
  const [background, setBackground] = useState<string>(board?.custom?.backgroundColor || "#fff");
  const [error, setError] = useState<string | null>(null);

  const handleBackgroundChange = async (newColor: string) => {
    try {
      setBackground(newColor); // Відображення зміни на клієнті
      await apiUpdateBoardBackground(board.id, newColor); // Запит до сервера
      fetchBoards(); // Оновлюємо дошки після зміни
    } catch (error) {
      setError('Не вдалося змінити колір фону дошки');
      console.error('Помилка при зміні кольору:', error);
    }
  };
  

  const handleDeleteBoard = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault(); // Запобігаємо переходу по Link
    e.stopPropagation(); // Зупиняємо спливання події
    
    if (!board?.id) {
      setError("Дошка не завантажена.");
      return;
    }
    
    console.log(`Deleting board with ID: ${board.id}`);
    const confirmDelete = window.confirm(`Ви дійсно хочете видалити дошку "${board.title}"?`);
    
    if (confirmDelete) {
      try {
        await api.delete(`/board/${board.id}`);
        fetchBoards();
          navigate('/');
      } catch (err) {
        setError('Не вдалося видалити дошку');
        console.error('Error deleting board:', err);
      }
    }
  };

  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      <div className="board">
        <Link to={`/board/${board.id}`} className="board-item" style={{ backgroundColor: background }}>
          <EditableBoardTitle
            backgroundColor={background}
            board={board}
            fetchBoards={fetchBoards}
          />
        </Link>
        <EditableBoardBackground
          boardId={board.id}
          initialBackground={background}
          onBackgroundChange={handleBackgroundChange}
          fetchBoards={fetchBoards}
        />
        <button 
          className="delete-board-button" 
          onClick={handleDeleteBoard}
        >
          Видалити дошку
        </button>
      </div>
    </div>
  );
};

export default Board;