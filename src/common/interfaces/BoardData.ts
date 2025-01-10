export interface BoardData {
  lists: IList[];  
  id: number;
    title: string;
    custom?: { backgroundColor: string };
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