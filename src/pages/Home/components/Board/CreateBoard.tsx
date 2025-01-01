import React, { useState } from 'react';
import api from '../../../../api/request';

export interface BoardType {
  id: number;
  title: string;
  custom?: { backgroundColor: string };
}

interface CreateBoardProps {
  onBoardCreated: (newBoard: BoardType) => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onBoardCreated }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff'); // Початковий колір
  const [error, setError] = useState<string | null>(null);

  const handleCreateBoard = async () => {
    // Валідація введення
    if (!title.trim()) {
      setError('Назва дошки не повинна бути порожньою');
      return;
    }

    try {
      const response = await api.post('/boards', { title, backgroundColor: color });
// const [backgroundColor, setBackgroundColor] = useState<string>(initialBackground);
        const newBoard: BoardType = response.data;

        // Передаємо нову дошку до батьківського компонента
        onBoardCreated(newBoard);

        // Скидаємо стан після успішного створення
        setTitle('');
        setColor('#ffffff'); // Повертаємо стандартний колір
        setError(null); // Скидаємо помилку
      
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
