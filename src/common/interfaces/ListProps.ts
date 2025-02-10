export interface ListProps {
  id: number;
  boardId: number;  
  title: string;
  position: number;
  cards: ICard[];
}
export interface ICard {
  id: number; 
  title: string; 
  description: string; 
  color: string; 
  custom: any; 
  users: number[]; 
  created_at: string;
  }
  