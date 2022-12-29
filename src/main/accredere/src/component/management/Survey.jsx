import React , {useState , useEffect} from 'react';
import { useParams  } from "react-router-dom";
import axios from 'axios'


export default function Survey(props){

    const params = useParams();
    const [mno1 , setMno1 ] = useState(props.mno);
    const [ memberinfo , setMemberinfo ] = useState({
        mname : "" ,
        t_name : "" ,
        po_name : "",
        mbrith : "",
        maccount : "",
        memail : "",
        mno : "",
        mphone : "",
        mphoto : "",
        mrol : "",
        msalary : "",
        mstart : "",
        mvac : "",
        pr_name :""
        })
    // 개인 정보 가져오기
    const member = () => {
        axios
            .get("/member/memberinfo" , { params : { mno: props.mno } } )
            .then( re => { setMemberinfo(re.data);  })
            .catch( err => { console.log(err) } )
    }
    useEffect( member , [] )


    const abc = () => { alert("ad")  }
    const[num, setNum ] = useState(0)
    const[num2, setNum2 ] = useState(0)
    const[num3, setNum3 ] = useState(0)
    const[num4, setNum4 ] = useState(0)
    const[num5, setNum5 ] = useState(0)
    const[num6, setNum6 ] = useState(0)
    const[num7, setNum7 ] = useState(0)
    const[num8, setNum8 ] = useState(0)
    const[num9, setNum9 ] = useState(0)
    const[num10, setNum10 ] = useState(0)
    const onChange  = (e)=> { setNum (parseInt(e.target.value));  sumpoint();  }
    const onChange2 = (e)=> { setNum2(parseInt(e.target.value));  sumpoint(); }
    const onChange3 = (e)=> { setNum3(parseInt(e.target.value));  sumpoint2() }
    const onChange4 = (e)=> { setNum4(parseInt(e.target.value));  sumpoint2() }
    const onChange5 = (e)=> { setNum5(parseInt(e.target.value));  sumpoint3() }
    const onChange6 = (e)=> { setNum6(parseInt(e.target.value));  sumpoint3() }
    const onChange7 = (e)=> { setNum7(parseInt(e.target.value));  sumpoint4() }
    const onChange8 = (e)=> { setNum8(parseInt(e.target.value));  sumpoint4() }
    const onChange9 = (e)=> { setNum9(parseInt(e.target.value));  sumpoint5() }
    const onChange10 = (e)=> { setNum10(parseInt(e.target.value));  sumpoint5() }

    ///////////////////////////////////////


    const[junder , setJunder] = useState(0)
    const[jeffort , setJeffort] = useState(0)
    const[jpositive , setJpositive] = useState(0)
    const[jrespons , setJrespons] = useState(0)
    const[jcreate , setJcreate] = useState(0)

    //////////////////////////////////////

    const sumpoint = () => { setJunder(num+num2);  } // 이해도
    const sumpoint2 = () => { setJeffort(num3+num4); } // 노력도
    const sumpoint3 = () => { setJpositive(num5+num6) ;  } // 적극성
    const sumpoint4 = () => { setJrespons(num7+num8) ; } // 책임감
    const sumpoint5 = () => { setJcreate(num9+num10) ; } // 독창성
    useEffect( sumpoint , [ num , num2] )
    useEffect( sumpoint2 , [ num3 , num4] )
    useEffect( sumpoint3 , [ num5 , num6] )
    useEffect( sumpoint4 , [ num7 , num8] )
    useEffect( sumpoint5 , [ num9 , num10] )
    ////////////////////////////////////


    const [ point , setPoint ]  = useState({
        mno : "",
        junder : "",
        jeffort : "",
        jpositive : "",
        jrespons : "",
        jcreate : ""
    })
    const pointset = () => {
        setPoint({
            mno : mno1,
            junder : junder,
            jeffort : jeffort,
            jpositive : jpositive,
            jrespons : jrespons,
            jcreate : jcreate
        })
    }
    useEffect( pointset , [junder , jeffort , jpositive, jrespons, jcreate ])

    // 설문 저장
    const addjudge = () => {
        pointset ()
        console.log(point)
        if(point.junder=="" || point.jeffort=="" || point.jpositive=="" || point.jrespons=="" || point.jcreate=="" ){
            alert("항목을 다 선택해주세요");
            return;
        }
        axios
            .post("/member/addjudge" , point )
            .then( re => { alert('등록되었습니다.'); window.location.href = '/management/hrm/' } )
            .catch( err => { console.log(err) } )
    }


    return(
        <div style={{padding : 50}}>
            <div>
            <div> 이름 : {memberinfo.mname} </div>
            <div> 부서 : {memberinfo.t_name} </div>
            <div> 직급 : {memberinfo.po_name} </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td>항목</td>
                        <td>매우아니다/매우작다/매우적다</td>
                        <td>아니다/작다/적다</td>
                        <td>보통이다</td>
                        <td>그렇다/크다/많다</td>
                        <td>매우 그렇다/매우 크다/매우 많다</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>이해 설문 1</td>
                        <td><input className="skin" type="radio" onChange={onChange} name="s1" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange} name="s1" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange} name="s1" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange} name="s1" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange} name="s1" value="6"/></td>
                    </tr>
                    <tr>
                        <td>이해 설문 2</td>
                        <td><input className="skin" type="radio" onChange={onChange2} name="s2" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange2} name="s2" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange2} name="s2" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange2} name="s2" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange2} name="s2" value="6"/></td>
                    </tr>
                    <tr>
                        <td>노력 설문 </td>
                        <td><input className="skin" type="radio" onChange={onChange3} name="s3" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange3} name="s3" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange3} name="s3" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange3} name="s3" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange3} name="s3" value="6"/></td>
                    </tr>
                    <tr>
                        <td>노력 설문 2</td>
                        <td><input className="skin" type="radio" onChange={onChange4} name="s4" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange4} name="s4" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange4} name="s4" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange4} name="s4" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange4} name="s4" value="6"/></td>
                    </tr>
                    <tr>
                        <td>책임 설문 1</td>
                        <td><input className="skin" type="radio" onChange={onChange5} name="s5" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange5} name="s5" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange5} name="s5" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange5} name="s5" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange5} name="s5" value="6"/></td>
                    </tr>
                    <tr>
                        <td>책임 설문 2</td>
                        <td><input className="skin" type="radio" onChange={onChange6} name="s6" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange6} name="s6" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange6} name="s6" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange6} name="s6" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange6} name="s6" value="6"/></td>
                    </tr>
                    <tr>
                        <td>독창 설문 1</td>
                        <td><input className="skin" type="radio" onChange={onChange7} name="s7" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange7} name="s7" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange7} name="s7" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange7} name="s7" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange7} name="s7" value="6"/></td>
                    </tr>
                    <tr>
                        <td>독창 설문 2</td>
                        <td><input className="skin" type="radio" onChange={onChange8} name="s8" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange8} name="s8" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange8} name="s8" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange8} name="s8" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange8} name="s8" value="6"/></td>
                    </tr>
                    <tr>
                        <td>적극 설문 1.</td>
                        <td><input className="skin" type="radio" onChange={onChange9} name="s9" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange9} name="s9" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange9} name="s9" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange9} name="s9" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange9} name="s9" value="6"/></td>
                    </tr>
                    <tr>
                        <td>적극 설문 2.</td>
                        <td><input className="skin" type="radio" onChange={onChange10} name="s10" value="2"/></td>
                        <td><input className="skin" type="radio" onChange={onChange10} name="s10" value="3"/></td>
                        <td><input className="skin" type="radio" onChange={onChange10} name="s10" value="4"/></td>
                        <td><input className="skin" type="radio" onChange={onChange10} name="s10" value="5"/></td>
                        <td><input className="skin" type="radio" onChange={onChange10} name="s10" value="6"/></td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={addjudge}> 평가 등록 </button>
        </div>
    );



}