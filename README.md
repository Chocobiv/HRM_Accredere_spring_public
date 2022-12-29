# :computer: HR_management_project_spring[ 인사관리 프로젝트 ]
<details>
  
  <summary><h3>:wave: 팀원 소개 :wave:</h3></summary> 
  
  ###### 팀 소개
  
        안녕하세요!
        저희 팀은 인사관리 시스템을 구현해보고자 시작된 팀입니다.
        모르는 것을 두려워하기 보다는 같이 학습하며 협업하는 팀이 되겠습니다:)
        
  ###### 팀원
        손비아
        성지혜
        윤상진
        안태섭
  
</details>

<details>

<summary><h3>:collision: 주제 선정이유 및 구현목표 :collision:</h3></summary> 

###### 주제선정 이유

    수업시간에 배운 내용을 복습하면서 각자 구현하고 싶은 기능들을 추가하여 활요하는 것을 목표로 하고자 합니다.

###### 스케일

    목표는 대(大) 프로젝트로 잡았습니다.
    
###### 구현 목표

    손비아 : 시각 자료(추이 그래프)를 이용한 근태관리
    성지혜 : 게시판 구현을 이용한 인사관리 및 인사현황
    윤상진 : 방사형 그래프를 이용한 인가고가평가서
    안태섭 : 소켓을 이용한 기능 구현

</details>

## Overview
- 인사관리자가 회사 직원관리에 필요로 할 것 같은 기능들을 구현했습니다.
- 기본적인 직원들의 정보관리와 출/퇴근 상태를 그래프로 나타내어 한눈에 볼 수 있도록 구현했습니다.
- 급여관리와 진행중인 업무를 볼 수 있으며 해당 직원에 대한 설문조사를 통해 인사고과평가로 직원의 능력치를 한눈에 볼 수 있도록 구현했습니다.
- 해당 직원을 부서/직급/이름별로 검색하여 인사발령 보낼 수 있으며 멀티스레드를 사용하여 발령 대기상태를 발령 완료상태로 변경이 가능하도록 구현했고, 현재까지 이루어진 인사현황을 목록으로 확인할 수 있도록 구현했습니다.

<br><br>
## :movie_camera: Preview :movie_camera:
### 전체
### 근태관리
### 직원관리
### 급여관리
### 인사현황

<br><br>
<details>
<summary><h3>:clipboard: 구현기능 목록 :clipboard:</h3></summary> 
  
  로그인
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|로그인 접근제한|Spring Security 구현
  |2|관리자 로그인|관리자는 Oauth2 구글 로그인으로 페이지에 접근하도록 구현
  
  근태관리
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|출/퇴근 등록|해당 직원은 직원번호 입력 후 출근 / 퇴근 버튼을 눌러 근태를 등록
  |2|목록 조회|직원들의 출근/퇴근 기록을 날짜별 그래프로 표현
  |3|목록 조회|부서, 직급, 이름, 출근, 퇴근시간에 대한 상태 확인
  |4|목록 조회|삼항연산자를 이용하여 퇴근시간이 'null'이면 공백처리와 퇴근전-> 업무중 표시하고 퇴근후-> 퇴근 문구 출력
  |3|소켓 통신| 실시간 출퇴근 여부를 판단하기 위해 출근한 직원은 :white_check_mark: 상태표시, 퇴근한 직원은 :red_circle: 상태표시
  |4|그래프|직원들의 평균 근무시간을 차트로 표현
  
  직원관리
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|추가|추가할 직원의 정보를 입력하고 유효성검사를 통해 중복을 제거[ 모달창 ]
  |2|목록 조회|부서, 직급, 이름별 검색을 통한 조회와 페이징처리 기능 구현
  |3|수정|테이블 표에서 수정할 직원을 선택하여 직원정보를 수정[ 모달창 ]
  
  인사고과평가
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|설문평가|직원 능력에 대한 설문을 작성
  |2|인사고과평가| 설문조사에서 조사한 결과를 바탕으로 직원의 능력을 다각형 표로 구현하여 시각적 자료로 표현
  
  급여관리
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|목록 조회|직급, 이름별 검색을 통한 조회와 페이징처리 기능 구현
  |2|수정|테이블 표에서 급여를 수정할 직원을 선택하여 연봉을 수정[ 모달창 ]
  
  인사현황
  |번호|기능|설명
  |:-----:|:-----|:-----|
  |1|발령추가|부서, 직급, 이름별 검색을 통해 조회한 직원을 원하는 부서, 직급, 발령예상날짜를 선택하여 등록
  |2|목록 조회|부서, 직급, 이름별 검색을 통한 조회와 페이징처리 기능
  |3|발령 상태| 멀티스레드를 사용하여 발령대기 상태(0)를 발령완료(1) 상태로 변경
  |4|수정|테이블 표에서 발령을 수정할 직원을 선택하여 부서, 직급, 예상날짜를 수정[ 모달칭 ]
  
</details>
<br>

## :spades: Develop Environment :spades:
  - JAVA jdk 1.8
  - Spring Boot 2.7.5
  - Gradle
  - MySQL 8.0.30

