package com.accredere.config;

import com.accredere.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private MemberService memberService;

    // 비아 - WebSecurityConfigurerAdapter 상속으로 인한 오버라이딩
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);    //super : 상속클래스     // 기본값 : 모든 HTTP 보안 설정
        http.logout()               //로그아웃 보안 설정
                .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))//로그아웃 처리 URL 정의
                .logoutSuccessUrl("/") //로그아웃 성공했을 때 이동할 URL
                .invalidateHttpSession(true)//세션 초기화
            .and()                          //기능 구분용
                .csrf()                         //요청 위조 방지
                .ignoringAntMatchers("/member/getmember")   //로그인 post 사용 //해당 URL은 요청 방지 해지하겠다
                .ignoringAntMatchers("/member/paylist")     // 급여관리 -  목록 post 사용
                .ignoringAntMatchers("/member/payupdate")   // 급여관리 - 연봉수정 put 사용
                .ignoringAntMatchers("/order/setorders")    // 인사현황 - 직원정보 호출[ 전체 직원정보 호출 ]
                .ignoringAntMatchers("/order/orderlist")    // 인사현황 - 발령추가 직원검색 값 출력 post 사용
                .ignoringAntMatchers("/order/printorders")    // 인사현황 - 발령목록 post 사용
                .ignoringAntMatchers("/order/orderupdate")    // 인사현황 - 발령수정 put 사용
                .ignoringAntMatchers("/member/setmember")   // 직원추가
                .ignoringAntMatchers("/member/addjudge")   // 평가추가
                .ignoringAntMatchers("/member/point")   // 개인 평가 가져오기
                .ignoringAntMatchers("/member/memberupdate")   // 개인 평가 가져오기
                .ignoringAntMatchers("/member/setloginadmin")   // admin 로그인 토큰
                .ignoringAntMatchers("/testmap/main")   // 멀티스레드
                .ignoringAntMatchers("/member/timeA")   // 발령 적용
                .ignoringAntMatchers("/member/timecal") // 평균 근무 시간
                .ignoringAntMatchers("/at/hi") // 출근
                .ignoringAntMatchers("/at/bye") // 퇴근
            .and()
                .oauth2Login()      //소셜 로그인 보안 설정
                .defaultSuccessUrl("/")//소셜 로그인 성공시 이동하는 URL
                .userInfoEndpoint() //Endpoint(종착점) : 소셜 회원정보가 들어오는 곳
                .userService(memberService);     //해당 서비스에 구현하겠다
    }
}
