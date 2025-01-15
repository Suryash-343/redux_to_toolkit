import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Converter from './Pages/Converter.tsx';
import InterfaceGenerator from './Pages/InterfaceGenerator.tsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Converter />} />
      <Route path="/interface" element={<InterfaceGenerator />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
