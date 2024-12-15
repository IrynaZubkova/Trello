import React, { useState } from 'react';
import Modal from './components/Modal/Modal';
import { apiCreateBoard } from '../../api/boards';
import './home.scss';
import Board from './components/Board/Board';
export interface BoardType {
  id: number;
  title: string;
  background: string;
}
interface HomeProps {
  background: string;
  board: BoardType[];
  update: any;
}
const Home: React.FC<HomeProps> = ({ board, update, background }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBoardCreated = async (newBoardTitle: string) => {
    const newBoard = await apiCreateBoard(newBoardTitle);
    console.log('response', newBoard);
    update();
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="board-list-title">Список Дошок</h1>
      <button className="add-board-button" onClick={() => setIsModalOpen(true)}>Додати дошку</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleBoardCreated} />
      {/*{board && board.length > 0 ? (*/}
      {/*  board.map((b) => (*/}
      {/*    <EditableBoardTitle key={b.id} board={b} fetchBoards={update} />*/}
      {/*  ))*/}
      {/*) : (*/}
      {/*  <p>Дошок немає.</p>*/}
      {/*)}*/}
      <div className="Content">
      {board && board.length > 0 ? (
        board.map((b) => (
        <Board key={b.id} board={b} fetchBoards={update} />
        ))
      ) : (
        <p>Дошок немає.</p>
      )}
      </div>

      <div
      className="board-item"
      style={{ backgroundColor: background }} // Застосовуємо динамічний стиль
    >
      {/* Вміст компонента */}
    </div>

    </div>
  );
};

export default Home;
