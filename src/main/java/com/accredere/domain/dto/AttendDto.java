package com.accredere.domain.dto;

import com.accredere.domain.entity.attend.AttendEntity;
import lombok.*;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttendDto {

    private int a_auto;
    private LocalDateTime gohome;
    private Long totalBoards;       // 총 출근 한 사람
    private int mno;

    //비아 - 출근 시각 가져오기 위해서 추가 [12/16]
    private LocalDateTime cdate;

    public AttendEntity toEntity(){
        return AttendEntity.builder()
                .a_auto(this.a_auto)
                .gohome(this.gohome)
                .build();
    }
}
