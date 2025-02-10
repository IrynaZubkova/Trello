export interface BoardData {
  lists?: IList[];  
  id: number;
    title: string;
    custom?: { 
      backgroundColor?: string;
      backgroundImage?: string; };
  }

  export interface IList {
    position: number;
    id: number;
    title: string;
    boardId: number;
    cards: ICard[]; 
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