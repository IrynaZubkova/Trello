import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import { apiCreateBoard } from '../../api/boards';
import './home.scss';
import Board from './components/Board/Board';
import { BoardData } from '../../common/interfaces/EditableBoardTitleProps';
import { HomeProps } from '../../common/interfaces/HomeProps';
import { apiUpdateBoardBackground } from '../../api/boards';
import { toast } from 'react-toastify';

const Home: React.FC<HomeProps> = ({ board = [], update}) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState<BoardData[]>(board);
  const location = useLocation();
  
  useEffect(() => {
    setBoards(board); 
  }, [board]);


  
  const handleBoardCreated = async (newBoardTitle: string, newBoardColor: string) => {
    try {
      console.log('Створюємо дошку з назвою:', newBoardTitle, 'та кольором:', newBoardColor);
      const newBoard = await apiCreateBoard(newBoardTitle, { backgroundColor: newBoardColor });
      console.log('Створена дошка:', newBoard);
  
      const updatedBoards = [...boards, {
        id: newBoard.id,
        title: newBoardTitle,
        custom: { 
          backgroundColor: newBoardColor,
          backgroundImage: ''  // Додаємо властивість backgroundImage
        },
        lists: [] 
      }];
      setBoards(updatedBoards);
      update(updatedBoards); 
      setIsModalOpen(false);
      toast.success('Дошку успішно створено');
    } catch (error) {
      console.error('Помилка при створенні дошки:', error);
      toast.error('Не вдалося створити дошку');
    }
  };
  
  useEffect(() => {
    update(boards); // Оновлюємо дошки при поверненні на Home
  }, [location]);
  
const handleBackgroundChange = async (boardId: number, newBackground: string, newBackgroundImage: string) => {
  try {
    await apiUpdateBoardBackground(boardId, newBackground, );
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? { ...board, custom: { backgroundColor: newBackground } }
        : board
    );
    setBoards(updatedBoards);
    update(updatedBoards)
    toast.success('Колір дошки оновлено');
  } catch (error) {
    console.error('Не вдалося оновити колір дошки:', error);
    toast.error('Не вдалося оновити колір дошки'); 
  }
};

const handleBoardDelete = (boardId: number) => {
  setBoards((prevBoards) => prevBoards.filter(board => board.id !== boardId));
  update(boards.filter(board => board.id !== boardId)); 
  toast.success('Дошку видалено');
};

  function handleTitleChange(boardId: number, newTitle: string): void {
   console.log('Function handleTitleChange not implemented.');
  }

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
    <div key={boardItem.id}>
      <Board
       onBoardDelete={handleBoardDelete}
        board={boardItem}
        fetchBoards={() => update(boards)}
        onBackgroundChange={handleBackgroundChange}
        onTitleChange={handleTitleChange}  
     />
     
    </div>
  ))
) : (
  <p>Дошок немає.</p>
)}
      </div>
    </div>
  );
};

export default Home;
