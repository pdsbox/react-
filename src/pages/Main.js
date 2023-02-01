import '../App.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alarmVideo from "../videos/alarm.mp4";
import stopwatchVideo from '../videos/stopwatch.mp4'
import alarmclockImg from "../images/alarmclock.jpg"
import stopwatchImg from "../images/stopwatch.jpg"

const desc = [
    {
        "idx": "0",
        "path": "/Alarm",
        "head": "Alarm",
        "desc": "시간과 내용을 설정하고, 설정한 시간이 되었을 때 알려줍니다.",
        "imgSrc": alarmclockImg,
        "videoSrc": alarmVideo,
        "fxTitle1": "1. 불러오기/저장/수정/삭제(CRUD)",
        "fxDesc1": '사용자가 알람을 확인(View), 등록, 수정, 삭제할 수 있습니다. (Fetch)',
        "fxTitle2": "2. 알람 기능",
        "fxDesc2": "설정한 시간이 되면 알람이 울립니다.",
        "fxTitle3": "3. 남은 시간 확인",
        "fxDesc3": "다음에 울릴 알람 시간이 얼마나 남았는지 보여줍니다",
        "fxTitle4": "4. 알람 상태 최신화",
        "fxDesc4": "알람의 상태를 현재 시간(Real Time)과 비교해 자동으로 설정해줍니다."
    },
    {
        "idx": "1",
        "path": "/StopWatch",
        "head": "StopWatch",
        "desc": "시간의 흐름을 기록, 저장할 수 있습니다.",
        "imgSrc": stopwatchImg,
        "videoSrc": stopwatchVideo,
        "fxTitle1": "1. 타이머",
        "fxDesc1": '사용자가 원하는 타이밍에 타이머를 실행, 중지할 수 있습니다.',
        "fxTitle2": "2. 시간 기록",
        "fxDesc2": "사용자가 원하는 타이밍에 원하는 만큼 시간을 기록 및 확인할 수 있습니다.",
        "fxTitle3": "3. 구간 기록",
        "fxDesc3": "구간별 소요 시간을 확인할 수 있습니다.",
        "fxTitle4": "4. 이전 기록",
        "fxDesc4": "가장 최근에 사용한 기록을 볼 수 있습니다."
    }
]


function Modal(props) {
    return (
        <div id="modal">
            <div className="modalBg" onClick={() => { props.modalUnActive(); }}></div>
            <section>
                <video src={props.movie} controls></video>
            </section>
        </div >
    )
}

function Main() {

    const [modalActive, setModalActive] = useState(false);
    const [modalComp, setModalComp] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);

    //모달 생성 && VIEW
    useEffect(() => {
        if (modalActive === true && modalComp === null) {
            setModalComp(<Modal movie={videoSrc} modalUnActive={modalUnActive} />)
        }
    }, [modalActive, modalComp, videoSrc]);

    //모달 ESC키 이벤트
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === 'Escape' && modalActive === true && modalComp !== null) {
                modalUnActive();
            }
        })
    },)

    //모달창 제거
    function modalUnActive() {
        setModalActive(false);
        setModalComp(null);
    }

    //모달 세팅-Trigger
    function previewModalHandler(e) {
        const idx = e.currentTarget.className;
        const video = desc[idx].videoSrc;
        setVideoSrc(video);
        setModalActive(true);
        // console.log(e.currentTarget, idx, body)
    }


    function accordion(e) {
        const tg = e.currentTarget.nextSibling.firstChild;
        let state = tg.style.display;
        if (state === '' || state === 'none') {
            tg.style.display = 'block';
        } else if (state === 'block') {
            tg.style.display = 'none';
        }
    }


    return (
        <>
            {modalComp}
            <h1 id="indexHead">WELCOME !</h1>
            <article className="indexContainer first">
                <div className='flex'>
                    {desc.map((desc) => (
                        <div className='buckets' key={desc.idx}>
                            <section className='indexBlock'>
                                <Link to={desc.path} className="navBlocks">
                                    <img src={desc.imgSrc} alt={desc.imgSrc}></img>

                                    <h2>{desc.head}</h2>
                                    <p>{desc.desc}</p>

                                </Link>
                                <div className='preview'><span className={desc.idx} onClick={(event) => {
                                    previewModalHandler(event);
                                }}>PREVIEW</span></div>
                            </section>
                            <section className="infoBlocks">
                                <ul>
                                    <li className="accordionBtn" onClick={(event) => {
                                        accordion(event);
                                    }}>MORE</li>
                                    <li>
                                        <ul className="accordionBucket">
                                            <li>{desc.fxTitle1}</li>
                                            <li>{desc.fxDesc1}</li>
                                            <li>{desc.fxTitle2}</li>
                                            <li>{desc.fxDesc2}</li>
                                            <li>{desc.fxTitle3}</li>
                                            <li>{desc.fxDesc3}</li>
                                            <li>{desc.fxTitle4}</li>
                                            <li>{desc.fxDesc4}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    ))}
                </div>
            </article>
            {/* <article className='indexContainer second'>
                <div className="flex">
                    {options.map((options) => (
                        <section key={options.idx} className="infoBlocks">
                            <ul>
                                <li className="accordion" onClick={(event) => {
                                    accordion(event);
                                }}>설명</li>
                                <li className="accordionBucket">
                                    <ul>
                                        <li>{options.fxTitle1}</li>
                                        <li>{options.fxDesc1}</li>
                                        <li>{options.fxTitle2}</li>
                                        <li>{options.fxDesc2}</li>
                                        <li>주요 이슈</li>
                                        <li>{options.afterStory}</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                    ))}

                </div>
            </article> */}
        </>
    )
}

export default Main