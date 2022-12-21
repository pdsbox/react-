import './App.css';
import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Main from "./pages/main";
import Timer from "./pages/timer";
import Weather from "./pages/weather";
import CheckList from './pages/list';


function Head(){
  return(
    <header>
      <nav id="nav">
        <Link to="/">Alarm</Link>
        <Link to="/timer">Timer</Link>
        <Link to="/list">CheckList</Link>
        <Link to="/weather">Weather</Link>
      </nav>
    </header>
  )
}


function App() {

  return (
    <>
      <Head></Head>
        <div id="contents">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/timer" element={<Timer />}></Route>
          <Route path="/list" element={<CheckList />}></Route>
          <Route path="/weather" element={<Weather />}></Route>
        </Routes>
        </div>
    </>
  );
}


export default App;
