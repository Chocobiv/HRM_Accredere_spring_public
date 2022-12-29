import React , {useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import Styles from '../../css/Management/PersonAdd.css'
import moment from 'moment';
import axios from 'axios'
import { useParams  } from "react-router-dom";

export default function PersoneEdit( props ){

    const [fileImage, setFileImage] = useState("");
              // 파일 저장
              const saveFileImage = (e) => {
                setFileImage(URL.createObjectURL(e.target.files[0]));
              };

    // 셀렉트 값 추출
        // 부서 셀렉트 값
        // form 양식으로 사용 안함.
        const [t_name, setSelected] = useState("");
        const select_team = (e) => { setSelected(e.target.value); };
        // 직책 셀렉트 값
        const [po_name, setSelected2] = useState("");
        const select_position = (e) => { setSelected2(e.target.value); };
        // 포폴 셀렉트 값
        const [pr_name, setSelected3] = useState("");
        const select_project = (e) => { setSelected3(e.target.value); };

    const params = useParams();
    const [mno1 , setMno1 ] = useState(props.mno);
    const [ memberinfo , setMemberinfo ] = useState({
            mname : "" ,
            t_name : "" ,
            po_name : "",
            mbirth : "",
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
            console.log(params.mno)
            axios
                .get("/member/memberinfo" , { params : { mno: props.mno } } )
                .then( re => {
                                setMemberinfo(re.data);
                                inputset();
                                setDstate(!dstate);
                                })
                .catch( err => { console.log(err) } )
        }
        useEffect( member  , [] )


    // 가져온 정보 뿌리기
        const inputset = () => {
                document.querySelector('.name').value = memberinfo.mname;
                document.querySelector('.birth').value = memberinfo.mbirth;
                document.querySelector('.phone').value = memberinfo.mphone;
                document.querySelector('.email').value = memberinfo.memail;
                document.querySelector('.pay').value = memberinfo.msalary;
                document.querySelector('.mstart').value = memberinfo.mstart;
            }
        const[ dstate , setDstate] = useState(true);
    //   useEffect( inputset , [])

   // 날짜
           // 날짜 변수 선언
           // 달력 on / off 변수 선언
           // 선택한 날짜 포맷
           // 달력 on / off 변수 동작
           const [value, onChange] = useState(new Date());
           const [ isFull , setIsFull  ] = useState( false );
           const nowTime = moment(value).format('YYYY-MM-DD');
           const btn = () => {  setIsFull(!isFull); } ;


    // 유효성검사
             // 이름
             const [name, setName] = useState("")
             const [nameState, setNameState] = useState(false)
             const nameInput = (e)  => {  setName(e.target.value); nameTest(); setDstate(false)}
             const nameError  = /^[a-zA-Z가-힣]{2,6}$/; // 영대소문자, 한글 최소 2글자, 최대 20글자
             const nameTest =  () => {
                                        if(nameError.test(name)){
                                          setNameState(true)
                                        }else{setNameState(false)}
                                     }
             useEffect( nameTest , [ name ] )
            // 생년월일
            const [birth, setBirth] = useState("")
            const [birthState, setBirthState] = useState(false)
            const birthInput = (e)  => {  setBirth(e.target.value); birthTest() }
            const birthError  = /(\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])-[1-4])$/;
            const birthTest =  () => {
                                        if(birthError.test(birth)){
                                          setBirthState(true)
                                        }else{setBirthState(false)}
                                     }
            useEffect( birthTest , [ birth ] )


            // 이메일
            const [email, setEmail] = useState("")
            const [emailState, setEmailState] = useState(false)
            const emailInput = (e)  => {  setEmail(e.target.value); emailTest() }
            const emailError  = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            const emailTest =  () => {
                                        if(emailError.test(email)){
                                          setEmailState(true)
                                        }else{setEmailState(false)}
                                     }
            useEffect( emailTest , [ email ] )
            // 전화번호
             const [phone, setPhone] = useState("")
             const [phoneState, setPhoneState] = useState(false)
             const phoneInput = (e)  => {  setPhone(e.target.value); phoneTest() }
             const phoneError = /^([0-9]{2,3})-([0-9]{3,4})-([0-9]{3,4})$/;
             const phoneTest =  () => {
                                        if(phoneError.test(phone)){
                                          setPhoneState(true)
                                        }else{setPhoneState(false)}

                                      }
             useEffect( phoneTest , [ phone ] )

    // axios 수정 등록
        const personupdate = () => {
                if( name == "" || birth=="" || email=="" || phone=="" || document.querySelector('.pay').value =="" || document.querySelector('.mstart').value==""){
                    alert('모든 정보를 기입해주세요')
                    return
                }
                let memberinfo2 = document.querySelector('.member');
                let formdata = new FormData(memberinfo2);
                // mno 세팅
                    formdata.set("mno" , memberinfo.mno)
                // axios 통신
                    axios
                        .post("/member/memberupdate" , formdata , { headers: { 'Content-Type': 'multipart/form-data'  } }  )
                        .then( res => {
                                       console.log(res.data);
                                       console.log(res);
                                       if(res.data == true) { alert('멤버 수정 성공'); window.location.href = './hrm' }
                                       else                 { alert('멤버 수정 실패');}
                                       } )
                        .catch( err => { console.log( err); } )
        }

        const aaa = useRef(null)
        const bbb = useRef(null)

    return(
        <div className="addbox" >
        <h1 onClick={inputset}> 직원 수정 </h1>
           <form className="member">
                    <div className="add_select_list">
                        <select className="PersonAdd_team" name="t_name" onChange={select_team} style={{width:500, height:45}}>
                            <option  value={memberinfo.t_name} >{memberinfo.t_name}</option>
                            <option  value="개발팀">개발팀</option>
                            <option  value="홍보팀">홍보팀</option>
                            <option  value="경영팀">경영팀</option>
                            <option  value="마케팅팀">마케팅팀</option>
                            <option  value="디자인팀">디자인팀</option>
                        </select>
                    </div>
                    <div className="add_select_list">
                       <select className="PersonAdd_position" name="po_name" onChange={select_position} style={{width:500, height:45}}>
                           <option  value={memberinfo.po_name} >{memberinfo.po_name}</option>
                           <option  value="사원">사원</option>
                           <option  value="대리">대리</option>
                           <option  value="주임">주임</option>
                           <option  value="차장">차장</option>
                           <option  value="부장">부장</option>
                           <option  value="수석">팀장</option>
                       </select>
                    </div>
                    <div className="add_input_box">
                        <input type="text" ref={aaa} className="name" name="mname" placeholder="이름" onChange={nameInput} style={{width:500, height:45}}/>
                        { nameState ? "👌" : "이름" }
                    </div>
                    <div className="add_input_box">
                        <input type="text" ref={aaa} className="birth" name="birth" placeholder="생년월일" onChange={birthInput} style={{width:500, height:45}}/>
                        { birthState ? "👌" : "생년월일" }
                    </div>
                    <div className="add_input_box">
                        <input type="text" className="phone" name="mphone" placeholder="전화번호" onChange={phoneInput} style={{width:500, height:45}}/>
                        { phoneState ? "👌" : "전화번호" }
                    </div>
                    <div className="add_input_box">
                        <input type="text" className="email" name="memail" placeholder="이메일" onChange={emailInput} style={{width:500, height:45}}/>
                        { emailState ? "👌" : "이메일" }
                    </div>
                    <div className="add_input_box">
                        { isFull && <div className="calbox"> <Calendar onChange={onChange}  value={value} /> </div>  }
                       <input type="text"  className="mstart" name="mstart" onClick={btn}  style={{width:500, height:45}}/> 입사일
                       <br/>
                       <input type="text" value={nowTime} onClick={btn} style={{width:500, height:45}}/>
                    </div>
                    <div className="add_input_box">
                        <input type="text" className="pay" name="msalary" placeholder="연봉" style={{width:500, height:45}} /> 만 원
                    </div>
                    <div className="add_select_list">
                        <select className="PersonAdd_project" name="pr_name"  onChange={select_project} style={{width:500, height:45}} >
                           <option  value={memberinfo.pr_name} selected disabled hidden>{memberinfo.pr_name}</option>
                           <option  value="프로젝트1">프로젝트1</option>
                           <option  value="프로젝트2">프로젝트2</option>
                           <option  value="프로젝트3">프로젝트3</option>
                       </select>
                    </div>
                    <div>
                        <div className="mphoto_box">
                            <input type="file" className="mphoto" name="mphoto" accept="image/*" onChange={saveFileImage} style={{ height:100}} />
                        </div>
                        <div>
                            {fileImage && (
                              <img
                                alt="sample"
                                src={fileImage}
                                style={ {margin: "auto" ,width : "120px" , height:"120px", borderRadius: "60px" ,border: '2px solid black' }}
                              />
                            )}
                            <div
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={personupdate}> 수정 </button>
                </form>
            </div>

    );
}