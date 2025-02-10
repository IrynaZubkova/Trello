import React, { useState } from 'react';
import './ModalForCard.scss';
import { ModalProps } from '../../../../common/interfaces/ModalPropsForCard';


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
    const handleSubmit = () => {
      if (cardTitle.trim()) { 
        onSave(cardTitle, cardDescription, cardCustom);
        setCardTitle(''); 
        setCardDescription(''); 
        setCardCustom({});
        onClose(); 
      } else {
        alert('Будь ласка, введіть назву картки');
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