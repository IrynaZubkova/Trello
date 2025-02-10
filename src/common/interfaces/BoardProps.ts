export interface BoardProps {
  board: BoardData;
  fetchBoards: () => void; 
  onBackgroundChange: (boardId: number, newBackground: string, newBackgroundImage: string) => void;
  onTitleChange: (boardId: number, newTitle: string) => void;
  onBoardDelete?: (boardId: number) => void; 
}
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