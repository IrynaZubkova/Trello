import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalForCard.scss';
import { ModalPropsCards } from '../../../../common/interfaces/ModalProps';
import { toast } from 'react-toastify';

const ModalForCard: React.FC<ModalPropsCards> = ({
  isOpen,
  onClose,
  onSave,
  cardTitle,
  setCardTitle,
  cardDescription,
  setCardDescription,
  cardCustom,
  setCardCustom,
}) => {
  const modalRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Створюємо контейнер для модалки
    modalRootRef.current = document.createElement('div');
    document.body.appendChild(modalRootRef.current);

    return () => {
      // Видаляємо контейнер при розмонтуванні
      if (modalRootRef.current) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, []);

  const validateTitle = (title: string) => {
    const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/;
    if (title.trim() === '') {
      toast.error('Назва картки не повинна бути порожньою');
      return false;
    }
    if (!regex.test(title)) {
      toast.error('Назва картки містить недопустимі символи');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateTitle(cardTitle)) {
      onSave(cardTitle, cardDescription, cardCustom);
      setCardTitle('');
      setCardDescription('');
      setCardCustom({});
      onClose();
    }
  };

  if (!isOpen || !modalRootRef.current) return null;

  const modalContent = (
    <form onSubmit={handleSubmit}>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Введіть назву картки</h2>
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            placeholder="Назва картки"
          />
          <textarea
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
            placeholder="Опис картки"
          />
          <input
            type="datetime-local"
            value={cardCustom.deadline || ''}
            onChange={(e) => setCardCustom({ ...cardCustom, deadline: e.target.value })}
          />
          <div className="modal-actions">
            <button type="submit">Додати картку</button>
            <button type="button" onClick={onClose}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  return ReactDOM.createPortal(modalContent, modalRootRef.current);
};

export default ModalForCard;
