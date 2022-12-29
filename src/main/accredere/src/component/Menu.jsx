import React, {useEffect, useState} from 'react';
import Img from '../img/logo2.png'
import Img2 from '../img/btn_google.png'
import Styles from '../css/Menu.css'
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import axios from "axios";

export default function Menu(props) {
    const [login, setLogin] = useState('');

    useEffect( () => {
        axios.get('/member/getloginMno')
            .then(res=>{setLogin(res.data);})
            .catch(err=> console.log(err))
    }, [])

    return(
        <div className="webbox">

                <div className={"index_wrapper"}>
                    <figure><img src={Img} className={"index_logo_img"}/></figure>
                    <p className={"index_pbox"}>Hello, We are Accredere!</p>
                    <h1 className={"index_h1"}>새로운 인사관리시스템이 당신과 함께합니다.</h1>
                { login == '' &&
                    <div className="m_login_box">
                        <button className={"login_box_attend_btn"}><a href={"/attend/attend"} >사원근태</a></button>{/* 비아 추가 [12/13] */}
                        <a href="/oauth2/authorization/google"><img src={Img2} style={{width:230}}/></a>
                    </div>
                }
                </div>

        </div>

    )
}
