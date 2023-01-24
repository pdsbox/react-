import React, { useEffect, useState } from 'react';

function RecentStopWatch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        function fetching() {
            fetch('http://localhost:3001/timer', {
                method: "GET",
            }
            ).then(res => { return res.json(); }).then(resData => { setData(...data, resData); })
        }
        fetching();
    }, [])
    console.log(data);
    return (
        <section>
            지난 데이터
        </section>
    )
}

export default RecentStopWatch;