package com.accredere.controller;

import com.accredere.domain.dto.JudgeDto;
import com.accredere.domain.dto.PageDto;
import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.entity.member.MemberEntity;
import com.accredere.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;

import java.text.ParseException;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:3000") // 리액트와 연결하기 위한 리액트 포트번호 [12/08] 비아 - 스프링부트&리액트 통합->주석
@RestController // Restful api 사용하는 @controller + @ResponseBody
@RequestMapping("/member") // 공통 URL 매핑 주소
public class MemberController {

    @Autowired // 의존성 주입
    private MemberService memberService;

    // ------------------ 지혜 - 급여관리 ------------------ //
    //1. 연봉목록 R [전체,검색(이름/직급 별 검색)] (연봉(만원단위)/천단위 표시)
    @PostMapping("/paylist")
    public PageDto paylist( @RequestBody PageDto pageDto ){
        return memberService.paylist( pageDto );
    }


    //2. 연봉수정 U
    @GetMapping("/getpay")  // 사원번호[ mno ] 식별해서 정보 불러오기
    public MemberDto getpay( @RequestParam("mno") int mno ){
        System.out.println("수정정보 불러오기 : " + mno );
        return memberService.getpay( mno );
    }
    @PutMapping("/payupdate")
    public boolean payupdate( @RequestBody MemberDto memberDto ){
        System.out.println("수정하자 : "+ memberDto);
        return memberService.payupdate( memberDto );
    }


    /////////////////////////////////////////////////////////
    // 직원추가  [ 상진 ]
    @PostMapping("/setmember")
    public boolean setmebmer(  MemberDto memberDto ){
        return memberService.setmember(memberDto);
    }
    // 직원 업데이트  [ 상진 ]
    @PostMapping("/memberupdate")
    public boolean memberupdate(  MemberDto memberDto ){
        return memberService.memberupdate(memberDto);
    }
    // [ 상진 ] 직원 list
    @PostMapping("/getmember")
    public MemberDto getmember(@RequestBody MemberDto memberDto ){
        return memberService.getmember(memberDto);
    }
    // [ 상진 ] 한 명의 직원 정보 가져오기
    @GetMapping("/memberinfo")
    public MemberDto memberinfo( @RequestParam(value = "mno") int mno){
        return memberService.memberinfo(mno)
                ;
    }
    // [ 상진 ] 한 명의 직원 평가자료 가져오기
    @GetMapping("/point")
    public JudgeDto point( @RequestParam(value = "mno" ) int mno){
        return memberService.point(mno);
    }

    // [ 상진 ] 한 명의 직원 평가자료 저장
    @PostMapping("/addjudge")
    public boolean addjudge(@RequestBody JudgeDto judgeDto){
        return memberService.addjudge(judgeDto);
    }

    @GetMapping("/abc")
    public boolean abc(){
        return true;
    }

    // [ 상진 ] 평근근무시간 구하기
    @GetMapping("/timecal")
    public float timecal(){
        return memberService.timecal();
    }
    @GetMapping("/timecal2")
    public float timecal2(){
        return memberService.timecal2();
    }

    // [ 상진 ] 발령 실행
    @PostMapping("/timeA")
    public boolean timeA() throws ParseException { return memberService.timeA(); }



    // 비아 - 로그인 여부 판단 [12/14]
    @GetMapping("/getloginMno")     //6. 로그인 정보 확인
    public String getloginMno(){
        return memberService.getloginMno();
    }

    // 비아 - admin 계정으로 로그인 했을 때 인증된 토큰 set
    @PostMapping("/setloginadmin")
    public MemberDto setloginAdmin(){
        return memberService.setloginAdmin();
    }
}
