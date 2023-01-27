import React, { useEffect } from 'react';
import db from '../data/data.json';

function AlarmRead(props) {
    // const [hour, setHour] = useState(props.hour);
    // const [min, setMin] = useState(props.min);
    // console.log(hour, min);

    //알람 항목들 상태 조회
    useEffect(() => {
        dataSet();
    }, [])

    //알람 리스트 상태 현재시간에 맞춰서 최신화
    function dataSet() {
        const date = new Date();
        const dateHour = date.getHours();
        const dateMin = date.getMinutes();
        for (let i = 0; i < db.alarm.length; i++) {
            if (db.alarm[i].hour > dateHour) {
                fetchingOver(i + 1, false);
            } else if (db.alarm[i].hour === dateHour && db.alarm[i].min > dateMin) {
                fetchingOver(i + 1, false);
            } else if (db.alarm[i].hour === dateHour && db.alarm[i].min === dateMin) {
                fetchingOver(i + 1, true);
            } else if (db.alarm[i].hour < dateHour) {
                fetchingOver(i + 1, true);
            } else if (db.alarm[i].hour === dateHour && db.alarm[i].min < dateMin) {
                fetchingOver(i + 1, true);
            }
        }
    }

    //리스트 상태 변경 액션
    function fetchingOver(id, status) {
        fetch(`http://localhost:3001/alarm/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                over: status
            })
        }).then(() => { console.log(`${id}변환`) })
    }


    //삭제 버튼 이벤트
    function delEvent(id) {
        if (window.confirm("삭제하시겠습니까?")) {
            fetch(`http://localhost:3001/alarm/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        alert("삭제되었습니다.")
                    }
                })
        }
    }

    //숫자 정리하기 위한 코드
    let alData = [];
    for (let i = 0; i < db.alarm.length; i++) {
        alData.push(db.alarm[i]);
    }
    //시간순으로 리스트 정렬
    alData.sort((a, b) => {
        return a.hour - b.hour;
    });
    alData.sort((a, b) => {
        if (a.hour === b.hour) {
            return a.min - b.min;
        } else {
            return 0;
        }
    });
    let notOverList = [];
    for (let i = 0; i < alData.length; i++) {
        if (alData[i].over === false) {
            notOverList.push(alData[i]);
        }
    }




    // let notOver = [];
    // let isOver = [];
    // for (let i = 0; i < alData.length; i++) {
    //     if (alData[i].over === false) {
    //         notOver.push(
    //             {
    //                 "id": db.alarm[i].id,
    //                 "memo": db.alarm[i].memo,
    //                 "hour": (db.alarm[i].hour < 10 ? `0${db.alarm[i].hour}` : db.alarm[i].hour),
    //                 "min": (db.alarm[i].min < 10 ? `0${db.alarm[i].min}` : db.alarm[i].min)
    //             }
    //         )
    //     } else if (alData[i].over === true) {
    //         isOver.push(
    //             {
    //                 "id": db.alarm[i].id,
    //                 "memo": db.alarm[i].memo,
    //                 "hour": (db.alarm[i].hour < 10 ? `0${db.alarm[i].hour}` : db.alarm[i].hour),
    //                 "min": (db.alarm[i].min < 10 ? `0${db.alarm[i].min}` : db.alarm[i].min)
    //             }
    //         )
    //     }
    // }

    useEffect(() => {
        if (notOverList.length > 0) {
            props.getRingData(notOverList[0].hour, notOverList[0].min, notOverList[0].memo, notOverList[0].id, notOverList[0].over);
        } else {
            props.getRingData(undefined, undefined, undefined, undefined, undefined);
        }
    },)

    return (
        <section id="alarmRead">
            <div>
                <button type="button" onClick={(event) => {
                    event.preventDefault();
                    props.goCreate();
                }}>+ADD</button>
            </div>

            <div className="alarmReadMapContainer">
                {alData.map((data) => ( //map에 쓰인 인자 data는 db.alarm이 됨. db.alarm의 갯수(length)만큼 생성.
                    <div key={data.id} className={data.over ? 'overed alarmObject flex' : 'alarmObject flex'}>
                        <div className='titleAndTime'>
                            {data.memo === '' ? '' : <strong>{data.memo}</strong>}
                            <span>{data.hour < 10 ? `0${data.hour}` : data.hour}:{data.min < 10 ? `0${data.min}` : data.min}</span>
                        </div>
                        <div className='buttonGroup'>
                            <button type="button" onClick={(event) => {
                                event.preventDefault();
                                props.goData(data);
                                props.goUpdate();
                            }}>EDIT</button>
                            <button type="button" onClick={(event) => {
                                event.preventDefault();
                                delEvent(data.id);
                            }}
                            >DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default AlarmRead