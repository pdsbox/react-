import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from './pages/Main';
import Alarm from "./pages/Alarm";
import StopWatch from "./pages/StopWatch";
import Weather from "./pages/Weather";
import CheckList from './pages/CheckList';



function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/alarm" element={<Alarm />}></Route>
      <Route path="/stopWatch" element={<StopWatch />}></Route>
      <Route path="/checkList" element={<CheckList />}></Route>
      <Route path="/weather" element={<Weather />}></Route>
    </Routes>

  );
}


export default App;
