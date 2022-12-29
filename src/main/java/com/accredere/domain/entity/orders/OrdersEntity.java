package com.accredere.domain.entity.orders;

import com.accredere.domain.dto.OrdersDto;
import com.accredere.domain.entity.BaseEntity;
import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name="orders") // db에서 사용될 테이블 이름
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrdersEntity extends BaseEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY ) // 자동 번호
    private int or_auto;    // 발령번호
    @Column
    private String mname;   // 발령 당사자
    @Column
    private String p_team;  // 기존 부서
    @Column
    private String c_team;  // 발령 부서
    @Column
    private String p_position;  // 기존 직책
    @Column
    private String c_position;  // 발령 부서
    @Column
    private String or_sdate; // 발령 신청일
    @Column
    private String or_edate; // 발령일
    @Column(nullable = false)
    @ColumnDefault("0")
    private int or_state ;   // 발령 상태 [ 0 : 발령대기] [ 1 : 발령완료 ]
                             // default 값이 안먹음

    // 연관관계 [ 사원번호 <-- 양방향 --> ]
    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    private MemberEntity memberEntity;



    public OrdersDto toDto(){
        return OrdersDto.builder()
                .or_auto(this.or_auto)
                .mname(this.mname)
                .p_team(this.p_team)
                .c_team(this.c_team)
                .p_position(this.p_position)
                .c_position(this.c_position)
                .or_sdate(this.or_sdate)
                .or_edate(this.or_edate)
                .or_state(this.or_state)
                .mno( this.memberEntity.getMno() )
                .build();
    }

}
