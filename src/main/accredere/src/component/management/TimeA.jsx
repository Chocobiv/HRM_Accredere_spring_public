import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function TimaA(props){

    const timebtn = () => {
        axios
            .post("/member/timeA")
            .then( re => { alert(re) } )
            .catch(err=> console.log(err))
    }
            axios
                .post("/member/timeA")
                .then( re => { alert(re) } )
                .catch(err=> console.log(err))
    return(
        <div>
            <h3> 날짜 비교 </h3>
            <button type="button" onClick={ () => timebtn() } > 테스트 </button>
        </div>
    )
}

