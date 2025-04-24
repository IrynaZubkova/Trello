import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import { ModalPropsBoard } from '../../../../common/interfaces/ModalProps';
import { toast } from 'react-toastify';

const Modal: React.FC<ModalPropsBoard> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const modalRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Створюємо контейнер для модалки при першому рендері
    modalRootRef.current = document.createElement('div');
    document.body.appendChild(modalRootRef.current);

    return () => {
      // Видаляємо контейнер при розмонтуванні компонента
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

  const handleCreateClick = () => {
    if (title.trim() === '') {
      toast.error('Назва дошки не повинна бути порожньою');
      return;
    }
    const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/;
    if (!regex.test(title)) {
      toast.error('Назва дошки містить недопустимі символи');
      return;
    }
    onCreate(title, color);
    setTitle('');
    onClose();
  };

  const modalContent = (
    <form onSubmit={handleCreateClick}>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Додати нову дошку</h2>

          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва нової дошки" />
          <label>
            Оберіть колір фону:
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>
          <button onClick={handleCreateClick}>Додати</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </form>
  );

  return ReactDOM.createPortal(modalContent, modalRootRef.current);
};

export default Modal;
