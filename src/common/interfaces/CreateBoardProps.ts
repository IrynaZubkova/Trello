export interface CreateBoardProps {
  onBoardCreated: (newBoard: BoardType) => void;
}

export interface BoardType {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
    lists: IList[];
  }

  export interface IList {
    id: number;
    title: string;
    cards: ICard[]; // Масив карток у списку
  }
  
  export interface ICard {
    id: number;
    title: string;
  }