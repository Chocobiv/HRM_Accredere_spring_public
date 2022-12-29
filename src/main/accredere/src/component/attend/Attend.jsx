// 태섭 : 근태 페이지
import React , { useEffect , useState , useRef }from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Styles from '../../css/Attend/Attend.css';
import { FaLocationArrow } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from '../../img/logo2.png'
import FloatingBox from "../FloatingBox";

export default function Attend( props ){

    // 시간 표시 준비물
    let date = new Date();
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    let weekday = new Date().getDay();
    let day = new Date().getDate();
    let week = new Array ('일','월','화','수','목','금','토');
    let dayName = week[date.getDay()];

    /* 부트스트랩 모달 상태 [ 열렸을때 */
    const [showOn, setShowOn] = useState(false);
    const [showBye, setShowBye] = useState(false);
    const handleCloseOn = () => setShowOn(false);
    const handleShowOn = () => setShowOn(true);
    const handleCloseBye = () => setShowBye(false);
    const handleShowBye = () => setShowBye(true);

    // 서버 소켓과 연결 여부 저장
    const [ socketConn , setSockConn ] = useState( false );

    // 뭐더라?
    const [ attend , setAttend ] = useState( [ ] );

    // 입력 받은 값을 mno 로 저장
    const work = ( e ) => { setMno ( e.target.value ) }

    // 시계 1초마다 실행
    const [time, setTime] = useState(new Date());

    // 사원번호 입력
    const [ member , setMno ] = useState("")

    // 모든 맴버 리스트
    const [ memberlist , setMemberlist ] = useState( [ ] );
    // 출근한 멤버 리스트
    const [ workList , setWorkList ] = useState( [ ] );


    // 클라이언트 소켓
    let ws = useRef(null);

    {/* 웹소켓 */}
    function socketStart (  ) {
        if( !ws.current ){
            ws.current = new WebSocket("ws://ec2-3-34-42-110.ap-northeast-2.compute.amazonaws.com:8080/attend")
            ws.current.onmessage = ( e ) => {
                console.log( "메세지" + e.data );
                setWorkList( JSON.parse( e.data ));
            }
            ws.current.onopen = ( e ) => {
                setSockConn(true);
                console.log("소켓이 열렸다.");
            }


            ws.current.onclose = ( e ) => { setSockConn(false); console.log(" 소켓이 닫혔다."); }

        }
    }
    useEffect(  socketStart ,[] )

    useEffect(() => {
        const id = setInterval(() => { setTime( new Date() ); }, 1000);
        return ( () => clearInterval(id)) }, [] );

    const getmemberlist = () => {
        axios.get("/at/mlist")
            .then( res => {
                setMemberlist( res.data ); console.log(res.data)
            } )
    }
    useEffect( getmemberlist , [] );

    const onWork = () =>{
    if(member == '') { alert('사번을 입력해주세요.'); return }
        let at_ipbox = document.querySelector('.at_ipbox').value
        console.log(" 출근한 사원번호 " + member)
        axios
            .post("/at/hi", { mno : member } )
            .then((res) =>{
                let result = res.data;
                ws.current.send( JSON.stringify( { type : "onWork" , message : member  } ) );
            })
    }

    const byeWork = () =>{
    if(member == '') { alert('사번을 입력해주세요.'); return }
        let at_ipbox = document.querySelector('.at_ipbox').value
        console.log( " 퇴근한 사원번호 " + member)
        axios
            .put("/at/bye", { mno : member } )
            .then((res) =>{
            console.log(member);
            console.log(res);
                let result = res.data;
                console.log(res.data);
                if( result = true ){
                    ws.current.send( JSON.stringify( { type : "byeWork" , message : member  } ) );
                }
            })
    }
    const [state,setState] = useState("red")
    let attendStyle = { backgroundColor: state }

    return(
            <div className={"attend_wrapper"}>
                <div className="attend_webbox">
                    <div className="at_cn">
                        <h3 className="at_cntext"> Attend Company </h3>
                    </div>

                    <div className="at_timediv">
                        <img src={Img} className={"index_logo_img"}/>
                        <h2 className="at_time" >{ time.toLocaleTimeString() } </h2>
                        <h3 className="at_date" >{ year + "년" + " " + month + "월" + " " + day + "일" + " " + dayName + "요일" }</h3>
                    </div>

                    {/* 사번 입력하는 input box */}
                    <div className="at_ipboxdiv">

                        <input type="text" onChange={ work } className="at_ipbox" placeholder=" 사 원 번 호 "  />

                          <Button variant="primary" className="at_btn" onClick={ () => { handleShowOn(); onWork(); } }> <FaClock/> 출근하기 </Button>
                              <Modal show={ showOn } onHide={ handleCloseOn }>
                                <Modal.Header closeButton>
                                  <Modal.Title>Attend Company</Modal.Title>
                                </Modal.Header>
                                <Modal.Body> 출근했습니다. </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={ handleCloseOn }> 닫기 </Button>
                                </Modal.Footer>
                              </Modal>

                          <Button variant="primary" className="at_btn" onClick={ () => { handleShowBye(); byeWork(); } }> <FaRegClock/> 퇴근하기 </Button>
                            <Modal show={ showBye } onHide={ handleCloseBye }>
                              <Modal.Header closeButton>
                                <Modal.Title> Attend Company </Modal.Title>
                              </Modal.Header>
                              <Modal.Body> 퇴근했습니다. </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={ handleCloseBye }> 닫기 </Button>
                              </Modal.Footer>
                            </Modal>
                    </div>
                </div>
            <FloatingBox/>      {/* 12/27 비아 플로팅박스 추가 */}
            </div>
        );
}