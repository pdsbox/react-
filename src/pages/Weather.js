import React, { useState, useEffect } from 'react';
import Nav from './Nav';



export default function Weather() {
    const [apiData, setApiData] = useState([]);
    console.log(apiData);
    // const category = {
    //     //강수형태
    //     PTY: {
    //         0: '없음',
    //         1: '비',
    //         2: '비/눈',
    //         3: '눈',
    //         5: '빗방울',
    //         6: '빗방울/눈날림'
    //     },
    //     //습도
    //     REH: `${}%`,
    //     //시간당 강수량
    //     RN1: `${}mm`,
    //     //기온
    //     T1H: `${}˚`,
    //     //풍속
    //     WSD: `${}m/s`
    // }
    const dateObject = new Date();
    const date = {
        year: String(dateObject.getFullYear()),
        month: String(dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1),
        date: String(dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate())
    }


    const apiKey = process.env.REACT_APP_WEATHER_SERVICE_KEY;
    const apiUrl = process.env.REACT_APP_URL;
    let apiOptions = {
        time: 2100,
        x: 55,
        y: 127
    }


    useEffect(() => {
        fetch(`${apiUrl}?pageNo=1&numOfRows=10&dataType=JSON&serviceKey=${apiKey}&base_date=${date.year + date.month + date.date}&base_time=${apiOptions.time}&nx=${apiOptions.x}&ny=${apiOptions.y}`)
            .then((res) => { return res.json(); }
            ).then(data => {
                setApiData(data.response.body.items);
            })
        // fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?pageNo=1&numOfRows=10&base_date=20230223&base_time=2100&nx=55&ny=127&serviceKey=xwSGdWCxaSlYFFHUiXZ4uU%2FAOVKP%2FJ%2Fg6Sq5oxFGYycAhD57ilqX5KYgxAJChUCTCW1KuX7RG%2BOVzN57nVRk1A%3D%3D&dataType=JSON').then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        // }).then(data => { setApiData(data) });
    }, [])


    return (
        <>
            <Nav></Nav>
            <article className="contents">
                <h2>날씨</h2>
            </article>
        </>
    )
}