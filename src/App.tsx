import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Converter from './Pages/Converter.tsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Converter />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
