import React, { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal';
import { apiCreateBoard } from '../../api/boards';
import './home.scss';
import Board from './components/Board/Board';
import { BoardData } from './components/Board/EditableBoardTitle';

interface HomeProps {
  board: BoardData[]; // Пропс для дошок
  update: (boards: BoardData[]) => void; // Функція для оновлення дошок
}

const Home: React.FC<HomeProps> = ({ board = [], update }) => { // Ініціалізація board
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState<BoardData[]>(board);

  useEffect(() => {
    setBoards(board); // Оновлюємо board з пропсів
  }, [board]);

  const handleBoardCreated = async (newBoardTitle: string, newBoardColor: string) => {
    try {
      console.log('Створюємо дошку з назвою:', newBoardTitle, 'та кольором:', newBoardColor);
      const newBoard = await apiCreateBoard(newBoardTitle, { backgroundColor: newBoardColor });
      console.log('Створена дошка:', newBoard);

      const updatedBoards = [...boards, {
        id: newBoard.id,
        title: newBoardTitle,
        custom: { backgroundColor: newBoardColor }
      }];
      setBoards(updatedBoards);
      update(updatedBoards); // Оновлюємо дошки
      setIsModalOpen(false);
    } catch (error) {
      console.error('Помилка при створенні дошки:', error);
    }
  };

  const handleBackgroundChange = (boardId: number, newBackground: string) => {
    const updatedBoards = boards.map((b) =>
      b.id === boardId ? { ...b, custom: { backgroundColor: newBackground } } : b
    );
    setBoards(updatedBoards);
    update(updatedBoards); // Оновлення дошок
  };

  return (
    <div>
      <h1 className="board-list-title">Список Дошок</h1>
      <button className="add-board-button" onClick={() => setIsModalOpen(true)}>Додати дошку</button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleBoardCreated}
      />
      
      <div className="Content">
        {boards.length > 0 ? (
          boards.map((boardItem) => (
            <Board
              key={boardItem.id}
              board={boardItem}
              fetchBoards={() => update(boards)}
              onBackgroundChange={handleBackgroundChange}
            />
          ))
        ) : (
          <p>Дошок немає.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
