package com.accredere.service;

import com.accredere.domain.dto.JudgeDto;
import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.dto.OauthDto;
import com.accredere.domain.dto.PageDto;
import com.accredere.domain.entity.judge.JudgeEntity;
import com.accredere.domain.entity.judge.JudgeRepository;
import com.accredere.domain.entity.member.MemberEntity;
import com.accredere.domain.entity.member.MemberRepository;
import com.accredere.domain.entity.orders.OrdersEntity;
import com.accredere.domain.entity.orders.OrdersRepository;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

import java.util.*;


@Service
public class MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JudgeRepository judgeRepository;
    @Autowired
    private OrdersRepository ordersRepository;

    String path = "C:\\";


    // [ 상진 ] 직원 추가
    @Transactional
    public boolean setmember( MemberDto memberDto ) {
        Optional<MemberEntity> list = memberRepository.findByMphone( memberDto.getMphone() );
        if(!list.isPresent()){
            Optional<MemberEntity> optional = memberRepository.findById( memberDto.getMno() );
            if ( optional.isPresent()) { return false;}
            MemberEntity memberEntity = memberRepository.save(memberDto.toEntity());
            if( memberEntity.getMno() != 0 ){
                // 파일 업로드 메도스 추가할 곳
                fileupload(memberDto,memberEntity);
            }
            return true;
        }else {return false;}

    }
    // [ 상진 ] 직원 업데이트
    @Transactional
    public boolean memberupdate( MemberDto memberDto ) {
        Optional<MemberEntity> optional = memberRepository.findById( memberDto.getMno() );
        if( optional.isPresent() ){
            memberRepository.save(memberDto.toEntity());
            return true;
        }
        return false;
    }


    // [ 상진 ] 증명사진 업로드
    public boolean fileupload( MemberDto memberDto , MemberEntity memberEntity) {
        if (memberDto.getMphoto() != null) { // ** 첨부파일 있을때
            String uuid = UUID.randomUUID().toString(); // 1. 난수생성
            String filename = uuid + "_" + memberDto.getMphoto().getOriginalFilename(); // 2. 난수+파일명
            memberEntity.setMphoto(filename); // 해당 파일명 엔티티에 저장 // 3. 난수+파일명 엔티티 에 저장
            try {
                File uploadfile = new File(path + filename);  // 4. 경로+파일명 [ 객체화 ]
                memberDto.getMphoto().transferTo(uploadfile);   // 5. 해당 객체 경로 로 업로드
            } catch (Exception e) { System.out.println("첨부파일 업로드 실패 "); }
            return true;
        }else{return false;}
    }
    // [ 상진 ]
    //  직원 목록 조회
    @Transactional
    public MemberDto getmember( MemberDto memberDto ){
        Pageable pageable = PageRequest.of(  memberDto.getPage()-1 , 5 , Sort.by( Sort.Direction.ASC , "mno") );
        Page<MemberEntity> memberlist2 = memberRepository.findByMember( memberDto.getMname() , memberDto.getT_name() , memberDto.getPo_name() , pageable);
        List<MemberDto> mlist = new ArrayList<>();
        for(MemberEntity entity : memberlist2){mlist.add(entity.toDto());}
        memberDto.setList(mlist);
        memberDto.setTotalBoards( memberlist2.getTotalElements() );
        return memberDto;
    }
    // [ 상진 ]
    //  해당 직원 정보 가져오기
    @Transactional
    public MemberDto memberinfo(int mno){
        Optional<MemberEntity> optional = memberRepository.findById(mno);
        if( optional.isPresent() ){// 2. Optional 안에 있는 내용물 확인 .isPresent()
            MemberEntity memberEntity = optional.get(); // 3. 엔티티 꺼내기 .get();
            return memberEntity.toDto(); // 4.형변환 반환
        }else{
            return null; // 4. 없으면 null
        }
    }
    // [ 상진 ] 한 명의 직원 평가자료 가져오기
    @Transactional
    public JudgeDto point(int mno){
        Optional<JudgeEntity> optional = judgeRepository.findByMno(mno);
        if( optional.isPresent() ){// 2. Optional 안에 있는 내용물 확인 .isPresent()
            JudgeEntity judgeEntity = optional.get(); // 3. 엔티티 꺼내기 .get();
            return judgeEntity.toDto(); // 4.형변환 반환
        }else{
            return null; // 4. 없으면 null
        }
    }
    // [ 상진 ] 한 명의 직원 평가자료 저장
    @Transactional
    public boolean addjudge(JudgeDto judgeDto) {
        Optional<MemberEntity> optional = memberRepository.findById(judgeDto.getMno());
        if ( !optional.isPresent()) { return false;}
        MemberEntity memberEntity = optional.get();
        JudgeEntity judgeEntity = judgeRepository.save( judgeDto.toEntity());
        judgeEntity.setMemberEntity(memberEntity);
        return true;
    }

    // [ 상진 ] 발령 업데이트
    @Transactional
    public synchronized boolean timeA(){
        Date today = new Date();
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String strFormat1 = format1.format(today);
        System.out.println("strFormat1:::"+strFormat1);
        try {
            int result = ordersRepository.findedate(strFormat1);
            System.out.println("발령 업데이트 수:::" + result);
        }
        catch ( Exception e){ System.out.println("서비스 SQL처리 오류"+e); return false;}
        return true;
    }
    // [ 상진 ] 평근근무시간 구하기
    public float timecal(){
        float timeavg = memberRepository.findTimeAvg();
        return timeavg;
    }
    // [ 상진 ] 평근야근시간 구하기
    public float timecal2(){
        float timeavg = memberRepository.findTimeAvg2();
        return timeavg;
    }


    // 비아 - 로그인을 성공한 소셜 회원 정보를 받는 메소드
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //1. 인증[로그인] 결과 정보 요청
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        //2. oauth2 클라이언트 식별 [카카오 vs 네이버 vs 구글]
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        //3. 회원정보 담는 객체명 [JSON형태]
        String oauth2UserInfo = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();
        //4. DTO 처리
        OauthDto oauthDto = OauthDto.of(registrationId, oauth2UserInfo, oAuth2User.getAttributes());//oAuth2User.getAttributes(): 요청 정보 원본

        System.out.println(oauthDto.toString());
        // *. DB 처리
        //1. 이메일로 엔티티 검색 [기존 회원인지 아닌지 확인하기 위해서]
        Optional<MemberEntity> optional = memberRepository.findByMemail(oauthDto.getMemail());

        MemberEntity memberEntity = null;
        if(optional.isPresent()) {  //만약에 기존회원이면
            memberEntity = optional.get();
        }else{                      //기존회원이 아니면
            memberEntity = memberRepository.save(oauthDto.toEntity());
        }
        //권한 부여 [mrol:회원 등급]
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(memberEntity.getMrol()));

        //5. 반환 MemberDto [일반회원 vs. oauth : 통합회원]
        MemberDto memberDto = new MemberDto();
        memberDto.setMemail(memberEntity.getMemail());
        memberDto.setAuthorities(authorities);
        memberDto.setMrol(memberEntity.getMrol());
        memberDto.setAttributes(oauthDto.getAttributes());

        return memberDto;
    }


    // 지혜 - 급여관리 목록
    @Transactional
    public PageDto paylist( PageDto pageDto ){
        Page<MemberEntity> elist = null;
        Pageable pageable = PageRequest.of(pageDto.getPage()-1 , pageDto.getListsize(), Sort.by( Sort.Direction.DESC, "mno"));


        // 검색여부
        elist = memberRepository.findBySearch( pageDto.getMno(), pageDto.getKey(), pageDto.getKeyword(), pageable );

        List<MemberDto> dlist = new ArrayList<>();
        for( MemberEntity entity : elist ){
            dlist.add( entity.toDto() );
        }
        pageDto.setList( dlist ); // 결과 리스트에 담기
        pageDto.setTotalBoards( elist.getTotalElements() );
        return  pageDto;
    }

    // 지혜 - 급여관리 수정
        // 사원번호[ mno ] 식별해서 정보 불러오기
    @Transactional
    public MemberDto getpay( int mno ) {
        // 입력받은 사원번호로 엔티티 검색
        Optional<MemberEntity> optional = memberRepository.findById(mno);
        // Optional 안에 있는 내용 확인
        if (optional.isPresent()) {
            MemberEntity memberEntity = optional.get();
            return memberEntity.toDto();
        } else {
            return null;    // 없으면 null
        }
    }
    // 급여관리 - 연봉 수정
    @Transactional
    public boolean payupdate( MemberDto memberDto ){
        // DTO에서 수정할 사원번호 pk값 이용해서 엔티티 찾기
        Optional<MemberEntity> optional = memberRepository.findById( memberDto.getMno() );
        //
        if( optional.isPresent() ){
            MemberEntity memberEntity = optional.get();
            // 급여 내용 수정
            memberEntity.setMsalary( memberDto.getMsalary() );
            return true;
        }else{ return false; }
    }


    // 비아 - 로그인 여부 판단 [12/14]
    public String getloginMno(){        //principal : 접근주체(로그인한 사용자)
        //1. 인증된 토큰 확인
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //2. 인증된 토큰 내용 확인
        Object principal = authentication.getPrincipal();//Principal : 접근주체 [UserDetails(MemberDto)]
        if(principal.equals("anonymousUser")){  //anonymousUser이면 로그인 전
            return null;
        }else{                                  //anonymousUser 아니면 로그인 후
            MemberDto memberDto = (MemberDto) principal;
            return memberDto.getMrol();
        }
    }

    // 비아 - admin 계정으로 로그인 했을 때 인증된 토큰 set
    public MemberDto setloginAdmin(){
        //권한 부여 [mrol:회원 등급]
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("admin"));
        MemberDto memberDto = new MemberDto();
        memberDto.setMno(1);
        memberDto.setAuthorities(authorities);
        return memberDto;
    }
} // Service end


