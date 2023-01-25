import React, { useState } from 'react';
import Nav from './Nav';
import TimerStopWatch from './StopWatchTimer';
import RecentStopWatch from './StopWatchRecent';


function StopWatch() {
  const [mode, setMode] = useState('MAIN');

  let content = null;
  if (mode === 'MAIN') {
    content = <TimerStopWatch />
  } else if (mode === 'RECENT') {
    content = <RecentStopWatch />
  }

  function setStopWatch() {
    setMode('MAIN');
  }
  function setStopWatchRecent() {
    setMode('RECENT');
  }

  return (
    <>
      <Nav></Nav>
      <article className='contents'>

        {/* 헤드 컴포넌트 섹션 */}
        <section id="timerHead">
          <h1>StopWatch</h1>
          <form id="radioHeadContainer">
            <div className='radioHeadWrap'>
              <input type="radio" id="radioTimer" name="radio" value="Timer" defaultChecked onClick={() => { setStopWatch() }}></input>
              <label htmlFor="radioTimer">StopWatch</label>
            </div>
            <div className='radioHeadWrap'>
              <input type="radio" id="radioStopwatch" name="radio" value="Stopwatch" onClick={() => { setStopWatchRecent() }}></input>
              <label htmlFor="radioStopwatch">Recent Data</label>
            </div>
          </form>
        </section>

        {/* 각 콘텐츠 컴포넌트가 들어감 */}
        {content}

      </article>
    </>
  )
}

export default StopWatch;
