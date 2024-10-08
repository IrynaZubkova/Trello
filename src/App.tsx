import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
} from 'react-router-dom';


import { Board } from './pages/Board/Board';

function Home(): JSX.Element {
  return (
    <div className="footer">
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <nav>
            <ul>
              <li>
              <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
              <Link to="/board" className="nav-link">Board</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
