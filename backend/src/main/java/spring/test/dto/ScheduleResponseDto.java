package spring.test.dto;

import lombok.Builder;
import spring.test.model.Result;
import spring.test.model.Schedule;

import java.time.LocalDateTime;

@Builder
public class ScheduleResponseDto {

    private Long id;
    private String companyName;
    private LocalDateTime deadline;
    private LocalDateTime resultDate;
    private Result result;

    public static ScheduleResponseDto from(Schedule schedule) {

        return ScheduleResponseDto.builder()
                .id(schedule.getId())
                .companyName(schedule.getCompanyName())
                .deadline(schedule.getDeadline())
                .resultDate(schedule.getResultDate())
                .result(schedule.getResult())
                .build();
    }
}
