import React, {useState, useEffect, useRef} from 'react';


function MainHead(){
  const [time_hour, setHour] = useState('');
  const [time_min, setMinute] = useState('');
  const [time_second, setSecond] = useState('');
  const [time_day, setDay] = useState('');
  const [time_month, setMonth] = useState('');
  const [time_year, setYear] = useState('');


  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    });
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        const timerId = setInterval(tick, delay);
        return () => clearInterval(timerId);
    }, [delay]);
}

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
      <p>현재 시각 : {time_year}.{time_month}.{time_day} {time_hour < 10 ? `0${time_hour}` : time_hour}:{time_min < 10 ? `0${time_min}` : time_min}:{time_second < 10 ? `0${time_second}` : time_second}</p>
      <h2>다음 알람까지 : </h2>
    </div>
  )
}
function MainRead(){
  return(
  <div>
    <button type="button" onClick={(event)=>{
      event.defaultPrevented();

    }}>ADD</button>
  </div>
  )
}
function MainCreate(){
  return(
    <div>323</div>
  )
}


function Main(){

  // const [mode, setMode] = useState('READ');


  // let content = null;
  // if(mode === 'READ'){
  //   content = <MainRead></MainRead>
  // }else if(mode === 'CREATE'){
  //   content = <MainCreate></MainCreate>
  // }


    return(
      <section>
        <MainHead></MainHead>
        <div id="mainContent">
          <MainRead></MainRead>
          <MainCreate></MainCreate>
        </div>

      </section>
    )
  }

  export default Main