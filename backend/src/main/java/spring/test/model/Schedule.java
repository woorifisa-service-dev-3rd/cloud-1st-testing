package spring.test.model;

import jakarta.persistence.*;
import lombok.*;
import spring.test.dto.ScheduleRequestDto;

import java.time.LocalDateTime;

@ToString
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

    @Convert(converter = ResultConverter.class)
    private Result result;

    public static Schedule from(ScheduleRequestDto dto) {
        return Schedule.builder()
                .companyName(dto.getCompanyName())
                .deadline(dto.getDeadline())
                .resultDate(dto.getResultDate())
                .result(dto.getResult())
                .build();
    }

    public void update(ScheduleRequestDto dto) {
        this.companyName = dto.getCompanyName();
        this.deadline = dto.getDeadline();
        this.resultDate = dto.getResultDate();
        this.result = dto.getResult();
    }
}
