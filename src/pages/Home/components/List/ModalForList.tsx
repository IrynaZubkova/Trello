import React, { useState } from 'react';
import './ModalForList.scss';
import { ModalProps } from '../../../../common/interfaces/ModalPropsForList';
import { regex } from '../../../../common/constants/regex';

export const ModalForList: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateInput = (value: string) => {
    if (!regex.test(value)) {
      setError('Назва списку містить заборонені символи.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (title.trim() === '') {
      alert('Назва дошки не повинна бути порожньою');
      return;
    }
    if (validateInput(title)) {
      try {
        await onSave(title); // Виклик функції з `BoardPage`
        setTitle(''); // Очищення поля
        onClose(); // Закриття модального вікна
      } catch (error) {
        console.error('Помилка при збереженні списку:', error);
        alert('Не вдалося додати список. Спробуйте ще раз.');
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    validateInput(value); // Перевіряємо під час введення
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

//якщо бланк, додати перевірку на зміну тайтлу пробілів

export default ModalForList;
