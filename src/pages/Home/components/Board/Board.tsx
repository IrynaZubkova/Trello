import React, { useState } from 'react';
import api from '../../../../api/request';
import EditableBoardTitle from './EditableBoardTitle';
import EditableBoardBackground from './EditableBoardBackground';
import './board.scss';
import { BoardData } from './EditableBoardTitle';


// Оновлення типу BoardProps
interface BoardProps {
  board: BoardData;
  fetchBoards: () => void; // оновлення списку дошок після будь-якої зміни
  onBackgroundChange: (boardId: number, newBackground: string) => void;
}


const Board: React.FC<BoardProps> = ({ board, fetchBoards, onBackgroundChange }) => {
  const [background, setBackground] = useState<string>(board?.custom?.backgroundColor || "#fff");
  //Коли компонент рендериться вперше, 
  // background отримує значення з board?.custom?.background (якщо воно існує) або,
  //  якщо це значення недоступне, використовує за замовчуванням "#fff"
  const [error, setError] = useState<string | null>(null);

  const handleBackgroundChange = (newColor: string) => {
    setBackground(newColor);
    onBackgroundChange(board.id, newColor); // Оновлюємо фон через зворотний виклик
  };
  
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
  

  //відображення дошки і контенту в ній
  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      <div className="board">
        <EditableBoardTitle 
        backgroundColor={background} 
        board={board} 

        fetchBoards={fetchBoards} />
        <EditableBoardBackground
          boardId={board.id}
          initialBackground={background}
          onBackgroundChange={handleBackgroundChange}
          fetchBoards={fetchBoards}
        />
        <button className="delete-board-button" onClick={handleDeleteBoard}>
          Видалити дошку
        </button>
      </div>
    </div>
  );


  

};

export default Board;
