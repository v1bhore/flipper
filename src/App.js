import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Slider from './Slider';
import ManageSlidesPage from './ManageSlidesPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/manage" element={<ManageSlidesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
