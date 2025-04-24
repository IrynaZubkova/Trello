import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
// import BoardPage from './pages/Home/components/Board/BoardPage';
import { ToastContainer } from 'react-toastify';
import { JSX } from 'react';
import BoardPage from './pages/Home/components/Board/BoardPage';

// interface BoardResponse {
//   boards?: BoardData[];
// }

function App(): JSX.Element {
  // const [board, setBoards] = useState<BoardData[]>([]);
  // const [error, setError] = useState<string | null>(null);
  // const [progress, setProgress] = useState<number>(0);
  // const [loading, setLoading] = useState(false);

  // const fetchBoards = async (): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     setProgress(10);
  //     const response = await api.get<BoardResponse>('/board', {
  //       onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
  //         if (progressEvent.total) {
  //           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           setProgress(percent);
  //         }
  //       },
  //     });
  //     if ('boards' in response && Array.isArray(response.boards)) {
  //       setBoards(response.boards);
  //       console.log('response.boards', response.boards);
  //     }

  //     setProgress(100);
  //   } catch {
  //     setError('Не вдалося завантажити дошки');
  //     toast.error('Не вдалося завантажити дошки', {
  //       position: 'top-right',
  //       autoClose: 5000,
  //       theme: 'colored',
  //     });
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 300);
  //   }
  // };

  // useEffect(() => {
  //   fetchBoards();
  // }, []);

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
        {/* <div className="progress-container">
          {loading && <ProgressBar completed={progress} bgColor="blue" height="10px" />}
        </div> */}
        {/* {error && <div>{error}</div>} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:board_id" element={<BoardPage update={Date} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
