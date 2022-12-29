package com.accredere.domain.entity.attend;

import com.accredere.domain.dto.AttendDto;
import com.accredere.domain.entity.BaseEntity;
import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity // 해당연결된 DB의 테이블과 매핑[연결]
@Table(name="attend") // db에서 사용될 테이블 이름
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttendEntity extends BaseEntity {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private int a_auto;

    @Column
    private LocalDateTime gohome;

    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    private MemberEntity memberEntity;

    public AttendDto toDto(Long totalboard) {
        return AttendDto.builder()
                .a_auto(this.a_auto)
                .gohome(this.gohome)
                .totalBoards(totalboard)
                .cdate(super.getCdate())    // 비아 - 출근 시각 가져오기 위해서 추가 [12/16]
                .build();
    }
}
