import React, { useState } from 'react';
import useInterval from '../hooks/useInterval.js';

function MainHead() {
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

    }, 1000);

    return (
        <div>
            <h1>알람</h1>
            <p>현재 시각 : {now_year}.{now_month}.{now_day} {now_hour < 10 ? `0${now_hour}` : now_hour}:{now_min < 10 ? `0${now_min}` : now_min}:{now_second < 10 ? `0${now_second}` : now_second}</p>
            <h2>다음 알람까지 : </h2>
        </div>
    )
}

export default MainHead