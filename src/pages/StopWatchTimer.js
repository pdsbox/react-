import React, { useState } from 'react';
import useInterval from '../hooks/useInterval';
import Button from './TimerButton';

function TimerStopWatch() {
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

    //서버로 보낼 데이터 임시저장
    const [stopWatch, setStopWatch] = useState([]);

    //포스트 상태
    const [postStatus, setPostStatus] = useState(false);

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
        if (timerMilSec === 99) {
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
        if (termMilSec === 99) {
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
            <span>
                {timerHour < 10 ? `0${timerHour}` : timerHour} :
                {timerMin < 10 ? `0${timerMin}` : timerMin} :
                {timerSec < 10 ? `0${timerSec}` : timerSec} .
                {timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec}
            </span>
        </>
        :
        <>
            <span>
                {timerMin < 10 ? `0${timerMin}` : timerMin} :
                {timerSec < 10 ? `0${timerSec}` : timerSec} .
                {timerMilSec < 10 ? `0${timerMilSec}` : timerMilSec}
            </span>
        </>
        ;

    //텀 타이머 VIEW
    let timeTerm = termHour > 0 ?
        <>
            <span>
                {termHour < 10 ? `0${termHour}` : termHour} :
                {termMin < 10 ? `0${termMin}` : termMin} :
                {termSec < 10 ? `0${termSec}` : termSec} .
                {termMilSec < 10 ? `0${termMilSec}` : termMilSec}
            </span>
        </>
        :
        <>
            <span>
                {termMin < 10 ? `0${termMin}` : termMin} :
                {termSec < 10 ? `0${termSec}` : termSec} .
                {termMilSec < 10 ? `0${termMilSec}` : termMilSec}
            </span>
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

    //서버로 보낼 데이터 임시 저장
    function postStandBy() {
        setStopWatch((stopWatch) => {
            return [...stopWatch, {
                id: timeCheckList.length + 1,
                key: timeCheckList.length + 1,
                termHour: termHour,
                termMin: termMin,
                termSec: termSec,
                termMilSec: termMilSec,
                totalHour: timerHour,
                totalMin: timerMin,
                totalSec: timerSec,
                totalMilSec: timerMilSec
            }]
        });
    }

    function postData() {
        if (postStatus === false) {
            fetch('https://react-alarm-app-server.vercel.app:3000/stopwatch', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 1,
                    stopWatch
                }),
            }).then((res) => {
                if (res.ok) {
                    setPostStatus(true);
                }
            })
        } else if (postStatus === true) {
            fetch('https://react-alarm-app-server.vercel.app:3000/stopwatch/1', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stopWatch
                }),
            })
        }
    }


    function deleteData() {
        fetch('https://react-alarm-app-server.vercel.app:3000/stopwatch/1', {
            method: "DELETE",
        })
    }

    //체크 이벤트 소트(내림차순)
    const timeCheck = timeCheckList.sort((a, b) => {
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
    }
    //스타트 버튼 이벤트
    function btnStart() {
        setIntervalMode("ON");
        setTermIntervalMode("ON");
        if (postStatus === false) {
            deleteData();
        }
    }
    //체크 버튼 이벤트
    function btnCheck() {
        btnTermTimeReset();
        setTermIntervalMode("ON");
        timeCheckEvent();
        setTermInit(false);

        postStandBy();
    }
    //스탑 버튼 이벤트
    function btnStop() {
        setIntervalMode("OFF");
        setTermIntervalMode("OFF");
        postData();
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
            <Button value="RESET" clickEvent={() => { btnReset() }} />
            <Button value="START" clickEvent={() => { btnStart() }} />
        </>
    } else if (intervalMode === "ON") {
        buttonGroup = <>
            <Button value="CHECK" clickEvent={() => { btnCheck() }} />
            <Button value="STOP" clickEvent={() => { btnStop() }} />
        </>
    }

    return (
        <section id="timer">
            <h2 id="watch" className={termInit === true ? 'watchInit' : 'started'}>
                {timeView}
            </h2>
            <h3 id="subWatch" className={termInit === true ? 'checkerInit' : 'started'}>
                {timeTerm}
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

export default TimerStopWatch;
