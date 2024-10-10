package spring.test.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import spring.test.dto.ScheduleRequestDto;
import spring.test.dto.ScheduleResponseDto;
import spring.test.model.Schedule;
import spring.test.repository.ScheduleRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public List<ScheduleResponseDto> findAll() {

        return scheduleRepository.findAll()
                .stream()
                .map(ScheduleResponseDto::from)
                .collect(Collectors.toList());
    }

    public ScheduleResponseDto save(ScheduleRequestDto scheduleRequestDto) {

        Schedule save = scheduleRepository.save(Schedule.from(scheduleRequestDto));

        return ScheduleResponseDto.from(save);
    }
}
