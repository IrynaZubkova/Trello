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

export interface HomeProps {
  board: BoardData[]; // Пропс для дошок
  update: (boards: BoardData[]) => void; // Функція для оновлення дошок
  fetchBoards: () => void;
}