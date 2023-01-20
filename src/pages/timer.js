import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import TimerTimer from './TimerTimer';
import TimerStopwatch from './TimerStopwatch';

function Timer() {
  const [mode, setMode] = useState('TIMER');

  let content = null;
  if (mode === 'TIMER') {
    content = <TimerTimer />
  } else if (mode === 'STOPWATCH') {
    content = <TimerStopwatch />
  }

  function setTimer() {
    setMode('TIMER');
  }
  function setStopwatch() {
    setMode('STOPWATCH');
  }

  return (
    <>
      <Nav></Nav>
      <article className='contents'>

        {/* 헤드 컴포넌트 섹션 */}
        <section id="timerHead">
          <h1>TIMER</h1>
          <form id="radioHeadContainer">
            <div className='radioHeadWrap'>
              <input type="radio" id="radioTimer" name="radio" value="Timer" defaultChecked onClick={() => { setTimer() }}></input>
              <label htmlFor="radioTimer">Timer</label>
            </div>
            <div className='radioHeadWrap'>
              <input type="radio" id="radioStopwatch" name="radio" value="Stopwatch" onClick={() => { setStopwatch() }}></input>
              <label htmlFor="radioStopwatch">Stopwatch</label>
            </div>
          </form>
        </section>

        {/* 각 콘텐츠 컴포넌트가 들어감 */}
        {content}

      </article>
    </>
  )
}

export default Timer;
