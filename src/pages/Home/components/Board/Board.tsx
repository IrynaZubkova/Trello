import React, { useEffect, useState } from 'react';
import api from '../../../../api/request';
import { useParams } from 'react-router-dom';

// Інтерфейс для дошки
interface BoardData {
  id: number;
  title: string;
  // Додаткові поля, якщо є
}

// Інтерфейс для відповіді API
interface BoardsResponse {
  boards: BoardData[]; // Масив дошок
}

const Board: React.FC = () => {
  const { board_id } = useParams<{ board_id: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoard = async (): Promise<void> => {
      try {
        const response = await api.get<BoardsResponse>('/board'); // Вказуємо тип відповіді
        const foundBoard = response.data.boards.find((board: BoardData) => board.id.toString() === board_id); // Доступ до поля boards
        setBoard(foundBoard || null); // Зберігаємо дані дошки в стан
      } catch (err) {
        setError('Не вдалося завантажити дошку'); // Обробка помилки
      }
    };

    fetchBoard(); // Викликаємо функцію для отримання дошки
  }, [board_id]);

  return (
    <div>
      {error && <div>{error}</div>} {/* Виводимо повідомлення про помилку, якщо є */}
      {board ? <h1>{board.title}</h1> : <p>Завантаження...</p>}
    </div>
  );
};

export default Board;
