import React , { useEffect , useState , useRef } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Styles from '../css/FloatingBox.css'
import img from '../img/logo.png'
import r from '../img/r.png'
import g from '../img/g.png'
export default function FloatingBox(props) {

    // 모든 맴버 리스트
    const [ memberlist , setMemberlist ] = useState( [ ] );
    // 출근한 멤버 리스트
    const [ workList , setWorkList ] = useState( [ ] );
    // 모든 맴버 가져오기
    const getmemberlist = () => { axios.get ("/at/mlist").then( res => { setMemberlist( res.data ); console.log(res.data) } ) }
    // 서버 소켓과 연결 여부 저장
    const [ socketConn , setSockConn ] = useState( false );

    // 클라이언트 소켓
    let ws = useRef(null);
    useEffect( getmemberlist , [] );
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

    return(
        <div id="floatingbox">
            <div className="floatContainer">
                <div className="floatTop">
                    <span className="topTitle"> 출근 여부 </span>
                </div>
                <div className={"floatBottomWrapper"}>
                    <div className="floatBottom">
                        <Table className="striped" >
                            <tr>
                                <th> 직급 </th>
                                <th> 이름 </th>
                                <th> 부서 </th>
                                <th> 출근 여부 </th>
                            </tr>
                            {
                                memberlist.map( ( m ) => {

                                    let state = "r";
                                    for( let  i = 0 ; i  < workList.length ; i++) {
                                        if( workList[i] == m.mno ){ state = "g" }
                                    }

                                    return(
                                        <tr>
                                            <td> { m.po_name } </td>
                                            <td> { m.mname } </td>
                                            <td> { m.t_name } </td>
                                            <td className = { "attend_td"+m.mno } > <img src={ state == "r" ?  r :  g } className="stateimg"/> </td>
                                        </tr>
                                    );
                                })
                            }
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}