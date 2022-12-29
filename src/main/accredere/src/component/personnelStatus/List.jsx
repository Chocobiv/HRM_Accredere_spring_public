// 지혜 - 인사현황 목록

import React , { useState , useEffect } from 'react'
import StyleSheet from '../../css/PersonnelStatus/List.css';
import axios from 'axios';
import Pagination from 'react-js-pagination'    // 페이징 처리
// 부트스트랩 [ 모달 ]
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let c_team = ''     // 발령 부서
let c_position = '' // 발령 직급
let or_edate = ''   // 발령 날짜

// 전역변수
let mno = 0;
let info= { };

export default function List( props ) {

    // 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

        // 모달
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);

  /* ----------------- 인사현황 발령 추가 --------------*/

      // 메모리
      const [ MemeberDto, setMemeberDto ] = useState({ list : [] }) // 직원 찾기
      const [ OrderDto, setOrderDto ] = useState({ list : [] })   // 발령
      const [ mlistInfo, setMlistInfo ] = useState({ mno : 0, page : 1, key : "", keyword : "", listsize : 5 })   // 발령직원 검색, 페이징처리
      const [ membersearch, setMembersearch ] = useState( false ) // 검색 여부 : true면 검색값 입력없이 검색했을 경우 전체 결과 출력

  /* ---------------- 인사현황 수정 [ 직원 검색 - or_auto 로 식벽해서 정보 불러오기 ] -------------------*/
    const [ c_team, setC_team ] = useState('')          // 발령 부서
    const [ c_position, setC_position ] = useState('')  // 발령 직책
    const [ or_edate, setOr_edate ] = useState('')      // 발령 예상 날짜

    // 발령번호를 식별해서 정보 불러오기
    const [ order, setOrder ] = useState({ });
    function orders(or_auto) {
        axios
            .get("/order/getorder", { params : { or_auto : or_auto }} )
            .then( res => { setOrder( res.data );  setShow(true); })
    }

    // Change 부서
    const p_handlechange1 = (e) => {
        if( e.target.value == "2" ){
            alert("수정할 부서를 선택해주세요.")
        }
        setC_team( e.target.value )
        console.log( e.target.value );
    }
    // Change 직급
   const p_handlechange2 = (e) => {
       if( e.target.value == "2" ){
           alert("발령직급을 선택해주세요."); return;
       }
       setC_position( e.target.value )
       console.log( e.target.value );
   }
   // Change 날짜
   const p_handlechange3 = () => { }
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    const or_sdate = (year+ "-"+ month+ "-" + date)


    /* ---------------------------- 인사현황 수정 --------------------------------- */
    // 서버로부터 수정될 정보를 이용한 내용 수정 요청   // 수정버튼을 눌렀을 때
    const per_update = () => {
        let info = {
            or_auto:order.or_auto,    // 발령번호[ 식별 ]
            c_team : document.querySelector('.up_cteam').value ,          // 수정할 부서
            c_position : document.querySelector('.up_cposition').value,   // 수정할 직급
            or_edate : document.querySelector('.day').value              // 수정할 예상 발령날짜
        }
        axios
            .put("/order/orderupdate", info )
            .then( res => {
                if( res.data == true ){ alert('해당 직원의 발령정보를 수정했습니다.'); window.location.href='/order/list'; }
                else{ alert('발령정보 수정을 실패했습니다.'); }
            })
            .catch( err => { console.log( err ); })
    }
    // 취소버튼 눌렀을 때
    const per_cancel = () => { alert('취소합니다.'); }


  /* -------------------------- 인사현황 목록 [ 직원검색 ]-------------------------------*/
    // 메모리
    const [ pageInfo, setPageInfo ] = useState({ or_auto : 0, page : 1, key : "", keyword : "" }) // 검색, 페이징처리
    const [ ordersDto, setOrdersDto ] = useState({ odlist : [] })   // 발령직원 찾기
    const [ or_auto, setOr_auto ] = useState(1)   // 발령직원 찾기

    // 지혜 - 인사현황 발령목록
    function orderlist(){
        axios
            .post("/order/printorders", pageInfo )
            .then( res => { console.log("목록 출력" + res.data ); setOrdersDto( res.data ); } )
            .catch( err => { console.log( err ); })
    }
    useEffect( orderlist, [ pageInfo ] )

    // 페이징처리
    const per_onPage = ( page ) => {
        setPageInfo(
            {
                or_auto : pageInfo.or_auto, // 발령 번호
                page : page,            // 현재 페이지
                key : "",               // 기존 검색 필드명
                keyword : "",           // 기존 검색 단어
            }
        )
    }

    // 검색 처리 - 검색 버튼을 눌렀을 때
    const orderSearch = () => {
        // 유효성검사
        // 1. 키워드 입력 여부 확인
        if( document.querySelector(".keyword").value == '' ) { alert("검색어를 입력해주세요.");  return; }
        setPageInfo(
            {
                or_auto : pageInfo.or_auto,                             // 발령 번호[ 식별 ]
                page : 1,                                               // 검색시 첫페이지부터 보여줌
                key : document.querySelector('.key').value,             // 검색할 필드명
                keyword : document.querySelector('.keyword').value,      // 검색할 단어
            }
        )
    }

    // 상세보기[ 수정페이지 ] 창으로 이동했을 때 발령번호도 같이 출력     // Main 라우터 경로 입력
    const loadView = ( or_auto ) => { orders(or_auto); }
    // 발령추가 버튼을 눌렀을 때
    const order_write = () => { setShow2(true) }


    /* ------------------------- 발령 추가 ------------------------------------*/
        // 1. 검색버튼을 눌렀을 때 [ onClick={ perlist } ]
        const perlist = ( page ) => {
            setMlistInfo(
                {
                    mno : mlistInfo.mno,                                     // 사원번호
                    page : page,                                             // 검색시 첫페이지부터
                    key : document.querySelector('.key').value,              // 검색 필드명
                    keyword : document.querySelector('.keyword').value,      // 검색할 단어
                    listsize : mlistInfo.listsize
                }
            )
            setMembersearch( true )     // 검색한 결과 값 출력[ 출력창 열림 ]
        }
        const perlist2 = ( ) => { setMembersearch( false ) }     // 검색 출력창 닫기

        // 2. 검색한 직원정보 출력
        function pplist(){
            axios
                .post("/order/orderlist", mlistInfo )
                .then( res => { console.log( res.data ); setMemeberDto( res.data ); })
                .catch( err => { console.log( err ); } )
        }
        useEffect( pplist,[mlistInfo] )


       // 3. 검색 출력된 정보에서 발령보낼 직원 클릭했을 때
       const memberinfo = (per) => {
            alert("직원을 선택했습니다.")
            mno = per.mno
            info={
                mname : per.mname,
                p_team : per.t_name,
                po_name : per.po_name
            }
            console.log( "검색직원 정보 출력하기 : " + JSON.stringify(info) );
       }

           // 4. 발력추가 등록
           const setwrite = () => {
               // 직원선택 유효성검사
                if( mno == 0 ) { alert('발령보낼 직원을 선택해주세요.'); return; }
                if( document.querySelector( '.day').value == '' ){ alert("발령날짜를 선택해주세요."); return; }
               // 발령보낼 직원번호[식별], new 부서, new 직급, 발령날짜, 승인날짜
                info.mno =  mno;
                info.c_team = c_team;
                info.c_position = c_position;
                info.or_edate = or_edate;
                info.or_sdate = or_sdate;
                info.p_position = info.po_name;
                console.log( "write확인 : " + JSON.stringify(info) )

                axios
                   .post("/order/setorders", info )
                   .then( res => {
                       console.log( res.data )
                       if( res.data == true ){ alert('해당 직원 발령을 추가합니다.'); window.location.href='/order/list'; }
                       else{ alert('발령추가를 실패했습니다.'); }
                   })
                   .catch( err => { console.log( err ); })
           }

              // Change 부서
              const handlechange = (e) => {
                  if( e.target.value == "1" ){
                      alert("발령부서를 선택해주세요."); return;
                  }
                  setC_team( e.target.value )
                  console.log( e.target.value );
              }
              // Change 직급
              const handlechange1 = (e) => {
                  if( e.target.value == "1" ){
                      alert("발령직급을 선택해주세요."); return;
                  }
                  setC_position( e.target.value )
                  console.log( e.target.value );
              }
              // Change 날짜
              const handlechange2 = (e) => {
               setOr_edate( e.target.value )
               console.log( e.target.value );
              }

    // 멀티스레드 테스트
            const multitest = () => {
                axios.get("/testmap/main")
                      .then( re => { console.log(re) } )
                      .catch(err => { console.log(err) })
            }
    return(
      <div className="orderlist_webbox">
        <div className="order_all_box">
            <div className="B_title">
                <span> 인사현황 </span>
            </div>

            {/* 검색 처리 */}
            <div className="search_box">
                <div className="search_list">
                    <select className="key" style={{width:160, height:45}} >
                        <option value="c_team"> 부서 </option>
                        <option value="c_position"> 직급 </option>
                        <option value="mname"> 이름 </option>
                    </select>
                    <input className="keyword" type="text" placeholder="검색어" style={{width:500, height:45}} />
                    <button type="button" className="search_btn" style={{width:150}} onClick={ orderSearch }>검색</button>
                </div>
            </div>
        </div>


          <div className="list_wbtn">
            <button onClick={ order_write }> 추가 </button>
            <button type="button" onClick={ () => { multitest()} }> 발령 멀티스레드 </button>
          </div>

          <div>
            {/* 발령테이블에서 등록된 DB 가져와서 출력 */}
                <table className="or_table">
                    <tr>
                        <th colspan='2'> 발령번호 </th>
                        <th colspan='2'> 직원번호 </th>
                        <th colspan='2'> 이름 </th>
                        <th colspan='2'> 기존부서 </th>
                        <th colspan='2'> 발령부서 </th>
                        <th colspan='2'> 기존직책 </th>
                        <th colspan='2'> 발령직책 </th>
                        <th colspan='2'> 발령승인날짜 </th>
                        <th colspan='2'> 발령예상일 </th>
                        <th colspan='2'> 상태 </th>
                    </tr>
                    {
                        ordersDto.odlist.map( ( pe ) => {
                            return(
                                <tr onClick={ () => loadView( pe.or_auto )}>
                                    <td colspan='2'>{ pe.or_auto }</td>         {/* 직원 발령번호 */}
                                    <td colspan='2'>{ pe.mno }</td>             {/* 직원 번호 */}
                                    <td colspan='2'>{ pe.mname }</td>           {/* 이름 */}
                                    <td colspan='2'>{ pe.p_team }</td>          {/* 기존부서 */}
                                    <td colspan='2'>{ pe.c_team }</td>          {/* 발령부서 */}
                                    <td colspan='2'>{ pe.p_position }</td>      {/* 기존 직책 */}
                                    <td colspan='2'>{ pe.c_position }</td>      {/* 발령 직책 */}
                                    <td colspan='2'>{ pe.or_sdate }</td>        {/* 발령 신청일 */}
                                    <td colspan='2'>{ pe.or_edate }</td>        {/* 발령 예상일 */}
                                    <td colspan='2'>{ pe.or_state == "0" ? "예정" : "발령완료" }</td>        {/* 발령 상태 */}
                                </tr>
                            )
                        })
                    }
                </table>
          </div>
          {/* 페이징 처리 */}
          <Pagination
              activePage = { pageInfo.page }
              itemsCountPerPage = { 5 }
              totalItemsCount = { ordersDto.totalBoards }
              pageRangeDisplayed = { 5 }
              onChange = { per_onPage }
      />

        {/* ------------------------------   수정모달   ---------------------------------------------------------- */}
          <Modal show={ show } onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title><h3> 발령 수정 </h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="perupdate_webbox">
                    <div className="perupdate_box">
                        {/* 직원관리 --> 급여관리 페이지에서 불러온 정보 */}
                        <div>
                            <span className="per_team"> 이름 </span>
                            <span>
                                <input type="text" name="mname" defaultValue={ order.mname } readOnly />
                            </span>
                        </div>
                        <div>
                            <span className="per_team"> 부서 </span>
                            <span>
                                <input type="text" name="c_team" defaultValue={ order.c_team } readOnly />
                            </span>
                        </div>
                        <div>
                            <span className="per_team"> 직급 </span>
                            <span>
                                <input type="text" name="c_position" defaultValue={ order.c_position } readOnly />
                            </span>
                        </div>
                        <div>
                            <span className="per_team"> 발령 예상일 </span>
                            <span>
                                <input type="text" name="or_edate" defaultValue={ order.or_edate } readOnly />
                            </span>
                        </div>
                        <form>
                            <div className="search_box1">
                                <div className="search_wlist">
                                    발령 부서
                                    <select onChange={ p_handlechange1 } className="up_cteam" style={{width:160, height:45, padding:10, margin:5}} >
                                        <option value="2"> 발령부서 선택 </option>
                                        <option value="마케팅팀"> 마케팅팀 </option>
                                        <option value="개발팀"> 개발팀 </option>
                                        <option value="경영팀"> 경영팀 </option>
                                        <option value="디자인팀"> 디자인팀 </option>
                                        <option value="홍보팀"> 홍보팀 </option>
                                    </select>
                                </div>
                                <div className="search_wlist">
                                    발령 직급
                                    <select onChange={ (e)=>p_handlechange2(e) } className="up_cposition" style={{width:160, height:45, padding:10, margin:5}} >
                                        <option value="2"> 발령직급 선택 </option>
                                        <option value="사원"> 사원 </option>
                                        <option value="대리"> 대리 </option>
                                        <option value="주임"> 주임 </option>
                                        <option value="팀장"> 팀장 </option>
                                        <option value="차장"> 차장 </option>
                                        <option value="부장"> 부장 </option>
                                    </select>
                                </div>
                                <div onChange={ p_handlechange3 } className="search_wlist">
                                    <input type="date" className="day"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={ handleClose }>
                    취소
                  </Button>
                  <Button variant="primary" onClick={ per_update }>
                    수정
                  </Button>
                </Modal.Footer>
          </Modal>
          {/* ------------------------------   수정모달 끝    ---------------------------------------------------------- */}

          {/* ------------------------------   추가 모달     ---------------------------------------------------------- */}
             <Modal show={show2} onHide={handleClose2}>
                          <Modal.Header closeButton>
                            <Modal.Title> 발령추가 </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>

                                  <div className="search_box">    {/* 검색처리 */}
                                       <div className="search_list">
                                           <select className="key" style={{width:160, height:45}} >
                                                <option value="t_name"> 부서명 </option>
                                                <option value="po_name"> 직급 </option>
                                                <option value="mname"> 이름 </option>
                                           </select>
                                           <input className="keyword" type="text" placeholder="검색어" style={{width:300, height:45}} />
                                           <button type="button" className="search_btn" onClick={ perlist }>검색</button>
                                            <button type="button" className="search_btn" onClick={ perlist2 }>취소</button>
                                       </div>
                                  </div>


                                  {/* 직원 발령추가를 검색을 위한 조건부렌더링 */}
                                  { membersearch &&
                                  <div className="search_mbox">
                                       <table className="per_table" style={{margin:20, padding:8}}>
                                          {
                                              MemeberDto.list.map( (per) => {
                                                  return(
                                                      <tr onClick={ ()=> memberinfo(per) }>
                                                          <td className="order_click" colspan='2'>{ per.mno }</td>
                                                          <td className="order_click" colspan='2'>{ per.t_name }</td>
                                                          <td className="order_click" colspan='2'>{ per.po_name }</td>
                                                          <td className="order_click" colspan='2'>{ per.mname }</td>
                                                      </tr>
                                                  )
                                              })
                                          }
                                       </table>
                                       {/* 페이징 처리 */}
                                              <Pagination
                                                  activePag = { mlistInfo.page }
                                                  itemsCountPerPage = { 5 }
                                                  totalItemsCount = { MemeberDto.totalBoards }
                                                  pageRangeDisplayed = { 5 }
                                                  onChange = { perlist }
                                       />
                                  </div>
                                  }


                                  <div className="search_box1">
                                      <div className="search_wlist">
                                          발령 부서
                                          <select onChange={ handlechange } className="wt_name" style={{width:160, height:45, padding:10, margin:5}} >
                                              <option value="1"> 발령부서 선택 </option>
                                              <option value="마케팅팀"> 마케팅팀 </option>
                                              <option value="개발팀"> 개발팀 </option>
                                              <option value="경영팀"> 경영팀 </option>
                                              <option value="디자인팀"> 디자인팀 </option>
                                              <option value="홍보팀"> 홍보팀 </option>
                                          </select>
                                      </div>
                                      <div className="search_wlist">
                                          발령 직급
                                          <select onChange={ handlechange1 } className="wp_name" style={{width:160, height:45, padding:10, margin:5}} >
                                              <option value="1"> 발령직급 선택 </option>
                                              <option value="사원"> 사원 </option>
                                              <option value="대리"> 대리 </option>
                                              <option value="주임"> 주임 </option>
                                              <option value="팀장"> 팀장 </option>
                                              <option value="차장"> 차장 </option>
                                              <option value="부장"> 부장 </option>
                                          </select>
                                      </div>
                                      <div onChange={ handlechange2 } className="search_wlist">
                                          발령예상일 <input type="date" className="day" style={{width:160}} />
                                      </div>
                                  </div>

                                  {/* 발령추가, 취소 버튼 박스*/}


                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                              취소
                            </Button>
                            <Button variant="primary" onClick={setwrite}>
                              발령
                            </Button>
                          </Modal.Footer>
                        </Modal>

           {/* ------------------------------   추가모달 끝    ---------------------------------------------------------- */}

      </div>
    );
}