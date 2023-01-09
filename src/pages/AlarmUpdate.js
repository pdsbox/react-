import React, { useState } from 'react';

function AlarmUpdate(props) {
    // console.log("왔다", props.upData);
    const hour = Number(props.upData.hour);
    const min = Number(props.upData.min);
    const [values, setValues] = useState(props.upData.memo);
    // const [values, setValues] = useState(null);
    // const [hour, setHour] = useState(0);
    // const [min, setMin] = useState(0);


    // useEffect(() => {
    // 	console.log("세팅", values, hour, min);
    // 	fetch(`http://localhost:3001/alarm/${props.upData.id}`, {
    // 	}).then((res) => res.json())
    // 		.then((data) => {
    // 			setValues(data.memo);
    // 			setHour(data.hour);
    // 			setMin(data.min);
    // 		});
    // }, []);

    const selectHour = [];
    for (let i = 0; i < 24; i++) {
        selectHour.push(
            <option key={i} value={i}>{i}</option>
        )
        //아이디와 i가 같다면 selected 설정
        // 	if (hour === i) {
        // 		listTime.push(
        // 			<option key={i} defaultValue selected>{i}</option>
        // 		)
        // 	} else {
        // 		listTime.push(
        // 			<option key={i} value={i}>{i}</option>
        // 		)
        // 	}
    }
    const selectMin = [];
    for (let i = 0; i < 60; i++) {
        selectMin.push(
            <option key={i} value={i}>{i}</option>
        )
        //아이디와 i가 같다면 selected 설정
        // if (min === i) {
        // 	listMinute.push(
        // 		<option key={i} defaultValue selected>{i}</option>
        // 	)
        // } else {
        // 	listMinute.push(
        // 		<option key={i} value={i}>{i}</option>
        // 	)
        // }
    }
    function changeEvent(e) {
        setValues(e.target.value);
    }

    return (
        <div id="mainUpdation">
            <form onSubmit={(event) => {
                event.preventDefault();
                if (window.confirm("수정하시겠습니까?")) {
                    const memo = event.target.memo.value;
                    const selTime = event.target.time.value;
                    const selMinute = event.target.minute.value;
                    fetch(`http://localhost:3001/alarm/${props.upData.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            memo: memo,
                            hour: selTime,
                            min: selMinute
                        }),
                    }).then(() => { window.alert("수정하였습니다. "); props.onUpdate(); })
                        .catch(() => { window.alert("에러가 발생했습니다. 다시 시도해주십시오."); })

                } else { }


            }}>
                <div id="selectBox">
                    <select name="time" defaultValue={hour}>
                        {selectHour}
                    </select>
                    <span>시</span>
                    <select name="minute" defaultValue={min}>
                        {selectMin}
                    </select>
                    <span>분</span>
                </div>
                <div id="memoBox">
                    <input type="text" name="memo" onChange={changeEvent} placeholder='내용을 입력하세요.' value={values}></input>
                </div>
                <button type="button" onClick={(event) => {
                    event.preventDefault();
                    props.goRead();
                }}>BACK</button>
                <button type="submit">UPDATE</button>

            </form >

        </div >
    )
}

export default AlarmUpdate