// 태섭 : 근퇴 리스트 페이지

// 컴포넌트 호출
import React , { useState , useEffect } from 'react';
import Styles from '../../css/Attend/AttendList.css';
import axios from 'axios'
import Pagination from 'react-js-pagination'// npm i react-js-pagination
import TransitionChart from './TransitionChart'
import AverageTime4 from '../management/AverageTime4'
import AverageTime5 from '../management/AverageTime5'
// import Pagination from "react-js-pagination"; // 리액트 페이지네이션 호출 [ npm i react-js-pagination ]

// Font Awesome icons 호출
// npm i react-icons --save <-- 터미널 입력
// https://react-icons.github.io/react-icons
// import { 사용할 아이콘 이름 } from 'react-icons/fa';
import { FaWalking } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaCommentSlash } from 'react-icons/fa';
import { FaBusinessTime } from 'react-icons/fa';
import { FaBriefcaseMedical } from 'react-icons/fa';
import FloatingBox from "../FloatingBox";

export default function AttendList( props ){

    // 리스트 state
    const [ attendList , setAttendList ] = useState( [ {total : 0} ] )
    // 페이지 기본값 1
    const [ page , setPage ] = useState( 1 )
    // 리스트 기본값 1
    const [ total , setTotal ] = useState( 1.0 )
    // 페이지가 바뀔 때 마다
    const Page = ( page ) => { setPage( page ) }

    {/* 출근 한 사람 가져오는 함수 */}
    const getattendlist = () => {
        axios.get("/at/atl", { params : { page : page } })
        .then( res => {
            setAttendList( res.data ); console.log( res.data )
        } )
    }
    useEffect( getattendlist , [ page ] );
    // 평균근무시간 구하기
        const [ averagetime, setAveragetime ] = useState(0);
        const [ timestate , setTimestate ] = useState(false);
        const timecal = () => {
            axios.get("/member/timecal")
                 .then( re => { console.log(re.data); setAveragetime(re.data); console.log(averagetime); setTimestate(!timestate)} )
                 .catch( err => console.log(err) )
        }
        useEffect( timecal , [] )
    // 평균근무시간 구하기
        const [ averagetime2, setAveragetime2 ] = useState(0);
        const [ timestate2 , setTimestate2 ] = useState(false);
        const timecal2 = () => {
            axios.get("/member/timecal2")
                 .then( re => { console.log(re.data); setAveragetime2(re.data); console.log(averagetime2); setTimestate2(!timestate2)} )
                 .catch( err => console.log(err) )
        }
        useEffect( timecal2 , [] )

       return(
           <div className={"attendlist_wrapper"}>
                <div className="attendlist_webbox">
                    <div className="at_pagetitle">
                        <span> 근태관리 </span>
                    </div>

                    <div className={"at_timegraph"}>
                        <span>{ timestate && ( <AverageTime4  initNumber={averagetime} /> )}</span>
                        <span>{ timestate2 && ( <AverageTime5  initNumber={averagetime2} /> )}</span>
                    </div>

                    <div className="at_graph">
                        <TransitionChart/>
                    </div>

                    <table className="at_list">
                        <tr>
                            <th> 부서 </th>
                            <th> 이름 </th>
                            <th> 직급 </th>
                            <th> 출근시간 </th>
                            <th> 퇴근시간 </th>
                            <th> 상태 </th>
                        </tr>
                        {
                            attendList.map( ( a ) => {
                                return(
                                    <tr>
                                        <td> { a.t_name } </td>
                                        <td> { a.mname } </td>
                                        <td> { a.po_name } </td>
                                        <td> { a.cdate } </td>

                                        { /* [ 삼항연산자 ] a.gohome 이 'null' 이면 공백처리*/ }

                                        <td>
                                             { a.gohome === "null" ? "" : a.gohome }
                                        </td>

                                        { /* [ 삼항연산자 ] a.gohome 이 'null' 이면 업무중 null 이 아니면 퇴근  */}

                                        <td>
                                             { a.gohome === "null" ? "업무 중" : "퇴근" }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>

                    <Pagination
                        activePage = { page } // 현재페이지
                        itemsCountPerPage = { 4 } // 페이지당 표시할 게시물 수
                        totalItemsCount = { attendList[0].total } // 게시물 총 개수
                        pageRangeDisplayed = { 5 } // 표시할 페이징 버튼 최대 개수
                        onChange = { Page } // 버튼 클릭할때마다 이벤트
                    />
                </div>
                <FloatingBox/>      {/* 12/27 비아 플로팅박스 추가 */}
           </div>
       );
}