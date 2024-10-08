import React, { useState } from 'react';
import List from './components/List/List'; 
import './components/Board/board.scss';
import { ICard } from '../../common/interfaces/ICard';

interface ListType {
  id: number;
  title: string;
  cards: ICard[];
}

export function Board(): JSX.Element {
  const [title] = useState<string>('Моя тестова дошка');
  const [lists] = useState<ListType[]>([
    {
      id: 1,
      title: 'Плани',
      cards: [
        { id: 1, title: 'помити кота' },
        { id: 2, title: 'приготувати суп' },
        { id: 3, title: 'сходити в магазин' },
      ],
    },
    {
      id: 2,
      title: 'В процесі',
      cards: [{ id: 4, title: 'подивитися серіал' }],
    },
    {
      id: 3,
      title: 'Зроблено',
      cards: [
        { id: 5, title: 'зробити домашку' },
        { id: 6, title: 'погуляти з собакой' },
      ],
    },
  ]);

  return (
    <div>
      <h1>{title}</h1>
      <button className="add-list-button">Додати список</button>
      <div className="lists-container">
        {lists.map((list) => (
          <List key={list.id} title={list.title} cards={list.cards} />
        ))}
      </div>
    </div>
  );
}
