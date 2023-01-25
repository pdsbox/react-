import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from './pages/Main';
import Alarm from "./pages/Alarm";
import StopWatch from "./pages/StopWatch";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/alarm" element={<Alarm />}></Route>
      <Route path="/stopWatch" element={<StopWatch />}></Route>
    </Routes>

  );
}


export default App;
