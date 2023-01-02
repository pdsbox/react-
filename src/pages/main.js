import React, { useState } from 'react';
import useInterval from '../hooks/useInterval.js';
import db from '../data/data.json';


function MainHead() {
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
		<div>
			<h1>알람</h1>
			<p>현재 시각 : {now_year}.{now_month}.{now_day} {now_hour < 10 ? `0${now_hour}` : now_hour}:{now_min < 10 ? `0${now_min}` : now_min}:{now_second < 10 ? `0${now_second}` : now_second}</p>
			<h2>다음 알람까지 : </h2>
		</div>
	)
}


function MainRead(props) {
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

function MainUpdate(props) {
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

	const listTime = [];
	for (let i = 0; i < 24; i++) {
		listTime.push(
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
	const listMinute = [];
	for (let i = 0; i < 60; i++) {
		listMinute.push(
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
					}).then((res) => res.json())
					props.onUpdate();
				} else { }


			}}>
				<div id="selectBox">
					<select name="time" defaultValue={hour}>
						{listTime}
					</select>
					<span>시</span>
					<select name="minute" defaultValue={min}>
						{listMinute}
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


function Main() {
	const [mode, setMode] = useState('READ');
	// const [id, setId] = useState(null);
	const [nextId, setNextId] = useState(db.alarm === null ? 1 : db.alarm.length);
	// const [alarm, setAlarm] = useState([
	// 	{ id: 1, memo: '기상', hour: '07시', min: '30분' },
	// 	{ id: 2, memo: '아침먹기', hour: '08시', min: '15분' }
	// ]);
	const [getRead, setRead] = useState([]);
	function goData(data) {
		setRead(data);
	}
	let content = null;

	if (mode === 'READ') {
		content = <MainRead goCreate={() => { setMode('CREATE') }}
			goUpdate={() => { setMode("UPDATE"); }}
			goData={(fromRead) => { goData(fromRead); }}></MainRead >
	}
	else if (mode === 'CREATE') {
		content = <MainCreate
			goRead={() => { setMode("READ"); }}
			onCreate={() => {

				setNextId(nextId + 1);
				setMode('READ');
			}}></MainCreate>
	}
	else if (mode === 'UPDATE') {
		content = <MainUpdate upData={getRead} goRead={() => { setMode("READ") }} onUpdate={() => { setMode('READ') }} ></MainUpdate>
	}
	return (
		<section>
			<MainHead></MainHead>
			<div id="mainContent">
				{content}

			</div>

		</section>
	)
}

export default Main