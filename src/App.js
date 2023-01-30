import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from './pages/Main';
import Alarm from "./pages/Alarm";
import StopWatch from "./pages/StopWatch";



function App() {

  return (
    <BrowserRouter basename='./'>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/alarm" element={<Alarm />}></Route>
        <Route path="/stopWatch" element={<StopWatch />}></Route>
      </Routes>
    </BrowserRouter>

  );
}


export default App;
