
CREATE-REACT-APP<br/>
DB : json-server<br/>
버전 1<br/>
<br/>


<22.12.16 ~ >  
    프로젝트 기획  
    -리액트로 만드는 alarm 앱
    -react-router-dom


< ~ 22.12.21>  
    Main페이지 READ 일부 구현.  
    - State로 READ 상태, CREATE 상태 구분  
    Main페이지 CREATE 일부 구현.  
    - 리스트에 객체 정보 push  
    참고 : https://opentutorials.org/course/4900/31269  
  
  
< ~ 22.12.23>  
    - json-server 설치  
    - db(.json) 세팅  
    - map()으로 데이터 바인딩(기존 for문+push로 렌더링에 보여줄 변수 따로 지정해서 데이터 저장하는 방식.)  
  
  
< ~ 22.12.28>  
    - json-server -> REST API 구축 및 fetch메소드로 HTTP통신.  
    - Read(GET), Create(POST), Delete(DELETE) 기능 구현.  
  
< ~ 22.12.30>  
    - json-server 통해서 UPDATE기능 구현 ~ing  
    컴포넌트 간 id값 props로 옮겨서 로직 구현 - 실패.  
        => fetch시 비동기처리로 인해 모드 변경하는것이 props로 값 넘겨주는 것 보다 빨라서 데이터 흐름 제어에 어려움.  
    State로 id값 넘겨주기 - 실패  
        => 위와 같은 이유...  
    reducer, context ...?  
  
< ~ 23.01.02>  
    - UPDATE 구현.  
        구현이 지체된 원인 : fetch 비동기적 작동원리와 리액트 라이프사이클에 대한 이해 부족, 구현 접근방식을 너무 복잡하게 생각했던 것.  
        => db값 하나하나 props로 전달 및 state화, Fetch시 useEffect라는 옵션도 고려.  
        useEffect : 컴포넌트 렌더링 시 작동(기본값) or 2번째 인자값으로 특정 'state' 설정하여 해당 state내용 변경시마다 함수 실행. []빈 배열은 최초 1회만 실행.  
    - select / option 태그 셋팅 이슈(초기값 세팅)  
        원인 : 태그 생성시 초기값 설정 없이 if로 데이터 일치할때 selected 속성값(내가 생각한 초기값) 주려고 했었음.  
        => select태그에 defaultValue로 초기값 설정하여 해결. 번거롭게 if문 사용하지 않아도 됌.  
  
