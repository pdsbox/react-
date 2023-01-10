import '../App.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alarmVideo from "../videos/alarm.mp4";

const desc = [
    {
        "idx": "0",
        "path": "/Alarm",
        "head": "Alarm",
        "desc": "시간과 내용을 설정하고, 설정한 시간이 되었을 때 알려줍니다.",
        "imgSrc": "",
        "videoSrc": alarmVideo
    },
    {
        "idx": "1",
        "path": "/timer",
        "head": "Timer",
        "desc": "시간의 흐름을 기록, 저장할 수 있습니다.",
        "imgSrc": "",
        "videoSrc": "2번"
    },
    {
        "idx": "2",
        "path": "/checklist",
        "head": "CheckList",
        "desc": "하루의 일정을 설정하고 수행 여부를 관리할 수 있습니다.",
        "imgSrc": "",
        "videoSrc": "3번"
    },
    {
        "idx": "3",
        "path": "/weather",
        "head": "Weather",
        "desc": "원하는 도시를 검색하고 해당 도시의 날씨정보를 확인할 수 있습니다.",
        "imgSrc": "",
        "videoSrc": "4번"
    }
]
const options = [
    {
        "idx": "0",
        "fxTitle1": "데이터 가공(CRUD)",
        "fxDesc1": '데이터베이스와 연동하여 사용자가 원하는 정보를 입력받거나 수정할 수 있다.',
        "fxTitle2": "알람 기능",
        "fxDesc2": "사용자로부터 입력받은 시간과 현재 시간을 대조하여 알람기능 구현",
        "afterStory": "react에서 form 태그의 옵션들과 응용성, fetch를 사용하여 서버(DB)와의 데이터를 주고받는 과정에서 발생하는 이슈들(서버off상태 및 연결상태 불량 등), 동기/비동기 데이터 처리에 대한 공부를 하였습니다."
    },
    {
        "idx": "1",
        "fxTitle1": "/timer",
        "fxDesc1": "Timer",
        "fxTitle2": "시간의 흐름을 기록, 저장할 수 있습니다.",
        "fxDesc2": "",
        "afterStory": "2번"
    },
    {
        "idx": "2",
        "fxTitle1": "/checklist",
        "fxDesc1": "CheckList",
        "fxTitle2": "하루의 일정을 설정하고 수행 여부를 관리할 수 있습니다.",
        "fxDesc2": "",
        "afterStory": "3번"
    },
    {
        "idx": "3",
        "fxTitle1": "/weather",
        "fxDesc1": "Weather",
        "fxTitle2": "원하는 도시를 검색하고 해당 도시의 날씨정보를 확인할 수 있습니다.",
        "fxDesc2": "",
        "afterStory": "4번"
    }
];


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
    }, [modalActive])

    //모달 ESC키 이벤트
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === 'Escape' && modalActive === true && modalComp !== null) {
                modalUnActive();
            }
        })
    })

    //모달창 제거
    function modalUnActive() {
        setModalActive(false);
        setModalComp(null);
    }

    //모달 세팅
    function previewModalHandler(e) {
        const idx = e.currentTarget.className;
        const video = desc[idx].videoSrc;
        console.log(video);
        setVideoSrc(video);
        setModalActive(true);
        // console.log(e.currentTarget, idx, body)
    }


    return (
        <>
            {modalComp}
            <h1 id="indexHead">WELCOME !</h1>
            <article className="indexContainer first">
                <div className='flex'>
                    {desc.map((desc) => (
                        <section key={desc.idx} className='indexBlock'>
                            <Link to={desc.path} className="navBlocks">
                                <img src={desc.imgSrc} alt={desc.imgSrc}></img>
                                <h2>{desc.head}</h2>
                                <p>{desc.desc}</p>
                            </Link>
                            <span className={desc.idx} onClick={(event) => {
                                previewModalHandler(event);
                            }}>미리보기</span>
                        </section>
                    ))}
                </div>
            </article>
            <article className='indexContainer second'>
                <div className="flex">
                    {options.map((options) => (
                        <section key={options.idx} className="infoBlocks">
                            <h2>기능 설명</h2>
                            <h3>{options.fxTitle1}</h3>
                            <p>{options.fxDesc1}</p>
                            <h3>{options.fxTitle2}</h3>
                            <p>{options.fxDesc2}</p>
                            <h3>후기</h3>
                            <p>{options.afterStory}</p>
                        </section>
                    ))}

                </div>
            </article>
        </>
    )
}

export default Main