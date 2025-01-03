export interface BoardProps {
  board: BoardData;
  fetchBoards: () => void; // оновлення списку дошок після будь-якої зміни
  onBackgroundChange: (boardId: number, newBackground: string) => void;
}
export interface BoardData {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
  }