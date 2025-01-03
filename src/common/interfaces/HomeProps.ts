export interface BoardData {
    id: number;
    title: string;
    custom?: { backgroundColor: string };
  }

export interface HomeProps {
  board: BoardData[]; // Пропс для дошок
  update: (boards: BoardData[]) => void; // Функція для оновлення дошок
}