## :clipboard: Technical Stack :clipboard:
  - Spring Boot
  - JPA
  - Spring Security
  - OAUTH2
  - Bootstrap
  - Recharts
  
## :clipboard: 설치 :clipboard:
> npm i axios
> 
> npm i react-router-dom
> 
> npm install recharts
> 
> npm install react-bootstrap bootstrap
> 
> npm i react-icons --save [ 태섭 - 폰트어썸 아이콘 ]
> 
> npm i react-js-pagination [ 태섭 - 페이지네이션 ]
> 
> npm install react-calendar [ 상진 - 리액트달력 ]
> 
> npm install moment --save [ 상진 - 날짜 ]
> 
> npm i react-select [ 상진 - 셀렉트박스 ] 
>
<br>

<details>
<summary><h3>:date: 일정관리 :date:</h3></summary> 
<h5> 11/28 ~ 12/04 : 주제선정 및 기능논의, 역할분담, DB설계, 와이어프레임 제작 </h5>

| 날짜/이름 | 성지혜 | 손비아 | 안태섭 | 윤상진 |
|:-----:|:-----|:-----|:-----|:-----|
|12/05| Main페이지 사이드바 성생 | Git Branch 생성 | DB 수정 | 로고 샘플 제작
&nbsp;| &nbsp;| Chart 예시 찾기 및 테스트 | &nbsp; | 인사고과평가서 Chart 제작
|12/06| 급여관리, 인사현황 틀 구성 | <span style="color:blue">Git Merge</span> | 출근확인 페이지 React 작업 | 인가소과평가서 리액트 useState이용
&nbsp;| &nbsp;| 라인 그래프 숫자표시, 커스터머 Oauth2 테스트 | 사원 DB SQL 쿼리 작성 | DB 테이블삭제(positionl, team) 및 추가(orders)
|12/07| 급여관리/수정 페이지 React 작업 | <span style="color:blue">Git Merge</span> | 출근확인 페이지 프론트 보충작업 | 설문지 컴포넌트 제작
&nbsp;| &nbsp;| 구글-Oauth2 클라이언트 생성, mrol 추가 | &nbsp;| 직원관리 컴포넌트 제작
&nbsp;| &nbsp;| 로고 이미지 배경 제거 및 crop
|12/08| 인사추가/목록/수정 페이지 React 작업 | <span style="color:blue">Git Merge</span> | setInteravl 함수를 이용한 근태페이지 프론트 작업 | 직원추가/수정 컴포넌트에 달력 추가
&nbsp;| &nbsp;| 스프링부터&리액트 통합
&nbsp;| &nbsp;| 구글 로그인 기능 테스트
&nbsp;| &nbsp;| 사이드바 - useState 사용 구현
|12/09| README 작성 | Git Merge | 근태 페이지 프론트 추가 작업 | 직원추가 및 수정페이지 컴포넌트 유효성검사
&nbsp;| &nbsp;| 관리자 로그인 페이지 생성 및 CSS
&nbsp;| &nbsp;|&nbsp;| &nbsp;|&nbsp;|
|12/12| 급여관리 페이지 DB연동 데이터 불러오기 | <span style="color:blue">Git Merge</span> | 근태관리 및 list페이지 className 통일화 | 직원추가 기능 구현(DB연동)
&nbsp;| 페이징처리, 출력 갯수 설정 기능 구현 | 사원/관리자 로그인 페이지 구현 | list페이지 pagination 활용 코드 작성 | 
&nbsp;| &nbsp;| 사이드바 링크 연결 | 
|12/13| 급여관리 페이지 DB연동 데이터 불러오기 | <span style="color:blue">Git Merge</span> | 근태리스트 출력세팅(DB 연동) | 첨부파일 미리보기
&nbsp;| 페이징처리, 출력 갯수 설정 기능 구현 | attend 라우더 연결 | pagination 테이스트 코드 작성 | 직원 리스트 가져오기(DB연동)
&nbsp;| &nbsp;| 사이드바 onClick에 각 페이지 링크 무효화되는 문제 해결
&nbsp;| &nbsp;| PayListEntity 삭제 및 DB에 Pay 테이블 삭제( 팀원전체 )
|12/14| 급여목록 페이지에서 수정페이지로 전환기능 구현 | <span style="color:blue">Git Merge</span> | pagination DB 연동 및 출력 | 직원list에 부서/직급/이름 검색기능 구현
&nbsp;| &nbsp;| 라우터 URL 우선 매핑 처리 | pagination 50% 완성 |
&nbsp;| &nbsp;| BrowserRouter 하나로 합침(삼항연산자)
&nbsp;| &nbsp;|admin 계정 로그인시 토큰부여
|12/15| 급여관리 직급/이름 검색기능 구현 | <span style="color:blue">Git Merge</span> | 근태리스트 출력사항 수정 | 각 회원 설문작성 기능 구현
&nbsp;| 급여 수정페이지 데이터 불러오기, 수정기능 구현(DB값 저장) | 사이드바 출력기능 오류수정 |  &nbsp; | 각 회원 평가조회 기능 구현
&nbsp;| &nbsp;| 임시 Home 페이지 생성
&nbsp;| &nbsp;| 현재 진행사항 체크 및 전체오류 확인
|12/16| 인사현황 추가페이지 생성 | <span style="color:blue">Git Merge</span> | 사번(mno) 입력시 DB에 값 대입 | 설문지 렌더링 문제해결
&nbsp;| 부서/직급/이름 검색기능 구현 및 DB저장 확인 | 출근시간 dB에 임의저장, 출근시간 가져오는 Controller&Service 구현해서 jsx로 가져오는지 콘솔 테스트 출력
&nbsp;| &nbsp;| DB에서 가져온 날짜, 시간만 뽑아와서 정상출근, 지각 여부 판단
&nbsp;| &nbsp;|&nbsp;| &nbsp;|&nbsp;|
|12/19| 인사현황 발령추가 기능 구현(DB확인 저장) | 진항상황 체크, 모달논의 및 결정(부트스트랩), 권한에 따른 HTML 제한 여부 회의 | 경로 문제로 인한 경로 수정 | 직원 수정페이지 렌더링 및 유효성검사 수정
&nbsp;| &nbsp;| /attend/attendlist 경로 수정
|12/20| 인사현황 목록페이지 DB에 저장된 직원 출력 | <span style="color:blue">Git Merge</span> | - | 직원수정 페이지 유효성검사, 파일
&nbsp;| 발령추가 버튼 order/write 페이지 전환 기능 구현 | 날짜별 출근자 수, 지각자 수 조회 쿼리짜기
&nbsp;| 페이징처리 기능 구현(부트스트랩)| 노션 회의록 정리
|12/21| 인사현황 추가 페이지 발령날자 및 승인날짜 출력(DB연동) | <span style="color:blue">Git Merge</span> | 출근한 사원(mno) 출력 | 직원추가/수정, 설문/인사고과평가서 모달 추가(부트스트랩)
&nbsp;| 인사형황 목록페이지 페이징처리, 직급검색 오류 수정 | 추이 그래프 관련 메소드 -> AttendService 수정 및 출력 테스트 | Service, Controller, Repository 주석달기 | -
&nbsp;| 급여관리/인사현황 목록 페이지 테이블 제목(th) 생성 및 출력형식 맞추기 | 진행상황 체크 및 전체오류 확인 | 웹소켓 기능구현 준비 | -
|12/22| 급여목록 페이지 검색기능 오류 수정 및 유효성검사 추가, CSS 꾸미기 | <span style="color:blue">Git Merge</span> | 웹 소켓 통신 확인 | 직원관리 페이지 페이징 처리기능 구현
&nbsp;| 인사발령 추가/목록 페이지 검색기능 오류 수정 및 검색 유효성검사 추가 | 피드백 정리 및 회의록 작성
&nbsp;| 인사발령 수정페이지에서 데이터 수정시 DB에 데이터 누적 저장  --> 업데이트로 수정
|12/23| 급여수정 페이지 모달추가 | <span style="color:blue">Git Merge</span> | 직원 퇴근시간 출력 - 퇴근 안했을 경우 공백처리 | 멀티스레드 작업
&nbsp;| &nbsp;| 사원데이터 만들기( 80명분 ) | &nbsp;| &nbsp;|
|12/26| 발령수정페이지 모달추가 후 데이터 불러오기/기능구현 확인, 기능구현 확인 | AWS RED& EC2 생성 및 연결 | 근태관리-삼항연사자를 이용한 상태출력 | 평균 근무시간 차트구현
&nbsp;| README 작성 | 현재 진행상황 확인 | 웹소켓 90% 완성
|12/27| PPT 제작 | <span style="color:blue">Git Merge</span> |
&nbsp;| 발령 추가페이지 모달 추가 후 기능구현 확인 | 전 사원 실시간 출/퇴근 상태표시 -> 플로팅 박스구현 | 출/퇴근 상태를 알려주는 소켓기능 구현[ 출근-녹색, 퇴근-빨간색 ] | 모달 CSS 수정
&nbsp;| Main페이지 로고이미지, 문구 애니메이션 추가 | 사이드바 위치 조절
&nbsp;| 사이드바 애니메이션 추가 | 근태관리 이미지 중복오류 해결[도움]
&nbsp;| 직원관리 - 추가페이지 CSS[도움] 
|12/28| PPT 제작 | <span style="color:blue">Git Merge</span> | 출근/지각/야근 데이터추가(10명분) | 인사발령 멀티스레드 구현
&nbsp;| README 작성 | 사이드바 위치조절 | Attend.jsx -> FloatingBox.jsx 웹소켓 옮김
&nbsp;| 급여수정 페이지 모달 1,00단위 추가 | 근태관리 이미지 중복 오류해결[도움] | 근태리스트 배경색상 및 제목 위치 변경
&nbsp;| 급여관리, 인사현황 페이지 버튼 CSS 수정 | 인사발령 멀티쓰레드 오류해결[도움]
|12/29| PPT 및 README 작성완성 | <span style="color:blue">Git Merge</span> | - | -
</details>
