import React, { useState } from 'react';
import { apiEditBoard } from '../../../../api/boards';
import { EditableBoardTitleProps } from '../../../../common/interfaces/EditableBoardTitleProps';
import { regex } from '../../../../common/constants/regex';
import { toast } from 'react-toastify'; 

const EditableBoardTitle: React.FC<EditableBoardTitleProps> = ({ board, fetchBoards, backgroundColor}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(board.title);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!regex.test(value)) {
      setError('');
      toast.error('Назва дошки містить недопустимі символи'); 
      return;
    } else {
      setError(null);
    }
    setNewTitle(value);
  };

  const handleSave = async () => {
    if (!newTitle.trim()) {
      toast.error('Назва не може бути порожньою або складатися лише з пробілів'); 
      return;
    }
    
    if (error) return;

    try {
      await apiEditBoard(board.id, newTitle);
      fetchBoards();
      board.title = newTitle;
      setIsEditing(false);
      toast.success('Назву дошки оновлено успішно'); 
    } catch (error) {
      console.error('Помилка при оновленні дошки:', error);
      toast.error('Помилка при оновленні дошки');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !error) {
      handleSave();
    }
  };

  const handleBackgroundChange = () => {
    // const newColor = 'red'; 
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