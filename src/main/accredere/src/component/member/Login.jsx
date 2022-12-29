
import React from 'react';
import Img from '../../img/btn_google.png'
import Styles from '../../css/member/Login.css'

export default function Login(props) {
    return (
        <div className={"login_wrapper"}>
            <h3>로그인</h3><br/>

            <a href="/oauth2/authorization/google"><img src={Img} style={{width:200}}/></a>
        </div>
    )
}

