package com.accredere.domain.dto;

import lombok.*;

import java.util.Map;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class TransitionChartDto {
    private String wdate;   //날짜
    private int work;       //출근자 수
    private int tardy;      //지각자 수

    public TransitionChartDto objectToDto(Map<Object,Object> map){
        return TransitionChartDto.builder()
                .wdate(map.get("wdate")+"")
                .work(Integer.parseInt(map.get("work").toString()))
                .tardy(Integer.parseInt(map.get("tardy").toString()))
                .build();
    }
}
