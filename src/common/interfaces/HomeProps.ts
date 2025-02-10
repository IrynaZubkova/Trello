export interface BoardData {
    id: number;
    title: string;
    custom?: { 
      backgroundColor?: string;
      backgroundImage?: string; };
    lists?: IList[];
  }

  export interface IList {
    id: number;
    title: string;
    boardId: number;
    cards: ICard[]; 
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

export interface HomeProps {
  board: BoardData[]; 
  update: (boards: BoardData[]) => void;
  // fetchBoards: () => void;
}