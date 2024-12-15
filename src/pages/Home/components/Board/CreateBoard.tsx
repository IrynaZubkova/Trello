import React, { useState } from 'react';
import api from '../../../../api/request'; 
export interface BoardType {
  id: number;
  title: string;
  background: string; 
}

interface CreateBoardProps {
  onCardCreated: (newBoard: BoardType) => void; 
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onCardCreated }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreateBoard = async () => {
    if (!title) {
      setError('Назва дошки не повинна бути порожньою');
      return;
    }


    try {
      const response = await api.post('/boards', { title }); 
      onCardCreated(response.data); 
      setTitle('');
      setError(null); 
    } catch (err) {
      setError('Не вдалося створити дошку');
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва нової дошки" />
      <button onClick={handleCreateBoard}>Додати</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreateBoard;
