// 컴포넌트 호출
import React,{useState} from 'react';
import StyleSheet from '../css/Sidebar.css';
import logo from '../img/logo_purple.png';  /* 로고이미지 호출 */
import { HashRouter, BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import axios from 'axios';

function Sidebar (props){

    // 서버통신[ axios ]

    // 1. 해당 사이드바 태그 호출
    // 2. 해당 사이드바 태그를 클릭했을때 이벤트
    // 비아 [12/08] 사이드바 움직이도록 구현
    const [state,setState] = useState(-260)
    const handleEnter = ()=>{ if(state == -260){ setState(0) } }
    const handleLeave = () => { if(state == 0){ setState(-260) } }
    let style={ left: state }

    return(
        <div className="wrapper">
            <div className="sidebar_box">
                <div className="sidebar_menu" onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={style}>
                    <div><Link to="/"><img className="sidebar_img" src={logo} /></Link></div>
                    <ul className="side_menu">
                       <li className="side_item"><Link to="/" className={"side_item_link"}>Home</Link>  </li>
                       <li className="side_item"><Link to="/attend/attendlist" className={"side_item_link"}>근태관리</Link>  </li>
                       <li className="side_item"><Link to="/pay/paylist" className={"side_item_link"}>급여관리</Link>  </li>
                       <li className="side_item"><Link to="/management/hrm" className={"side_item_link"}>직원관리</Link>  </li>
                       <li className="side_item"><Link to="/order/list" className={"side_item_link"}>인사현황</Link>  </li>
                       <li className={"side_item_logout"}><a href={"/member/logout"} className={"side_item_link"}>로그아웃</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Sidebar