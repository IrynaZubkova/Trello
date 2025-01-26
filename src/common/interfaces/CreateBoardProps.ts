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
    position: number;
  }
  
  export interface ICard {
    id: number; 
    title: string; 
    description: string; 
    color: string; 
    custom: any; 
    users: number[]; 
    created_at: string;
  }