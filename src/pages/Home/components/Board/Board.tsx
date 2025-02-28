import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/request';
import EditableBoardTitle from './EditableBoardTitle';
import './board.scss';
import { BoardProps } from '../../../../common/interfaces/BoardProps';
import { toast } from 'react-toastify';

const Board: React.FC<BoardProps> = ({ board, fetchBoards }) => {
  if (!board) {
    return <div>Board not found</div>;
  }

  const navigate = useNavigate();
  const [background] = useState<string>(board?.custom?.backgroundColor || '#fff');
  const [error, setError] = useState<string | null>(null);

  const handleDeleteBoard = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (!board?.id) {
      setError('Дошка не завантажена.');
      return;
    }

    console.log(`Deleting board with ID: ${board.id}`);
    try {
      await api.delete(`/board/${board.id}`);
      fetchBoards();
      navigate('/');
      toast.success('Дошку успішно видалено');
    } catch (err) {
      setError('Не вдалося видалити дошку');
      console.error('Error deleting board:', err);
      toast.error('Не вдалося видалити дошку');
    }
  };

  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      <div
        className="board"
        style={{
          backgroundColor: background,
          backgroundImage: background ? `url(${background})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Link to={`/board/${board.id}`} className="board-item">
          <EditableBoardTitle backgroundColor={background} board={board} fetchBoards={fetchBoards} />
        </Link>

        <button className="delete-board-button" onClick={handleDeleteBoard}>
          Видалити дошку
        </button>
      </div>
    </div>
  );
};

export default Board;
