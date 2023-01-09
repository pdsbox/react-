import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Alarm from "./pages/Alarm";
import Timer from "./pages/timer";
import Weather from "./pages/weather";
import CheckList from './pages/CheckList';


function Main() {
  return (
    <>
      <h1 id="indexHead">WELCOME !</h1>
      <article id="indexContainer">
        <div className='flex'>
          <Link to="/Alarm" className="nav alarm">
            <h2>Alarm</h2>
            <p>시간과 내용을 설정한 뒤, 해당 시간이 되면 알려주는 기능.</p>
            <span>미리보기</span>
          </Link>
          <Link to="/timer" className="nav timer">
            <h2>Timer</h2>
            <p>시간의 흐름을 기록, 메모와 함께 저장할 수 있습니다.</p>
            <span>미리보기</span>
          </Link>
          <Link to="/CheckList" className="nav checklist">
            <h2>CheckList</h2>
            <p>매일 반복적인 루틴을 설정, 확인할 수 있습니다.</p>
            <span>미리보기</span>
          </Link>
          <Link to="/weather" className="nav weather">
            <h2>Weather</h2>
            <p>지도 위에 표시된 주요 도시를 클릭하면 간략한 날씨정보를 확인할 수 있습니다.</p>
            <span>미리보기</span>
          </Link>
        </div>
      </article>
    </>
  )
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/Alarm" element={<Alarm />}></Route>
      <Route path="/timer" element={<Timer />}></Route>
      <Route path="/CheckList" element={<CheckList />}></Route>
      <Route path="/weather" element={<Weather />}></Route>
    </Routes>

  );
}


export default App;
