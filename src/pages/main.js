import React, {useState} from 'react';
import useInterval from '../hooks/useInterval.js';
import db from '../data/data.json';


function MainHead(){
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
  const [now_month, setMonth] = useState(month);
  const [now_year, setYear] = useState(year);

 
  useInterval(()=>{

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
    setMonth(month);
    setYear(year);

  },1000);

  return(
    <div>
      <h1>알람</h1>
      <p>현재 시각 : {now_year}.{now_month}.{now_day} {now_hour < 10 ? `0${now_hour}` : now_hour}:{now_min < 10 ? `0${now_min}` : now_min}:{now_second < 10 ? `0${now_second}` : now_second}</p>
      <h2>다음 알람까지 : </h2>
    </div>
  )
}

function MainRead(props){
  const readList = [];
  for (let i = 0; i < props.alarm.length; i++){
    let alm = props.alarm[i];
    readList.push(
        <div className="alarmBlock" key={alm.id}>
          <div>내용:{alm.memo}</div>
          <div>시간:{alm.hour} {alm.min}</div>
        </div>
    )
  }

  return(
  <div id="mainRead">
    <button type="button" onClick={(event)=>{
      event.preventDefault();
      props.goCreate();
    }}>CREATE</button>

    {readList}
    <div className="mapData">
          {db.alarm.map(data => ( //map에 쓰인 인자 data는 db.alarm이 됨. db.alarm의 갯수(length)만큼 생성.
            <div key={data.id}>
              <p><span>{data.memo}</span></p> 
              <div>{data.hour} {data.min}</div>
            </div>
          ))}
        </div>
  </div>
  )
}


function MainCreate(props){
  const listTime = [];
  for (let i = 0; i < 24; i++){
    listTime.push(
      <option key={i} value={i}>{i}</option>
    )
  }
  const listMinute = [];
  for (let i = 0; i < 60; i++){
    listMinute.push(
      <option value={i}>{i}</option>
    )
  }

  return(
    <div id="mainCreate">
      <form onSubmit={(event)=>{
        event.preventDefault();
        const memo = event.target.memo.value;
        const selTime = event.target.time.value;
        const selHour = (selTime < 10 ? `0${selTime}` : selTime)+"시"
        const selMinute = event.target.minute.value;
        const selMin = (selMinute < 10 ? `0${selMinute}` : selMinute)+"분";
        props.onCreate(memo, selHour, selMin);
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
        <button type="button" onClick={(event)=>{
        event.preventDefault();
        props.goRead();
      }}>BACK</button>
      <button type="submit">ADD</button>
        
      </form>

    </div>
    
  )
}


function Main(){
  const [mode, setMode] = useState('READ');
  // const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [alarm, setAlarm] = useState([
    {id:1, memo:'기상', hour:'07시', min:'30분'},
    {id:2, memo:'아침먹기', hour:'08시', min:'15분'}
  ]);


  let content = null;
  if(mode === 'READ'){
     content = <MainRead alarm={alarm} goCreate={()=>{
      setMode('CREATE');
     }}> 
      
     </MainRead>
  }else if(mode === 'CREATE'){
     content = <MainCreate goRead={()=>{setMode("READ");}} onCreate={(_memo, _selHour, _selMin)=>{
      const newAlarm = {id:nextId, memo:_memo, hour:_selHour, min:_selMin};
      const newAlarms = [...alarm]
      newAlarms.push(newAlarm);
      setAlarm(newAlarms);
      setNextId(nextId+1);
      setMode('READ');
     }}></MainCreate>
  }
  console.log(db);
    return(
      <section>
        <MainHead></MainHead>
        <div id="mainContent">
          {content}
          
        </div>

      </section>
    )
  }

  export default Main