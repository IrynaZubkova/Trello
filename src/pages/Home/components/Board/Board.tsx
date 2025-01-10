import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/request';
import EditableBoardTitle from './EditableBoardTitle';
import EditableBoardBackground from './EditableBoardBackground';
import './board.scss';
import { BoardProps } from '../../../../common/interfaces/BoardProps';
import List from '../List/List'; 
import { ICard } from '../../../../common/interfaces/ListProps';




const Board: React.FC<BoardProps> = ({ board, fetchBoards, onBackgroundChange }) => {
  if (!board) {
    return <div>Board not found</div>; // чи будь-яка інша помилка
  }

  const navigate = useNavigate();
  const [background, setBackground] = useState<string>(board?.custom?.backgroundColor || "#fff");
  const [lists, setLists] = useState(board?.lists || []);

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
  
  const handleAddList = () => {
    const newList = { 
      id: Date.now(), // Генеруємо унікальний ідентифікатор
      title: 'Новий список', 
      cards: [] 
    };
    setLists(prevLists => [...prevLists, newList]); // Додаємо новий список до поточного стану
  };
  
  const handleBoardClick = () => {
    if (!board?.id) {
      return; // Додано перевірку на наявність id
    }
    navigate(`/board/${board.id}`);
  };
  

  //відображення дошки і контенту в ній
  return (
    <div className="board-container">
      {error && <div className="error-message">{error}</div>}
      <div className="board" onClick={handleBoardClick}>
        {/* Лінк тільки на саму дошку */}
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

        {/* Кнопки редагування і видалення поза лінком */}
        <button className="delete-board-button" onClick={handleDeleteBoard}>
          Видалити дошку
        </button>

        <button className="add-list-button" onClick={handleAddList}>
          Додати список
        </button>

        {board?.lists?.length ? (
          <div className="lists">
            {lists.map((list: { id: number; title: string; cards: ICard[] }) => (
              <List key={list.id} id={list.id} title={list.title} cards={list.cards} />
            ))}
          </div>
        ) : (
          <div>Список порожній</div>
        )}
      </div>
    </div>
  );
};

export default Board;
