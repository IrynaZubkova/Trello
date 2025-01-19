import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetBoardById } from '../../../../api/boards';
import Board from './Board';
import { BoardData } from '../../../../common/interfaces/BoardData';

const BoardPage: React.FC<{ update: () => void }> = ({ update }) => {
  const { board_id } = useParams<{ board_id: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);
  
  const navigate = useNavigate();

  const fetchBoardData = async () => {
    if (!board_id) {
      console.log("No board_id provided");
      return;
    }

    try {
      const response = await apiGetBoardById(board_id);
      const boardData = {
        ...response,
        id: Number(board_id)
      };
      setBoard(boardData as unknown as BoardData);
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); // Якщо це об'єкт помилки, ми можемо доступитись до message
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const handleBoardDeleted = () => {
    console.log('Board is being deleted');
    if (update) {
      update();  // Викликаємо без параметра
    }
    console.log ("novigate GO");
    navigate('/');
  };
  


  useEffect(() => {
    fetchBoardData();
  }, [board_id]);

  const handleBackgroundChange = (boardId: number, color: string) => {
    console.log(`Changing background for board ${boardId} to ${color}`);
    
  };

  const handleTitleChange = (boardId: number, newTitle: string) => {
    console.log(`Changing title to: ${newTitle}`);
  };
  
  if (!board) {
    return <div>Board not found</div>;
  }


  return (
    <div>   
      <Board 
        board={board} 
        onBoardDelete={handleBoardDeleted}  // Передаємо функцію видалення
        onBackgroundChange={handleBackgroundChange} 
        fetchBoards={update} 
        onTitleChange={handleTitleChange}  
      />
    </div>
  );
};

export default BoardPage;