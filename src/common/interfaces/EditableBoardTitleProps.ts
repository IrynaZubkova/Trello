export interface EditableBoardTitleProps {
  board: BoardData;
  fetchBoards: () => void;
  backgroundColor: string;
}
export interface BoardData {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
  }
  