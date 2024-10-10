DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
       ID BIGINT NOT NULL AUTO_INCREMENT,  -- 아이디, 기본 키, 자동 증가
       COMPANY_NAME VARCHAR(255) NOT NULL, -- 회사 이름, NOT NULL 제약
       DEADLINE DATE NOT NULL,             -- 서류 지원 마감일, NOT NULL 제약
       RESULT_DATE DATE,                   -- 결과 발표일, NULL 허용
       RESULT INT NOT NULL,                -- 결과 (합/불합/진행중), NOT NULL 제약
       PRIMARY KEY (ID)                    -- ID를 기본 키로 설정
);