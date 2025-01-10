import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetBoardById } from '../../../../api/boards';
import Board from './Board'; // Використовуємо Board
import { BoardData } from '../../../../common/interfaces/BoardData'; // Імпортуємо BoardData інтерфейс

const BoardPage: React.FC = () => {
  const { board_id } = useParams(); // Отримуємо id дошки з параметрів URL
  const [board, setBoard] = useState<BoardData | null>(null); // Використовуємо інтерфейс для стейту

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!board_id) {
        console.log("No board_id provided");
        return; // Вийти з функції, якщо board_id не існує
      }
      console.log("useEffect triggered with board_id:", board_id);
  
      // Переводимо board_id в число для порівняння
      const boardId = Number(board_id);
  
      try {
        // Отримуємо всі дошки
        const data = await apiGetBoardById(board_id);
        console.log("Fetched boards:", data);
        // Встановлюємо знайдену дошку, або null, якщо не знайдена
        setBoard(data || null);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
  
    fetchBoardData(); // Викликаємо асинхронну функцію
  }, [board_id]); // Виконувати ефект лише при зміні board_id
  

  // Якщо дошка не знайдена, відображаємо повідомлення
  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div>
      <h1>{board.title}</h1> 
      <Board board={board} fetchBoards={() => {}} onBackgroundChange={() => {}} />
    </div>
  );
};

export default BoardPage;
