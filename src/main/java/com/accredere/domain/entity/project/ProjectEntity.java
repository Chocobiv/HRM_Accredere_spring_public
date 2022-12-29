package com.accredere.domain.entity.project;

import com.accredere.domain.dto.ProjectDto;
import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity // 해당연결된 DB의 테이블과 매핑[연결]
@Table(name="project") // db에서 사용될 테이블 이름
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int pr_auto;

    @Column
    private String pr_name;
    @Column
    private LocalDate pr_sdate;
    @Column
    private LocalDate pr_edate;

    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    private MemberEntity memberEntity;

    public ProjectDto toDto() {
        return ProjectDto.builder()
               .pr_name(pr_name)
               .pr_sdate(pr_sdate)
               .pr_edate(pr_edate)
               .build();
    }
}
