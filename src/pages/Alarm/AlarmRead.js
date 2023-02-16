import React from 'react';

function AlarmRead(props) {
    const database = props.dbData.length !== 0 ? props.dbData : [];

    //알람 상태 현재시간에 맞춰서 최신화
    const realTime = new Date();
    const realTimeHour = realTime.getHours();
    const realTimeMin = realTime.getMinutes();

    //상태 변경 액션
    if (database.length > 0) {
        for (let i = 0; i < database.length; i++) {
            if (Number(database[i].hour) > realTimeHour) {
                fetchingOver(database[i].id, false);
                database[i].over = false;

            } else if (Number(database[i].hour) < realTimeHour) {
                fetchingOver(database[i].id, true);
                database[i].over = true

            } else if (Number(database[i].hour) === realTimeHour) {
                if (Number(database[i].min) > realTimeMin) {
                    fetchingOver(database[i].id, false);
                    database[i].over = false;

                } else {
                    fetchingOver(database[i].id, true);
                    database[i].over = true;
                }
            }
        }
    }
    function fetchingOver(id, status) {
        fetch(`http://localhost:3001/alarm/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                over: status
            })
        })
    }


    //삭제 버튼 이벤트
    function delEvent(id) {
        if (window.confirm("삭제하시겠습니까?")) {
            fetch(`http://localhost:3001/alarm/${id}`, {
                method: "DELETE",
            }).then((res) => {
                if (res.ok) {
                    window.alert("삭제되었습니다.");
                    props.callDb();
                }
            })
        }
    }


    //시간순으로 리스트 정렬
    if (database.length > 0) {
        database.sort((a, b) => {
            return a.hour - b.hour;
        });
    }
    if (database.length > 0) {
        database.sort((a, b) => {
            if (a.hour === b.hour) {
                return a.min - b.min;
            } else {
                return 0;
            }
        });
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



    return (
        <section id="alarmRead">
            <div>
                <button type="button" onClick={(event) => {
                    event.preventDefault();
                    props.goCreate();
                }}>+ADD</button>
            </div>

            <div className="alarmReadMapContainer">
                {database.length === 0 ? "Loading..." : database.map((data) => (
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