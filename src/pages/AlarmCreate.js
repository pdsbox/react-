import React from 'react';


function AlarmCreate(props) {
    const selectHour = [];
    for (let i = 0; i < 24; i++) {
        selectHour.push(
            <option key={i} value={i}>{i}</option>
        )
    }
    const selectMin = [];
    for (let i = 0; i < 60; i++) {
        selectMin.push(
            <option key={i} value={i}>{i}</option>
        )
    }

    return (
        <div id="mainCreation" className='formContainer'>
            <h4 className='kr'>시간과 내용을 설정해주세요.</h4>
            <form onSubmit={(event) => {
                const date = new Date();
                const thisHour = date.getHours();
                const thisMin = date.getMinutes();
                // console.log("now : ", thisHour, thisMin);
                event.preventDefault();
                const memo = event.target.memo.value;
                const selTime = event.target.time.value;
                const selMinute = event.target.minute.value;
                // console.log("set : ", selTime, selMinute);
                let over = false;
                if (Number(thisHour) < Number(selTime)) {
                    over = false;
                } else if (Number(thisHour) === Number(selTime) && Number(thisMin) < Number(selMinute)) {
                    over = false;

                } else {
                    over = true;

                }
                fetch('http://localhost:3001/alarm', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: null,
                        memo: memo,
                        hour: selTime,
                        min: selMinute,
                        over: over
                    }),
                }).then((res) => res.json())
                props.goRead();
            }}>
                <div className="selectBox">
                    <select name="time" required>
                        {selectHour}
                    </select>
                    <span> : </span>
                    <select name="minute" required>
                        {selectMin}
                    </select>
                </div>
                <div className="memoBox">
                    <input type="text" name="memo" placeholder='내용을 입력하세요.'></input>
                </div>
                <button type="button" onClick={(event) => {
                    event.preventDefault();
                    props.goRead();
                }}>BACK</button>
                <button type="submit">ADD</button>

            </form>

        </div>

    )
}

export default AlarmCreate