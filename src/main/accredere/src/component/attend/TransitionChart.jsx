// 비아 - 지각 및 결근 추이 그래프

import "../../css/Attend/TransitionChart.css";
import React, {FunctionComponent, useEffect, useState} from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";

// ============================== 추이 그래프 ============================= //
const CustomizedLabel: FunctionComponent<any> = (props: any) => {   //그래프 위의 숫자
    const { x, y, stroke, value } = props;

    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={15} textAnchor="middle">
            {value}
        </text>
    );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
                fontSize={12}       //가로축 폰트 사이즈
            >
                {payload.value}
            </text>
        </g>
    );
};
// ================================================================= //

export default function App() {
    const [data, setData] = useState([])    //마지막에 setData

    // 비아 - 출근날짜시각 가져와서 나누고 지각/출근 여부 판단
    useEffect(()=>{
        axios.get('/at/getcdate')
            .then((res)=>{
                setData(res.data);
                console.log( res.data );
            })
    },[] )

    return (
        <span>
            <div className={"transitionchart_wrapper"}>
                <span className={"ybox"}>명</span>
                <LineChart
                    width={1100}
                    height={500}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 1,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="wdate" height={60} tick={<CustomizedAxisTick />} />
                    <YAxis fontSize={15} />     {/* 세로축 */}
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tardy" stroke="#8884d8">
                        <LabelList content={<CustomizedLabel />} />
                    </Line>
                    <Line type="monotone" dataKey="work" stroke="#82ca9d" />
                </LineChart>
                <span className={"xbox"}>날짜</span>
            </div>
        </span>
    );
}
