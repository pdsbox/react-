import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from './pages/Main';
import Alarm from "./pages/Alarm";
import StopWatch from "./pages/StopWatch";
import Weather from './pages/Weather';
import Guestbook from './pages/Guestbook'



function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/alarm" element={<Alarm />}></Route>
          <Route path="/stopwatch" element={<StopWatch />}></Route>
          <Route path="/weather" element={<Weather />}></Route>
          <Route path="/guestbook" element={<Guestbook />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
