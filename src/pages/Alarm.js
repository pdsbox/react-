import React, { useState } from 'react';
import db from '../data/data.json';

import Nav from './Nav';
import AlarmHead from './AlarmHead';
import AlarmRead from './AlarmRead';
import AlarmCreate from './AlarmCreate';
import AlarmUpdate from './AlarmUpdate';


function Alarm() {
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
		content = <AlarmRead goCreate={() => { setMode('CREATE') }}
			goUpdate={() => { setMode("UPDATE"); }}
			goData={(fromRead) => { goData(fromRead); }}></AlarmRead >
	}
	else if (mode === 'CREATE') {
		content = <AlarmCreate
			goRead={() => { setMode("READ"); }}
			onCreate={() => {
				setNextId(nextId + 1);
				setMode('READ');
			}}></AlarmCreate>
	}
	else if (mode === 'UPDATE') {
		content = <AlarmUpdate upData={getRead} goRead={() => { setMode("READ") }} onUpdate={() => { setMode('READ') }} ></AlarmUpdate>
	}
	return (
		<>
			<Nav></Nav>
			<section>
				<AlarmHead></AlarmHead>
				<div id="mainContent">
					{content}

				</div>

			</section>
		</>
	)
}

export default Alarm