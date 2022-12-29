import React, { useState , useEffect ,PureComponent } from 'react';
import Styles from '../../css/Management/Box.css'
import { useParams  } from "react-router-dom";
import axios from 'axios';  // react 비동기 통신 라이브러리

import {  Legend , Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';



export default function Evaluation(props){
    const mmm = props.mno3
    const [ttt , setTtt] = useState(props.mno)
    const params = useParams();
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
            console.log(params.mno)
            console.log(props.mno3)
            console.log(mmm)
            axios
                .get("/member/memberinfo" , { params : { mno : props.mno } } )
                .then( re => { setMemberinfo(re.data); })
                .catch( err => { console.log(err) } )
        }
        useEffect( member , [] )
    // 포인트
        const [ point , setPoint ]  = useState({
                junder : "",
                jeffort : "",
                jpositive : "",
                jrespons : "",
                jcreate : ""
            })

    // 개인 평가 정보 가져오기
        const judgepoint = () => {
            axios
                .get("/member/point" , { params : { mno : props.mno } } )
                .then( re => {
                    console.log(re)
                    setPoint({
                        junder : re.data.junder,
                        jeffort : re.data.jeffort,
                        jpositive : re.data.jpositive,
                        jrespons : re.data.jrespons,
                        jcreate : re.data.jcreate
                    });
                    grade = (re.data.junder + re.data.jeffort + re.data.jpositive + re.data.jrespons + re.data.jcreate)/5;
                })
                .catch( err => console.log(err) )
        }
        let grade = 0;
        useEffect( judgepoint , [] )


    const data = [
          {
            subject: '이해력',
            A: point.junder,
            B: 6,
            fullMark: 0,
          },
          {
            subject: '책임감',
            A: point.jrespons,
            B: 6,
            fullMark: 0,
          },
          {
            subject: '적극성',
            A: point.jpositive,
            B: 6,
            fullMark: 0,
          },
          {
            subject: '창의력',
            A: point.jcreate,
            B: 6,
            fullMark: 0,
          },
          {
            subject: '근면성',
            A: point.jeffort,
            B: 6,
            fullMark: 0,
          },

        ];


    return(
        <div className="box">
            <h3 style={{ fontSize:50}}> 인사고과 평가서 </h3>
            <div className="person">
                <span className="picture"> 증명사진 </span>
                <span className="intro">
                    <div> 인적사항 </div>
                    <div> 이름 : {memberinfo.mname} </div>
                    <div> 부서 : {memberinfo.t_name} </div>
                    <div> 직위 : {memberinfo.po_name} </div>
                </span>
                <span className="grade">
                    <div>점수</div>
                    <div>
                        { grade >=11 ? "S" : grade <=10 ? "A" : grade <=7 ? "B" : grade <=5 ? "C" : grade <=3 ? "D" : ""   }
                    </div>
                </span>
            </div>
            <br />
            <br />
            <div className="inform">
                <table className="main">
                  <tr >
                    <th className="item">평가항목</th>
                    <th className="point">점수</th>
                    <th className="grape">그래프</th>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7" >{data[0].subject}</td>
                    <td className="Evaluation_td_7" >{data[0].A}</td>
                    <td rowspan='7' className="Evaluation_td_7">
                            <RadarChart outerRadius={90} width={730} height={250} data={data}  >
                               <PolarGrid />
                               <PolarAngleAxis dataKey="subject" />
                               <PolarRadiusAxis angle={90} domain={[0, 12]} />
                               <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                               <Legend />
                           </RadarChart>
                      </td>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7">{data[1].subject}</td>
                    <td className="Evaluation_td_7">{data[1].A}</td>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7">{data[2].subject}</td>
                    <td className="Evaluation_td_7">{data[2].A}</td>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7">{data[3].subject}</td>
                    <td className="Evaluation_td_7">{data[3].A}</td>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7">{data[4].subject}</td>
                    <td className="Evaluation_td_7">{data[4].A}</td>
                  </tr>
                  <tr>
                    <td className="Evaluation_td_7">합계</td>
                    <td className="Evaluation_td_7" >
                        {(data[0].A+data[1].A+data[2].A+data[3].A+data[4].A)/5}
                    </td>
                  </tr>
                </table>
                <br />
                <br />
                <div className="Evaluation_point"> 1점 : 부족함 ||  4점 : 다소 미흡함 || 6점 : 보통 || 8점 : 기대수준이상 || 12점: 우수함 </div>
         </div>
         </div>
    );
}