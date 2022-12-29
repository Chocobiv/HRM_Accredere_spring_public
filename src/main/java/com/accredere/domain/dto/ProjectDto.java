package com.accredere.domain.dto;

import com.accredere.domain.entity.project.ProjectEntity;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProjectDto {

    private int pr_auto;
    private String pr_name;
    private LocalDate pr_sdate;
    private LocalDate pr_edate;

    public ProjectEntity toEntity() {
        return ProjectEntity.builder()
                .pr_auto(pr_auto)
                .pr_name(pr_name)
                .pr_sdate(pr_sdate)
                .pr_edate(pr_edate)
                .build();
    }
}
