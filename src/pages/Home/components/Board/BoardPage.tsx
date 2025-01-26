import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetBoardById } from '../../../../api/boards';
import Board from './Board';
import { BoardData, IList } from '../../../../common/interfaces/BoardData';
import List from '../List/List';
import { ICard } from '../../../../common/interfaces/ListProps';
import {ModalForList} from '../List/ModalForList';
import { apiAddList, apiDeleteList} from '../../../../api/list';

const BoardPage: React.FC<{ update: () => void }> = ({ update }) => {
  const { board_id } = useParams<{ board_id: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);
   const [lists, setLists] = useState(board?.lists || []);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate();
  

  const fetchBoardData = async () => {
    if (!board_id) {
      console.log("No board_id provided");
      return;
    }else{console.log ("No board_id provided")}

    try {
      const response = await apiGetBoardById(board_id);
      const boardData = { ...response, id: Number(board_id) };
      setBoard(boardData as BoardData);
      setLists(boardData.lists || []);
      if (Array.isArray(boardData.lists)) {
        setLists(boardData.lists);
      } else {
        setLists([]); // Set an empty array if lists are not available
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); 
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const handleBoardDeleted = () => {
    console.log('Board is being deleted');
    if (update) {
      update();  
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
  
  const handleAddList = async (title: string) => {
    if (!board) {
      console.error('Дошка ще не завантажена!');
      return;
    }
    try {
      const newList: IList = { id: Date.now(), title, position: lists.length + 1, cards: [] }; // Створюємо новий список
      setLists(prevLists => [...prevLists, newList]); // Оновлюємо локальний стан списків
      
      setIsModalOpen(false);
      await apiAddList(board.id, title, lists.length + 1);
      fetchBoardData();
  
    } catch (error) {
      console.error('Помилка при додаванні списку:', error);
      alert('Не вдалося додати список. Спробуйте ще раз.');
    }
  };
  
  
  useEffect(() => {
    if (lists.length) {
      // Логіка для синхронізації UI з новими списками
      console.log('Список змінено', lists);
    }
  }, [lists]);  // Оновлюється кожного разу, коли список змінюється
  

  useEffect(() => {
    if (board?.lists) {
      setLists(board.lists); // Оновлюємо локальний стан списків
    }
  }, [board?.lists]);
  
 

  const handleDeleteList = async (listId: number) => {
    if (!board) {
      console.error('Board is not loaded!');
      return;
    }

    try {
      await apiDeleteList(board.id, listId); // Виклик функції для видалення списку
      setLists(prevLists => prevLists.filter((list) => list.id !== listId)); // Оновлюємо локальний стан списків
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('Не вдалося видалити список. Спробуйте ще раз.');
    }
  };
  
  if (!board) {
    return <div>   </div>;
  }


  return (
    <div className="boardPage">
      <Board 
        board={board} 
        onBoardDelete={handleBoardDeleted} 
        onBackgroundChange={handleBackgroundChange} 
        fetchBoards={update} 
        onTitleChange={handleTitleChange}  
      />
       <button 
                className="add-list-button" 
                onClick={() => setIsModalOpen(true)} 
              >
                Додати список
              </button>

              {Array.isArray(lists) && lists.length > 0 ? (
                <div className="lists">
                 {lists.map((list) => (
        list ? (
          <div key={list.id} className="list-item">
      <List 
  key={list.id} 
  id={list.id} 
  boardId={board.id}   
  title={list.title} 
  position={list.position || 0}
  cards={list.cards || []} 
/>

        <button onClick={() => handleDeleteList(list.id)}>Видалити</button>
            </div>
      ): null
        
      ))}
      
              </div>
              ) : (
                <div> </div>
              )}
              <ModalForList
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddList}
      />
    </div>
  );
};

export default BoardPage;