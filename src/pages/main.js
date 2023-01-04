import React, { useState } from 'react';
import db from '../data/data.json';

import MainHead from './MainHead';
import MainRead from './MainRead';
import MainCreate from './MainCreate';
import MainUpdate from './MainUpdate';


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