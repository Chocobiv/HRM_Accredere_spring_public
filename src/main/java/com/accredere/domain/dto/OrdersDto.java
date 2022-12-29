package com.accredere.domain.dto;


import com.accredere.domain.entity.orders.OrdersEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrdersDto {

    private int or_auto;    // Auto 번호
    private String mname;   // 발령 당사자
    private String p_team; // 기존 부서
    private String c_team; // 발령 부서
    private String p_position; // 기존 직책
    private String c_position; // 발령 직책
    private String or_sdate; // 발령 신청일
    private String or_edate; // 발령일
    private int or_state; // 발령 상태 [ 0 : 발령대기] [ 1 : 발령완료 ]
    private int mno;    // 발령 당사자 번호

    @Builder.Default
    private List<OrdersDto> odlist = new ArrayList<OrdersDto>();

    public OrdersEntity toEntity(){
        return OrdersEntity.builder()
                .or_auto(this.or_auto)
                .mname(this.mname)
                .p_team(this.p_team)
                .c_team(this.c_team)
                .p_position(this.p_position)
                .c_position(this.c_position)
                .or_sdate(this.or_sdate)
                .or_edate(this.or_edate)
                .or_state(this.or_state)
                .build();
    }
}