< ~ 23.01.04>  
    - Main 컴포넌트 기능별로 분리  
    - Main 컴포넌트 컨텐츠영역 시간순으로 Sort & View  
        { https://hianna.tistory.com/409 }  
  
  
<23.01.17>  
Alarm : CREATE / UPDATE 컴포넌트 input text 글자수 제한 지정(16)  
    => 반응형 레이아웃 쉽게 디자인하기 위함.  
  
Timer : Head 영역 설계.  
    - 라디오 버튼 + label태그로 구성.  
    - 개발자도구에서 React에서 쓰는 속성값(checked -> defaultChecked , for -> htmlFor) 확인 및 변경.  
    => 이후 컴포넌트화 시켜서 분리/관리  
  
생각해야할 것 : 각 기능별 페이지마다 헤더/컨텐츠로 섹션을 나누고 그에 따라 레이아웃, 간격, 영역 크기 등 디자인적으로 공통화 시켜야 할 것들.  
  
<23.01.19>  
Alarm : READ 컴포넌트 시간부분 수정(10이하일 때 0붙여서 표시)  
  
Timer : Timer 컴포넌트 초안 스케치.  
    - 각 버튼에 따른 이벤트 실행.  
    START : interval 실행  
    STOP : interval 중지  
    CHECK : 중간시간 기록  
    RESET : 모든 시간정보 초기화(0)  
  
<23.01.20>  
ADD : Timer 컴포넌트 스타일 작업  
    - 오버플로우 적용  
    - 오버플로우에 따른 스크롤바 스타일 디자인  
    - 구간기록 각 리스트 간격 조절  
    - 메인 타이머, 서브 타이머 강조 컬러 적용 등  
  
UPDATE : Timer 컴포넌트 구간기록 시 전체시간 대비 밀리세컨드 +1초씩 오차 발생  
     - 타이머 로직 변경.  
        => 조건식 (밀리세컨드 === 100) ---> (밀리세컨드 === 99).  
            1. 함수 안에서 호출한 setState는 요청만 한 상태이고 즉각적으로 값이 반영되지 않기 때문에 로직 내에서 100 이란 조건은 101에서 작동한것과 같음.  
            2. 그러므로, 매칭 값을 -1 해주던지 타임업 이후 밀리세컨드State를 +1로 바꾸던지 선택해야 했음.  
            3. '밀리세컨드가 100일 경우' 화면에 VIEW하는 과정에서 불필요한 코드를 추가해야 하기 때문에 기존의 조건식을 변경하는 방식으로 해결.  
<23.01.24>  
UPDATE : 컴포넌트 이름 변경.  
    - Timer -> StopWatch  
    - 이름 변경에 따른 path값 수정.  
  
THINK : 스톱워치 RECENT 컴포넌트 기능.  
    - StopWatchTimer 에서 서버로 데이터 전송하기.  
        => CHECK버튼 누를때마다 fetch 실행? 아니면 별도의 전송버튼 만들어서 한번에 보내기?  
        => db에 가장 최근 데이터만 저장되게 하려면 HOW?  
    - 서버로부터 데이터 받아와서 보여주기(fetch-get, array, map)  
  
<23.01.25>  
DELETE : 프로젝트 볼륨 DOWN (체크리스트, 웨더 삭제)  
ADD : StopWatchRecent 컴포넌트 화면 VIEW 스케치(map)  
  
THINK : 서버로부터 데이터 저장해서 Recent에서 받아오기.  
  
<23.01.27>  
ADD : 알람-리드 현재시간에 맞춰서 알람 on/off상태 최신화  
    => useEffect로 최초 1회만 실행, 시간 대조해서 fetch로 over값 변경  
    => db에서 가져온 데이터 문자열이어서 Number()로 숫자로 바꿔줌.  
  
	스톱워치-타이머 컴포넌트  
    - 데이터 포스트/풋  
    - 데이터 리스트 임시저장해서 특정 트리거(버튼)로 fetch가 잘 되는지 확인.  
    - fetch시 url 생각한대로 동작하지 않은 이슈. 최초 POST시 1뎁스 더 생성되는 문제  
    => 1뎁스 더 생성되는 오브젝트의 id를 1로 고정시켜놓음으로써 관리하기 편하게 만듦.  
  
    스톱워치-리센트 컴포넌트  
    - 서버에서 데이터 받아오기  
    => useEffect로 최초 1회만 실행, 이펙트 내부에서 fetch 호출하여 데이터셋 시키기  
    - 데이터 셋 과정에서 .then으로 서버데이터 가져오지만, 서버에 유효한 데이터가 없는경우 undefined 할당됨.(map과정에서 에러발생)  
    => catch로 다시 초기화 작업  
  
<23.01.30>  
UPDATE : Main 컴포넌트  
    - 이미지 삽입  
    - 프리뷰 동영상 삽입  
    - MORE 기능 설명구 삽입  


npm run build 이슈(배포버전)
    - https://codingapple.com/unit/react-build-deploy-github-pages/

=> index.html 화면 안 나오는 문제
    - 배포버전 index.html 내 script/link 경로 수정(/ -> ./)
        => 해결 안됨.
    - 라우팅 문제?
    
=> json-server 연결?
    => 1. heroku : https://velog.io/@rmaomina/json-server-Heroku-React-app-deploy
       2. firebase
       3. node.js - express

  
---Ver 1 FIX