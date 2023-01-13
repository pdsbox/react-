import React, { useState } from 'react';
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

    const ringHour = props.ringHour === undefined ? props.ringHour : Number(props.ringHour);
    const ringMin = props.ringMin === undefined ? props.ringMin : Number(props.ringMin);
    const ringMemo = props.ringMemo;
    const ringId = props.ringId;
    const ringOver = props.ringOver;


    let chkTimeHour = null;
    let chkTimeMin = null;

    let content = null;

    //타임 체크
    if (ringHour === undefined && ringMin === undefined) {
        content = <h3 className="empty kr">울릴 알람이 없습니다! 알람을 설정해 주세요.</h3>;
    }
    else if (now_min > ringMin) {
        // chkTimeHour = now_hour === 0 ? ringHour - (now_hour + 1) : ringHour - now_hour;
        chkTimeHour = ringHour - (now_hour + 1);
        chkTimeMin = 60 + ringMin - now_min;
        content = <h3 className='kr'><strong>{chkTimeHour}</strong>시간 <strong>{chkTimeMin}</strong>분 후에 <strong>{ringMemo}</strong> 알람이 실행됩니다.</h3>;
    } else if (now_min < ringMin) {
        chkTimeHour = ringHour - now_hour;
        chkTimeMin = ringMin - now_min;
        content = <h3 className='kr'><strong>{chkTimeHour}</strong>시간 <strong>{chkTimeMin}</strong>분 후에 <strong>{ringMemo}</strong> 알람이 실행됩니다.</h3>;
    } else if (ringHour > now_hour && now_min === ringMin) {
        chkTimeHour = ringHour - now_hour;
        chkTimeMin = 0;
        content = <h3 className='kr'><strong>{chkTimeHour}</strong>시간 <strong>{chkTimeMin}</strong>분 후에 <strong>{ringMemo}</strong> 알람이 실행됩니다.</h3>;
    } else if (ringOver === false && ringHour === now_hour && ringMin === now_min && now_second === 0) {
        match();
    } else {
        content = <h3 className="empty kr">울릴 알람이 없습니다! 알람을 설정해 주세요.</h3>;
    }
    // setSwc(props.ringOver);

    // } else if ((Number(ringHour) - now_hour) <= 1) { //설정한 시간과 현재시간이 같으면
    //     chkTimeHour = 0;
    //     chkTimeMin = Number(ringMin) - now_min;
    //     content = `다음 알람 : ${chkTimeHour}시간 ${chkTimeMin}분 후에 ${ringMemo}알람이 실행됩니다.`;
    // } else if ((Number(ringHour) - now_hour >= 1)) {
    //     chkTimeHour = Number(ringHour) - now_hour;
    //     // chkTimeMin = Number(ringMin) > now_min ? Number(ringMin) - now_min : now_min - Number(ringMin);
    //     chkTimeMin = Number(ringMin) > now_min ? Number(ringMin) - now_min : 60 - now_min - Number(ringMin);

    //     content = `다음 알람 : ${chkTimeHour}시간 ${chkTimeMin}분 후에 ${ringMemo}알람이 실행됩니다.`;

    function match() {
        fetch(`http://localhost:3001/alarm/${ringId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                over: true
            }),
        }).then(res => { if (res.ok) { window.alert("알람 발생!") } })
            // .then((res) => { if (res.ok) { console.log("알람 발생! 모달로 대체? useEffect로 화면밖에서도?"); } })
            .catch(() => { window.alert("네트워크 오류가 발생했습니다. 확인 후 다시 시도해주십시오."); })

        // fetch(`http://localhost:3001/alarm?hour=${ringHour}&min=${ringMin}`, {
        //     method: "PUT",
        // }).then((res) => { console.log("알람", res, ringMemo); })
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

    }, 1000);

    return (
        <section id="alarmHead">
            <h1>ALARM</h1>
            <h2 className='kr'>{now_year}. {now_month}. {now_day} {now_hour < 10 ? `0${now_hour}` : now_hour}:{now_min < 10 ? `0${now_min}` : now_min}:{now_second < 10 ? `0${now_second}` : now_second}</h2>
            {content}
        </section>
    )
}

export default AlarmHead