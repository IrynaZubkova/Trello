import { useState } from 'react';
import { ICard, IList } from '../../../../common/interfaces/BoardData';

export const useDragAndDrop = (
  initialCards: any[],
  setLists: React.Dispatch<React.SetStateAction<any[]>>,
  lists: IList[],
  onCardDrop: (updatedLists: IList[]) => void,
  listsRef: React.MutableRefObject<IList[]>
) => {
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, card: ICard, listId: number) => {
    const data = JSON.stringify({ ...card, listId });
    e.dataTransfer.setData('application/json', data);
    e.dataTransfer.effectAllowed = 'move';

    const target = e.target as HTMLElement;
    target.classList.add('card-dragging');

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.zIndex = '1000';
    tempContainer.style.pointerEvents = 'none';
    tempContainer.classList.add('temp-dragging-container');
    document.body.appendChild(tempContainer);

    console.log('Dragging card from list with ID:', listId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.classList.remove('card-dragging');
    const tempContainer = document.querySelector('.temp-dragging-container');
    if (tempContainer) {
      tempContainer.remove();
    }

    // console.log('ПРАЦЮЄ handleDragEnd');
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
    // console.log('ПРАЦЮЄ handleDragLeave');
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverSlot(index);
    console.log('ПРАЦЮЄ handleDragEnter');
  };

  const handleDrop = (e: React.DragEvent, targetListId: number) => {
    e.preventDefault();
    console.log('HANDLE DROP TRIGGERED');

    const draggedCardData = e.dataTransfer.getData('application/json');
    if (!draggedCardData) {
      console.log('NO draggedCard!');
      return;
    }

    const draggedCard: ICard & { listId: number } = JSON.parse(draggedCardData);
    console.log('Dropped card:', draggedCard);
    console.log('Card dropped into list ID:', targetListId);

    // Замість використання lists, працюємо з listsRef.current
    const targetListIndex = listsRef.current.findIndex((list) => list.id === targetListId);
    const sourceListIndex = listsRef.current.findIndex((list) => list.id === draggedCard.listId);

    if (targetListIndex !== -1 && sourceListIndex !== -1) {
      const updatedLists = [...listsRef.current]; // копіюємо поточний стан listsRef

      const sourceList = updatedLists[sourceListIndex];
      const targetList = updatedLists[targetListIndex];

      sourceList.cards = sourceList.cards.filter((card) => card.id !== draggedCard.id); // видаляємо картку зі старого списку
      targetList.cards = [...targetList.cards, draggedCard]; // додаємо картку до нового списку

      // Оновлюємо список в референсі, а не в основному стані
      listsRef.current = updatedLists;

      // Тепер ти можеш викликати onCardDrop, щоб синхронізувати стан з іншими частинами програми
      onCardDrop(updatedLists);
    }

    setDragOverSlot(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // console.log('ПРАЦЮЄ handleDragOver');
  };
  return {
    handleDragStart,
    handleDragEnd,
    handleDragLeave,
    handleDragEnter,
    handleDrop,
    handleDragOver,
    dragOverSlot,
  };
};
