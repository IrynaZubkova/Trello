export interface EditableBoardBackgroundProps {
  boardId: number;
  initialBackground: string;
  initialBackgroundImage: string;
  onBackgroundChange: (background: string, type: 'color' | 'image') => void;
  update: () => void;
  style?: React.CSSProperties;
}
