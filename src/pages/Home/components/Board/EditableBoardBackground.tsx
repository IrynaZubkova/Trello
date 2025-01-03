import React, { useState } from 'react';
import api from '../../../../api/request';
import { EditableBoardBackgroundProps } from '../../../../common/interfaces/EditableBoardBackgroundProps';


const EditableBoardBackground: React.FC<EditableBoardBackgroundProps> = ({
  boardId,
  initialBackground,
  onBackgroundChange,
  fetchBoards,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(initialBackground);

  // Обробник зміни кольору
  const handleColorChange = async () => {
    const newColor = backgroundColor; 
    setBackgroundColor(newColor); // Оновлюємо локальний стан
    onBackgroundChange(newColor);
    try {
      // Оновлюємо колір у бекенді
      await api.put(`/board/${boardId}`, { custom: {backgroundColor: newColor}});
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
          aria-label="Виберіть колір фону дошки"
          onChange={(e) => setBackgroundColor(e.target.value)} // Оновлюємо стан
        />
       <button onClick={handleColorChange}>Змінити колір</button>
      </label>
    </div>
  );
};

export default EditableBoardBackground;