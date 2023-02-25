import React, { useState, useEffect } from 'react';
import Nav from './Nav';



export default function Weather() {
    const [apiData, setApiData] = useState([]);
    const [everyHourData, setEveryHourData] = useState([]);
    const dateObject = new Date();
    const times = {
        year: String(dateObject.getFullYear()),
        month: String(dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1),
        date: String(dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate()),
        hour: String(dateObject.getHours() < 10 ? `0${dateObject.getHours()}` : dateObject.getHours()),
        min: String(dateObject.getMinutes() < 10 ? `0${dateObject.getMinutes()}` : dateObject.getMinutes())
    }

    const apiKey = process.env.REACT_APP_WEATHER_SERVICE_KEY;
    const apiUrl = process.env.REACT_APP_URL;

    let apiOptions = {
        date: times.hour === 0 ? times.year + times.month + (times.date - 1) : times.year + times.month + times.date,
        time: times.hour === 0 ? '23' + times.min : (times.hour - 1) + times.min,
        x: 55,
        y: 127
    }
    // console.log(apiOptions)


    //최근 24시간 데이터 뽑아오기
    useEffect(() => {
        // let array = [];
        for (let i = 0; i < 24; i++) {
            const loopTime = (Number(times.hour) - i) < 0 ? (24 + Number(times.hour) - i) : (Number(times.hour) - i);
            const loopDate = loopTime > Number(times.hour) ? Number(times.date) - 1 : times.date;
            console.log(loopTime < 10 ? '0' + loopTime + '00' : loopTime + '00')
            console.log(times.year + times.month + loopDate)
            fetch(`${apiUrl}?pageNo=1&numOfRows=10&dataType=JSON&serviceKey=${apiKey}&base_date=${times.year + times.month + loopDate}&base_time=${loopTime < 10 ? '0' + loopTime + '00' : loopTime + '00'}&nx=${apiOptions.x}&ny=${apiOptions.y}`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then(data => {
                    // const fetchData = data;
                    // console.log("fetchdata", fetchData);
                    // fetchData.sort((a, b) => {
                    //     return a.response.body.items.item.baseTime - b.response.body.items.item.baseTime;
                    // })
                    // console.log("data", fetchData);
                    // console.log(data.response.body.items.item);
                    // array.push(data.response.body.items.item)
                    setEveryHourData((everyHourData) => {
                        return [...everyHourData, data.response.body.items.item]
                    })
                })
        }
        console.log(everyHourData);
        // setEveryHourData(array)
    }, [])
    // const oneDayTimeData = everyHourData;
    // console.log("oneday", oneDayTimeData);
    // oneDayTimeData.sort((a, b) => {
    //     return a.baseTime - b.baseTime
    // });
    // console.log("sort", oneDayTimeData);

    // console.log("Every", everyHourData);
    // console.log(apiData);

    const category = {
        //강수형태
        PTY: {
            0: '맑음',
            1: '비',
            2: '비/눈',
            3: '눈',
            5: '빗방울',
            6: '빗방울/눈날림'
        },
    }
    //     //습도
    //     REH: `%`,
    //     //시간당 강수량
    //     RN1: `mm`,
    //     //기온
    //     T1H: `˚`,
    //     //풍속
    //     WSD: `m/s`
    // }
    const ecoType = apiData[0]?.obsrValue; //날씨
    const wetMount = apiData[1]?.obsrValue; //습도
    const precipitation = apiData[2]?.obsrValue; //강수량
    const temperature = apiData[3]?.obsrValue; //기온
    const windSpeed = apiData[7]?.obsrValue; //풍속
    const convert = {
        ecoType: category.PTY[ecoType],
        wetMount: `${wetMount}%`,
        precipitation: `${precipitation}mm`,
        temperature: `${temperature}˚`,
        windSpeed: `${windSpeed}m/s`
    };
    // console.log(convert)





    useEffect(() => {
        fetch(`${apiUrl}?pageNo=1&numOfRows=10&dataType=JSON&serviceKey=${apiKey}&base_date=${apiOptions.date}&base_time=${apiOptions.time}&nx=${apiOptions.x}&ny=${apiOptions.y}`)
            .then((res) => { return res.json(); }
            ).then(data => {
                setApiData(data.response.body.items.item);
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