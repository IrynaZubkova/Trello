import React, { useState } from 'react';
import api from '../../../../api/request';
import { CreateBoardProps, BoardType } from '../../../../common/interfaces/CreateBoardProps';

const CreateBoard: React.FC<CreateBoardProps> = ({ onBoardCreated }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [error, setError] = useState<string | null>(null);

  const handleCreateBoard = async () => {
    if (!title.trim()) {
      setError('Назва дошки не повинна бути порожньою');
      return;
    }

    try {
      const response = await api.post('/boards', { title, backgroundColor: color });
        const newBoard: BoardType = response.data;
        onBoardCreated(newBoard);
        setTitle('');
        setColor('#ffffff'); 
        setError(null); 
      
    } catch (err) {
      console.error(err);
      setError('Не вдалося створити дошку. Перевірте підключення.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Назва нової дошки"
      />
      <label>
        Оберіть колір:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <button onClick={handleCreateBoard}>Додати</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CreateBoard;
