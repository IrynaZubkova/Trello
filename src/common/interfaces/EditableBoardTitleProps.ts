export interface EditableBoardTitleProps {
  board: BoardData;
  fetchBoards: () => void;
  backgroundColor: string;
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
      cards: ICard[]; // Масив карток у списку
    }
  
    export interface ICard {
      id: number;
      title: string;
    }