/* eslint-disable */
import React, { useState } from 'react';
import Modal from './components/Modal/Modal';
import { apiCreateBoard } from '../../api/boards';


export interface BoardType {
  id: number;
  title: string;
  background: string;
}

interface HomeProps {
  board: BoardType[];
  update: any;
}
// word
const Home: React.FC<HomeProps> = ({ board, update }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBoardCreated = async (newBoardTitle: string)=> {
    const newBoard = await apiCreateBoard(newBoardTitle);
    console.log("response", newBoard);
    update();
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Список Дошок</h1>
      <button onClick={() => setIsModalOpen(true)}>Додати дошку</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleBoardCreated} />
      {board&&board.length > 0 ? (
        board.map((b) => <div key={b.id}>{b.title}</div>)
      ) : (
        <p>Дошок немає.</p>
      )}
    </div>
  );
};

export default Home;
