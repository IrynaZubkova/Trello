import React from 'react';
import { ICard } from '../../../../common/interfaces/ICard';
import './list.scss';
import {ListProps} from '../../../../common/interfaces/ListProps';

function List({ title, cards }: ListProps): React.ReactElement {
  return (
    <div className="list">
      <h2>{title}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
      <button className="add-card-button">Додати картку</button>
    </div>
  );
}

export default List;
