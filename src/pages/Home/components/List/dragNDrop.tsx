import { useState } from 'react';
import { ICard, IList } from '../../../../common/interfaces/BoardData';

export const useDragAndDrop = (
  lists: IList[],
  listsRef: React.MutableRefObject<IList[]>,
  onCardDrop: (updatedLists: IList[]) => void
) => {
  const [dragOverSlot, setDragOverSlot] = useState<{ listId: number; index: number } | null>(null);

  const handleDragStart = (e: React.DragEvent, card: ICard, listId: number) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...card, listId }));
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget as HTMLElement;
    target.classList.add('card-dragging');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('card-dragging');
    setDragOverSlot(null);
  };

  const handleDragEnter = (e: React.DragEvent, listId: number, cardIndex: number) => {
    e.preventDefault();
    const cardElement = e.currentTarget as HTMLElement;
    const rect = cardElement.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;

    const index = offsetY < rect.height / 2 ? cardIndex : cardIndex + 1;

    setDragOverSlot({ listId, index });
  };

  const handleDrop = (
    e: React.DragEvent,
    targetListId: number,
    forcedIndex?: number // додали аргумент
  ) => {
    e.preventDefault();

    const draggedCardData = e.dataTransfer.getData('application/json');
    if (!draggedCardData) return;

    const draggedCard: ICard & { listId: number } = JSON.parse(draggedCardData);

    const targetListIndex = listsRef.current.findIndex((list) => list.id === targetListId);
    const sourceListIndex = listsRef.current.findIndex((list) => list.id === draggedCard.listId);

    if (targetListIndex === -1 || sourceListIndex === -1) return;

    const updatedLists = [...listsRef.current];
    const sourceList = updatedLists[sourceListIndex];
    const targetList = updatedLists[targetListIndex];

    // видаляємо картку зі старого списку
    sourceList.cards = sourceList.cards.filter((card) => card.id !== draggedCard.id);

    const insertIndex =
      forcedIndex !== undefined
        ? forcedIndex
        : dragOverSlot?.listId === targetListId
          ? dragOverSlot.index
          : targetList.cards.length;

    targetList.cards.splice(insertIndex, 0, draggedCard);

    listsRef.current = updatedLists;
    onCardDrop(updatedLists);

    setDragOverSlot(null);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return {
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDrop,
    handleDragOver,
    dragOverSlot,
  };
};
