export interface EditableBoardBackgroundProps {
  boardId: number;
  initialBackground: string;
  initialBackgroundImage: string;
  onBackgroundChange: (background: string, type: 'color' | 'image') => void;
  fetchBoards: () => void;
  style?: React.CSSProperties;
}
