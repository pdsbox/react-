import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';

function TimerTimer() {
    // useEffect(() => {
    //     console.log("timer render");
    // })
    const [timerHour, setTimerHour] = useState(0);
    const [timerMin, setTimerMin] = useState(59);
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


    useInterval(() => {
        if (intervalMode === "ON") {
            timer();
        } else if (intervalMode === "OFF") {
        }
    }, 10);

    useInterval(() => {
        if (termIntervalMode === "ON") {
            termTimer();
        } else if (termIntervalMode === "OFF") {

        }
    }, 10)

    function timer() {
        setTimerMilSec(timerMilSec + 1);
        if (timerMilSec === 60) {
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

    function termTimer() {
        setTermMilSec(termMilSec + 1);
        if (termMilSec === 60) {
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

    let timeView = timerHour > 0 ?
        <>
            <span>{timerHour < 10 ? `0${timerHour}` : timerHour}</span>
            :
            <span>{timerMin < 10 ? `0${timerMin}` : timerMin}</span>
            :
            <span>{timerSec < 10 ? `0${timerSec}` : timerSec}</span>
            .
            <span>{timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec}</span>
        </>
        :
        <>
            <span>{timerMin < 10 ? `0${timerMin}` : timerMin}</span>
            :
            <span>{timerSec < 10 ? `0${timerSec}` : timerSec}</span>
            .
            <span>{timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec}</span>
        </>
        ;

    let timeTerm = termHour > 0 ?
        <>
            <span>{termHour < 10 ? `0${termHour}` : termHour}</span>
            :
            <span>{termMin < 10 ? `0${termMin}` : termMin}</span>
            :
            <span>{termSec < 10 ? `0${termSec}` : termSec}</span>
            .
            <span>{termMilSec < 10 ? `0${termMilSec}` : termMilSec}</span>
        </>
        :
        <>
            <span>{termMin < 10 ? `0${termMin}` : termMin}</span>
            :
            <span>{termSec < 10 ? `0${termSec}` : termSec}</span>
            .
            <span>{termMilSec < 10 ? `0${termMilSec}` : termMilSec}</span>
        </>
        ;;


    for (let i = 0; i < timeCheckList.length; i++) {

    }

    function timeCheckEvent() {
        setTimeCheckList((timeCheckList) => {
            return [...timeCheckList,
            <li key={timeCheckList.length + 1} className={((timeCheckList.length + 1) % 10) === 0 ? 'red' : ((timeCheckList.length + 1) % 5) === 0 ? 'blue' : ''}>
                <div className='number'>{timeCheckList.length + 1}</div>
                <div className='term'>{timeTerm}</div>
                <div className='total'>{timeView}</div>
            </li>];
        })
    }

    let timeCheck = timeCheckList.sort((a, b) => {
        return b.key - a.key;
    })

    function btnReset() {
        setTimerHour(0);
        setTimerMin(0);
        setTimerSec(0);
        setTimerMilSec(0);
        setTimeCheckList([]);
        console.log("Reset");
    }
    function btnStart() {
        setIntervalMode("ON");
        console.log("Start");
    }
    function btnCheck() {
        btnTermReset();
        setTermIntervalMode("ON");
        timeCheckEvent();

        console.log("Check");
    }
    function btnStop() {
        console.log("Stop");
        setIntervalMode("OFF");
        setTermIntervalMode("OFF");
    }

    function btnTermReset() {
        setTermHour(0);
        setTermMin(0);
        setTermSec(0);
        setTermMilSec(0);
    }

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
            <h2 id="watch">
                {timeView}
            </h2>
            <ul id="timeCheck">
                {timeCheck}
                {timeTerm}
            </ul>
            <div id="btnGroup">
                {buttonGroup}
            </div>
        </section>
    )
}

export default TimerTimer;
