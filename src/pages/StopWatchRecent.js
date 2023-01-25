import React, { useEffect, useState } from 'react';

function RecentStopWatch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        function fetching() {
            fetch('http://localhost:3001/timer', {
                method: "GET",
            }
            ).then(res => { return res.json(); }).then(resData => { setData(...data, resData); })
        }
        fetching();
    }, [])
    console.log(data);
    let dataSort = data.sort((a, b) => {
        return b.key - a.key;
    })


    console.log("Sort", dataSort);

    let contents = null;

    if (Array.isArray(data) && data.length === 0) {
        contents = <h2 className='kr'>저장된 데이터가 없습니다.</h2>
    } else {
        contents =
            <>
                <hgroup id="chkTitle" className="started flex">
                    <h4 className='kr'>구간</h4>
                    <h4 className='kr'>구간기록</h4>
                    <h4 className='kr'>전체시간</h4>
                </hgroup>
                <ul id="timeCheck" className='started'>
                    {dataSort.map(times => (
                        <li key={times.key} className={(times.key % 10 === 0) ? 'red' : (times.key % 5) === 0 ? 'blue' : ''}>
                            <div className='number'>{times.key}</div>
                            <div className='term'>
                                {times.termHour > 0 ?
                                    <span>
                                        {times.termHour < 10 ? `0${times.termHour}` : times.termHour} :
                                        {times.termMin < 10 ? `0${times.termMin}` : times.termMin} :
                                        {times.termSec < 10 ? `0${times.termSec}` : times.termSec} .
                                        {times.termMilSec < 10 ? `0${times.termMilSec}` : times.termMilSec}
                                    </span>
                                    :
                                    <span>
                                        {times.termMin < 10 ? `0${times.termMin}` : times.termMin} :
                                        {times.termSec < 10 ? `0${times.termSec}` : times.termSec} .
                                        {times.termMilSec < 10 ? `0${times.termMilSec}` : times.termMilSec}
                                    </span>
                                }
                            </div>
                            <div className='total'>
                                {times.totalHour > 0 ?
                                    <span>
                                        {times.totalHour < 10 ? `0${times.totalHour}` : times.totalHour} :
                                        {times.totalMin < 10 ? `0${times.totalMin}` : times.totalMin} :
                                        {times.totalSec < 10 ? `0${times.totalSec}` : times.totalSec} .
                                        {times.totalMilSec < 10 ? `0${times.totalMilSec}` : times.totalMilSec}
                                    </span>
                                    :
                                    <span>
                                        {times.totalMin < 10 ? `0${times.totalMin}` : times.totalMin} :
                                        {times.totalSec < 10 ? `0${times.totalSec}` : times.totalSec} .
                                        {times.totalMilSec < 10 ? `0${times.totalMilSec}` : times.totalMilSec}
                                    </span>
                                }
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </>
    }

    return (
        <section id="stopWatchRecent">
            <h2 className='recentTitle kr'>지난 기록</h2>

            {contents}
        </section>
    )
}

export default RecentStopWatch;