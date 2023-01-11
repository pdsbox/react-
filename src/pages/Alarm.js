import React, { useEffect, useState } from 'react';

import Nav from './Nav';
import AlarmHead from './AlarmHead';
import AlarmRead from './AlarmRead';
import AlarmCreate from './AlarmCreate';
import AlarmUpdate from './AlarmUpdate';

function Alarm() {

	//알람 울릴 시간 세팅
	const [ringTimeHour, setRingTimeHour] = useState(null);
	const [ringTimeMin, setRingTimeMin] = useState(null);
	const [ringMemo, setRingMemo] = useState(null);

	//Read컴포넌트로부터 알람 카운트 할 정보 받아오기
	function getRingData(hour, min, memo) {
		if (hour === false && min === false && memo === false) {
			setRingTimeHour(hour);
			setRingTimeMin(min);
			setRingMemo(memo);
		} else {
			setRingTimeHour(Number(hour));
			setRingTimeMin(Number(min));
			setRingMemo(memo);
		}
	}

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
			getRingData={(hour, min, memo) => { getRingData(hour, min, memo) }}
		/>
	}
	else if (mode === 'CREATE') {
		content = <AlarmCreate goRead={() => { setMode("READ"); }} />
	}
	else if (mode === 'UPDATE') {
		content = <AlarmUpdate upData={getRead} goRead={() => { setMode("READ") }} />
	}
	return (
		<>
			<Nav></Nav>
			<article className="contents">
				<AlarmHead ringHour={ringTimeHour} ringMin={ringTimeMin} ringMemo={ringMemo} />
				{content}
			</article>
		</>
	)
}

export default Alarm