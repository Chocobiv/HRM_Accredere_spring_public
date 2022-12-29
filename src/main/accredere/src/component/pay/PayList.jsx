// 지혜 - 급여관리 목록

import React , { useState , useEffect } from 'react'
import StyleSheet from '../../css/Pay/PayList.css';
import axios from 'axios';
import Pagination from 'react-js-pagination' // 페이징처리 : npm i react-js-pagination 설치
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PayList( props ) {

    /* 부트스트랩 수정 모달창 */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    // 직원정보를 식별해서 정보 불러오기
    const [ member, setMember ] = useState( { msalary : 0 });   // 1,000단위로 지정하기 위해 넣어둠.

    function getMember(mno){
         axios
            .get("/member/getpay" , { params: {mno:mno}} )
            .then( res => { setMember( res.data ); console.log( "데이터 확인 : "+res.data ); setShow(true);} )
            .catch(e=>{console.log(e)})
    }


    // 서버로부터 수정될 정보를 이용한 내용 수정 요청
    const update = () => {
        let info = {
            mno:member.mno, // 직원번호[ 식별 ]
            msalary:document.querySelector('.upmsalary').value       // 수정할 내용 [ 연봉 ]
    }
    axios
        .put( "/member/payupdate", info )
        .then( res => {
            if( res.data == true ){ alert( '해당 직원의 연봉을 수정했습니다.'); window.location.href='/pay/paylist'; }
            else{ alert('연봉을 수정을 실패했습니다.'); }
        })
        .catch( err => { console.log( err ); })
    }

    const cancel = () => { alert('취소) 급여관리 목록창으로 이동합니다.'); }
  /*-------------------------------------------------------------------------------------*/
     // 메모리
     const [ pageInfo, setPageInfo ] = useState({ mno : 0, page : 1, key : "", keyword : "", listsize : 5 })
     const [ memberDto, setMemberDto ] = useState({ list : [] })


    // 지혜 - 급여관리 사원목록
    function paylist(){
        axios
            .post("/member/paylist", pageInfo )
            .then( res => { setMemberDto( res.data );} )
            .catch( err => { console.log( err ); } )
    }
    useEffect( paylist , [ pageInfo ] )

    // 페이징 처리, 출력 갯수 지정 처리
    const list_count = () => {  let no = document.querySelector('.list_size').value;
    setPageInfo({ mno : 0, page : 1, key : "", keyword : "", listsize : no }) } // listsize : no --> 한 페이지 보일 출력 갯수

    const onPage = ( page ) => {
        setPageInfo(
            {
                mno : pageInfo.mno,
                page : page,                   // 현재 페이지
                key : "",                      // 기존 검색 필드명
                keyword : "",                  // 기존 검색할 단어
                listsize : pageInfo.listsize   // 한 페이지 보일 출력 갯수
            }
        )
    }

    // 검색처리
    const paySearch = () => {

        // 유효성검사
        // 1. 키워드 입력 여부 확인
        if( document.querySelector(".keyword").value == '' ) { alert("검색어를 입력해주세요.");  return; }
        setPageInfo(
            {
                mno : pageInfo.mno,                                     //  사원번호
                page : 1,                                               // 검색시 첫페이지부터 보여주기
                key : document.querySelector('.key').value,            // 검색할 필드명
                keyword : document.querySelector('.keyword').value ,   // 검색 할 단어
                listsize : pageInfo.listsize   // 한 페이지 보일 출력 갯수
            }
        )
    }
    // 상세보기 창으로 이동했을 때 사원번호도 함께 출력
    const loadView = ( mno ) => {  console.log( "번호확인 : "+mno );  getMember(mno);}

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title> 급여 수정 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="update_box">
                          {/* 직원관리 --> 급여관리 페이지에서 불러온 정보 */}
                          <div className="pu_box">
                              <span className="p_team"> 부서 </span>
                              <span>
                                  <input type="text" name="t_name" defaultValue={ member.t_name } readOnly  />
                              </span>
                          </div>
                          <div className="pu_box">
                              <span className="p_team"> 직급 </span>
                              <span>
                                 <input type="text" name="po_name" defaultValue={ member.po_name } readOnly />
                              </span>
                          </div>
                          <div className="pu_box">
                               <span className="p_team"> 이름 </span>
                               <span>
                                  <input type="text" name="mname" defaultValue={ member.mname } readOnly />
                               </span>
                          </div>
                          <div className="pu_box">
                              <span className="p_team"> 변경 전 연봉  </span>
                              <span>
                                  <input type="text" name="msalary" defaultValue={ member.msalary.toLocaleString() } readOnly/> 만원
                              </span>
                          </div>
                      </div>
                      <form className="payform">
                          <div className="pu_box">
                               <span className="p_team" > 변경 후 연봉  </span>
                               <span>
                                  <input type="text" className="upmsalary" placeholder="0,000" /> 만원
                               </span>
                          </div>
                      </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    취소
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    수정
                  </Button>
                </Modal.Footer>
            </Modal>


            <div className="paylist_webbox">
                <div className="pay_all_box">
                     <div className="B_title">
                         <span> 급여관리 </span>
                     </div>

                    {/* 검색 처리 */}
                    <div className="search_box">
                         <div className="search_list">
                              <select className="key" style={{width:160, height:45}} >
                                    <option value="po_name"> 직급 </option>
                                    <option value="mname"> 이름 </option>
                              </select>
                              <input className="keyword" type="text" placeholder="검색어" style={{width:580, height:45}} />
                              <button type="button" className="search_btn" style={{width:160, height:45}} onClick={ paySearch }>검색</button>
                         </div>
                    </div>
                </div>

                <div className="num_list">      {/* 출력갯수 설정 */}
                    <select className="list_size" onChange={ list_count }>
                          <option value="5"> 5 </option>
                          <option value="10"> 10 </option>
                          <option value="15"> 15 </option>
                          <option value="20"> 20 </option>
                    </select>
                </div>

                <div>
                {/* 직원테이블에서 등록된 DB 가져와서 출력 */}
                    <table className="p_table">
                        <tr>
                            <th> 번호 </th>
                            <th> 부서명 </th>
                            <th> 직급 </th>
                            <th> 이름 </th>
                            <th> 연봉[1,000단위] </th>

                        </tr>
                        {
                            memberDto.list.map( (p) => {
                                return(
                                    <tr onClick={ () => loadView( p.mno ) }>
                                        <td>{ p.mno }</td>
                                        <td>{ p.t_name }</td>
                                        <td>{ p.po_name }</td>
                                        <td>{ p.mname }</td>
                                        <td>{ p.msalary.toLocaleString()+"만원" }</td>
                                                    {/* 1,000단위 (,) 표현 : toLocaleString() */}
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>

                { /* 페이징 처리 */ }
                <Pagination
                    activePage = { pageInfo.page }
                    itemsCountPerPage = { 5 }
                    totalItemsCount = { memberDto.totalBoards }
                    pageRangeDisplayed = { 5 }
                    onChange = { onPage }
                />
            </div>
        </>
    );
} // end