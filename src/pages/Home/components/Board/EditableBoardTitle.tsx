import React, { useState } from 'react';
import { apiEditBoard } from '../../../../api/boards';
import { EditableBoardTitleProps } from '../../../../common/interfaces/EditableBoardTitleProps';
import { regex } from '../../../../common/constants/regex';


const EditableBoardTitle: React.FC<EditableBoardTitleProps> = ({ board, fetchBoards, backgroundColor}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(board.title);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!regex.test(value)) {
      setError('Назва дошки містить недопустимі символи');
    } else {
      setError(null);
    }
    setNewTitle(value);
  };

  const handleSave = async () => {
    if (!newTitle.trim()) {
      setError('Назва не може бути порожньою або складатися лише з пробілів');
      return;
    }
    if (error) return;

    try {
      await apiEditBoard(board.id, newTitle);
      fetchBoards();
      board.title = newTitle;
      setIsEditing(false);
    } catch (error) {
      console.error('Помилка при оновленні дошки:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !error) {
      handleSave();
    }
  };

  const handleBackgroundChange = () => {
    // Приклад функції для зміни фону
    const newColor = 'red'; // Замість цього ви можете отримати колір з іншого джерела (наприклад, через input або picker)
    handleBackgroundChange();
  };

  return (
    <div className="board-item" style={{ backgroundColor }}>
      <div className="board-title">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        ) : (
          <span onClick={() => setIsEditing(true)}>{board.title}</span>
        )}
      </div>
    </div>
  );
};

export default EditableBoardTitle;