// 지혜 - 급여관리 수정페이지

import React , { useState , useEffect } from 'react';
import StyleSheet from '../../css/Pay/PayUpdate.css';
import axios from 'axios';
import { useParams } from "react-router-dom"; // 라우터 DOM
import Button from 'react-bootstrap/Button';



let msalary = ''    // 깡통
export default function Update( props ) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const params = useParams(); // use params 훅 : 경로[URL]상의 매개변수 가져올 때
    console.log( params.mno ); // 확인

    // 직원정보를 식별해서 정보 불러오기
    const [ member, setMember ] = useState({ });
    useEffect( () =>
        axios
            .get("/member/getpay" , { params : { mno : params.mno }} )
            .then( res => { setMember( res.data ) ;} )
    , [] )

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

} // end