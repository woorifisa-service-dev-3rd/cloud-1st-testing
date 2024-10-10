package spring.test.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring.test.dto.ScheduleRequestDto;
import spring.test.dto.ScheduleResponseDto;
import spring.test.service.ScheduleService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDto>> getList() { // 모든 스케줄 조회

        List<ScheduleResponseDto> list = scheduleService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ScheduleResponseDto> addSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto) { // 스케줄 추가

        ScheduleResponseDto save = scheduleService.save(scheduleRequestDto);

        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ScheduleResponseDto>
        updateSchedule(@PathVariable Long id, @RequestBody ScheduleRequestDto scheduleRequestDto) { // 스케줄 업데이트

        ScheduleResponseDto updated = scheduleService.update(id, scheduleRequestDto);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
