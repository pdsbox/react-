import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval.js';

function AlarmHead(props) {

    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const [now_hour, setHour] = useState(hour);
    const [now_min, setMinute] = useState(minute);
    const [now_second, setSecond] = useState(second);
    const [now_day, setDay] = useState(day);
    const [now_month, setMonth] = useState(month + 1);
    const [now_year, setYear] = useState(year);

    const ringHour = props.ringHour;
    const ringMin = props.ringMin;
    const ringMemo = props.ringMemo;
    let chkTimeHour = null;
    let chkTimeMin = null;

    let content = null;
    if (ringHour === false && ringMin === false && ringMemo === false) {
        content = "울릴 알람이 없습니다. 알람을 설정해 주세요.";
    } else if ((Number(ringHour) - now_hour) === 0) { //설정한 시간과 현재시간이 같으면
        chkTimeHour = 0;
        chkTimeMin = Number(ringMin) - now_min;
        content = `다음 알람 : ${chkTimeHour}시간 ${chkTimeMin}분 후에 ${ringMemo}알람이 실행됩니다.`;
    } else if ((Number(ringHour) - now_hour >= 1)) {
        chkTimeHour = Number(ringHour) - now_hour;
        chkTimeMin = Number(ringMin) > now_min ? Number(ringMin) - now_min : now_min - Number(ringMin);
        content = `다음 알람 : ${chkTimeHour}시간 ${chkTimeMin}분 후에 ${ringMemo}알람이 실행됩니다.`;
    }

    function match() {
        if (chkTimeHour === 0 && chkTimeMin === 0) {
            window.alert("알람!!!" + props.ringMemo);
            fetch('http://localhost:3001/alarm')
        }
    }

    useInterval(() => {
        const date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        setHour(hour);
        setMinute(minute);
        setSecond(second);
        setDay(day);
        setMonth(month + 1);
        setYear(year);

        match();

    }, 1000);

    return (
        <section id="alarmHead">
            <h1>ALARM</h1>
            <h2>현재 시각 : {now_year}.{now_month}.{now_day} {now_hour < 10 ? `0${now_hour}` : now_hour}:{now_min < 10 ? `0${now_min}` : now_min}:{now_second < 10 ? `0${now_second}` : now_second}</h2>
            <h2>{content}</h2>
        </section>
    )
}

export default AlarmHead