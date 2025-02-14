import React, { useState } from 'react';
import './ModalForList.scss';
import { ModalProps } from '../../../../common/interfaces/ModalPropsForList';
import { regex } from '../../../../common/constants/regex';
import { toast } from 'react-toastify';

export const ModalForList: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateInput = (value: string) => {
    if (value.trim() === '') { 
      toast.error('Назва списку не повинна бути порожньою');
      return false;
    }
  
    if (!regex.test(value)) { 
      toast.error('Назва списку містить заборонені символи.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (title.trim() === '') {
      return;
    }
    if (validateInput(title)) {
      try {
        await onSave(title);
        setTitle(''); 
        onClose(); 
      } catch (error) {
        toast.error('Не вдалося додати список. Спробуйте ще раз.');  }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    validateInput(value); 
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Додати список</h2>
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Введіть назву списку"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Закрити</button>
          <button onClick={handleSave} disabled={!title.trim()}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForList;
