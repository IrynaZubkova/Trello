import React, { useState } from 'react';
import { ICard } from '../../../../common/interfaces/ICard';
import './list.scss';
import { ListProps } from '../../../../common/interfaces/ListProps';
import ModalForCard from './ModalForCard';
import { apiAddCard } from '../../../../api/card';

function List({ id, boardId, title, cards: initialCards }: ListProps): React.ReactElement {
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardCustom, setCardCustom] = useState({ deadline: '' });


   const handleAddCard = async () => {
    try {
      const newCard = {
        title: cardTitle,
        list_id: id, 
        position: cards.length + 1, 
        description: cardDescription,
        custom: cardCustom,
      };
      console.log('newCard:', newCard);
     const response = await apiAddCard(boardId, newCard.list_id, newCard.title, newCard.position, newCard.description, newCard.custom);

      
      setCards([...cards, {
        id: response.id, title: cardTitle,
        description: '',
        color: '',
        custom: undefined,
        users: [],
        created_at: ''
      }]);
      setModalOpen(false);
      setCardTitle('');
      setCardDescription('');
      setCardCustom({ deadline: '' });
    } catch (error) {
      console.error('Помилка при додаванні картки:', error);
    }
  };


  return (
    <div className="list">
      <h2>{title}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
      <button className="add-card-button" onClick={() => setModalOpen(true)}>
        Додати картку
      </button>
      <ModalForCard 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleAddCard}
        cardTitle={cardTitle}
        setCardTitle={setCardTitle}
        cardDescription={cardDescription}
        setCardDescription={setCardDescription}
        cardCustom={cardCustom}
        setCardCustom={setCardCustom} 
      />
    </div>
  );
}

export default List;
