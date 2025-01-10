/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Board from './pages/Home/components/Board/Board'; // Імпорт Board з другого файлу
import api from './api/request'; // Імпорт axios екземпляра
import { BoardType } from './common/interfaces/BoardType'; 
import BoardPage from './pages/Home/components/Board/BoardPage';

function App(): JSX.Element {
  const [board, setBoards] = useState<BoardType[]>([]); // Стан для зберігання дошок
  const [error, setError] = useState<string | null>(null); // Стан для зберігання помилок
  const fetchBoards = async (): Promise<void> => {
    try {
      const response = await api.get('/board');
      console.log("responce", response, response.data)
      setBoards(response.boards); // Переконайтеся, що server повертає масив об'єктів
    } catch (err) {
      setError('Не вдалося завантажити дошки');
    }
  };
  useEffect(() => {
    fetchBoards(); // Викликаємо функцію для отримання дошок
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {error && <div>{error}</div>} 
        <Routes>
          <Route path="/" element={<Home board={board} update={fetchBoards} />} /> 
          <Route path="/board/:board_id" element={<BoardPage board={board}/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;