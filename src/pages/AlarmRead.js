import React from 'react';
import db from '../data/data.json';

function AlarmRead(props) {
    // const [uData, setUData] = useState([]);
    // useEffect(() => {
    // 	fetch()
    // }, []);

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
        alData.push(
            {
                "id": db.alarm[i].id,
                "memo": db.alarm[i].memo,
                "hour": (db.alarm[i].hour < 10 ? `0${db.alarm[i].hour}` : db.alarm[i].hour),
                "min": (db.alarm[i].min < 10 ? `0${db.alarm[i].min}` : db.alarm[i].min)
            }
        );
    }
    //시간순으로 리스트 정렬
    alData.sort((a, b) => {
        return a.hour - b.hour;
    })
    alData.sort((a, b) => {
        if (a.hour === b.hour) {
            return a.min - b.min;
        } else {
            return 0;
        }
    })

    return (
        <div id="mainRead">
            <button type="button" onClick={(event) => {
                event.preventDefault();
                props.goCreate();
            }}>CREATE</button>

            <div className="mapData">
                {alData.map((data) => ( //map에 쓰인 인자 data는 db.alarm이 됨. db.alarm의 갯수(length)만큼 생성.
                    <div key={data.id} >
                        <p><span>{data.memo}</span></p>
                        <div>{data.hour}시 {data.min}분</div>
                        <button onClick={(event) => {
                            event.preventDefault();
                            props.goData(data);
                            props.goUpdate();
                        }}>UPDATE</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            delEvent(data.id);
                        }}
                        >DELETE</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlarmRead