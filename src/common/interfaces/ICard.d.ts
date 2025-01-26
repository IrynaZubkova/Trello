// src/common/interfaces/ICard.d.ts

export interface ICard {
  id: number; 
  title: string; 
  description: string; 
  color: string; 
  custom: any; 
  users: number[]; 
  created_at: string;
}
