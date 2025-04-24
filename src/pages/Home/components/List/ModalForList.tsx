import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalForList.scss';
import { ModalPropsLists } from '../../../../common/interfaces/ModalProps';
import { regex } from '../../../../common/constants/regex';
import { toast } from 'react-toastify';

export const ModalForList: React.FC<ModalPropsLists> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const modalRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Створюємо новий <div> для модалки, якщо його немає
    modalRootRef.current = document.createElement('div');
    document.body.appendChild(modalRootRef.current);

    return () => {
      // Видаляємо контейнер модалки при розмонтуванні компонента
      if (modalRootRef.current) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRootRef.current) return null;

  const validateInput = (value: string) => {
    if (value.trim() === '') {
      toast.error('Назва списку не повинна бути порожньою');
      return false;
    }

    if (!regex.test(value)) {
      toast.error('Назва списку містить заборонені символи.');
      return false;
    }
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
      } catch {
        toast.error('Не вдалося додати список. Спробуйте ще раз.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    validateInput(value);
  };

  const modalContent = (
    <form onSubmit={handleSave}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Додати список</h2>
          <input type="text" value={title} onChange={handleInputChange} placeholder="Введіть назву списку" />
          <div className="modal-actions">
            <button onClick={onClose}>Закрити</button>
            <button onClick={handleSave} disabled={!title.trim()}>
              Зберегти
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  return ReactDOM.createPortal(modalContent, modalRootRef.current);
};

export default ModalForList;
