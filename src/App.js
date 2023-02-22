import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from './pages/Main';
import Alarm from "./pages/Alarm";
import StopWatch from "./pages/StopWatch";



function App() {

  return (
    <><h1>시작</h1>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/alarm" element={<Alarm />}></Route>
          <Route path="/stopwatch" element={<StopWatch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
