package com.accredere.domain.dto;

import com.accredere.domain.entity.judge.JudgeEntity;
import lombok.*;

import javax.persistence.Column;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class JudgeDto {
    private int j_auto;             // 인사고가평가 번호
    private int junder;             // 이해도
    private int jpositive;          // 적극성
    private int jrespons;           // 책임감
    private int jcreate;            // 창의성
    private int jeffort;            // 노력도
    private int jdiligent;          // 근면성
    private String jopinion;        // 한줄평
    private int mno;



    public JudgeEntity toEntity(){
        return JudgeEntity.builder()
                .j_auto(this.j_auto)
                .junder(this.junder)
                .jpositive(this.jpositive)
                .jrespons(this.jrespons)
                .jcreate(this.jcreate)
                .jeffort(this.jeffort)
                .jdiligent(this.jdiligent)
                .jopinion(this.jopinion)
               .build();
    }
}
