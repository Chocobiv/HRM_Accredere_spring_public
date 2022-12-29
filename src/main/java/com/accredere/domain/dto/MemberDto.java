package com.accredere.domain.dto;

import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MemberDto implements OAuth2User {
    private int mno;            // 사원 번호
    private String mname;       // 사원 이름
    private String t_name;      // 부서 이름
    private String po_name;     // 직급
    private String pr_name;     // 업무
    private String mphone;      // 사원 전화번호
    private String mbirth;      // 사원 생년월일
    // private String mphoto;      // 사원 프로필 ( 증명 ) 사진
    private String memail;      // 사원 이메일
    private String mstart;        // 사원 입사 일
    private int mvac;           // ?? 모르겠음
    private int msalary;        // 사원 연봉
    private String maccount;    // 사원 계좌
    @Column
    private String mrol;        // [OAUTH] 회원 등급 필드

    private Set<GrantedAuthority> authorities;//인증 권한 [토큰]
    private Map<String, Object> attributes; //oauth2 인증 결과

    private MultipartFile mphoto;       // 첨부파일 [쓰기용]
    private String mphotoename;         // 첨부파일 [호출용]
    @Builder.Default
    private List<MemberDto> list = new ArrayList<MemberDto>();

    private int page;
    private Long totalBoards;

    public MemberEntity toEntity() {
        return MemberEntity.builder()
                .mno(this.mno)
                .mname(this.mname)
                .t_name(this.t_name)
                .po_name(this.po_name)
                .pr_name(this.pr_name)
                .mphone(this.mphone)
                .mbirth(this.mbirth)
                //.mphoto(this.mphoto)
                .mrol(this.mrol)
                .mstart(this.mstart)
                .mvac(this.mvac)
                .msalary(this.msalary)
                .maccount(this.maccount)
                .memail(this.memail)
                .build();
    }

    /* ---------------- 비아 - OAuth2User ------------------ */
    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getName() {       //OAUTH 아이디 : 이메일
        return this.memail;
    }
}
