import React , {useState, useEffect} from 'react';
import Styles from '../../css/Management/Hrm.css'
import axios from 'axios'
import { HashRouter, BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Survey from './Survey';
import PersonEdit from './PersonEdit';
import PersonAdd from './PersonAdd';

import Modal from './Modal';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import Evaluation from './Evaluation';

import Pagination from 'react-js-pagination' // npm i react-js-pagination 설치


import AverageTime4 from './AverageTime4'
import { useParams  } from "react-router-dom";
import {  Legend , Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


// 회원번호 전역변수
var mno = 0;
var pageno = 1;

export default function Hrm(){


    // 셀렉트 값 추출
        // 부서 셀렉트 값
        const [t_name, setSelected] = useState("");
        const select_team = (e) => { setSelected(e.target.value); };
        // 직책 셀렉트 값
        const [po_name, setSelected2] = useState("");
        const select_position = (e) => { setSelected2(e.target.value);  };
        // 이름
        const [ mname, setMname] = useState("");
        const input_project = (e) => { setMname(e.target.value); };

    //  검색 기능
        const [ pageInfo , setPageInfo ] = useState({ mname : "" , t_name : "" , po_name : "" ,page : pageno })
        const mchange = () => {
                setPageInfo(
                            {
                              page : pageno,
                              mname : mname,
                              t_name : t_name,
                              po_name : po_name,
                            });
            }

    //const [ memberinfo , setMemberinfo ] = useState([])
        const [ memberinfo , setMemberinfo ] = useState({list : []})

    // 직원 list 가져오기
        const member = () => {
            axios
                .post("/member/getmember",  pageInfo  )
                .then( re => {
                            setMemberinfo(re.data);
                            })
                .catch( err => console.log(err))
        }
        useEffect( mchange , [ mname , t_name , po_name  ] )
        useEffect( member , [ pageInfo.page ] )

    // 개인 설문 평가
        const loadSurvey = ( mno ) => {
                window.location.href = '/management/survey/'+mno
        }
    // 개인 설문 조회
        const loadPersonEdit = ( mno ) => {
                window.location.href = '/management/personedit/'+mno
        }
    // TimeA
        const loadTimeA = (  ) => {
                window.location.href = '/management/TimeA/'
        }
    // 페이징
        const onPage1 = ( page ) =>{
                pageno = page
                setPageInfo(
                    {
                        page : pageno ,
                        mname : mname ,            // 기존 검색 필드명
                        t_name : t_name,
                        po_name : po_name  }
                    )
                }

    // 모달 창 on / off

        const [modalroom, setModalroom] = useState(false);  // 인사고과평가서 조회
        const [modalroom2, setModalroom2] = useState(false); // 직원추가
        const [modalroom3, setModalroom3] = useState(false); // 설문조사
        const [modalroom4, setModalroom4] = useState(false); // 직원 수정


    return(
        <div className="hrm_all_box">
            <div className="Hrm_title"> 직원관리 </div>
        <div className="Main">
              {modalroom  && (   <Modal  closeModal={() => setModalroom(!modalroom)}> <Evaluation mno={mno} /> </Modal> )}
              {modalroom2 && (   <Modal2 closeModal={() => setModalroom2(!modalroom2)}> <PersonAdd /> </Modal2> )}
              {modalroom3 && (   <Modal3 closeModal={() => setModalroom3(!modalroom3)}> <Survey mno={mno} /> </Modal3> )}
              {modalroom4 && (   <Modal4 closeModal={() => setModalroom4(!modalroom4)}> <PersonEdit mno={mno} /> </Modal4> )}
            </div>
            <div className="searchbox">
                <select className="PersonAdd_team" name="t_name" style={{width:150, height:40}} onChange={select_team} >
                    <option  value="" selected disabled hidden>부서</option>
                    <option  value="">전체</option>
                    <option  value="개발팀">개발팀</option>
                    <option  value="홍보팀">홍보팀</option>
                    <option  value="경영팀">경영팀</option>
                    <option  value="마케팅팀">마케팅팀</option>
                    <option  value="디자인팀">디자인팀</option>
                </select>
                <select className="PersonAdd_position" name="po_name" style={{width:150, height:40}} onChange={select_position} >
                   <option  value="" selected disabled hidden>직책</option>
                   <option  value="">전체</option>
                   <option  value="사원">사원</option>
                   <option  value="대리">대리</option>
                   <option  value="주임">주임</option>
                   <option  value="차장">차장</option>
                   <option  value="부장">부장</option>
                   <option  value="팀장">팀장</option>
               </select>
                <input type="text" className="nameSearch" onChange={input_project} style={{width:300, height:40}} placeholder="이름"/>
                <button type="button" onClick={ member }> 검색 </button>
            </div>
            <div>
                <li className="hrm_li_item" onClick={ () => { setModalroom2(!modalroom2) }} > 직원추가 </li>
            </div>
            <div className="people_box">
                <table className="people">
                    <tr className="people_title">
                        <th> 회원번호 </th>
                        <th> 부서 </th>
                        <th> 이름 </th>
                        <th> 직급 </th>
                        <th> 입사년도 </th>
                        <th> 평가서 </th>
                        <th> 인사고과평가서 </th>
                    </tr>
                    {
                        memberinfo.list.map( (c) => {
                            return (
                                <tr>
                                <td > {c.mno} </td>
                                <td > {c.t_name} </td>
                                <td onClick={ ()=> { mno = c.mno; setModalroom4(!modalroom4);}}> {c.mname} </td>
                                <td> {c.po_name} </td>
                                <td> {c.mstart} </td>
                                <td onClick={ ()=> { mno = c.mno; setModalroom3(!modalroom3);}}> 평가작성 </td>
                                <td onClick={ ()=> { mno = c.mno; setModalroom(!modalroom);  }} > 평가조회 </td>
                                </tr>
                            )
                        } )
                    }

                </table>
                <Pagination
                    activePage={ pageInfo.page  }
                    itemsCountPerPage = { 3 }
                    totalItemsCount = { memberinfo.totalBoards }
                    pageRangeDisplayed = { 5 }
                    onChange={ onPage1 }
                />
            </div>
        </div>
    )
}
