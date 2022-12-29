import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* 1. 사용할 컴포넌트 호출 */
import Main from './component/Main'
import AttendList from './component/attend/AttendList'
import Attend from "./component/attend/Attend"
import PayList from './component/pay/PayList'
import Update from './component/pay/Update'
import List from './component/personnelStatus/List'
import Evaluation from "./component/management/Evaluation";
import Hrm from "./component/management/Hrm";
import PersonAdd from "./component/management/PersonAdd";
import PersonEdit from "./component/management/PersonEdit";
import Survey from "./component/management/Survey";
import TimeA from "./component/management/TimeA";
import AverageTime4 from "./component/management/AverageTime4";


/* 2. DOM 컨테이너 */
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

// ** 프로젝트
root.render(
 <React.StrictMode>
   <Main />
 </React.StrictMode>
);
//태섭 테스트 중
/*root.render(
    <React.StrictMode>
        <AttendList />
    </React.StrictMode>
);*/

//지혜 테스트 중
//    root.render(  // 급여수정
//          <React.StrictMode>
//            <Update />
//          </React.StrictMode>
//     );
//지혜 테스트 중
//  root.render(    // 급여관리
//         <React.StrictMode>
//            <PayList />
//         </React.StrictMode>
//    );
/*/*
root.render(
  <React.StrictMode>
    <Write />
  </React.StrictMode>
);
*/
//root.render(
//   <React.StrictMode>
//     <List />
//   </React.StrictMode>
//);

/*root.render(
   <React.StrictMode>
      <View />
   </React.StrictMode>
);*/

//상진 테스트중
/*root.render(
    <React.StrictMode>
        <Evaluation />
    </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
