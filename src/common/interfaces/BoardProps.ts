import { ReactNode } from "react";

export interface BoardProps {
  board: BoardData;
  fetchBoards: () => void; // оновлення списку дошок після будь-якої зміни
  onBackgroundChange: (boardId: number, newBackground: string) => void;
  onTitleChange: (boardId: number, newTitle: string) => void;
  onBoardDelete?: (boardId: number) => void; 
}
export interface BoardData {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
    lists?: IList[];
  }

  export interface IList {
    id: number;
    title: string;
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