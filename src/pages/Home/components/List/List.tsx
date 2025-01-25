import React, { useState } from 'react';
import { ICard } from '../../../../common/interfaces/ICard';
import './list.scss';
import { ListProps } from '../../../../common/interfaces/ListProps';

function List({ id, title, cards: initialCards }: ListProps): React.ReactElement {
  const [cards, setCards] = useState<ICard[]>(initialCards);

  const handleAddCard = () => {
    const newCard = { id: Date.now(), title: 'Нова картка' };
    setCards([...cards, newCard]); // Додаємо картку до стану
    
  };

  return (
    <div className="list">
      <h2>{title}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
      <button className="add-card-button" onClick={handleAddCard}>
        Додати картку
      </button>
    </div>
  );
}

export default List;
