import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TravelRequest from './components/TravelRequest';
import TravelOptions from './components/TravelOptions';
import TravelHistory from './components/TravelHistory';
import './App.css';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster />
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
