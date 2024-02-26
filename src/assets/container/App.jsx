import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import InicioSesion from '../pages/InicioSesion';
import Registro from '../pages/Registro';
import TableSearch from '../pages/TableSearch';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioSesion/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/tableSearch" element={<TableSearch/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
