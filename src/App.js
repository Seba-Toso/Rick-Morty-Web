import React from 'react';
import Sidebar from './components/Sidebar'

import Routes from './Routes';

import './App.css';
import Home from './pages/Home';
import About from './pages/About'
import Error from './pages/Error'

function App() {

  
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Home />
        <About />
        <Error />
      </Routes>
    </div>
  );
}

export default App;
