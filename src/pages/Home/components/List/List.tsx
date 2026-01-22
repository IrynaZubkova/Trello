import React, { useState } from 'react';
import './list.scss';
import { IList } from '../../../../common/interfaces/BoardData';
import ModalForCard from './ModalForCard';
import { apiAddCard, apiDeleteCard } from '../../../../api/card';
import { regex } from '../../../../common/constants/regex';
import { toast } from 'react-toastify';
import { useDragAndDrop } from './dragNDrop';

function List({
  id,
  boardId,
  title,
  cards: initialCards,
  // position,
  update,
  updateTitle,
  onCardDrop,
  allLists,
  setAllLists,
  listsRef,
}: IList & {
  update: () => void;
  updateTitle: (id: number, newTitle: string) => void;
  onCardDrop: (updatedLists: IList[]) => void;
  allLists: IList[];
  setAllLists: React.Dispatch<React.SetStateAction<IList[]>>;
  listsRef: React.MutableRefObject<IList[]>;
}): React.ReactElement {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [cardDescription, setCardDescription] = useState<string>('');
  const [cardCustom, setCardCustom] = useState<{ deadline: string }>({ deadline: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const { handleDragStart, handleDragEnd, handleDragEnter, handleDrop, handleDragOver, dragOverSlot } = useDragAndDrop(
    allLists,
    listsRef,
    onCardDrop
  );

  const handleAddCard = async () => {
    try {
      const newCard = {
        title: cardTitle,
        list_id: id,
        position: initialCards.length + 1,
        description: cardDescription,
        custom: cardCustom,
      };

      console.log('Creating new card:', newCard);
      const savedCard = await apiAddCard(
        boardId,
        newCard.list_id,
        newCard.title,
        newCard.position,
        newCard.description,
        newCard.custom
      );

      const updatedLists = allLists.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            cards: [...list.cards, savedCard], // додаємо нову картку в список
          };
        }
        return list;
      });

      setAllLists(updatedLists);
      update();
      console.log('updated!');
      setModalOpen(false);
      setCardTitle('');
      setCardDescription('');
      setCardCustom({ deadline: '' });
      toast.success('Картку успішно додано!');
    } catch (error) {
      console.error('Помилка при додаванні картки:', error);
      toast.error('Сталася помилка при додаванні картки');
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await apiDeleteCard(boardId, cardId);
      update();
      toast.success('Картку успішно видалено!');
    } catch (error) {
      console.error('Помилка при видаленні картки:', error);
      toast.error('Сталася помилка при видаленні картки');
    }
  };

  const handleTitleEdit = () => setIsEditing(true);
  const handleBlur = () => {
    setIsEditing(false);
    if (!newTitle.trim()) {
      toast.error('Назва не може бути порожньою або складатися лише з пробілів');
      return;
    }
    if (newTitle.trim() && newTitle !== title && regex.test(newTitle)) {
      updateTitle(id, newTitle);
    } else {
      setNewTitle(title);
      if (!regex.test(newTitle)) {
        toast.error('Назва містить недопустимі символи');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="list" onDragOver={handleDragOver}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="edit-title-input"
        />
      ) : (
        <h2 className="list-title" onClick={handleTitleEdit}>
          {title}
        </h2>
      )}
      <div className="card-list-container">
        <ul
          onDragOver={handleDragOver}
          onDrop={(e) => {
            const listCards = allLists.find((list) => list.id === id)?.cards || [];
            if (listCards.length === 0) {
              // якщо список порожній, вставляємо картку на 0 позицію
              handleDrop(e, id, 0);
            }
          }}
        >
          {initialCards.length === 0 && (
            <li
              className={`empty-drop-zone ${dragOverSlot?.listId === id ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id, 0)}
            ></li>
          )}

          {initialCards.map((card, index) => {
            let dragClass = '';
            if (dragOverSlot?.listId === id) {
              if (dragOverSlot.index === index) dragClass = 'drag-over-top';
              else if (dragOverSlot.index === index + 1) dragClass = 'drag-over-bottom';
            }

            return (
              <li
                key={card.id}
                className={`card-item ${dragClass}`}
                draggable
                onDragStart={(e) => handleDragStart(e, card, id)}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, id, index)}
                onDrop={(e) => handleDrop(e, id)}
                onDragOver={handleDragOver}
              >
                <span>{card.title}</span>
                <button className="delete-card-button" onClick={() => handleDeleteCard(card.id)}>
                  Х
                </button>
              </li>
            );
          })}
        </ul>
      </div>

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
