import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TravelRequest from './components/TravelRequest';
import TravelOptions from './components/TravelOptions';
import TravelHistory from './components/TravelHistory';
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/solicitacao' element={<TravelRequest />} />
        <Route path='/opcoes' element={<TravelOptions />} />
        <Route path='/historico' element={<TravelHistory />} />
        <Route path='*' element={<Navigate to='/solicitacao' />} />
      </Routes>
    </Router>
  );
};

export default App
