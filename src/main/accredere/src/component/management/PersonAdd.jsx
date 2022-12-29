import React , {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import Styles from '../../css/Management/PersonAdd.css'
import moment from 'moment';
import axios from 'axios'

export default function PersonAdd(props){

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


    // 달력
            // 날짜 선택
            // 선택한 날짜 포맷
            // 달력 on / off
            const [value, onChange] = useState(new Date());
            const mstart = moment(value).format('YYYY-MM-DD');
            const [ isFull , setIsFull  ] = useState( false );
            const btn = () => {  setIsFull(!isFull); } ;

    // axios
            const personadd = () => {
                    if( nameState == false || birthState== false|| emailState==false || phoneState==false || document.querySelector('.msalary').value =="" || document.querySelector('.mmstart').value==""){
                        alert('모든 정보를 기입해주세요')
                        return
                    }
                    let memberinfo = document.querySelector('.member');
                    let formdata = new FormData(memberinfo);
                    // mrol 기본 셋팅
                        const mrol = "user";
                        formdata.set("mrol" , mrol);
                    // 휴가 (입사 월에 따른 차등 지급)
                        const month = mstart.substring(5,7);
                        let mvac = 0;
                        if(month=="12"||month=="11"){ mvac = 2}
                        else if(month=="10"||month=="09"){mvac = 5}
                        else if(month=="08"||month=="07"){mvac = 7}
                        else if(month=="06"||month=="05"){mvac = 11}
                        else{mvac =15}
                        formdata.set("mvac" , mvac);
                    // 계좌 생성
                        const random = Math.floor(Math.random() * 9000000) + 1000000;
                        const srandom = String(random);
                        const maccount = "21-"+srandom.substring(0,3)+"-"+srandom.substring(3,9)
                        formdata.set("maccount" , maccount);
                    // axios 통신
                        axios
                            .post("/member/setmember" , formdata , { headers: { 'Content-Type': 'multipart/form-data'  } }  )
                            .then( res => {
                                           if(res.data == true) { alert('직원 추가 성공'); window.location.href = './hrm' }
                                           else                 { alert('이미 등록된 직원입니다.');}
                                           } )
                            .catch( err => { console.log( err); } )
            }



    // 유효성검사
         // 이름
         const [name, setName] = useState("")
         const [nameState, setNameState] = useState(false)
         const nameInput = (e)  => {  setName(e.target.value); nameTest() }
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


    return(
        <div className="addbox">
            <h1 > 직원 추가 </h1>
            <form className="member" method="post" action="/member/setmember" enctype="multipart/form-data">
                <div className="add_select_list">
                    <select className="PersonAdd_team" name="t_name" style={{width:500, height:45}} onChange={select_team}>
                        <option  value="" selected disabled hidden>부서</option>
                        <option  value="개발팀">개발팀</option>
                        <option  value="홍보팀">홍보팀</option>
                        <option  value="경영팀">경영팀</option>
                        <option  value="마케팅팀">마케팅팀</option>
                        <option  value="디자인팀">디자인팀</option>
                    </select>
                </div>
                <div className="add_select_list">
                   <select className="PersonAdd_position" name="po_name" style={{width:500, height:45}} onChange={select_position} >
                       <option  value="" selected disabled hidden>직책</option>
                       <option  value="사원">사원</option>
                       <option  value="대리">대리</option>
                       <option  value="주임">주임</option>
                       <option  value="차장">차장</option>
                       <option  value="부장">부장</option>
                       <option  value="수석">팀장</option>
                   </select>
                </div>
                <div className="add_input_box">
                    <input type="text" className="mname"  name="mname" style={{width:500, height:45}} placeholder="이름" onChange={nameInput}/>
                    { nameState ? "👌" : "영대소문자x , 특수문자x" }
                </div>
                <div className="add_input_box">
                    <input type="text" className="mbirth" name="mbirth" style={{width:500, height:45}} placeholder="생년월일" onChange={birthInput} />
                    { birthState ? "👌" : "ex) 901011 성별까지" }
                </div>
                <div className="add_input_box">
                    <input type="text" className="mphone" name="mphone" style={{width:500, height:45}} placeholder="전화번호" onChange={phoneInput}/>
                    { phoneState ? "👌" : "ex) 010-1234-1234" }
                </div>
                <div className="add_input_box">
                    <input type="text" className="memail" name="memail" style={{width:500, height:45}} placeholder="이메일" onChange={emailInput} />
                    { emailState ? "👌" : "ex) aaa@naver.com" }
                </div>
                <div className="add_input_box">
                    { isFull && <div className="calbox" > <Calendar onChange={onChange} value={value} /> </div>  }
                    <input type="text" className="mmstart" value={mstart} name="mstart" onClick={btn} style={{width:500, height:45}} /> 📆 <br/>

                </div>
                <div className="add_input_box">
                    <input type="text" className="msalary" name="msalary" style={{width:500, height:45}} placeholder="연봉" /> 만 원
                </div>
                <div className="add_select_list">
                    <select className="PersonAdd_project" name="pr_name"  onChange={select_project}>
                       <option  value="" selected disabled hidden>프로젝트</option>
                       <option  value="프로젝트1">프로젝트1</option>
                       <option  value="프로젝트2">프로젝트2</option>
                       <option  value="프로젝트3">프로젝트3</option>
                   </select>
                   담당 프로젝트
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
                <button type="button" onClick={personadd}> 등록 </button>
            </form>
        </div>
    )
}