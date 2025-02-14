import React, { useState } from 'react';
import './ModalForCard.scss';
import { ModalProps } from '../../../../common/interfaces/ModalPropsForCard';
import { toast } from 'react-toastify';

const ModalForCard: React.FC<ModalProps> = ({
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

    const validateTitle = (title: string) => {
      const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/; // Регістр символів для дозволених
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
  
    if (!isOpen) return null;
  
    return (
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
            value={cardCustom.deadline}
            onChange={(e) => setCardCustom({ ...cardCustom, deadline: e.target.value })}
          />
          <button onClick={handleSubmit}>Додати картку</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    );
  };
  
  export default ModalForCard;