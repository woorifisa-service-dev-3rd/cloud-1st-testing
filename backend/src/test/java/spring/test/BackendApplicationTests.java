package spring.test;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import spring.test.dto.ScheduleRequestDto;
import spring.test.model.Result;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.equalTo;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BackendApplicationTests {

	@LocalServerPort
	int port;

	@BeforeEach
	public void setUp() {
		RestAssured.port = port;
	}

	@Test
	void 전체_조회_아이디_1_일치() {
		RestAssured
				.given()
				.when()
				.get("/api/schedule")
				.then()
				.statusCode(200)
				.body("[0].id", equalTo(1));
	}

	@Test
	void 스케줄_업데이트() {

		ScheduleRequestDto dto = ScheduleRequestDto.builder()
									.companyName("KT")
									.deadline(LocalDateTime.parse("2024-09-22T09:00:00"))
									.resultDate(LocalDateTime.parse("2024-10-17T09:00:00"))
									.result(1)
									.build();

		RestAssured.given()
				.contentType("application/json")
				.body(dto)
				.when()
				.post("/api/schedule/1")
				.then()
				.statusCode(200)
				.body("result",equalTo("합격"));
	}
}