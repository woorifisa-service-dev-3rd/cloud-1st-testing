package spring.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import spring.test.dto.ScheduleRequestDto;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    private LocalDateTime deadline;

    @Column(name = "result_date")
    private LocalDateTime resultDate;

    private Result result;

    public static Schedule from(ScheduleRequestDto dto) {
        return Schedule.builder()
                .companyName(dto.getCompanyName())
                .deadline(dto.getDeadline())
                .resultDate(dto.getResultDate())
                .result(dto.getResult())
                .build();
    }
}
