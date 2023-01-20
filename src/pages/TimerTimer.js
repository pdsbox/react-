import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';

function TimerTimer() {
    // useEffect(() => {
    //     console.log("timer render");
    // })
    const [timerHour, setTimerHour] = useState(0);
    const [timerMin, setTimerMin] = useState(0);
    const [timerSec, setTimerSec] = useState(0);
    const [timerMilSec, setTimerMilSec] = useState(0);

    const [termHour, setTermHour] = useState(0);
    const [termMin, setTermMin] = useState(0);
    const [termSec, setTermSec] = useState(0);
    const [termMilSec, setTermMilSec] = useState(0);

    const [timeCheckList, setTimeCheckList] = useState([]);

    //타이머 실행 스위치 ON / OFF
    const [intervalMode, setIntervalMode] = useState("OFF");
    //텀 타이머 실행 스위치 ON / OFF
    const [termIntervalMode, setTermIntervalMode] = useState("OFF");
    //텀 타이머 초기화 세팅
    const [termInit, setTermInit] = useState(true);

    //메인 타이머 인터벌
    useInterval(() => {
        if (intervalMode === "ON") {
            timer();
        } else if (intervalMode === "OFF") {
        }
    }, 10);

    //텀 타이머 인터벌
    useInterval(() => {
        if (termIntervalMode === "ON") {
            termTimer();
        } else if (termIntervalMode === "OFF") {

        }
    }, 10)

    //메인 타이머 로직
    function timer() {
        setTimerMilSec(timerMilSec + 1);
        if (timerMilSec === 100) {
            setTimerMilSec(0);
            setTimerSec(timerSec + 1);
        }
        if (timerSec === 60) {
            setTimerSec(0);
            setTimerMin(timerMin + 1);
        }
        if (timerMin === 60) {
            setTimerMin(0);
            setTimerHour(timerHour + 1);
        }

    }

    //텀 타이머 로직
    function termTimer() {
        setTermMilSec(termMilSec + 1);
        if (termMilSec === 100) {
            setTermMilSec(0);
            setTermSec(termSec + 1);
        }
        if (termSec === 60) {
            setTermSec(0);
            setTermMin(termMin + 1);
        }
        if (termMin === 60) {
            setTermMin(0);
            setTermHour(termHour + 1);
        }

    }

    //메인 타이머 VIEW
    let timeView = timerHour > 0 ?
        <>
            <span>{timerHour < 10 ? `0${timerHour}` : timerHour}</span>
            :
            <span>{timerMin < 10 ? `0${timerMin}` : timerMin}</span>
            :
            <span>{timerSec < 10 ? `0${timerSec}` : timerSec}</span>
            .
            <span>{timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec === 100 ? `0${(timerMilSec - 100)}` : timerMilSec}</span>
        </>
        :
        <>
            <span>{timerMin < 10 ? `0${timerMin}` : timerMin}</span>
            :
            <span>{timerSec < 10 ? `0${timerSec}` : timerSec}</span>
            .
            <span>{timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec === 100 ? `0${(timerMilSec - 100)}` : timerMilSec}</span>
        </>
        ;

    //텀 타이머 VIEW
    let timeTerm = termHour > 0 ?
        <>
            <span>{termHour < 10 ? `0${termHour}` : termHour}</span>
            :
            <span>{termMin < 10 ? `0${termMin}` : termMin}</span>
            :
            <span>{termSec < 10 ? `0${termSec}` : termSec}</span>
            .
            <span>{termMilSec < 10 ? `0${termMilSec}` : termMilSec === 100 ? `0${(termMilSec - 100)}` : termMilSec}</span>
        </>
        :
        <>
            <span>{termMin < 10 ? `0${termMin}` : termMin}</span>
            :
            <span>{termSec < 10 ? `0${termSec}` : termSec}</span>
            .
            <span>{termMilSec < 10 ? `0${termMilSec}` : termMilSec === 100 ? `0${(termMilSec - 100)}` : termMilSec}</span>
        </>
        ;

    //타이머 체커 이벤트. 체크버튼 누르면 시간값이 기록된 리스트 추가
    function timeCheckEvent() {
        setTimeCheckList((timeCheckList) => {
            return [...timeCheckList,
            <li key={timeCheckList.length + 1} className={((timeCheckList.length + 1) % 10) === 0 ? 'red' : ((timeCheckList.length + 1) % 5) === 0 ? 'blue' : ''}>
                <div className='number'>{(timeCheckList.length + 1) < 10 ? `0${timeCheckList.length + 1}` : (timeCheckList.length + 1)}</div>
                <div className='term'>{timeTerm}</div>
                <div className='total'>{timeView}</div>
            </li>
            ];
        })
    }

    //체크 이벤트 소트(내림차순)
    let timeCheck = timeCheckList.sort((a, b) => {
        return b.key - a.key;
    })

    //리셋 버튼 이벤트
    function btnReset() {
        setTimerHour(0);
        setTimerMin(0);
        setTimerSec(0);
        setTimerMilSec(0);
        setTimeCheckList([]);
        btnTermTimeReset();
        setTermInit(true);
        console.log("Reset");
    }
    //스타트 버튼 이벤트
    function btnStart() {
        setIntervalMode("ON");
        setTermIntervalMode("ON");
        console.log("Start");
    }
    //체크 버튼 이벤트
    function btnCheck() {
        btnTermTimeReset();
        setTermIntervalMode("ON");
        timeCheckEvent();
        setTermInit(false);
        console.log("Check");
    }
    //스탑 버튼 이벤트
    function btnStop() {
        console.log("Stop");
        setIntervalMode("OFF");
        setTermIntervalMode("OFF");
    }

    //텀 타이머값 초기화 함수
    function btnTermTimeReset() {
        setTermHour(0);
        setTermMin(0);
        setTermSec(0);
        setTermMilSec(0);
    }

    //버튼그룹 VIEW
    let buttonGroup = null;

    if (intervalMode === "OFF") {
        buttonGroup = <>
            <button type="button" onClick={() => { btnReset() }}>RESET</button>
            <button type="button" onClick={() => { btnStart() }}>START</button></>
    } else if (intervalMode === "ON") {
        buttonGroup = <>
            <button type="button" onClick={() => { btnCheck() }}>CHECK</button>
            <button type="button" onClick={() => { btnStop() }}>STOP</button>
        </>
    }

    return (
        <section id="timer">
            <h2 id="watch" className={termInit === true ? 'watchInit' : 'started'}>
                {timeView}
            </h2>
            <h3 id="subWatch" className={termInit === true ? 'checkerInit' : 'started'}>       {timeTerm}
            </h3>
            <hgroup id="chkTitle" className={termInit === true ? 'titleInit' : 'started flex'}>
                <h4 className='kr'>구간</h4>
                <h4 className='kr'>구간기록</h4>
                <h4 className='kr'>전체시간</h4>
            </hgroup>
            <ul id="timeCheck" className={termInit === true ? 'checkerInit' : 'started'}>
                {timeCheck}
            </ul>
            <div id="btnGroup">
                {buttonGroup}
            </div>
        </section>
    )
}

export default TimerTimer;
