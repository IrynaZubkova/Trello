import React, { useState } from 'react';
import { apiEditBoard } from '../../../../api/boards';

interface BoardData {
  id: number;
  title: string;
  background: string;
}

interface EditableBoardTitleProps {
  board: BoardData;
  background: string;
  fetchBoards: () => void;
}

const EditableBoardTitle: React.FC<EditableBoardTitleProps> = ({ board, fetchBoards, background}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(board.title);
  const [error, setError] = useState<string | null>(null);

  const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/;
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
    if (error) return;

    try {
      await apiEditBoard(board.id, newTitle);
      fetchBoards();
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

  return (
    <div className="board-item" style={{backgroundColor: background}}>
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
