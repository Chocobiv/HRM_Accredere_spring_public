package com.accredere.controller;

import com.accredere.domain.dto.AttendDto;
import com.accredere.domain.dto.AttendListDto;
import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.dto.TransitionChartDto;
import com.accredere.service.AttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/at")
public class AttendController {
    @Autowired
    private AttendService attendService = new AttendService();

    // 태섭 - 출근 한 사람 정보 가져오기 ( 페이징 )
    @GetMapping("/atl")
    public List<AttendListDto> attendlist(@RequestParam int page ){
        return attendService.getattendlist(page);
    }

    // 태섭 - 모든 맴버 가져오기
    @GetMapping("/mlist")
    public List<MemberDto> getmemberlist(){
        return attendService.getmemberlist();
    }

    // 태섭 - 출근하기
    @PostMapping("/hi") // 출근
    public boolean attend_hi( @RequestBody AttendDto attendDto ){
        return  attendService.attend_hi(attendDto);
    }
    @PutMapping("/bye") // 퇴근하기
    public boolean attend_bye(@RequestBody AttendDto attendDto ){
        return attendService.attend_bye(attendDto);
    }

    //비아 - 지각/출근 추이 그래프를 위한 날짜,출근자수,지각자수 가져오는 메소드
    @GetMapping("/getcdate")
    public List<TransitionChartDto> getcdate(){
        return attendService.getcdate();
    }

}
