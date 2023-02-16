import React, { useEffect, useState } from 'react';

import Nav from './Nav';
import AlarmHead from './Alarm/AlarmHead';
import AlarmRead from './Alarm/AlarmRead';
import AlarmCreate from './Alarm/AlarmCreate';
import AlarmUpdate from './Alarm/AlarmUpdate';

function Alarm() {

	//db세팅
	const [fetchData, setFetchData] = useState([]);
	useEffect(() => {
		callDb();
	}, []);

	function callDb() {
		fetch('http://localhost:3001/alarm', {
			method: "GET",
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
		}).then(result => {
			setFetchData(result)
		})
	}

	//알람 울릴 타이머 설정
	let notOverList = [];
	for (let i = 0; i < fetchData.length; i++) {
		if (fetchData[i].over === false) {
			notOverList.push(fetchData[i]);
		}
	}
	//정렬
	if (notOverList.length > 0) {
		notOverList.sort((a, b) => {
			return a.hour - b.hour;
		});
	}
	if (notOverList.length > 0) {
		notOverList.sort((a, b) => {
			if (a.hour === b.hour) {
				return a.min - b.min;
			} else {
				return 0;
			}
		});
	}

	console.log(notOverList)


	//CRUD모드 세팅
	const [mode, setMode] = useState('READ');
	const [getRead, setRead] = useState([]);
	function goData(data) {
		setRead(data);
	}


	let content = null;

	if (mode === 'READ') {
		content = <AlarmRead goCreate={() => { setMode('CREATE') }}
			goUpdate={() => { setMode("UPDATE"); }}
			goData={(fromRead) => { goData(fromRead); }}
			dbData={fetchData}
			callDb={() => { callDb(); }}
		/>
	}
	else if (mode === 'CREATE') {
		content = <AlarmCreate
			goRead={() => { setMode("READ"); }}
			callDb={() => { callDb(); }} />
	}
	else if (mode === 'UPDATE') {
		content = <AlarmUpdate
			upData={getRead}
			goRead={() => { setMode("READ") }}
			callDb={() => { callDb(); }} />
	}
	return (
		<>
			<Nav></Nav>
			<article className="contents">
				<AlarmHead ringTime={notOverList[0]} callDb={() => { callDb(); }} />
				{content}
			</article>
		</>
	)
}

export default Alarm