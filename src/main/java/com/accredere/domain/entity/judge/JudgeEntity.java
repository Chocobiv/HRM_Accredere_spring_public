package com.accredere.domain.entity.judge;

import com.accredere.domain.dto.JudgeDto;
import com.accredere.domain.entity.BaseEntity;
import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;

@Entity // 해당연결된 DB의 테이블과 매핑[연결]
@Table(name="judge") // db에서 사용될 테이블 이름
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class JudgeEntity extends BaseEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY ) // 자동 번호
    private int j_auto;        // 인사고과 평가 번호
    @Column(nullable = false)
    private int junder;             // 이해도

    @Column(nullable = false)
    private int jpositive;          // 적극성

    @Column(nullable = false)
    private int jrespons;           // 책임감

    @Column(nullable = false)
    private int jcreate;            // 창의성

    @Column(nullable = false)
    private int jeffort;            // 노력도

    @Column(nullable = false)
    private int jdiligent;          // 근면성

    @Column
    private String jopinion;        // 한줄평

    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    private MemberEntity memberEntity;

    public JudgeDto toDto() {
        return JudgeDto.builder()
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
