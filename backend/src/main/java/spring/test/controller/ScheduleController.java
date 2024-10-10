package spring.test.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.test.dto.ScheduleResponseDto;
import spring.test.service.ScheduleService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDto>> getList() { // 모든 스케줄 조회

        List<ScheduleResponseDto> list = scheduleService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
