// 컴포넌트 선언
import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';

// 1. jsx 파일 불러오기 [ 해당 컴포넌트 선언 ]
/* 근태관리 */
import AttendList from './attend/AttendList';   /* 근태관리 */
import PayList from './pay/PayList';            /* 급여관리 목록 */
import Update from './pay/Update';              /* 급여관리 - 수정창 */
import List from './personnelStatus/List'       /* 인사현황 - 목록  */
import Hrm from "./management/Hrm";             /* 직원관리 */
import Evaluation from "./management/Evaluation";/* 인사고가평가 */
import PersonAdd from "./management/PersonAdd";/* 직원추가 */
import PersonEdit from "./management/PersonEdit";/* 직원추가 */
import Survey from "./management/Survey";/* 직원추가 */
import TransitionChart from "./attend/TransitionChart";
import TimeA from "./management/TimeA";/* 발령 실행 */

// ** 라우터 설치
import { HashRouter, BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Attend from "./attend/Attend";
import axios from "axios";
import Menu from "./Menu";



// 2.
export default function Main( props ) {
    const [login, setLogin] = useState('');

    useEffect( () => {
        axios.get('/member/getloginMno')
            .then(res=>{setLogin(res.data);})
            .catch(err=> console.log(err))
    }, [])

    return(
        <div className="webbox">
            <BrowserRouter>
                { login == '' ? true : login == 'admin' ? <Sidebar /> : false }
                <Routes>
                    {login == '' ? <Route path="/" element = { <Menu/>} /> : login == 'admin' ? <Route path="/" element = { <Menu/>} /> : <Route path="/" element = { <Attend/>} />}
                    {/* 지혜 - 급여관리 */}
                    <Route path={"/pay/paylist"} element = { <PayList />} />
                    <Route path={"/pay/update/:mno"} element = { <Update />} />

                    {/* 지혜 - 인사현황 */}
                    <Route path={"/order/list"} element = { <List />} />

                    <Route path={"/attend/attendlist"} element={<AttendList/>}></Route>
                    <Route path={"/management/hrm"} element={<Hrm/>}></Route>
                    <Route path={"/management/evaluation/:mno"} element={<Evaluation/>}></Route>
                    <Route path={"/management/personedit/:mno"} element={<PersonEdit/>}></Route>
                    <Route path={"/attend/attend"} element={<Attend/>}></Route>
                    {/* 상진 - 직원추가 */}
                    <Route path={"/management/personadd"} element={<PersonAdd/>}></Route>
                    <Route path={"/management/survey/:mno"} element={<Survey/>}></Route>

                    {/* 비아 - 차트 추가 */}
                    <Route path={"/attend/transitionchart"} element={<TransitionChart/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
} // end