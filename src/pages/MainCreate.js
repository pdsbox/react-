import React from 'react';


function MainCreate(props) {
    const listTime = [];
    for (let i = 0; i < 24; i++) {
        listTime.push(
            <option key={i} value={i}>{i}</option>
        )
    }
    const listMinute = [];
    for (let i = 0; i < 60; i++) {
        listMinute.push(
            <option key={i} value={i}>{i}</option>
        )
    }

    return (
        <div id="mainCreation">
            <form onSubmit={(event) => {
                event.preventDefault();
                const memo = event.target.memo.value;
                const selTime = event.target.time.value;
                const selMinute = event.target.minute.value;
                fetch('http://localhost:3001/alarm', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: null,
                        memo: memo,
                        hour: selTime,
                        min: selMinute
                    }),
                }).then((res) => res.json())
                props.goRead();
            }}>
                <div id="selectBox">
                    <select name="time" required>
                        {listTime}
                    </select>
                    <span>시</span>
                    <select name="minute" required>
                        {listMinute}
                    </select>
                    <span>분</span>
                </div>
                <div id="memoBox">
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

export default MainCreate