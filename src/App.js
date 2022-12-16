//import './App.css';
// import {useState} from 'react';
import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Timer from "./pages/timer";
import Watch from "./pages/watch";




function Head(){
  return(
    <header>
      <nav className="e">
        <Link to="/">Home</Link>
        <Link to="/timer">Timer</Link>
        <Link to="/watch">Watch</Link>
      </nav>
    </header>
  )
}
function Main(){
  return(
    <section>메인</section>
  )
}

function App() {
  return (
    <>
      <Head></Head>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/timer" element={<Timer />}></Route>
          <Route path="/watch" element={<Watch />}></Route>
        </Routes>
    </>
  );
}


export default App;
