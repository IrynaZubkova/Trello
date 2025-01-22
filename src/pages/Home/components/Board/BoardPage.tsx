import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetBoardById } from '../../../../api/boards';
import Board from './Board';
import { BoardData } from '../../../../common/interfaces/BoardData';
import List from '../List/List';
import { ICard } from '../../../../common/interfaces/ListProps';
import {ModalForList} from '../List/ModalForList';
import { apiAddList, apiGetLists } from '../../../../api/list';

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
    if (!board) return;
    try {
      const newList = await apiAddList(board.id, title, lists.length + 1); // Виконання запиту
      setLists((prevLists) => [...prevLists, newList]); // Додавання до локального стану
    } catch (error) {
      console.error('Помилка при додаванні списку:', error);
      alert('Не вдалося додати список. Спробуйте ще раз.');
    }
  };


  useEffect(() => {
    if (board?.lists) {
      setLists(board.lists); // Оновлюємо локальний стан списків
    }
  }, [board?.lists]);
  

  if (!board) {
    return <div>   </div>;
  }


  return (
    <div>   
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
      
              {board?.lists?.length ? (
                <div>
                {lists.map(list => (
                  <div key={list.id}>
                    <h3>{list.title}</h3>
          
                  </div>
                ))}
              </div>
              ) : (
                <div>Список порожній</div>
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