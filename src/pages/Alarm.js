import React, { useState } from 'react';

import Nav from './Nav';
import AlarmHead from './AlarmHead';
import AlarmRead from './AlarmRead';
import AlarmCreate from './AlarmCreate';
import AlarmUpdate from './AlarmUpdate';

function Alarm() {

	//알람 울릴 시간 세팅
	const [ringHour, setRingHour] = useState(null);
	const [ringMin, setRingMin] = useState(null);
	const [ringMemo, setRingMemo] = useState(null);
	const [ringId, setRingId] = useState(null);
	const [ringOver, setRingOver] = useState(null);

	//Read컴포넌트로부터 알람 카운트 할 정보 받아오기
	function getRingData(hour, min, memo, id, over) {
		if (hour === undefined && min === undefined && memo === undefined) {
			setRingHour(hour);
			setRingMin(min);
			setRingMemo(memo);
			setRingId(id);
			setRingOver(over);
		} else {
			setRingHour(Number(hour));
			setRingMin(Number(min));
			setRingMemo(memo);
			setRingId(id);
			setRingOver(over);
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
			getRingData={(hour, min, memo, id, over) => { getRingData(hour, min, memo, id, over) }}
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
				<AlarmHead ringHour={ringHour} ringMin={ringMin} ringMemo={ringMemo} ringId={ringId} ringOver={ringOver} />
				{content}
			</article>
		</>
	)
}

export default Alarm