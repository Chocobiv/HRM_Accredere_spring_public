package com.accredere.service;

import com.accredere.config.ServerSocketHandler;
import com.accredere.domain.dto.AttendDto;
import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.dto.TransitionChartDto;
import com.accredere.domain.dto.AttendListDto;
import com.accredere.domain.entity.attend.AttendEntity;
import com.accredere.domain.entity.attend.AttendRepository;
import com.accredere.domain.entity.member.MemberEntity;
import com.accredere.domain.entity.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AttendService {
    @Autowired
    private AttendRepository attendRepository;
    @Autowired
    private MemberRepository memberRepository;

    // 태섭 - 출근하는 메소드
    @Transactional
    public boolean attend_hi(AttendDto attendDto) {
        Optional<MemberEntity> optional = memberRepository.findById(attendDto.getMno());
        if (optional.isPresent()) {// 2. Optional 안에 있는 내용물 확인 .isPresent()
            MemberEntity memberEntity = optional.get();
            AttendEntity attendEntity = attendRepository.save(attendDto.toEntity()); // 3. 엔티티 꺼내기 .get();
            attendEntity.setMemberEntity(memberEntity);
            return true;
        } else {
            return false;
        }
    }

    // 태섭 - 퇴근하는 메소드
    @Transactional
    public boolean attend_bye( AttendDto attendDto ) {
        Optional<AttendEntity> optional = attendRepository.findByMno( attendDto.getMno());
        if (optional.isPresent()){
            AttendEntity entity = optional.get();
            entity.setGohome(LocalDateTime.now());
            return true;
        }
        return false;
    }


    //비아 - 지각/출근 추이 그래프를 위한 날짜,출근자수,지각자수 가져오는 메소드
    public List<TransitionChartDto> getcdate(){
        List< Map<Object,Object> > attendMapList = attendRepository.findByCdate();
        List< TransitionChartDto> list = new ArrayList<>();
        attendMapList.forEach( (r) ->{        // r : map --> 레코드
            list.add( new TransitionChartDto().objectToDto(r) );
        });
        return list;
    }

    // 태섭 - 출근 한 사람 정보 가져오는 메소드
    public List<AttendListDto> getattendlist(int page) {
        Pageable pageable = PageRequest.of(page - 1, 4);
        Page<Map<Object, Object>> memberMapPage = attendRepository.findByAttendAll( pageable  );
        Long total = memberMapPage.getTotalElements();
        List<AttendListDto> attlist = new ArrayList<>();
        memberMapPage.forEach((member) -> {
            AttendListDto dto = new AttendListDto();
            member.keySet().forEach((key) -> {
                if (key.equals("t_name")) {
                    dto.setT_name(member.get(key) + "");
                }
                if (key.equals("mname")) {
                    dto.setMname(member.get(key) + "");
                }
                if (key.equals("po_name")) {
                    dto.setPo_name(member.get(key) + "");
                }
                if (key.equals("cdate")) {
                    dto.setCdate( member.get(key)+"" );
                }
                if (key.equals("gohome")) {
                    dto.setGohome( member.get(key)+"" );
                }
            });
            attlist.add(dto);
        });
        attlist.get(0).setTotal(total);
        return attlist;
    }

    // 태섭 - 모든 맴버 가져오기
    public List<MemberDto> getmemberlist(){
        List<MemberEntity> elist = memberRepository.findAll();
        List<MemberDto> dlist = new ArrayList<>();
        for( MemberEntity entity : elist ){
            dlist.add(entity.toDto() );
        }
        return dlist;
    }
}
