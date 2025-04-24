export interface CreateBoardProps {
  onBoardCreated: (newBoard: BoardData) => void;
}

export interface BoardProps {
  board: BoardData;
  fetchBoards: () => void;
  onBackgroundChange?: (boardId: number, newBackground: string, newBackgroundImage: string) => void;
  onTitleChange?: (boardId: number, newTitle: string) => void;
  onBoardDelete?: (boardId: number) => void;
}

export interface BoardData {
  id: number;
  title: string;
  custom?: {
    backgroundColor?: string;
    backgroundImage?: string;
  };
  lists?: IList[];
}
export interface IList {
  position: number;
  id: number;
  title: string;
  boardId: number;
  cards: ICard[];
}

export interface ICard {
  setLists: React.Dispatch<React.SetStateAction<IList[]>>;
  id: number;
  title: string;
  description?: string;
  color?: string;
  custom?: any;
  users?: number[];
  created_at?: string;
  view?: boolean;
  board_id?: number;
  list_id: number;
  deadline?: string;
}

export interface EditableBoardTitleProps {
  board: BoardData;
  fetchBoards: () => void;
  backgroundColor: string;
}
