import React, { useState } from 'react';
import api from '../../../../api/request';

interface EditableBoardBackgroundProps {
  boardId: number;
  initialBackground: string;
  onBackgroundChange: (color: string) => void; 
  fetchBoards: () => void;
}

const EditableBoardBackground: React.FC<EditableBoardBackgroundProps> = ({
  boardId,
  initialBackground,
  onBackgroundChange,
  fetchBoards,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(initialBackground);

  // Обробник зміни кольору
  const handleColorChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setBackgroundColor(newColor); // Оновлюємо локальний стан
    onBackgroundChange(newColor);
    try {
      // Оновлюємо колір у бекенді
      await api.put(`/board/${boardId}`, { background: newColor });
      fetchBoards(); // Оновлюємо списки дошок
    } catch (err) {
      console.error('Не вдалося оновити колір фону:', err);
    }
  };

  return (
    <div className="editable-board-background">
      <label>
        <span>Виберіть колір фону:</span>
        <input
          type="color"
          value={backgroundColor}
          onChange={handleColorChange}
          aria-label="Виберіть колір фону дошки"
        />
      </label>
    </div>
  );
};

export default EditableBoardBackground;
