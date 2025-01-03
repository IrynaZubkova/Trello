export interface EditableBoardBackgroundProps {
    boardId: number;
    initialBackground: string;
    onBackgroundChange: (color: string) => void; 
    fetchBoards: () => void;
  }