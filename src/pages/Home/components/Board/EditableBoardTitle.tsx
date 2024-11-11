import React, { useState } from 'react';
import api from '../../../../api/request';

interface EditableBoardTitleProps {
  board: { id: number; title: string };
  fetchBoards: () => void;
}

const EditableBoardTitle: React.FC<EditableBoardTitleProps> = ({ board, fetchBoards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);
  const [error, setError] = useState<string | null>(null);

  const handleEditTitle = async () => {
    if (!newTitle) {
      setError('Назва дошки не повинна бути порожньою');
      return;
    }
  
    const regex = /^[a-zA-Z0-9аА\s\-_\.]+$/; 
    if (!regex.test(newTitle)) {
      setError('Назва дошки містить недопустимі символи');
      return;
    }

    try {
      await api.put(`/boards/${board.id}`, { title: newTitle });
      fetchBoards(); 
      setIsEditing(false); 
      setError(null); 
    } catch (err) {
      setError('Не вдалося редагувати дошку');
    }
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleEditTitle} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEditTitle(); 
            }
          }}
        />
      ) : (
        <span>{board.title}</span>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default EditableBoardTitle;
