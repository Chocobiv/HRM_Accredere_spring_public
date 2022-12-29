package com.accredere.domain.entity.member;

import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.entity.BaseEntity;
import com.accredere.domain.entity.judge.JudgeEntity;
import com.accredere.domain.entity.orders.OrdersEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;

import java.util.List;

@Entity
@Table(name="member") // db에서 사용될 테이블 이름
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MemberEntity extends BaseEntity {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY ) // 자동 번호
    private int mno;        // 사원 번호

    @Column
    private String mname;   // 사원 이름

    @Column
    private String t_name;     // 부서 이름

    @Column
    private String po_name;    // 직급

    @Column
    private String pr_name;    // 업무

    @Column
    private String mphone;  // 사원 전화번호

    @Column
    private String mbirth;  // 사원 생년월일

    @Column
    private String mphoto;    // 사원 프로필 ( 증명 ) 사진

    @Column
    private String memail;    // 사원 이메일

    @Column
    private String mstart;  // 사원 입사 일

    @Column
    private int mvac;       // 기본으로 주어지는 휴가 갯수

    @Column
    private int msalary;    // 사원 연봉

    @Column
    private String maccount;    // 사원 계좌

    @OneToMany( mappedBy = "memberEntity" )
    @Builder.Default
    private List<JudgeEntity> judgeEntityList = new ArrayList<>();

    // 연관관계 [ 직원번호 <---> 인사현황 ]
    @OneToMany( mappedBy = "memberEntity" )
    @Builder.Default
    private List<OrdersEntity> ordersEntityList = new ArrayList<>();

    @Column
    private String mrol;      // [OAUTH] 회원 등급 필드

    public MemberDto toDto() {
        return MemberDto.builder()
                .mno(this.mno)
                .mname(this.mname)
                .t_name(this.t_name)
                .po_name(this.po_name)
                .pr_name(this.pr_name)
                .mphone(this.mphone)
                .mbirth(this.mbirth)
                .mstart(this.mstart)
                .memail(this.memail)
                .mvac(this.mvac)
                .msalary(this.msalary)
                .maccount(this.maccount)
                .build();
    }
}
