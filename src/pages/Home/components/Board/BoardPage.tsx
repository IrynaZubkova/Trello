import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetBoardById, apiUpdateBoardBackground } from '../../../../api/boards';
import Board from './Board';
import { BoardData, IList } from '../../../../common/interfaces/BoardData';
import List from '../List/List';
import {ModalForList} from '../List/ModalForList';
import { apiAddList, apiDeleteList, apiUpdateListTitle} from '../../../../api/list';
import ProgressBar from '@ramonak/react-progress-bar';
import EditableBoardBackground from './EditableBoardBackground'; 
import { toast } from 'react-toastify';

const BoardPage: React.FC<{ update: () => void }> = ({ update }) => {
  const { board_id } = useParams<{ board_id: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);
   const [lists, setLists] = useState(board?.lists || []);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [background, setBackground] = useState<string>('');
   const navigate = useNavigate();
  
   useEffect(() => {
    fetchBoardData();
  }, [board_id]);

  const fetchBoardData = async () => {
    if (!board_id) {
      console.log("No board_id provided");
      return;
    }else{console.log ("No board_id provided")}
    setProgress(60);
    try {
      const response = await apiGetBoardById(board_id);
      const boardData = { ...response, id: Number(board_id) };
      setBoard(boardData as BoardData);
      setLists(boardData.lists || []);
      setProgress(100);
      if (Array.isArray(boardData.lists)) {
        setLists(boardData.lists);
      } else {
        setLists([]); // Set an empty array if lists are not available
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); 
        toast.error('Помилка при завантаженні дошки');
      } else {
        console.error('An unknown error occurred');
        toast.error('Сталася непередбачена помилка');
      }
    }finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleBoardDeleted = () => {
    console.log('Board is being deleted');
    if (update) {
      update();  
    }
    console.log ("novigate GO");
    toast.success('Дошку успішно видалено');
    navigate('/');
  };
  


  useEffect(() => {
    fetchBoardData();
  }, [board_id]);

  const handleBackgroundChange = async (newBackground: string) => {
    if (!board) return;
    try {
      setBackground(newBackground);
      await apiUpdateBoardBackground(board.id, newBackground);
      setBoard((prev) => prev ? { ...prev, custom: { ...prev.custom, backgroundColor: newBackground } } : prev);
      update();
      toast.success('Фон дошки успішно змінено');
    } catch (error) {
      console.error('Помилка при зміні фону:', error);
      toast.error('Не вдалося змінити фон дошки');
    }
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
      const newList: IList = { id: Date.now(), title, position: lists.length + 1, cards: [],  boardId: board.id  }; // Створюємо новий список
      setLists(prevLists => [...prevLists, newList]);
      
      setIsModalOpen(false);
      await apiAddList(board.id, title, lists.length + 1);
      fetchBoardData();
      toast.success('Список успішно додано');
    } catch (error) {
      console.error('Помилка при додаванні списку:', error);
      toast.error('Не вдалося додати список. Спробуйте ще раз.');
    }
  };
  
  
  useEffect(() => {
    if (lists.length) {
      console.log('Список змінено', lists);
    }
  }, [lists]); 
  

  useEffect(() => {
    if (board?.lists) {
      setLists(board.lists); 
    }
  }, [board?.lists]);
  
 

  const handleDeleteList = async (listId: number) => {
    if (!board) {
      console.error('Board is not loaded!');
      return;
    }

    try {
      await apiDeleteList(board.id, listId); 
      setLists(prevLists => prevLists.filter((list) => list.id !== listId)); 
      toast.success('Список успішно видалено');
    } catch (error) {
      console.error('Error deleting list:', error);
      toast.error('Не вдалося видалити список. Спробуйте ще раз.');
    }
  };
  
  const updateListTitle = async (listId: number, newTitle: string) => {
  if (!board) {
    console.error("Board is not loaded!");
    return;
  }

  try {
    await apiUpdateListTitle(board.id, listId, newTitle);
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    ); 
    toast.success('Заголовок списку успішно оновлено');
  } catch (error) {
    console.error("Помилка при оновленні заголовка списку:", error);
    toast.error("Не вдалося оновити заголовок списку.");
  }
};

  
  if (!board) {
    return <div>   </div>;
  }


  return (
    <div className="boardPage">
       <div className="progress-container">
        {loading && <ProgressBar completed={progress} bgColor="blue" height="10px" />}
        </div>
      <Board 
        board={board} 
        onBoardDelete={handleBoardDeleted} 
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
  update={fetchBoardData}
  updateTitle={updateListTitle} 
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
      <EditableBoardBackground 
        boardId={board.id} 
        initialBackground={background} 
        initialBackgroundImage={board.custom?.backgroundImage || ''} 
        fetchBoards={update} 
        onBackgroundChange={handleBackgroundChange} 
      />
    </div>
  );
};

export default BoardPage;