package spring.test.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import spring.test.model.Result;

import java.time.LocalDateTime;

@Getter
@Builder
public class ScheduleRequestDto {

    private String companyName;
    private LocalDateTime deadline;
    private LocalDateTime resultDate;
    private int result;

    @JsonCreator
    public static ScheduleRequestDto create(
            @JsonProperty("company_name") String companyName,

            @JsonProperty("deadline")
            LocalDateTime deadline,

            @JsonProperty("result_date")
            LocalDateTime resultDate,

            @JsonProperty("result") int result) {
        return ScheduleRequestDto.builder()
                .companyName(companyName)
                .deadline(deadline)
                .resultDate(resultDate)
                .result(result)
                .build();
    }
}
