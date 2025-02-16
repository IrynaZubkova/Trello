import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import api from './api/request'; 
import { BoardType } from './common/interfaces/BoardType'; 
import BoardPage from './pages/Home/components/Board/BoardPage';
import ProgressBar from "@ramonak/react-progress-bar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BoardResponse {
  boards?: BoardType[];
}

function App(): JSX.Element {
  const [board, setBoards] = useState<BoardType[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [progress, setProgress] = useState<number>(0); 
  const [loading, setLoading] = useState(false);

  const fetchBoards = async (): Promise<void> => {
    try {
      setLoading(true); 
      setProgress(10);
      const response = await api.get<BoardResponse>('/board', {
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent); 
          }
        },
      });
      if ('boards' in response && Array.isArray(response.boards)) {
        setBoards(response.boards);
        console.log( 'response', response, 'response.boards', response.boards)
      } else {
        console.error('Invalid API response format:', response);
      }
      
      if (response.data && Array.isArray(response.data.boards)) {
        setBoards(response.data.boards);
      } else {
        console.error('Boards data is not in expected structure');
      }
      
      setProgress(100);
    } catch (err) {
      setError('Не вдалося завантажити дошки');
      toast.error('Не вдалося завантажити дошки', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    }finally {
      setTimeout(() => {
        setLoading(false); 
      }, 300);
    }
  };
  
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <HashRouter>
      <div className="App">
      <ToastContainer />
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
        <div className="progress-container">
        {loading && <ProgressBar completed={progress} bgColor="blue" height="10px" />}

    </div>
        {error && <div>{error}</div>} 
        <Routes>
  <Route path="/" element={<Home board={board} update={fetchBoards} />} />
  <Route
    path="/board/:board_id"
    element={<BoardPage update={fetchBoards} />}
  />
</Routes>

      </div>
    </HashRouter>
  );
}

export default App;