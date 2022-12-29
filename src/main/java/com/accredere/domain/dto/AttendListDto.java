package com.accredere.domain.dto;


import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttendListDto {

    private int mno;        // 사원 번호
    private String t_name;  // 부서 이름
    private String mname;   // 사원 이름
    private String po_name; // 직급
    private String cdate; // 출근 시간
    private String gohome; // 퇴근시간
    private Long total;

}
