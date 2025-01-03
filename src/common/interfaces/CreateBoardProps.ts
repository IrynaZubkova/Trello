export interface CreateBoardProps {
  onBoardCreated: (newBoard: BoardType) => void;
}

export interface BoardType {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
  }